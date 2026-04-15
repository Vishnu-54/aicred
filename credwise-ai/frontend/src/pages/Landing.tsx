import { Link } from 'react-router-dom';

const heroImage = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80';
const featureImage = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';

export default function Landing() {
  return (
    <main className="bg-white">
      <section className="relative min-h-[86vh] overflow-hidden">
        <img src={heroImage} alt="Credit analysts reviewing loan decisions" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/70" />
        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-6">
          <Link to="/" className="text-xl font-black text-white">CredWise AI</Link>
          <div className="flex items-center gap-3">
            <Link to="/login" className="rounded-lg border border-white/30 px-4 py-2 text-sm font-bold text-white transition hover:bg-white hover:text-ink">
              Sign in
            </Link>
            <Link to="/register" className="rounded-lg bg-mint px-4 py-2 text-sm font-bold text-white transition hover:bg-reef">
              Create user
            </Link>
          </div>
        </nav>
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-center px-5 pb-12 pt-20 text-white sm:pt-28 lg:pt-36">
          <p className="text-sm font-bold uppercase text-mint">AI credit risk platform</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[1.05] sm:text-6xl lg:text-7xl">
            Smarter Credit Decisions. Faster Approvals.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82">
            Evaluate borrowers with transparent risk scores, fraud indicators, and lender-ready decision narratives.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/login" className="rounded-lg bg-mint px-6 py-3 font-bold text-white shadow-soft transition hover:bg-reef">
              Sign in as Vishnu
            </Link>
            <Link to="/register" className="rounded-lg bg-white px-6 py-3 font-bold text-ink shadow-soft transition hover:bg-cloud">
              Create New User
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase text-reef">Built for modern lenders</p>
          <h2 className="mt-3 text-3xl font-black sm:text-4xl">Risk, fraud, and explanations in one workflow.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ['Risk scoring', 'Salary, bureau score, loan load, missed EMIs, and request size produce a clear score.'],
              ['Fraud flags', 'Rules catch high request ratios, repeated defaults, excess loans, and risky combinations.'],
              ['Decision notes', 'Readable reasoning turns raw signals into reviewer-ready loan narratives.']
            ].map(([title, body]) => (
              <article key={title} className="rounded-lg border border-black/10 bg-cloud p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                <h3 className="font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/65">{body}</p>
              </article>
            ))}
          </div>
        </div>
        <img src={featureImage} alt="Analytics screen for lending performance" className="h-[420px] w-full rounded-lg object-cover shadow-soft" />
      </section>

      <section className="bg-ink px-5 py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-bold uppercase text-mint">Decision desk ready</p>
            <h2 className="mt-2 text-3xl font-black">Move from intake to answer with confidence.</h2>
          </div>
          <Link to="/login" className="rounded-lg bg-coral px-6 py-3 text-center font-bold text-white transition hover:bg-mint">
            Enter Workspace
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <p className="text-sm font-bold uppercase text-reef">Recruiter-ready workflow</p>
        <h2 className="mt-3 text-3xl font-black sm:text-4xl">A full lender command center, not a single form.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {[
            ['Secure login', 'Default admin plus new analyst signup.'],
            ['Dashboard', 'Portfolio KPIs and recent decisions.'],
            ['Analytics', 'Risk segment and signal-weight views.'],
            ['Fraud Center', 'Rule status and alert tracking.'],
            ['Settings', 'Workspace policy and user profile.']
          ].map(([title, body]) => (
            <article key={title} className="rounded-lg border border-black/10 bg-cloud p-5 shadow-sm">
              <h3 className="font-black">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/65">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="px-5 py-8 text-center text-sm text-ink/55">CredWise AI for premium lending teams.</footer>
    </main>
  );
}
