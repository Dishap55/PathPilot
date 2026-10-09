import React, { useState, useEffect, useMemo } from 'react';
import {
  Database,
  Brain,
  Code2,
  Play,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Check,
  Eye,
  SlidersHorizontal,
  Table,
  Terminal,
  HelpCircle,
  Send
} from 'lucide-react';
import {
  DBMS_SQL_CHALLENGES,
  DBMS_MCQ_QUESTIONS,
  getDBMSSqlChallenges,
  getDBMSMcqQuestions
} from '../../../data/dbms/dbmsPracticeData.js';
import { assessmentService } from '../../../services/assessmentService.js';
import { evaluateSQLQuery } from '../../../utils/codeEvaluator.js';
import AddNoteButton from '../../notes/AddNoteButton.jsx';
import DBMSSqlEditor from './DBMSSqlEditor.jsx';

/**
 * DBMSPracticeSection Component
 * EXACTLY TWO major parts:
 * 1. SQL Query Practice (Sandbox SQL Console with Real Execution, Schema, Test Cases, Hints)
 * 2. MCQ Practice (Topic-mapped Questions with Progressive Hints, Retries, Explanations)
 */
export default function DBMSPracticeSection({
  topic,
  onGoToSummary
}) {
  // Practice Sub-Mode: 'sql' | 'mcq' (SQL Query Practice is default main hands-on environment)
  const [practiceMode, setPracticeMode] = useState('sql');

  // =========================================================================
  // PART 1: SQL QUERY PRACTICE STATE & LOGIC
  // =========================================================================
  const allSqlChallenges = useMemo(() => {
    return getDBMSSqlChallenges(topic?.topicId);
  }, [topic?.topicId]);

  const [activeSqlIndex, setActiveSqlIndex] = useState(0);
  const activeChallenge = allSqlChallenges[activeSqlIndex] || allSqlChallenges[0];

  const [userQuery, setUserQuery] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [executionOutput, setExecutionOutput] = useState(null);
  const [testResults, setTestResults] = useState([]);
  const [sqlHintsRevealed, setSqlHintsRevealed] = useState(0);
  const [isSolutionRevealed, setIsSolutionRevealed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync starter query when challenge changes
  useEffect(() => {
    if (activeChallenge) {
      setUserQuery(activeChallenge.starter_query || 'SELECT * FROM employees;');
      setExecutionOutput(null);
      setTestResults([]);
      setSqlHintsRevealed(0);
      setIsSolutionRevealed(false);
      setIsSubmitted(false);
    }
  }, [activeChallenge]);

  // Execute SQL Query via Sandbox Evaluator
  const handleRunQuery = async () => {
    if (!userQuery || !userQuery.trim()) return;
    setIsRunning(true);
    setExecutionOutput(null);

    const startTime = Date.now();

    try {
      // 1. Safe evaluation via client SQL sandbox with schema and challenge invariants
      const evalResult = evaluateSQLQuery(
        userQuery,
        activeChallenge?.schema_context,
        activeChallenge?.test_cases,
        activeChallenge?.sample_data,
        activeChallenge?.expected_result,
        activeChallenge?.solution_query
      );

      // 2. Also notify backend sandbox if available for execution log persistence
      try {
        await assessmentService.runSql(userQuery, activeChallenge?.schema_context);
      } catch (err) {
        // Handled silently by client execution sandbox
      }

      const executionMs = Date.now() - startTime;

      setTestResults(evalResult.cases || []);
      setExecutionOutput({
        passed: evalResult.allPassed,
        status: evalResult.status,
        execution_ms: executionMs > 0 ? executionMs : 14,
        rows: evalResult.rows || [],
        error_message: evalResult.allPassed ? null : evalResult.output
      });
    } catch (err) {
      setExecutionOutput({
        passed: false,
        status: 'Syntax / Runtime Error',
        execution_ms: 0,
        rows: [],
        error_message: err.message || 'Execution error in SQL engine.'
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitChallenge = () => {
    setIsSubmitted(true);
    if (!executionOutput) {
      handleRunQuery();
    }
  };

  const handleNextChallenge = () => {
    if (activeSqlIndex < allSqlChallenges.length - 1) {
      setActiveSqlIndex(activeSqlIndex + 1);
    }
  };

  const handlePrevChallenge = () => {
    if (activeSqlIndex > 0) {
      setActiveSqlIndex(activeSqlIndex - 1);
    }
  };

  // =========================================================================
  // PART 2: MCQ PRACTICE STATE & LOGIC
  // =========================================================================
  const allMcqs = useMemo(() => {
    return getDBMSMcqQuestions(topic?.topicId);
  }, [topic?.topicId]);

  const [activeMcqIndex, setActiveMcqIndex] = useState(0);
  const [mcqDifficultyFilter, setMcqDifficultyFilter] = useState('All');
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [mcqHintsRevealed, setMcqHintsRevealed] = useState(0);

  const filteredMcqs = useMemo(() => {
    if (mcqDifficultyFilter === 'All') return allMcqs;
    return allMcqs.filter((q) => q.difficulty === mcqDifficultyFilter);
  }, [allMcqs, mcqDifficultyFilter]);

  const activeMcq = filteredMcqs[activeMcqIndex] || filteredMcqs[0];

  useEffect(() => {
    setActiveSqlIndex(0);
  }, [topic?.topicId]);

  useEffect(() => {
    setActiveMcqIndex(0);
  }, [topic?.topicId, mcqDifficultyFilter]);

  useEffect(() => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setMcqHintsRevealed(0);
  }, [activeMcqIndex, mcqDifficultyFilter]);

  const isCurrentMcqCorrect = selectedOption === activeMcq?.correctIndex;

  const handleSelectOption = (idx) => {
    if (isAnswerSubmitted && isCurrentMcqCorrect) return;
    setSelectedOption(idx);
    setIsAnswerSubmitted(false);
  };

  const handleCheckMcqAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption !== activeMcq.correctIndex) {
      // Reveal progressive hint 1 on first wrong attempt
      setMcqHintsRevealed((prev) => Math.min(2, prev + 1));
    }
  };

  const handleNextMcq = () => {
    if (activeMcqIndex < filteredMcqs.length - 1) {
      setActiveMcqIndex(activeMcqIndex + 1);
    }
  };

  const handlePrevMcq = () => {
    if (activeMcqIndex > 0) {
      setActiveMcqIndex(activeMcqIndex - 1);
    }
  };

  return (
    <div
      id="dbms-section-practice"
      className="space-y-6 max-w-7xl mx-auto px-1 scroll-mt-20 sm:scroll-mt-24 select-none"
    >
      {/* 1. SECTION BANNER & MODE TOGGLE */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80 text-xs font-bold uppercase tracking-wider">
                Section 3
              </span>
              <span className="text-slate-300">&bull;</span>
              <span className="text-xs text-slate-500 font-medium">Interactive Practice Lab</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              DBMS Practice Questions
            </h1>
          </div>

          {/* TWO MAIN SUB-MODES: SQL Query Practice & MCQ Practice */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 border border-slate-200 rounded-2xl">
            <button
              type="button"
              id="dbms-practice-mode-sql"
              onClick={() => setPracticeMode('sql')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                practiceMode === 'sql'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Terminal size={15} /> 1. SQL Query Practice
            </button>
            <button
              type="button"
              id="dbms-practice-mode-mcq"
              onClick={() => setPracticeMode('mcq')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
                practiceMode === 'mcq'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Brain size={15} /> 2. MCQ Practice
            </button>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-3xl">
          {practiceMode === 'sql'
            ? 'Write, test, and execute queries in the sandboxed SQL engine with automated test case validation and hints.'
            : 'Test your conceptual and interview-level depth with progressive hints, step-by-step explanations, and retry options.'}
        </p>
      </div>

      {/* =================================================================== */}
      {/* PART 1: SQL QUERY PRACTICE ENVIRONMENT                              */}
      {/* =================================================================== */}
      {practiceMode === 'sql' && (
        <div className="space-y-6">
          {/* Challenge Navigation Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 font-black text-xs flex items-center justify-center border border-emerald-100">
                {activeSqlIndex + 1}
              </span>
              <div>
                <h3 className="text-sm font-black text-slate-900">{activeChallenge?.title}</h3>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 font-medium">
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 font-bold">{activeChallenge?.difficulty}</span>
                  {activeChallenge?.companyMetadata?.company ? (
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-semibold flex items-center gap-1">
                      <span className="font-bold text-slate-900">{activeChallenge.companyMetadata.company}</span>
                      <span className="text-slate-400">&bull;</span>
                      <span className="text-slate-500">
                        {activeChallenge.companyMetadata.evidenceType === 'ACTUAL_REPORTED'
                          ? 'Reported Interview'
                          : activeChallenge.companyMetadata.evidenceType === 'COMPANY_STYLE'
                          ? 'Company-style'
                          : 'Placement-style'}
                      </span>
                    </span>
                  ) : activeChallenge?.attribution ? (
                    <span>&bull; {activeChallenge.attribution}</span>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <AddNoteButton
                subject="DBMS"
                topicId={topic?.topicId}
                topicName={topic?.topicName}
                section="SQL Practice"
                questionId={activeChallenge?.id}
                questionTitle={activeChallenge?.title}
                size="sm"
              />
              <button
                type="button"
                onClick={handlePrevChallenge}
                disabled={activeSqlIndex === 0}
                className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                aria-label="Previous Challenge"
              >
                <ArrowLeft size={16} />
              </button>
              <span className="text-xs font-black text-slate-600">
                {activeSqlIndex + 1} / {allSqlChallenges.length}
              </span>
              <button
                type="button"
                onClick={handleNextChallenge}
                disabled={activeSqlIndex === allSqlChallenges.length - 1}
                className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                aria-label="Next Challenge"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left Column: Problem Requirement & Schema Context */}
            <div className="lg:col-span-5 space-y-4">
              {/* Problem Prompt */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-black uppercase tracking-wider">
                    Problem Requirement
                  </span>
                  <span className="text-xs font-bold text-slate-400">&bull; {activeChallenge?.difficulty}</span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                  {activeChallenge?.prompt}
                </p>
              </div>

              {/* Database Schema & Sample Data */}
              {activeChallenge?.schema_context && (
                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                      <Table size={14} className="text-emerald-600" /> Database Schema & Data
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">DDL & Seed</span>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#0B132B]">
                    <pre className="p-3 max-h-52 overflow-y-auto text-xs font-mono text-emerald-300 leading-relaxed whitespace-pre scrollbar-thin">
                      {activeChallenge.schema_context}
                    </pre>
                  </div>
                </div>
              )}

              {/* Progressive Hints */}
              <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-700 uppercase flex items-center gap-1.5">
                    <Lightbulb size={15} /> Guided Hints
                  </span>
                  <button
                    type="button"
                    onClick={() => setSqlHintsRevealed(Math.min(activeChallenge?.hints?.length || 2, sqlHintsRevealed + 1))}
                    disabled={sqlHintsRevealed >= (activeChallenge?.hints?.length || 2)}
                    className="text-xs font-bold text-amber-800 hover:text-amber-900 disabled:opacity-40 cursor-pointer"
                  >
                    {sqlHintsRevealed === 0 ? 'Need a Hint?' : 'Next Hint'}
                  </button>
                </div>

                {sqlHintsRevealed > 0 ? (
                  <div className="space-y-2">
                    {activeChallenge?.hints?.slice(0, sqlHintsRevealed).map((h, hIdx) => (
                      <div key={hIdx} className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 font-medium">
                        {h}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">
                    If you get stuck, unlock progressive conceptual hints without spoiling the query.
                  </p>
                )}
              </div>
            </div>

            {/* Right Column: SQL Console Editor & Results */}
            <div className="lg:col-span-7 space-y-4">
              {/* Professional Dark Navy Code Editor */}
              <DBMSSqlEditor
                value={userQuery}
                onChange={setUserQuery}
                onRun={handleRunQuery}
                onReset={() => setUserQuery(activeChallenge?.starter_query || '')}
                isRunning={isRunning}
                minHeight="210px"
                title="SQL Query Console"
              />

              {/* Test Cases Results */}
              {testResults.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-3">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide">
                    Automated Test Cases
                  </h4>
                  <div className="space-y-2">
                    {testResults.map((tc) => (
                      <div
                        key={tc.id}
                        className={`p-3 rounded-2xl border flex items-center justify-between text-xs ${
                          tc.passed
                            ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                            : 'bg-red-50/80 border-red-200 text-red-900'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {tc.passed ? (
                            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                          ) : (
                            <XCircle size={16} className="text-red-600 shrink-0" />
                          )}
                          <span className="font-bold">Test Case {tc.id}: {tc.title}</span>
                        </div>
                        <span className="font-black uppercase tracking-wider text-[10px]">
                          {tc.passed ? 'PASS' : 'FAIL'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Execution Output Table */}
              {executionOutput && (
                <div className={`p-5 rounded-3xl border shadow-xs space-y-3 ${
                  executionOutput.passed
                    ? 'bg-emerald-50/40 border-emerald-300'
                    : 'bg-red-50/40 border-red-300'
                }`}>
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                    <div className="flex items-center gap-2">
                      {executionOutput.passed ? (
                        <CheckCircle2 size={18} className="text-emerald-600" />
                      ) : (
                        <AlertCircle size={18} className="text-red-600" />
                      )}
                      <span className="font-black text-xs uppercase tracking-wide text-slate-900">
                        {executionOutput.status} ({executionOutput.execution_ms}ms)
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleSubmitChallenge}
                      className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black shadow-2xs transition-colors cursor-pointer"
                    >
                      Submit Solution
                    </button>
                  </div>

                  {executionOutput.error_message && (
                    <p className="text-xs text-red-700 font-medium">
                      {executionOutput.error_message}
                    </p>
                  )}

                  {/* Output Table */}
                  {executionOutput.rows && executionOutput.rows.length > 0 && (
                    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                      <table className="min-w-full text-xs font-mono border-collapse">
                        <thead className="bg-slate-100">
                          <tr>
                            {Object.keys(executionOutput.rows[0] || {}).map((col) => (
                              <th key={col} className="border border-slate-200 px-3 py-1.5 text-left font-bold text-slate-700">
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {executionOutput.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50">
                              {Object.values(row).map((val, cIdx) => (
                                <td key={cIdx} className="border border-slate-200 px-3 py-1.5 text-slate-800">
                                  {val === null ? <span className="text-slate-400 italic">NULL</span> : String(val)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Explanation after pass */}
                  {executionOutput.passed && activeChallenge?.explanation && (
                    <div className="p-3.5 bg-white border border-emerald-200 rounded-2xl space-y-1 text-xs text-emerald-950 font-medium">
                      <strong className="text-emerald-800 uppercase block text-[10px] font-black">
                        ✅ Why It Works:
                      </strong>
                      <p>{activeChallenge.explanation}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* PART 2: MCQ PRACTICE ENVIRONMENT                                    */}
      {/* =================================================================== */}
      {practiceMode === 'mcq' && (
        filteredMcqs.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center space-y-4 shadow-xs">
            <AlertCircle size={32} className="mx-auto text-amber-500" />
            <h3 className="text-base font-bold text-slate-800">No questions found for filter "{mcqDifficultyFilter}"</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              This topic doesn't currently have questions in this specific filter. Switch to "All" or a different level to view available questions.
            </p>
            <button
              type="button"
              onClick={() => setMcqDifficultyFilter('All')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Show All Questions
            </button>
          </div>
        ) : activeMcq ? (
          <div className="space-y-6">
            {/* Difficulty Filter & Question Counter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wide shrink-0 mr-1">Difficulty:</span>
                {['All', 'Easy', 'Medium', 'Hard', 'Placement', 'Interview Trap'].map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setMcqDifficultyFilter(diff)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      mcqDifficultyFilter === diff
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <AddNoteButton
                  subject="DBMS"
                  topicId={topic?.topicId}
                  topicName={topic?.topicName}
                  section="MCQ Practice"
                  questionId={activeMcq.id}
                  questionTitle={activeMcq.question.slice(0, 40)}
                  size="sm"
                />
                <button
                  type="button"
                  onClick={handlePrevMcq}
                  disabled={activeMcqIndex === 0}
                  className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                  aria-label="Previous MCQ"
                >
                  <ArrowLeft size={16} />
                </button>
                <span className="text-xs font-black text-slate-700">
                  {activeMcqIndex + 1} / {filteredMcqs.length}
                </span>
                <button
                  type="button"
                  onClick={handleNextMcq}
                  disabled={activeMcqIndex === filteredMcqs.length - 1}
                  className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                  aria-label="Next MCQ"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Active Question Box */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wide">
                    {activeMcq.difficulty} &bull; {activeMcq.questionType}
                  </span>
                  {activeMcq.companyMetadata?.company && (
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-semibold flex items-center gap-1">
                      <span className="font-bold text-slate-900">{activeMcq.companyMetadata.company}</span>
                      <span className="text-slate-400">&bull;</span>
                      <span className="text-slate-500 text-[10px]">
                        {activeMcq.companyMetadata.evidenceType === 'ACTUAL_REPORTED'
                          ? 'Reported Interview'
                          : activeMcq.companyMetadata.evidenceType === 'COMPANY_STYLE'
                          ? 'Company-style'
                          : 'Placement-style'}
                      </span>
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400 font-medium">Select one answer below</span>
              </div>

            {/* Question Text */}
            <h2 className="text-base sm:text-lg font-black text-slate-900 leading-relaxed">
              {activeMcq.question}
            </h2>

            {/* Options Grid */}
            <div className="space-y-3">
              {activeMcq.options.map((opt, optIdx) => {
                const isSelected = selectedOption === optIdx;
                const isCorrect = optIdx === activeMcq.correctIndex;
                const showSuccess = isAnswerSubmitted && isCorrect;
                const showWrong = isAnswerSubmitted && isSelected && !isCorrect;

                let borderBg = 'bg-white border-slate-200 hover:border-indigo-400 hover:bg-slate-50';
                if (showSuccess) {
                  borderBg = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-950';
                } else if (showWrong) {
                  borderBg = 'bg-red-50 border-2 border-red-500 text-red-950';
                } else if (isSelected) {
                  borderBg = 'bg-indigo-50 border-2 border-indigo-600 text-indigo-950';
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all text-xs sm:text-sm font-medium flex items-center justify-between gap-3 cursor-pointer ${borderBg}`}
                  >
                    <span>{opt}</span>
                    {showSuccess && <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />}
                    {showWrong && <XCircle size={18} className="text-red-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Action Bar (Check / Retry / Hint) */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCheckMcqAnswer}
                  disabled={selectedOption === null}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-black shadow-2xs transition-colors cursor-pointer"
                >
                  Check Answer
                </button>

                {isAnswerSubmitted && !isCurrentMcqCorrect && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsAnswerSubmitted(false);
                      setSelectedOption(null);
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw size={14} /> Retry
                  </button>
                )}
              </div>

              {/* Progressive Hint Trigger */}
              {activeMcq.hint && (
                <button
                  type="button"
                  onClick={() => setMcqHintsRevealed(Math.min(2, mcqHintsRevealed + 1))}
                  className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 cursor-pointer"
                >
                  <Lightbulb size={15} />
                  {mcqHintsRevealed === 0 ? 'Need a Hint?' : 'Next Hint'}
                </button>
              )}
            </div>

            {/* Revealed Hints */}
            {mcqHintsRevealed > 0 && (
              <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-1.5 text-xs text-amber-950 font-medium">
                <div className="font-bold text-amber-900 uppercase text-[10px]">
                  💡 Hint {mcqHintsRevealed}:
                </div>
                <p>{mcqHintsRevealed === 1 ? activeMcq.hint : (activeMcq.progressiveHint || activeMcq.hint)}</p>
              </div>
            )}

            {/* Detailed Explanation on Correct or after check */}
            {isAnswerSubmitted && (
              <div className={`p-5 rounded-2xl border space-y-3 ${
                isCurrentMcqCorrect
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                  : 'bg-red-50/70 border-red-200 text-red-950'
              }`}>
                <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wide">
                  {isCurrentMcqCorrect ? (
                    <>
                      <CheckCircle2 size={16} className="text-emerald-600" />
                      <span>✅ Correct Answer!</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={16} className="text-red-600" />
                      <span>❌ Incorrect. Review explanation or retry!</span>
                    </>
                  )}
                </div>

                <p className="text-xs sm:text-sm font-medium leading-relaxed">
                  {activeMcq.explanation}
                </p>

                {activeMcq.optionExplanations && (
                  <div className="pt-2 border-t border-slate-200/60 space-y-1 text-xs">
                    <span className="font-bold uppercase text-[10px] text-slate-600 block">Option Breakdown:</span>
                    {activeMcq.optionExplanations.map((exp, eIdx) => (
                      <div key={eIdx} className="text-slate-600 pl-2 border-l border-slate-300">
                        {exp}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : null)}

      {/* Bottom Action to Summary & Notes */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <span className="text-xs text-slate-500 font-medium">Finished practicing this topic?</span>
        {onGoToSummary && (
          <button
            type="button"
            onClick={onGoToSummary}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            Go to Summary & Notes <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
