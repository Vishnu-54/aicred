import { useAuth } from '../auth/AuthContext';
import { Page } from './shared';

export default function Settings() {
  const { user } = useAuth();

  return (
    <Page title="Workspace Settings" eyebrow="Demo controls">
      <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black">Signed in user</h2>
          <div className="mt-5 grid gap-3 text-sm">
            <Row label="Username" value={user?.username ?? '-'} />
            <Row label="Role" value={user?.role ?? '-'} />
            <Row label="Institution" value={user?.institution ?? '-'} />
          </div>
        </section>
        <section className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black">Approval Policy</h2>
          <div className="mt-5 grid gap-3">
            {['Auto approve score above 72 with no fraud flags', 'Manual review any fraud indicator', 'Reject score below 45 or 3+ fraud flags', 'Require income verification for high request ratios'].map((policy) => (
              <div key={policy} className="rounded-lg bg-cloud p-4 text-sm font-bold text-ink/70">{policy}</div>
            ))}
          </div>
        </section>
      </div>
    </Page>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between rounded-lg bg-cloud p-4"><span className="font-bold text-ink/50">{label}</span><span className="font-black">{value}</span></div>;
}
