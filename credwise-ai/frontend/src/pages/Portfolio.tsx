import { Page } from './shared';

export default function Portfolio() {
  return (
    <Page title="Portfolio Health" eyebrow="Lender performance">
      <div className="grid gap-5 xl:grid-cols-3">
        {[
          ['Approval velocity', '18 min', 'Median time from intake to decision'],
          ['Expected loss', '2.8%', 'Mock estimate across current portfolio'],
          ['Manual review load', '23%', 'Applications routed to analysts']
        ].map(([title, value, body]) => (
          <article key={title} className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase text-reef">{title}</p>
            <p className="mt-4 text-4xl font-black">{value}</p>
            <p className="mt-3 text-sm leading-6 text-ink/62">{body}</p>
          </article>
        ))}
      </div>
      <section className="mt-5 rounded-lg border border-black/10 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black">Collections Forecast</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-6">
          {[22, 30, 26, 42, 35, 48].map((height, index) => (
            <div key={index} className="grid gap-2">
              <div className="flex h-56 items-end rounded-lg bg-cloud p-2"><div className="w-full rounded-lg bg-reef" style={{ height: `${height * 3}px` }} /></div>
              <p className="text-center text-xs font-black text-ink/45">M{index + 1}</p>
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}
