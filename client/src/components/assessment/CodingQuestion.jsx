import React, { useState, useEffect } from 'react';
import CodeEditor from '../editors/CodeEditor';
import OutputPanel from '../editors/OutputPanel';
import Button from '../common/Button';
import { assessmentService } from '../../services/assessmentService';
import { Play, CheckCircle2, XCircle } from 'lucide-react';

export default function CodingQuestion({ question, code, onChange, preferredLanguage }) {
  const lang = (preferredLanguage || question?.language || 'cpp').toLowerCase();

  const getInitialCode = () => {
    if (question?.starterCode && typeof question.starterCode === 'object') {
      return question.starterCode[lang] || question.starterCode['cpp'] || '// Write your solution here\n';
    }
    if (question?.starter_code && typeof question.starter_code === 'object') {
      return question.starter_code[lang] || question.starter_code['cpp'] || '// Write your solution here\n';
    }
    return question?.starterCode || question?.starter_code || '// Write your solution here\n';
  };

  const [currentCode, setCurrentCode] = useState(code || getInitialCode());
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (code !== undefined) {
      setCurrentCode(code);
    } else {
      setCurrentCode(getInitialCode());
    }
  }, [code, question, preferredLanguage]);

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
      const response = await assessmentService.runCode(
        currentCode,
        preferredLanguage || question?.language || 'C++'
      );

      if (response.success && response.result) {
        const r = response.result;
        let msg = `${r.status}: ${r.passed ? 'All test cases passed' : 'Output mismatch'}\nRuntime: ${r.runtime_ms}ms | Memory: ${r.memory_kb}KB\n\n${r.stdout || ''}\n${r.stderr || ''}`;
        
        if (!r.passed) {
          msg += `\n\n❌ This test case has not been passed.`;
          if (question?.hint) {
            msg += `\n💡 Hint: ${question.hint}`;
          }
        }
        
        setOutput(msg.trim());
      } else {
        setOutput('Execution finished with status: Evaluated');
      }
    } catch (err) {
      setOutput(`Execution Error: ${err.message || 'Sandbox error'}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            DSA Coding Challenge ({preferredLanguage || question?.language || 'C++'})
          </span>
          <span className="text-xs text-slate-500 font-medium">Topic: {question?.topic || 'Algorithms'}</span>
        </div>
        <p className="text-sm font-medium text-slate-800 leading-relaxed whitespace-pre-line">{question?.prompt}</p>
      </div>

      <div className="border border-slate-700 rounded-xl overflow-hidden shadow-sm">
        <div className="bg-slate-800 px-4 py-2 text-xs text-slate-300 font-mono flex items-center justify-between">
          <span>solution.{preferredLanguage === 'Python' ? 'py' : preferredLanguage === 'Java' ? 'java' : preferredLanguage === 'C' ? 'c' : preferredLanguage === 'JavaScript' ? 'js' : 'cpp'}</span>
          <span>{preferredLanguage || question?.language || 'C++'}</span>
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
