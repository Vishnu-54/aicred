import { Link, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { ApplicationResponse } from '../types';
import { DecisionBadge, Money, Page } from './shared';

export default function Result() {
  const location = useLocation();
  const stored = localStorage.getItem('credwise:lastResult');
  const result = (location.state as ApplicationResponse | null) ?? (stored ? JSON.parse(stored) as ApplicationResponse : null);

  if (!result) {
    return (
      <Page title="No Result Yet" eyebrow="Decision output">
        <div className="rounded-lg border border-black/10 bg-white p-8 text-center shadow-sm">
          <p className="text-ink/65">Submit an application to generate a risk decision.</p>
          <Link to="/new" className="btn-primary mt-5 inline-flex">Create application</Link>
        </div>
      </Page>
    );
  }

  return (
    <Page title="Decision Result" eyebrow="Risk intelligence" action={<Link to="/new" className="btn-primary">Run another</Link>}>
      <div className="grid gap-5 xl:grid-cols-[0.75fr_1.25fr]">
        <section className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-ink/50">{result.applicantName}</p>
              <h2 className="mt-1 text-2xl font-black"><Money value={result.requestedAmount} /></h2>
            </div>
            <DecisionBadge decision={result.decision} />
          </div>
          <div className="mx-auto mt-8 grid h-56 w-56 place-items-center rounded-full border-[22px] border-mint bg-cloud text-center shadow-inner">
            <span className="text-6xl font-black">{result.riskScore}</span>
            <span className="text-xs font-bold uppercase text-ink/50">risk score</span>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
            <Metric label="Credit score" value={result.creditScore} />
            <Metric label="Existing loans" value={result.existingLoans} />
            <Metric label="Missed EMIs" value={result.missedEmi} />
            <Metric label="Tenure" value={`${result.tenureMonths} mo`} />
          </div>
        </section>
        <section className="grid gap-5">
          <Panel title="AI Explanation"><p className="leading-7 text-ink/70">{result.explanation}</p></Panel>
          <Panel title="Decision Reasons">
            <ul className="grid gap-3">
              {result.reasons.map((reason) => <li key={reason} className="rounded-lg bg-cloud p-4 text-sm font-semibold text-ink/72">{reason}</li>)}
            </ul>
          </Panel>
          <Panel title="Fraud Flags">
            {result.fraudFlags.length ? (
              <ul className="grid gap-3">{result.fraudFlags.map((flag) => <li key={flag} className="rounded-lg bg-coral/10 p-4 text-sm font-semibold text-coral">{flag}</li>)}</ul>
            ) : (
              <p className="rounded-lg bg-mint/10 p-4 text-sm font-semibold text-mint">No fraud flags triggered.</p>
            )}
          </Panel>
          <Panel title="Suggested Actions">
            <div className="grid gap-3 sm:grid-cols-3">
              {['Verify income documents', 'Check active loan statements', 'Review bureau tradelines'].map((item) => (
                <div key={item} className="rounded-lg border border-black/10 p-4 text-sm font-bold">{item}</div>
              ))}
            </div>
          </Panel>
        </section>
      </div>
    </Page>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return <div className="rounded-lg bg-cloud p-4"><p className="text-xs font-bold uppercase text-ink/45">{label}</p><p className="mt-1 font-black">{value}</p></div>;
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm"><h2 className="mb-4 text-lg font-black">{title}</h2>{children}</section>;
}
