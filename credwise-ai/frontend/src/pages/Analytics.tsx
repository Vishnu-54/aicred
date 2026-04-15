import { Page } from './shared';

const segments = [
  ['Prime', 82, 'Low default risk, strong bureau signals'],
  ['Near Prime', 64, 'Good approvals with pricing review'],
  ['Thin File', 31, 'Needs document and cashflow checks'],
  ['High Risk', 18, 'Manual review and fraud controls']
];

export default function Analytics() {
  return (
    <Page title="Risk Analytics" eyebrow="Portfolio intelligence">
      <div className="grid gap-5 xl:grid-cols-[1fr_0.8fr]">
        <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black">Score Distribution</h2>
          <div className="mt-7 grid gap-4">
            {segments.map(([label, score, note]) => (
              <div key={label}>
                <div className="mb-2 flex justify-between text-sm"><span className="font-black">{label}</span><span className="text-ink/55">{score}% confidence</span></div>
                <div className="h-4 rounded-lg bg-cloud"><div className="h-4 rounded-lg bg-mint" style={{ width: `${score}%` }} /></div>
                <p className="mt-2 text-xs font-semibold text-ink/55">{note}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black">Model Signals</h2>
          <div className="mt-5 grid gap-3">
            {['Credit bureau score', 'Loan-to-income ratio', 'Active obligations', 'Missed EMI behavior', 'Request velocity'].map((item, index) => (
              <div key={item} className="flex items-center justify-between rounded-lg bg-cloud p-4">
                <span className="font-bold">{item}</span>
                <span className="rounded-lg bg-white px-3 py-1 text-xs font-black text-reef">{92 - index * 7}% weight</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Page>
  );
}
