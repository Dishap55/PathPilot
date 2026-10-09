import React, { useState, useEffect } from 'react';
import CodeEditor from '../editors/CodeEditor';
import OutputPanel from '../editors/OutputPanel';
import Button from '../common/Button';
import { assessmentService } from '../../services/assessmentService';
import { evaluateProblemSolution } from '../../utils/codeEvaluator';
import { Play, CheckCircle2, XCircle } from 'lucide-react';

export default function CodingQuestion({ question, code, onChange, preferredLanguage }) {
  const [activeLang, setActiveLang] = useState((preferredLanguage || question?.language || 'cpp').toLowerCase());

  const supportedLanguages = question?.supportedLanguages || (question?.subject === 'DBMS' ? ['sql'] : ['cpp', 'java', 'python', 'javascript']);

  const resolveStarter = (targetLang) => {
    const l = (targetLang || 'cpp').toLowerCase().trim();
    const starterObj = question?.starterCode || question?.starter_code;
    if (!starterObj) return '// Write your solution here\n';
    if (typeof starterObj === 'string') return starterObj;

    for (const [k, v] of Object.entries(starterObj)) {
      const key = k.toLowerCase().trim();
      if (key === l) return v;
      if ((l === 'cpp' || l === 'c++') && (key === 'cpp' || key === 'c++')) return v;
      if (l === 'java' && key === 'java') return v;
      if ((l === 'python' || l === 'py') && (key === 'python' || key === 'py')) return v;
      if ((l === 'javascript' || l === 'js') && (key === 'javascript' || key === 'js')) return v;
      if (l === 'sql' && key === 'sql') return v;
    }
    return Object.values(starterObj)[0] || '// Write your solution here\n';
  };

  const [currentCode, setCurrentCode] = useState(code || resolveStarter(activeLang));
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (code !== undefined) {
      setCurrentCode(code);
    } else {
      setCurrentCode(resolveStarter(activeLang));
    }
  }, [code, question]);

  const handleLanguageChange = (newLang) => {
    setActiveLang(newLang);
    const newStarter = resolveStarter(newLang);
    setCurrentCode(newStarter);
    if (onChange) {
      onChange(newStarter);
    }
  };

  const handleCodeChange = (newCode) => {
    setCurrentCode(newCode);
    if (onChange) {
      onChange(newCode);
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Running test suite in execution sandbox...');

    try {
      const evalResult = evaluateProblemSolution(
        question,
        currentCode,
        activeLang
      );

      try {
        await assessmentService.runCode(
          currentCode,
          activeLang
        );
      } catch (e) {}

      const isPassed = evalResult.allPassed;
      const status = evalResult.status;

      let msg = `${status}: ${isPassed ? 'All test cases passed' : 'Output mismatch or compilation error'}\n`;
      msg += `Passed: ${evalResult.passedCount}/${evalResult.totalCount} test cases.\n\n`;

      evalResult.cases.forEach((tc, idx) => {
        msg += `[Test Case ${idx + 1}] ${tc.title || 'Case'}:\n`;
        msg += `  Input:    ${tc.input}\n`;
        msg += `  Expected: ${tc.expected}\n`;
        msg += `  Actual:   ${tc.actual}\n`;
        msg += `  Verdict:  ${tc.passed ? '✓ PASSED' : '❌ FAILED'}\n\n`;
      });

      if (!isPassed) {
        msg += `❌ Test cases have not been passed.`;
        if (question?.hint) {
          msg += `\n💡 Hint: ${question.hint}`;
        }
      }

      setOutput(msg.trim());
    } catch (err) {
      setOutput(`Execution Error: ${err.message || 'Sandbox error'}`);
    } finally {
      setIsRunning(false);
    }
  };

  const getExtension = (lang) => {
    const l = (lang || '').toLowerCase();
    if (l === 'python' || l === 'py') return 'py';
    if (l === 'java') return 'java';
    if (l === 'javascript' || l === 'js') return 'js';
    if (l === 'sql') return 'sql';
    return 'cpp';
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            DSA Coding Challenge ({activeLang.toUpperCase()})
          </span>
          <span className="text-xs text-slate-500 font-medium">Topic: {question?.topic || 'Algorithms'}</span>
        </div>
        <p className="text-sm font-medium text-slate-800 leading-relaxed whitespace-pre-line">{question?.prompt}</p>
      </div>

      <div className="border border-slate-700 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-slate-800 px-4 py-2 text-xs text-slate-300 font-mono flex items-center justify-between">
          <span>solution.{getExtension(activeLang)}</span>
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Language:</span>
            <select
              value={activeLang}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-slate-900 text-indigo-300 text-xs font-mono font-bold rounded px-2 py-0.5 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-400 cursor-pointer"
            >
              {supportedLanguages.map((l) => (
                <option key={l} value={l} className="bg-slate-900 text-white font-mono">
                  {l.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
        <textarea
          value={currentCode}
          onChange={e => handleCodeChange(e.target.value)}
          className="w-full h-64 p-4 bg-slate-900 text-slate-100 font-mono text-xs focus:outline-none resize-none"
          spellCheck="false"
        />
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleRun}
          disabled={isRunning}
          className="flex items-center gap-1.5"
        >
          <Play size={14} className={isRunning ? 'animate-spin' : ''} />
          {isRunning ? 'Running Code...' : 'Run Test Cases'}
        </Button>
      </div>

      {output && <OutputPanel output={output} />}
    </div>
  );
}
