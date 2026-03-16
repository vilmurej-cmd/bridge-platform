'use client';

import { useState, useEffect } from 'react';
import { getPartnershipsCount } from '@/lib/storage';

export default function CommunityCounter() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(247);

  useEffect(() => {
    setTarget(getPartnershipsCount());
  }, []);

  useEffect(() => {
    if (count >= target) return;
    const step = Math.max(1, Math.floor((target - count) / 20));
    const timer = setTimeout(() => setCount(prev => Math.min(prev + step, target)), 50);
    return () => clearTimeout(timer);
  }, [count, target]);

  return (
    <div className="text-center">
      <p className="text-5xl md:text-6xl font-bold text-gradient-partnership font-serif">
        {count.toLocaleString()}
      </p>
      <p className="text-secondary mt-2">partnerships started</p>
    </div>
  );
}
