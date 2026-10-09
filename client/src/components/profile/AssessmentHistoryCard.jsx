import React, { useEffect, useState } from 'react';
import { assessmentService } from '../../services/assessmentService';

function formatDate(value) {
  if (!value) return 'Date unavailable';
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return 'Date unavailable';
  return parsed.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

function formatTime(seconds) {
  if (seconds == null || !Number.isFinite(Number(seconds))) return 'Time unavailable';
  const value = Number(seconds);
  const minutes = Math.floor(value / 60);
  const remainder = value % 60;
  return minutes ? `${minutes}m ${remainder}s` : `${remainder}s`;
}

function displayType(value) {
  if (value === 'initial') return 'Initial Assessment';
  if (value === 'periodic') return 'Periodic Assessment';
  return value || 'Assessment type unavailable';
}

function SubjectHistory({ label, result }) {
  if (!result) return null;

  const accuracy = result.accuracy ?? result.overallAccuracy;
  const confidence = result.confidenceSummary?.patternDescription;
  const strengths = Array.isArray(result.strengths) ? result.strengths : [];
  const focusAreas = Array.isArray(result.focusAreas) ? result.focusAreas : [];

  return (
    <section className="theme-surface-secondary rounded-xl border p-3 space-y-2" aria-label={`${label} assessment result`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="font-bold">{label}</h4>
        <span className="text-sm">Current assessed level: <strong>{result.assessedLevel || 'Unavailable'}</strong></span>
      </div>
      <p className="theme-copy text-sm">
        Starting level: {result.startingLevel || 'Unavailable'}
        {' · '}
        Accuracy: {accuracy == null ? 'Unavailable' : `${accuracy}%`}
        {' · '}
        Questions attempted: {result.attemptedQuestions ?? 'Unavailable'}
      </p>
      <p className="theme-copy text-sm">Confidence: {confidence || 'Unavailable in this record'}</p>
      {strengths.length > 0 && <p className="theme-copy text-sm"><strong>Strengths:</strong> {strengths.join(', ')}</p>}
      {focusAreas.length > 0 && <p className="theme-copy text-sm"><strong>Focus areas:</strong> {focusAreas.join(', ')}</p>}
    </section>
  );
}

export default function AssessmentHistoryCard() {
  const [state, setState] = useState({ status: 'loading', attempts: [] });

  useEffect(() => {
    let active = true;
    assessmentService.getAssessmentHistory()
      .then((response) => {
        if (!active) return;
        const data = response?.data || response || {};
        setState({ status: 'loaded', attempts: Array.isArray(data.attempts) ? data.attempts : [] });
      })
      .catch((error) => {
        console.warn('[Profile] Assessment history is unavailable:', error.message);
        if (active) setState({ status: 'error', attempts: [] });
      });

    return () => { active = false; };
  }, []);

  return (
    <section aria-labelledby="assessment-history-heading" className="space-y-3">
      <div>
        <h3 id="assessment-history-heading" className="text-sm font-extrabold">Assessment History</h3>
        <p className="theme-copy mt-1 text-sm">Completed assessment records saved to your account.</p>
      </div>

      {state.status === 'loading' && <p className="theme-copy text-sm" role="status">Loading assessment history…</p>}
      {state.status === 'error' && <p className="theme-copy text-sm" role="status">Assessment history is temporarily unavailable.</p>}
      {state.status === 'loaded' && state.attempts.length === 0 && (
        <p className="theme-copy rounded-xl border p-4 text-sm">No completed assessments are recorded yet.</p>
      )}

      {state.status === 'loaded' && state.attempts.length === 1 && (
        <p className="theme-copy rounded-xl border p-4 text-sm">Baseline established — take another assessment to measure improvement.</p>
      )}

      {state.status === 'loaded' && state.attempts.length > 0 && (
        <div className="space-y-3">
          {state.attempts.map((attempt) => {
            const subjects = attempt.subjectResults || {};
            return (
              <details key={attempt.assessmentId} className="theme-surface-secondary rounded-xl border p-4">
                <summary className="cursor-pointer list-none">
                  <span className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold">{displayType(attempt.assessmentType)} · Attempt {attempt.attemptNumber ?? 'unavailable'}</span>
                    <span className="theme-copy text-sm">{formatDate(attempt.completedAt)}</span>
                  </span>
                </summary>
                <div className="mt-4 space-y-3">
                  <p className="theme-copy text-sm">Total time: {formatTime(attempt.overallTimeSeconds)}</p>
                  <div className="break-all text-xs theme-copy">
                    Assessment ID: <code>{attempt.assessmentId || 'Unavailable'}</code>
                  </div>
                  <SubjectHistory label="DSA" result={subjects.dsaResult} />
                  <SubjectHistory label="Aptitude" result={subjects.aptitudeResult} />
                  {!subjects.dsaResult && !subjects.aptitudeResult && (
                    <p className="theme-copy text-sm">Subject result details are unavailable in this record.</p>
                  )}
                </div>
              </details>
            );
          })}
        </div>
      )}
    </section>
  );
}
