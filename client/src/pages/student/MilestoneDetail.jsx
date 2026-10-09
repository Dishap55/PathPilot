import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { roadmapService } from '../../services/roadmapService';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { PageLoader } from '../../components/common/Loader';

// Learning Components
import TopicHeader from '../../components/learning/TopicHeader';
import NoteViewer from '../../components/learning/NoteViewer';
import ExampleBlock from '../../components/learning/ExampleBlock';
import SyntaxBlock from '../../components/learning/SyntaxBlock';
import EdgeCaseBlock from '../../components/learning/EdgeCaseBlock';
import PatternCard from '../../components/learning/PatternCard';
import AIMentor from '../../components/learning/AIMentor';
import TwoPointersIntroduction from '../../components/learning/TwoPointersIntroduction';

// Question & Practice Components
import QuestionCard from '../../components/questions/QuestionCard';
import AnswerOptions from '../../components/questions/AnswerOptions';
import FeedbackPanel from '../../components/questions/FeedbackPanel';
import ExplanationPanel from '../../components/questions/ExplanationPanel';
import HintPanel from '../../components/questions/HintPanel';
import SameLogicPractice from '../../components/questions/SameLogicPractice';

// Editor Components
import CodeEditor from '../../components/editors/CodeEditor';
import SQLQueryEditor from '../../components/editors/SQLQueryEditor';
import RunButton from '../../components/editors/RunButton';
import OutputPanel from '../../components/editors/OutputPanel';
import ErrorPanel from '../../components/editors/ErrorPanel';

import {
  Lock,
  CheckCircle2,
  BookOpen,
  Code2,
  Database,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  AlertCircle,
  Lightbulb,
  Check,
  RotateCw,
  Trophy,
  Target,
  FileText
} from 'lucide-react';
import AddNoteButton from '../../components/notes/AddNoteButton';
import SummaryAndNotes from '../../components/notes/SummaryAndNotes';

