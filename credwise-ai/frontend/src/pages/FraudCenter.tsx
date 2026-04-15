import { Page } from './shared';

export default function FraudCenter() {
  const rules = [
    ['High request vs salary', 'Flags applications where loan demand exceeds income comfort bands.', 'Active'],
    ['Too many loans', 'Highlights stacked debt obligations before approval.', 'Active'],
    ['Repeated defaults', 'Escalates borrowers with repeated missed EMI behavior.', 'Active'],
    ['Low score + high request', 'Catches aggressive requests paired with weak bureau signals.', 'Active']
  ];

  return (
    <Page title="Fraud Center" eyebrow="Rules and escalations">
      <div className="grid gap-5 lg:grid-cols-4">
        {['5 Open alerts', '2 High priority', '14 Cleared', '98% Rule uptime'].map((item) => (
          <div key={item} className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
            <p className="text-2xl font-black">{item.split(' ')[0]}</p>
            <p className="mt-2 text-sm font-bold text-ink/55">{item.substring(item.indexOf(' ') + 1)}</p>
          </div>
        ))}
      </div>
      <section className="mt-5 rounded-lg border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-black">Detection Rules</h2>
        <div className="mt-5 grid gap-3">
          {rules.map(([title, body, status]) => (
            <article key={title} className="grid gap-3 rounded-lg bg-cloud p-4 md:grid-cols-[1fr_2fr_auto] md:items-center">
              <h3 className="font-black">{title}</h3>
              <p className="text-sm text-ink/62">{body}</p>
              <span className="rounded-lg bg-mint/12 px-3 py-1 text-xs font-black text-mint">{status}</span>
            </article>
          ))}
        </div>
      </section>
    </Page>
  );
}
