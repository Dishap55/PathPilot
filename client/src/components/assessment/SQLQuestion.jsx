import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import { assessmentService } from '../../services/assessmentService';
import { Database, Play, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function SQLQuestion({ question, query, onChange }) {
  const getInitialQuery = () => {
    if (question?.starterCode && typeof question.starterCode === 'object') {
      return question.starterCode['sql'] || '-- Write your SQL query here;\n';
    }
    if (question?.starter_query && typeof question.starter_query === 'object') {
      return question.starter_query['sql'] || '-- Write your SQL query here;\n';
    }
    return question?.starterCode || question?.starter_query || '-- Write your SQL query here;\n';
  };

  const [currentQuery, setCurrentQuery] = useState(query || getInitialQuery());
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (query !== undefined) {
      setCurrentQuery(query);
    } else {
      setCurrentQuery(getInitialQuery());
    }
  }, [query, question]);

  const handleQueryChange = (val) => {
    setCurrentQuery(val);
    if (onChange) {
      onChange(val);
    }
  };

  const handleExecute = async () => {
    setIsRunning(true);
    setOutput(null);

    try {
      const response = await assessmentService.runSql(currentQuery, question?.schema_context);
      if (response.success && response.result) {
        setOutput(response.result);
      } else {
        setOutput({ status: 'Error', error_message: 'Execution failed.' });
      }
    } catch (err) {
      setOutput({ status: 'Error', error_message: err.message || 'Sandbox error.' });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md flex items-center gap-1.5">
            <Database size={13} />
            DBMS SQL Sandbox Challenge
          </span>
          <span className="text-xs text-slate-500 font-medium">Topic: {question?.topic || 'Relational Queries'}</span>
        </div>
        <p className="text-sm font-medium text-slate-800 leading-relaxed whitespace-pre-line">{question?.prompt}</p>

        {question?.schema_context && (
          <div className="mt-3 p-2.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-600 whitespace-pre">
            {question.schema_context}
          </div>
        )}
      </div>

      <div className="border border-slate-300 rounded-xl overflow-hidden bg-white shadow-sm">
        <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex justify-between items-center text-xs text-slate-600 font-mono">
          <span>SQL Query Console (Controlled Read-Only Sandbox)</span>
          <Button
            size="sm"
            variant="primary"
            onClick={handleExecute}
            disabled={isRunning}
            className="flex items-center gap-1"
          >
            <Play size={12} className={isRunning ? 'animate-spin' : ''} />
            {isRunning ? 'Running...' : 'Run Query'}
          </Button>
        </div>
        <textarea
          value={currentQuery}
          onChange={e => handleQueryChange(e.target.value)}
          className="w-full h-32 p-3 font-mono text-xs text-slate-800 focus:outline-none resize-none"
          spellCheck="false"
        />
      </div>

      {output && (
        <div className={`p-4 rounded-xl border text-xs font-mono ${
          output.passed ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900'
        }`}>
          <div className="flex items-center gap-2 mb-2 font-bold">
            {output.passed ? <CheckCircle2 size={16} className="text-emerald-600" /> : <AlertCircle size={16} className="text-red-600" />}
            <span>Status: {output.status} ({output.execution_ms}ms)</span>
          </div>

          {output.error_message && (
            <p className="text-red-700 mb-2 font-sans text-xs">{output.error_message}</p>
          )}

          {!output.passed && (
            <div className="mb-2">
              <p className="text-red-700 font-sans text-xs font-semibold">❌ This test case has not been passed.</p>
              {question?.hint && (
                <p className="text-amber-700 font-sans text-xs mt-1">💡 Hint: {question.hint}</p>
              )}
            </div>
          )}

          {output.result && Array.isArray(output.result) && output.result.length > 0 && (
            <div className="overflow-x-auto mt-2">
              <table className="min-w-full divide-y divide-emerald-200 text-left">
                <thead>
                  <tr>
                    {Object.keys(output.result[0]).map(k => (
                      <th key={k} className="px-2 py-1 font-semibold text-emerald-900">{k}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-100">
                  {output.result.map((row, idx) => (
                    <tr key={idx}>
                      {Object.values(row).map((v, i) => (
                        <td key={i} className="px-2 py-1">{String(v)}</td>
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
  );
}