export default function MilestoneDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  // Component State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [milestoneData, setMilestoneData] = useState(null);
  const [practiceData, setPracticeData] = useState(null);
  const [activeTab, setActiveTab] = useState('learn'); // 'learn' | 'practice'

  // Practice Interaction State
  const [selectedOption, setSelectedOption] = useState(null);
  const [mcqSubmitted, setMcqSubmitted] = useState(false);
  const [mcqEvaluation, setMcqEvaluation] = useState(null);
  const [codeContent, setCodeContent] = useState('');
  const [codeRunning, setCodeRunning] = useState(false);
  const [codeOutput, setCodeOutput] = useState(null);
  const [codeError, setCodeError] = useState(null);
  const [sqlQuery, setSqlQuery] = useState('');
  const [sqlRunning, setSqlRunning] = useState(false);
  const [sqlOutput, setSqlOutput] = useState(null);

  // Completion State
  const [isCompleting, setIsCompleting] = useState(false);
  const [completionResult, setCompletionResult] = useState(null);
  const [completionError, setCompletionError] = useState('');

  // 1. Load Milestone & Practice on mount
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      if (authLoading) return;
      if (!user) {
        navigate('/login');
        return;
      }

      setLoading(true);
      setError('');
      try {
        const mRes = await roadmapService.getMilestone(id);
        if (!isMounted) return;

        setMilestoneData(mRes);

        if (!mRes.isLocked) {
          try {
            const pRes = await roadmapService.getPracticeQuestions(id);
            if (isMounted) {
              setPracticeData(pRes);
              const codingQ = pRes.questions?.find(q => q.type === 'coding');
              if (codingQ?.starter_code) {
                setCodeContent(codingQ.starter_code);
              }
              const sqlQ = pRes.questions?.find(q => q.type === 'sql');
              if (sqlQ?.starter_query) {
                setSqlQuery(sqlQ.starter_query);
              }
            }
          } catch (pErr) {
            console.warn('[MilestoneDetail] Practice lookup note:', pErr.message);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load milestone.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, [id, user, authLoading, navigate]);

  // 2. Handle MCQ Submission
  const handleMcqSubmit = async () => {
    if (selectedOption === null) return;
    const mcqQ = practiceData?.questions?.find(q => q.type === 'mcq');
    if (!mcqQ) return;

    try {
      const res = await roadmapService.submitAttempt(id, {
        question_id: mcqQ.id,
        question_type: 'mcq',
        selected_option: selectedOption
      });

      setMcqEvaluation(res.evaluation);
      setMcqSubmitted(true);

      // Refresh progress
      if (res.progress) {
        setMilestoneData(prev => ({
          ...prev,
          progress: res.progress
        }));
      }
    } catch (err) {
      setError(err.message || 'Error submitting answer.');
    }
  };

  // 3. Handle Coding Execution
  const handleRunCode = async () => {
    const codingQ = practiceData?.questions?.find(q => q.type === 'coding');
    if (!codingQ) return;

    setCodeRunning(true);
    setCodeError(null);
    setCodeOutput(null);

    try {
      const res = await roadmapService.submitAttempt(id, {
        question_id: codingQ.id,
        question_type: 'coding',
        code: codeContent,
        language: codingQ.language || milestoneData?.content?.preferred_language || 'C++'
      });

      setCodeOutput(res.evaluation?.stdout || 'Execution complete. Verdict: ' + (res.evaluation?.status || 'Accepted'));
      if (res.progress) {
        setMilestoneData(prev => ({ ...prev, progress: res.progress }));
      }
    } catch (err) {
      setCodeError(err.message || 'Execution error.');
    } finally {
      setCodeRunning(false);
    }
  };

  // 4. Handle SQL Execution
  const handleRunSql = async () => {
    const sqlQ = practiceData?.questions?.find(q => q.type === 'sql');
    if (!sqlQ) return;

    setSqlRunning(true);
    setSqlOutput(null);

    try {
      const res = await roadmapService.submitAttempt(id, {
        question_id: sqlQ.id,
        question_type: 'sql',
        sql_query: sqlQuery
      });

      setSqlOutput(res.evaluation);
      if (res.progress) {
        setMilestoneData(prev => ({ ...prev, progress: res.progress }));
      }
    } catch (err) {
      setError(err.message || 'SQL execution error.');
    } finally {
      setSqlRunning(false);
    }
  };

  // 5. Complete Milestone & Dynamically Unlock Next
  const handleCompleteMilestone = async () => {
    setIsCompleting(true);
    setCompletionError('');

    try {
      const res = await roadmapService.completeMilestone(id);
      if (res.success) {
        setCompletionResult(res);
        setMilestoneData(prev => ({
          ...prev,
          milestone: {
            ...prev.milestone,
            status: 'completed'
          }
        }));
      }
    } catch (err) {
      setCompletionError(err.message || 'Failed to complete milestone.');
    } finally {
      setIsCompleting(false);
    }
  };

  // -------------------------------------------------------------
  // Render Loading State
  // -------------------------------------------------------------
  if (loading) {
    return <PageLoader text="Loading learning milestone studio..." size="lg" />;
  }

  // -------------------------------------------------------------
  // Render Error State
  // -------------------------------------------------------------
  if (error && !milestoneData) {
    return (
      <div className="py-12 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="text-lg font-bold text-slate-900">Milestone Error</h2>
          <p className="text-sm text-slate-600">{error}</p>
          <Link to="/roadmap">
            <Button variant="secondary" className="w-full mt-2">Back to Roadmap</Button>
          </Link>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Render Locked Milestone State
  // -------------------------------------------------------------
  if (milestoneData?.isLocked) {
    const m = milestoneData.milestone;
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center space-y-5">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase font-bold text-slate-400">Step {m.sequence_no} Locked</span>
            <h1 className="text-2xl font-bold text-slate-900">{m.topic}</h1>
            <p className="text-xs text-indigo-600 font-semibold">{m.subject} &bull; {m.stage}</p>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-left flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 space-y-1">
              <span className="font-bold block">Sequential Milestone Locking Enforced</span>
              <p>
                {milestoneData.message || 'This milestone is locked. Complete the previous milestone in your roadmap to unlock this stage.'}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Link to="/roadmap">
              <Button variant="primary" className="w-full flex items-center justify-center gap-2">
                <ArrowLeft size={16} /> Return to Active Roadmap
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // Render Unlocked / Completed Milestone Page
  // -------------------------------------------------------------
  const { milestone, content, progress } = milestoneData;
  const isCompleted = milestone.status === 'completed';
  const questions = practiceData?.questions || [];
  const mcqQuestion = questions.find(q => q.type === 'mcq');
  const codingQuestion = questions.find(q => q.type === 'coding');
  const sqlQuestion = questions.find(q => q.type === 'sql');

  return (
    <div className="w-full space-y-6 py-2">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <Link to="/roadmap" className="flex items-center gap-1.5 font-semibold text-indigo-600 hover:text-indigo-700">
            <ArrowLeft size={14} /> Back to Roadmap
          </Link>
          <div className="flex items-center gap-2">
            <span>Milestone Step {milestone.sequence_no}</span>
            {isCompleted ? (
              <Badge variant="success">Completed</Badge>
            ) : (
              <Badge variant="primary">Active</Badge>
            )}
          </div>
        </div>

        {/* Milestone Hero Header */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  {content.subject}
                </span>
                <span className="text-slate-300">&bull;</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {milestone.stage}
                </span>
                <span className="text-slate-300">&bull;</span>
                <span className="text-xs text-slate-500 font-medium">
                  {milestone.estimated_days} Days Allocated
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {content.title}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              {isCompleted ? (
                <div className="flex items-center gap-1 text-emerald-600 font-bold text-sm bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  <CheckCircle2 size={16} /> Completed
                </div>
              ) : (
                <div className="flex items-center gap-1 text-indigo-600 font-bold text-sm bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-200">
                  <Sparkles size={16} /> In Progress
                </div>
              )}
            </div>
          </div>

          {/* Why Selected Diagnostic Context */}
          {content.why_selected && (
            <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl flex items-start gap-3">
              <Target className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-indigo-950 space-y-0.5">
                <span className="font-bold">Why This Milestone Matters For You</span>
                <p className="text-indigo-800 leading-relaxed">{content.why_selected}</p>
              </div>
            </div>
          )}

          {/* Tab Navigation: Learn & Practice */}
          <div className="flex border-b border-slate-200 pt-2 gap-4">
            <button
              onClick={() => setActiveTab('learn')}
              className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'learn'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <BookOpen size={16} />
              1. Learn & Understand
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'practice'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <Code2 size={16} />
              2. Practice &amp; Apply ({questions.length} Exercises)
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'summary'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <FileText size={16} />
              3. Summary &amp; Notes
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: LEARN & UNDERSTAND                                     */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'learn' && (
          <div className="space-y-6">
            {/* If topic relates to Two Pointers, render complete interactive Two Pointers Introduction */}
            {(milestone?.topic?.toLowerCase().includes('two pointer') ||
              content?.title?.toLowerCase().includes('two pointer') ||
              content?.topic?.toLowerCase().includes('two pointer')) && (
              <TwoPointersIntroduction />
            )}

            {/* Core Explanation & Notes */}
            <NoteViewer content={content.explanation} />

            {/* Language-Specific Code Example */}
            {content.code_example && (
              <ExampleBlock
                example={content.code_example}
                language={content.preferred_language || 'C++'}
              />
            )}

            {/* Syntax Reference */}
            {content.syntax && (
              <SyntaxBlock
                syntax={content.syntax}
                language={content.preferred_language || 'C++'}
              />
            )}

            {/* Edge Cases & Pitfalls */}
            {content.edge_cases && content.edge_cases.length > 0 && (
              <EdgeCaseBlock cases={content.edge_cases} />
            )}

            {/* Placement Interview Patterns */}
            {content.placement_patterns && (
              <PatternCard
                patternName={`${content.subject} Placement Pattern`}
                description={content.placement_patterns}
              />
            )}

            {/* CTA to Switch to Practice */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Concept Grasped?</h4>
                <p className="text-xs text-slate-500">Test your mastery with tailored practice questions.</p>
              </div>
              <Button
                variant="primary"
                onClick={() => setActiveTab('practice')}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Go to Practice Exercises <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: PRACTICE & APPLY                                       */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            {/* Practice Header with Add My Note action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  {content.subject || 'Core'} Practice Studio
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  Practice &amp; Apply: {content.topic || milestone?.topic || 'Milestone Exercises'}
                </h3>
              </div>
              <AddNoteButton
                subject={content.subject || 'Core'}
                topicId={milestone?.topic?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'milestone'}
                topicName={content.topic || milestone?.topic || 'Milestone'}
                section="Practice & Apply"
                questionId={codingQuestion?.id || sqlQuestion?.id || mcqQuestion?.id || null}
                questionTitle={codingQuestion?.prompt || sqlQuestion?.prompt || mcqQuestion?.prompt || null}
                size="md"
              />
            </div>

            {/* AI Mentor Multi-Level Progressive Guidance */}
            <AIMentor
              subject={content.subject || 'DSA'}
              topic={content.topic || milestone.topic || 'Practice Milestone'}
              questionPrompt={codingQuestion?.prompt || sqlQuestion?.prompt || mcqQuestion?.prompt || ''}
              studentCode={codeContent || sqlQuery || ''}
              preferredLanguage={content.preferred_language || 'C++'}
            />

            {/* 1. MCQ Practice Exercise */}
            {mcqQuestion && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Exercise 1 &bull; Conceptual Verification
                  </span>
                  <Badge variant="primary">{mcqQuestion.difficulty || 'Medium'}</Badge>
                </div>

                <QuestionCard question={mcqQuestion} />

                <AnswerOptions
                  options={mcqQuestion.options}
                  selected={selectedOption}
                  onSelect={setSelectedOption}
                />

                {!mcqSubmitted ? (
                  <div className="pt-3 flex justify-end">
                    <Button
                      variant="primary"
                      onClick={handleMcqSubmit}
                      disabled={selectedOption === null}
                      className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold"
                    >
                      Submit Answer
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 pt-3">
                    {mcqEvaluation && (
                      <FeedbackPanel
                        isCorrect={mcqEvaluation.is_correct}
                        message={mcqEvaluation.is_correct ? 'Mastery verified on core invariant!' : 'Concept mismatch. Review the analysis below.'}
                      />
                    )}

                    {mcqEvaluation?.explanation && (
                      <ExplanationPanel
                        concept={mcqQuestion.topic}
                        explanation={mcqEvaluation.explanation}
                      />
                    )}

                    {!mcqEvaluation?.is_correct && mcqEvaluation?.same_logic_hint && (
                      <HintPanel hint={mcqEvaluation.same_logic_hint} />
                    )}

                    {!mcqEvaluation?.is_correct && (
                      <SameLogicPractice onTrigger={() => setSelectedOption(null)} />
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 2. Coding Practice Exercise (Judge0 Integration) */}
            {codingQuestion && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Exercise 2 &bull; Algorithmic Coding Challenge
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">{codingQuestion.prompt}</h3>
                  </div>
                  <Badge variant="success">{codingQuestion.language || 'C++'}</Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
                    <span>Editor ({codingQuestion.language || 'C++'})</span>
                    <span className="text-[11px] text-slate-400">Evaluated in Judge0 Sandbox</span>
                  </div>
                  <CodeEditor
                    code={codeContent}
                    language={(codingQuestion.language || 'cpp').toLowerCase()}
                    onChange={setCodeContent}
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-slate-400">Sample Target: {codingQuestion.sample_output}</span>
                  <RunButton
                    onClick={handleRunCode}
                    loading={codeRunning}
                    disabled={codeRunning || !codeContent.trim()}
                  />
                </div>

                {codeOutput && <OutputPanel output={codeOutput} />}
                {codeError && <ErrorPanel error={codeError} />}
              </div>
            )}

            {/* 3. SQL Practice Exercise (Read-Only SQL Sandbox) */}
            {sqlQuestion && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Exercise 2 &bull; SQL Query Challenge
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">{sqlQuestion.prompt}</h3>
                  </div>
                  <Badge variant="primary">SQL Sandbox</Badge>
                </div>

                {sqlQuestion.schema_context && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-700 whitespace-pre-wrap">
                    {sqlQuestion.schema_context}
                  </div>
                )}

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-500 block">SQL Console</span>
                  <SQLQueryEditor
                    query={sqlQuery}
                    onChange={setSqlQuery}
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <RunButton
                    onClick={handleRunSql}
                    loading={sqlRunning}
                    disabled={sqlRunning || !sqlQuery.trim()}
                  />
                </div>

                {sqlOutput && (
                  <div className="space-y-2">
                    <FeedbackPanel
                      isCorrect={sqlOutput.is_correct}
                      message={sqlOutput.explanation}
                    />
                    {sqlOutput.rows && sqlOutput.rows.length > 0 && (
                      <div className="overflow-x-auto border border-slate-200 rounded-xl">
                        <table className="min-w-full text-xs text-left divide-y divide-slate-200">
                          <thead className="bg-slate-50 font-bold text-slate-700">
                            <tr>
                              {sqlOutput.columns.map((col, idx) => (
                                <th key={idx} className="px-4 py-2">{col}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 bg-white">
                            {sqlOutput.rows.map((row, rIdx) => (
                              <tr key={rIdx}>
                                {sqlOutput.columns.map((col, cIdx) => (
                                  <td key={cIdx} className="px-4 py-2 font-mono text-slate-600">
                                    {String(row[col])}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: SUMMARY & NOTES (OFFICIAL NOTES + MY NOTES)            */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            <SummaryAndNotes
              subject={content.subject || 'Core'}
              topicId={milestone?.topic?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'milestone'}
              topicName={content.topic || milestone?.topic || 'Milestone'}
              officialNotes={{
                takeawayTitle: `${content.title || content.topic || milestone?.topic || 'Milestone'} — Key Concepts`,
                takeawayText: content.explanation,
                edgeCases: content.edge_cases?.map((ec) => ({ title: 'Critical Invariant', text: ec })) || [],
                shortcuts: content.placement_patterns ? [{ rule: 'Placement Patterns', ex: content.placement_patterns }] : []
              }}
            />
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MILESTONE PROGRESSION & DYNAMIC COMPLETION BAR                */}
        {/* ------------------------------------------------------------- */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                Milestone Mastery & Progress
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Practice attempts: {progress?.attempted_count || 0} &bull; Accuracy: {progress?.accuracy || 0}%
              </p>
            </div>

            {/* Milestone Completion Action */}
            <div>
              {isCompleted ? (
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl text-xs font-bold border border-emerald-200">
                    <CheckCircle2 size={16} /> Milestone 100% Completed
                  </div>
                  {completionResult?.nextMilestone && (
                    <Link to={`/roadmap/milestone/${completionResult.nextMilestone.id}`}>
                      <Button variant="primary" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2">
                        Next: {completionResult.nextMilestone.topic} <ArrowRight size={14} />
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleCompleteMilestone}
                  disabled={isCompleting}
                  className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  {isCompleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Verifying Mastery & Unlocking...</span>
                    </>
                  ) : (
                    <>
                      <Check size={16} /> Mark Completed & Unlock Next
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {completionError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2">
              <AlertCircle size={15} className="flex-shrink-0" />
              <span>{completionError}</span>
            </div>
          )}

          {completionResult?.nextMilestone && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
              <div>
                <span className="font-bold block">Dynamic Progression Success!</span>
                <span>Next Milestone Unlocked: Step {completionResult.nextMilestone.sequence_no} &bull; {completionResult.nextMilestone.topic}</span>
              </div>
              <Link to={`/roadmap/milestone/${completionResult.nextMilestone.id}`}>
                <Button size="sm" variant="primary" className="bg-emerald-600 text-white">
                  Continue Now →
                </Button>
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
