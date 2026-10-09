import React from 'react';
import Button from '../common/Button';
import { Check } from 'lucide-react';

export default function SubmitButton({ onClick, loading }) {
  return (
    <Button variant="primary" size="sm" onClick={onClick} disabled={loading} className="gap-1.5">
      <Check size={14} />
      <span>{loading ? 'Submitting...' : 'Submit Solution'}</span>
    </Button>
  );
}
