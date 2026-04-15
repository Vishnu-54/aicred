import { useEffect, useMemo, useState } from 'react';
import { api } from '../api';
import { ApplicationResponse, Decision } from '../types';
import { DecisionBadge, Money, Page } from './shared';

export default function History() {
  const [apps, setApps] = useState<ApplicationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [decision, setDecision] = useState<'ALL' | Decision>('ALL');

  useEffect(() => {
    api.getApplications()
      .then(setApps)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return apps.filter((app) => {
      const matchesText = `${app.applicantName} ${app.email} ${app.loanPurpose}`.toLowerCase().includes(query.toLowerCase());
      const matchesDecision = decision === 'ALL' || app.decision === decision;
      return matchesText && matchesDecision;
    });
  }, [apps, query, decision]);

  return (
    <Page title="Application History" eyebrow="Audit trail">
      <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input className="h-12 flex-1 rounded-lg border border-black/10 px-4 outline-none focus:border-mint focus:ring-4 focus:ring-mint/15" placeholder="Search applicant, email, or purpose" value={query} onChange={(e) => setQuery(e.target.value)} />
          <select className="h-12 rounded-lg border border-black/10 px-4 outline-none focus:border-mint focus:ring-4 focus:ring-mint/15" value={decision} onChange={(e) => setDecision(e.target.value as 'ALL' | Decision)}>
            <option value="ALL">All decisions</option>
            <option value="APPROVED">Approved</option>
            <option value="REVIEW">Review</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="text-xs uppercase text-ink/45">
              <tr><th className="py-3">Applicant</th><th>Email</th><th>Purpose</th><th>Amount</th><th>Score</th><th>Flags</th><th>Decision</th><th>Date</th></tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {loading && <tr><td colSpan={8} className="py-10 text-center text-ink/55">Loading applications...</td></tr>}
              {!loading && filtered.map((app) => (
                <tr key={app.id} className="transition hover:bg-cloud">
                  <td className="py-4 font-black">{app.applicantName}</td>
                  <td>{app.email}</td>
                  <td>{app.loanPurpose}</td>
                  <td><Money value={app.requestedAmount} /></td>
                  <td className="font-black">{app.riskScore}</td>
                  <td>{app.fraudFlags.length}</td>
                  <td><DecisionBadge decision={app.decision} /></td>
                  <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {!loading && !filtered.length && (
                <tr><td colSpan={8} className="py-10 text-center text-ink/55">No matching applications found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </Page>
  );
}
