import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { ApplicationResponse, DashboardSummary } from '../types';
import { DecisionBadge, Money, Page, SkeletonCard } from './shared';

export default function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [apps, setApps] = useState<ApplicationResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getSummary(), api.getApplications()])
      .then(([summaryData, applicationData]) => {
        setSummary(summaryData);
        setApps(applicationData);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Page title="Credit Command Center" eyebrow="Portfolio overview" action={<Link to="/new" className="btn-primary">New application</Link>}>
      {loading || !summary ? (
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          <Stat label="Applications" value={summary.totalApplications} />
          <Stat label="Approved" value={summary.approved} tone="text-mint" />
          <Stat label="Review" value={summary.review} tone="text-gold" />
          <Stat label="Rejected" value={summary.rejected} tone="text-coral" />
          <Stat label="Fraud alerts" value={summary.fraudAlerts} tone="text-coral" />
          <Stat label="Avg risk score" value={summary.avgRiskScore} />
        </div>
      )}

      <section className="mt-6 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black">Approval Flow</h2>
            <span className="text-xs font-bold text-ink/50">Last 30 days</span>
          </div>
          <div className="mt-6 flex h-64 items-end gap-4">
            {[52, 68, 61, 74, 80, 72, 88, 76].map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-lg bg-mint/15 p-1">
                  <div className="rounded-md bg-mint" style={{ height: `${height * 2}px` }} />
                </div>
                <span className="text-xs font-bold text-ink/45">W{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black">Risk Mix</h2>
          <div className="mt-8 grid place-items-center">
            <div className="grid h-44 w-44 place-items-center rounded-full border-[18px] border-mint bg-cloud text-center shadow-inner">
              <span className="text-4xl font-black">{summary?.avgRiskScore ?? 74}</span>
              <span className="text-xs font-bold uppercase text-ink/50">avg score</span>
            </div>
          </div>
          <p className="mt-6 text-sm leading-6 text-ink/62">Portfolio health is stable, with manual review concentrated around high request-to-income applications.</p>
        </div>
      </section>

      <section className="mt-6 rounded-lg border border-black/10 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black">Recent Applications</h2>
          <Link to="/history" className="text-sm font-bold text-reef">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="text-xs uppercase text-ink/45">
              <tr><th className="py-3">Applicant</th><th>Purpose</th><th>Amount</th><th>Score</th><th>Decision</th></tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {apps.slice(0, 5).map((app) => (
                <tr key={app.id}>
                  <td className="py-4 font-bold">{app.applicantName}</td>
                  <td>{app.loanPurpose}</td>
                  <td><Money value={app.requestedAmount} /></td>
                  <td className="font-black">{app.riskScore}</td>
                  <td><DecisionBadge decision={app.decision} /></td>
                </tr>
              ))}
              {!apps.length && <tr><td colSpan={5} className="py-10 text-center text-ink/55">No applications yet. Create one to populate the table.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </Page>
  );
}

function Stat({ label, value, tone = 'text-ink' }: { label: string; value: number; tone?: string }) {
  return (
    <article className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase text-ink/45">{label}</p>
      <p className={`mt-3 text-3xl font-black ${tone}`}>{value}</p>
    </article>
  );
}
