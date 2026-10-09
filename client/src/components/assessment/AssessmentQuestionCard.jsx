import React, { useState, useEffect, useCallback } from 'react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import {
  Clock,
  Code2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Flame,
  Smile,
  Meh
} from 'lucide-react';
import { assessmentService } from '../../services/assessmentService';
import { evaluateProblemSolution, evaluateSQLQuery, evaluateOOPSSolution } from '../../utils/codeEvaluator';

const CONFIDENCE_LEVELS = [
  { id: 'guessing', label: 'Guessing', emoji: '🤔', color: 'hover:border-amber-300 hover:bg-amber-50/50' },
  { id: 'not_sure', label: 'Not Sure', emoji: '😐', color: 'hover:border-slate-300 hover:bg-slate-50' },
  { id: 'confident', label: 'Confident', emoji: '🙂', color: 'hover:border-emerald-300 hover:bg-emerald-50/50' },
  { id: 'very_confident', label: 'Very Confident', emoji: '🔥', color: 'hover:border-indigo-300 hover:bg-indigo-50/50' }
];

export default function AssessmentQuestionCard({
  question,
  questionNumber = 1,
  totalQuestions = 7,
  difficulty = 'Easy',
  subjectName = 'DSA',
  topicName = 'Topic',
  questionStartTime = Date.now(),
  onSubmit,
  onSkip,
  isSubmitting = false,
  feedbackState = null, // { type: 'correct' | 'incorrect' | 'skipped', message: string }
  preferredLanguage
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [confidence, setConfidence] = useState('confident');
  const [code, setCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState((preferredLanguage || 'cpp').toLowerCase());
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [runOutput, setRunOutput] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [activeTestCaseIndex, setActiveTestCaseIndex] = useState(0);

  useEffect(() => {
    if (preferredLanguage) {
      setSelectedLanguage(preferredLanguage.toLowerCase());
    }
  }, [preferredLanguage]);

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setConfidence('confident');
    setRunOutput(null);
    setActiveTestCaseIndex(0);
    if (question?.starterCode) {
      if (typeof question.starterCode === 'string') {
        setCode(question.starterCode);
      } else if (typeof question.starterCode === 'object') {
        setCode(question.starterCode[selectedLanguage] || Object.values(question.starterCode)[0] || '');
      }
    } else {
      setCode('');
    }
  }, [question?.questionId]);

  // Live timer tick
  useEffect(() => {
    const updateElapsed = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((now - questionStartTime) / 1000));
      setElapsedSeconds(diff);
    };
    updateElapsed();
    const interval = setInterval(updateElapsed, 1000);
    return () => clearInterval(interval);
  }, [questionStartTime]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Keyboard shortcut listener (A-D, 1-4 for MCQ)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (feedbackState || isSubmitting) return;
      if (question?.questionType !== 'mcq') return;

      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key)) {
        const idx = key.charCodeAt(0) - 65;
        if (question?.options && idx < question.options.length) {
          setSelectedOption(idx);
        }
      } else if (['1', '2', '3', '4'].includes(key)) {
        const idx = parseInt(key, 10) - 1;
        if (question?.options && idx < question.options.length) {
          setSelectedOption(idx);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [question, feedbackState, isSubmitting]);

  // Difficulty badge variant
  const getDifficultyBadge = (diff) => {
    const d = (diff || '').toLowerCase();
    if (d === 'easy') {
      return <Badge variant="success" className="font-bold">Easy</Badge>;
    }
    if (d === 'medium') {
      return <Badge variant="warning" className="font-bold">Medium</Badge>;
    }
    return <Badge variant="primary" className="font-bold">Hard</Badge>;
  };

  const handleLanguageChange = (newLang) => {
    setSelectedLanguage(newLang);
    if (question?.starterCode && typeof question.starterCode === 'object') {
      setCode(question.starterCode[newLang] || Object.values(question.starterCode)[0] || '');
    }
  };

  // Run code handler with accurate evaluation
  const handleRunCode = async () => {
    setIsRunningCode(true);
    setRunOutput(null);
    try {
      if (question?.subject === 'DBMS' || question?.supportedLanguages?.includes('sql')) {
        try {
          await assessmentService.runSql(code, question?.problemStatement);
        } catch (e) {
          // sandbox fallback
        }
        const evalResult = evaluateSQLQuery(
          code,
          question?.problemStatement,
          question?.testCases,
          question?.sample_data || question?.sampleData,
          question?.expected_result || question?.expectedResult,
          question?.solution_query || question?.solutionQuery
        );
        setRunOutput({
          status: evalResult.status,
          passed: evalResult.allPassed,
          passedCount: evalResult.passedCount,
          totalCount: evalResult.totalCount,
          caseResults: evalResult.cases.map((tc, idx) => ({
            id: tc.id || idx + 1,
            title: tc.title || `Test Case ${idx + 1}`,
            passed: tc.passed,
            input: tc.input || 'Table schema evaluation',
            expected: tc.expected || 'Matching result set',
            actual: tc.actual
          })),
          output: evalResult.output
        });
      } else if (question?.subject === 'OOPS') {
        const evalResult = evaluateOOPSSolution(question, code, selectedLanguage);
        setRunOutput({
          status: evalResult.allPassed ? 'Accepted' : 'Failed',
          passed: evalResult.allPassed,
          passedCount: evalResult.casesPassed,
          totalCount: evalResult.totalCases,
          caseResults: (evalResult.cases || []).map((tc, idx) => ({
            id: tc.id || idx + 1,
            title: tc.title || `Test Case ${idx + 1}`,
            passed: tc.passed,
            input: tc.input || 'Class instantiation',
            expected: tc.expected || 'Expected result',
            actual: tc.actual
          })),
          output: evalResult.output
        });
      } else {
        try {
          await assessmentService.runCode(code, selectedLanguage);
        } catch (e) {
          // sandbox fallback execution
        }

        const evalResult = evaluateProblemSolution(question, code, selectedLanguage);
        setRunOutput({
          status: evalResult.status,
          passed: evalResult.allPassed,
          passedCount: evalResult.passedCount,
          totalCount: evalResult.totalCount,
          caseResults: evalResult.cases.map((tc, idx) => ({
            id: tc.id || idx + 1,
            title: tc.title || `Test Case ${idx + 1}`,
            passed: tc.passed,
            input: tc.input || 'Sample Input',
            expected: tc.expected || 'Expected Output',
            actual: tc.actual
          })),
          output: evalResult.output
        });
      }
    } catch (err) {
      const cases = question?.testCases || [{ id: 1, title: 'Sample Case 1', input: 'Sample Input', expected: 'Output verified' }];
      setRunOutput({
        status: 'Execution Error',
        passed: false,
        passedCount: 0,
        totalCount: cases.length,
        caseResults: cases.map((tc, idx) => ({
          id: tc.id || idx + 1,
          title: tc.title || `Test Case ${idx + 1}`,
          passed: false,
          input: tc.input || 'Sample Input',
          expected: tc.expected || 'Sample Expected Output',
          actual: `Execution Error: ${err.message || 'Execution failed'}`
        })),
        output: `❌ Sandbox Execution Error: ${err.message || 'Error executing test cases.'}`
      });
    } finally {
      setIsRunningCode(false);
    }
  };

  // Submit Answer handler
  const handleSubmit = () => {
    if (question?.questionType === 'mcq') {
      if (selectedOption === null) return;
      const chosenVal = question.options[selectedOption];
      onSubmit({
        answer: chosenVal,
        confidence,
        isSkipped: false
      });
    } else {
      let finalPassedCount = runOutput?.passedCount;
      if (finalPassedCount === undefined) {
        if (question?.subject === 'DBMS' || question?.supportedLanguages?.includes('sql')) {
          const sqlRes = evaluateSQLQuery(
            code,
            question?.problemStatement,
            question?.testCases,
            question?.sample_data || question?.sampleData,
            question?.expected_result || question?.expectedResult,
            question?.solution_query || question?.solutionQuery
          );
          finalPassedCount = sqlRes.passedCount;
        } else if (question?.subject === 'OOPS') {
          const oopsRes = evaluateOOPSSolution(question, code, selectedLanguage);
          finalPassedCount = oopsRes.casesPassed;
        } else {
          const evalRes = evaluateProblemSolution(question, code, selectedLanguage);
          finalPassedCount = evalRes.passedCount;
        }
      }

      onSubmit({
        answer: code,
        confidence,
        codingLanguage: selectedLanguage,
        codeSubmitted: code,
        testCasesPassed: finalPassedCount,
        isSkipped: false
      });
    }
  };

  // Skip handler
  const handleSkip = () => {
    onSkip({
      confidence,
      isSkipped: true
    });
  };

  const progressPercent = Math.round((questionNumber / totalQuestions) * 100);

  return (
    <div
      role="region"
      aria-label={`Assessment Question ${questionNumber} of ${totalQuestions}`}
      className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-300 relative overflow-hidden"
    >
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5 mb-6">
        <div className="flex items-center gap-2.5">
          <Badge variant="primary" className="text-xs font-black tracking-wider uppercase">
            {subjectName}
          </Badge>
          <span className="text-slate-300 font-light">|</span>
          <span className="text-xs font-bold text-slate-700 truncate max-w-[200px] sm:max-w-xs">
            {topicName}
          </span>
          {getDifficultyBadge(difficulty)}
        </div>

        <div className="flex items-center gap-4 text-xs font-bold">
          <span className="text-slate-500">
            Question <span className="text-slate-900 font-extrabold">{questionNumber}</span> of {totalQuestions}
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/70 text-slate-700">
            <Clock size={13} className="text-indigo-600" />
            <span className="font-mono text-xs">{formatTimer(elapsedSeconds)}</span>
          </div>
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full bg-slate-100 h-1.5 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question Prompt */}
      <div className="mb-6 space-y-2">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
          {question?.question || question?.problemStatement}
        </h2>
        {question?.constraints && question.constraints.length > 0 && (
          <div className="pt-2">
            <span className="text-xs font-bold text-slate-400 block mb-1">Constraints:</span>
            <ul className="text-xs text-slate-600 list-disc list-inside space-y-0.5">
              {question.constraints.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Question Interaction Area: MCQ vs Coding */}
      {question?.questionType === 'mcq' ? (
        <div className="space-y-3 mb-8" role="radiogroup" aria-label="Multiple choice options">
          {question?.options?.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const letter = String.fromCharCode(65 + idx);

            return (
              <button
                key={idx}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={Boolean(feedbackState) || isSubmitting}
                onClick={() => setSelectedOption(idx)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center gap-3.5 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold ring-1 ring-indigo-500 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 text-slate-700'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black transition-colors ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {letter}
                </span>
                <span className="text-sm flex-1 leading-relaxed">{option}</span>
              </button>
            );
          })}
        </div>
      ) : (
        /* Coding / Technical Editor */
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Language:</span>
              <select
                value={selectedLanguage}
                onChange={e => handleLanguageChange(e.target.value)}
                disabled={Boolean(feedbackState) || isSubmitting}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {(question?.supportedLanguages || ['cpp', 'java', 'python', 'javascript']).map(lang => (
                  <option key={lang} value={lang}>{lang.toUpperCase()}</option>
                ))}
              </select>
            </div>

            <Button
              size="sm"
              variant="secondary"
              onClick={handleRunCode}
              disabled={isRunningCode || Boolean(feedbackState) || isSubmitting}
              className="flex items-center gap-1.5 text-xs font-bold"
            >
              <Play size={12} className={isRunningCode ? 'animate-spin' : ''} />
              {isRunningCode ? 'Running...' : 'Run Code'}
            </Button>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              disabled={Boolean(feedbackState) || isSubmitting}
              className="w-full h-56 p-4 bg-slate-950 text-emerald-400 font-mono text-xs focus:outline-none resize-none leading-relaxed"
              spellCheck="false"
              placeholder="// Write your code solution here..."
            />
          </div>

          {/* Test Cases Panel */}
          {(() => {
            const cases = (question?.testCases && question.testCases.length > 0)
              ? question.testCases
              : [{ id: 1, title: 'Sample Case 1', input: 'Sample Input', expected: 'Valid Output' }];
            const activeCase = cases[activeTestCaseIndex] || cases[0];
            const activeResult = runOutput?.caseResults?.[activeTestCaseIndex];

            return (
              <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                  <div className="flex items-center gap-2">
                    <Code2 size={15} className="text-indigo-600" />
                    <span className="text-xs font-bold text-slate-800">Sample Test Cases</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                      {cases.length} {cases.length === 1 ? 'Case' : 'Cases'}
                    </span>
                  </div>

                  {runOutput && (
                    <div className="flex items-center gap-2">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                        runOutput.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {runOutput.passed ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                        {runOutput.passedCount}/{runOutput.totalCount} Passed
                      </span>
                      {runOutput.passedCount > 0 && (
                        <span className="text-[10px] font-semibold text-emerald-700 hidden sm:inline">
                          ✓ Partial / Full credit awarded
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Case Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {cases.map((tc, idx) => {
                    const isTabActive = activeTestCaseIndex === idx;
                    const tcRes = runOutput?.caseResults?.[idx];
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveTestCaseIndex(idx)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          isTabActive
                            ? 'bg-white border border-indigo-300 text-indigo-950 shadow-xs'
                            : 'bg-slate-100/90 border border-transparent text-slate-600 hover:bg-slate-200/70'
                        }`}
                      >
                        {tcRes && (
                          <span className={`w-2 h-2 rounded-full ${tcRes.passed ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        )}
                        <span>Case {idx + 1}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Case Details */}
                <div className="space-y-2.5 text-xs">
                  {activeCase.title && (
                    <div className="text-slate-500 text-[11px] font-medium">
                      Description: <span className="text-slate-700 font-semibold">{activeCase.title}</span>
                    </div>
                  )}
                  {activeCase.input && (
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 block mb-1">Input:</span>
                      <pre className="font-mono text-[11px] bg-slate-900 text-slate-200 p-2.5 rounded-xl overflow-x-auto whitespace-pre-wrap">
                        {typeof activeCase.input === 'object' ? JSON.stringify(activeCase.input) : activeCase.input}
                      </pre>
                    </div>
                  )}
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 block mb-1">Expected Output:</span>
                    <pre className="font-mono text-[11px] bg-slate-900 text-emerald-400 p-2.5 rounded-xl overflow-x-auto whitespace-pre-wrap">
                      {typeof activeCase.expected === 'object' ? JSON.stringify(activeCase.expected) : activeCase.expected}
                    </pre>
                  </div>
                  {activeResult && (
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 block mb-1">Your Execution Output:</span>
                      <pre className={`font-mono text-[11px] p-2.5 rounded-xl overflow-x-auto whitespace-pre-wrap border ${
                        activeResult.passed
                          ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                          : 'bg-rose-950/60 border-rose-800 text-rose-300'
                      }`}>
                        {activeResult.actual}
                      </pre>
                    </div>
                  )}
                </div>

                {/* Status banner */}
                {runOutput && (
                  <div className={`p-3 rounded-xl text-xs font-mono border ${
                    runOutput.passed ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}>
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      {runOutput.passed ? <CheckCircle2 size={14} className="text-emerald-600" /> : <AlertCircle size={14} className="text-rose-600" />}
                      <span>Status: {runOutput.status}</span>
                    </div>
                    <p className="font-sans text-xs whitespace-pre-line">{runOutput.output}</p>
                  </div>
                )}

                <div className="text-[11px] text-slate-500 bg-slate-100/80 rounded-xl px-3 py-2 flex items-center justify-between">
                  <span>💡 Complete the syntax and comments, then click <strong>Run Code</strong>. At least 1 passing test case awards assessment credit!</span>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Confidence Selection */}
      <div className="border-t border-slate-100 pt-5 mb-6">
        <label className="block text-xs font-bold text-slate-600 mb-2.5">
          How confident are you in this answer?
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5" role="radiogroup" aria-label="Confidence level">
          {CONFIDENCE_LEVELS.map(item => {
            const isChosen = confidence === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={isChosen}
                disabled={Boolean(feedbackState) || isSubmitting}
                onClick={() => setConfidence(item.id)}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isChosen
                    ? 'border-indigo-600 bg-indigo-50/80 text-indigo-900 ring-1 ring-indigo-500 shadow-sm'
                    : `border-slate-200/80 bg-white text-slate-600 ${item.color}`
                }`}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subtle Instant Feedback Banner */}
      {feedbackState && (
        <div
          role="status"
          aria-live="polite"
          className={`mb-6 p-4 rounded-2xl border text-xs font-bold flex items-center gap-2.5 transition-all animate-fadeIn ${
            feedbackState.type === 'correct'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : feedbackState.type === 'incorrect'
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          {feedbackState.type === 'correct' && <CheckCircle2 size={16} className="text-emerald-600" />}
          {feedbackState.type === 'incorrect' && <RotateCcw size={16} className="text-amber-600" />}
          {feedbackState.type === 'skipped' && <ArrowRight size={16} className="text-slate-600" />}
          <span>{feedbackState.message}</span>
        </div>
      )}

      {/* Actions: Skip & Submit */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={handleSkip}
          disabled={Boolean(feedbackState) || isSubmitting}
          className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors disabled:opacity-40 cursor-pointer"
        >
          Skip Question
        </button>

        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={
            Boolean(feedbackState) ||
            isSubmitting ||
            (question?.questionType === 'mcq' && selectedOption === null)
          }
          className="px-6 py-2.5 text-xs font-bold rounded-xl shadow-md flex items-center gap-2"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Submitting...</span>
            </span>
          ) : (
            <>
              <span>Submit Answer</span>
              <Sparkles size={14} />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
