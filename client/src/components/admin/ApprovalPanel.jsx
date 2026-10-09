import React from 'react';
import Button from '../common/Button';

export default function ApprovalPanel({ draft, onApprove, onReject }) {
  if (!draft) return null;
  return (
    <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="text-xs font-bold text-amber-900 uppercase">Review AI Draft</h4>
        <span className="text-[10px] bg-amber-200 text-amber-800 px-2 py-0.5 rounded font-mono">Pending Approval</span>
      </div>
      <p className="text-xs text-amber-950 font-medium">{draft.prompt}</p>
      <div className="flex gap-2 justify-end">
        <Button size="sm" variant="secondary" onClick={onReject}>Reject</Button>
        <Button size="sm" variant="primary" onClick={onApprove}>Approve & Persist</Button>
      </div>
    </div>
  );
}
