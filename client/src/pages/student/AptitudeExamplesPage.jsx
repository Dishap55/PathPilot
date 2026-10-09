// src/pages/student/AptitudeExamplesPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getAptitudeTopic } from '../../data/aptitudeTopicDataRegistry';
import { getExamplesByTopic } from '../../data/aptitudeExamplesRegistry';
import Badge from '../../components/common/Badge';

/**
 * Aptitude Problem Examples Page
 * Displays topic‑specific step‑by‑step examples.
 */
export default function AptitudeExamplesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const topicParam = searchParams.get('topic') || 'percentages';

  const topic = useMemo(() => getAptitudeTopic(topicParam), [topicParam]);
  const examples = useMemo(() => getExamplesByTopic(topicParam), [topicParam]);

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (examples.length && activeIdx >= examples.length) setActiveIdx(0);
  }, [examples, activeIdx]);

  if (!topic) return null;
  const example = examples[activeIdx] || {};

  return (
    <div className="w-full min-h-screen bg-[#F4EFE8] p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto space-y-2">
        <h1 className="text-2xl font-bold text-[#293247]">
          {topic.topicName} – Problem Examples
        </h1>
        <p className="text-sm text-[#667085]">
          Learn how to solve common placement questions step by step.
        </p>
      </div>

      {/* Example selector */}
      <div className="max-w-5xl mx-auto flex flex-wrap gap-2">
        {examples.map((ex, i) => (
          <button
            key={ex.id}
            onClick={() => setActiveIdx(i)}
            className={`px-3 py-1 text-xs rounded ${i === activeIdx ? 'bg-[#6574C4] text-white' : 'bg-[#FFF8EE] text-[#667085] hover:bg-[#EDE9F6]'}`}
          >
            Example {i + 1}
          </button>
        ))}
      </div>

      {/* Example Card */}
      {example && (
        <div className="max-w-5xl mx-auto bg-[#FFF8EE] rounded-2xl shadow-md p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left – Text */}
          <div className="space-y-4">
            <section>
              <h2 className="text-sm font-semibold text-[#6574C4]">QUESTION</h2>
              <p className="text-sm text-[#293247] mt-1">{example.question}</p>
            </section>
            <section>
              <h2 className="text-sm font-semibold text-[#6574C4]">GIVEN</h2>
              <ul className="list-disc list-inside text-sm text-[#293247] mt-1">
                {Object.entries(example.given || {}).map(([k, v]) => (
                  <li key={k}>{k.toUpperCase()}: {v}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="text-sm font-semibold text-[#6574C4]">FIND</h2>
              <p className="text-sm text-[#293247] mt-1">{example.find}</p>
            </section>
            <section>
              <div className="inline-block bg-[#E8EFF8] text-[#3E5575] border border-[#CAD9EA] px-2 py-1 rounded-md text-sm">
                💡 KEY CONCEPT
              </div>
              <p className="mt-2 text-sm text-[#293247] font-medium border-l-4 border-[#6574C4] pl-2">{example.formula}</p>
            </section>
            {/* Steps */}
            <section className="space-y-3">
              {example.steps?.map((step, idx) => (
                <div key={idx} className="border border-[#D9D1C7] rounded p-3">
                  <h3 className="text-xs font-bold text-[#6574C4]">STEP {idx + 1}: {step.heading}</h3>
                  {step.expression && <p className="text-xs text-[#667085] mt-1">{step.expression}</p>}
                  {step.calculation && <p className="text-sm font-medium text-[#293247] mt-1">= {step.calculation}</p>}
                </div>
              ))}
            </section>
            <section>
              <h2 className="text-sm font-semibold text-[#6574C4]">FINAL ANSWER</h2>
              <p className="text-xl font-bold text-[#293247] mt-1">{example.answer}</p>
            </section>
            {example.fastMethod && (
              <section className="border-t border-[#D9D1C7] pt-4">
                <h2 className="text-sm font-semibold text-[#6574C4]">⚡ FAST METHOD</h2>
                <p className="text-sm text-[#293247] mt-1"><strong>Why it works?</strong> {example.fastMethod.explanation}</p>
                <pre className="bg-[#E8EFF8] p-2 rounded text-sm mt-2 whitespace-pre-wrap">{example.fastMethod.computation}</pre>
              </section>
            )}
          </div>
          {/* Right – Visual placeholder */}
          <div className="flex items-center justify-center bg-[#EDE9F6] rounded">
            <span className="text-sm text-[#667085]">[Visual: {example.visual}]</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="max-w-5xl mx-auto flex items-center justify-between mt-4 text-sm text-[#667085]">
        <button onClick={() => setActiveIdx(i => Math.max(i - 1, 0))} disabled={activeIdx === 0} className="flex items-center gap-1 disabled:opacity-50"><ArrowLeft size={14} /> Previous Example</button>
        <span>Example {activeIdx + 1} / {examples.length}</span>
        <button onClick={() => setActiveIdx(i => Math.min(i + 1, examples.length - 1))} disabled={activeIdx === examples.length - 1} className="flex items-center gap-1 disabled:opacity-50">Next Example <ArrowRight size={14} /></button>
      </div>

      {/* Back link */}
      <div className="max-w-5xl mx-auto mt-6">
        <Link to={`/aptitude?topic=${topicParam}`} className="text-indigo-600 hover:underline">← Back to {topic.topicName} Learning</Link>
      </div>
    </div>
  );
}
