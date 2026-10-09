import React from 'react';
import Button from '../common/Button';
import { Play } from 'lucide-react';

export default function RunButton({ onClick, loading }) {
  return (
    <Button variant="secondary" size="sm" onClick={onClick} disabled={loading} className="gap-1.5">
      <Play size={14} />
      <span>{loading ? 'Running...' : 'Run Code'}</span>
    </Button>
  );
}
