import React from 'react';
import Badge from '../common/Badge';

export default function LevelStatus({ status }) {
  const map = {
    locked: { variant: 'default', text: 'Locked' },
    unlocked: { variant: 'primary', text: 'Available' },
    in_progress: { variant: 'warning', text: 'In Progress' },
    completed: { variant: 'success', text: 'Mastered' }
  };
  const s = map[status] || map.locked;
  return <Badge variant={s.variant}>{s.text}</Badge>;
}
