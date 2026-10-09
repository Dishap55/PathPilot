import React from 'react';
import Button from './Button';

export default function ErrorState({ message = 'An unexpected error occurred', onRetry }) {
  return (
    <div className="p-6 text-center bg-rose-50 border border-rose-200 rounded-xl">
      <p className="text-sm text-rose-700 font-medium">{message}</p>
      {onRetry && (
        <Button variant="danger" size="sm" className="mt-3" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}
