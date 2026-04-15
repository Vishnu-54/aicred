import { ReactNode } from 'react';
import { Decision } from '../types';

export function Page({ title, eyebrow, action, children }: { title: string; eyebrow: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="px-5 py-7 lg:px-8">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase text-reef">{eyebrow}</p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">{title}</h1>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

export function DecisionBadge({ decision }: { decision: Decision }) {
  const styles: Record<Decision, string> = {
    APPROVED: 'bg-mint/12 text-mint border-mint/25',
    REVIEW: 'bg-gold/15 text-gold border-gold/25',
    REJECTED: 'bg-coral/12 text-coral border-coral/25'
  };
  return <span className={`inline-flex rounded-lg border px-3 py-1 text-xs font-black ${styles[decision]}`}>{decision}</span>;
}

export function Money({ value }: { value: number }) {
  return <>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)}</>;
}

export function SkeletonCard() {
  return <div className="h-28 animate-pulse rounded-lg border border-black/10 bg-white shadow-sm" />;
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-ink/70">{label}</span>
      {children}
    </label>
  );
}

export const inputClass = 'h-12 rounded-lg border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-mint focus:ring-4 focus:ring-mint/15';
