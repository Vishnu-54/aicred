import { FormEvent, useState } from 'react';
import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('vishnu');
  const [password, setPassword] = useState('vishnu@123456');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login({ username, password });
      navigate('/dashboard');
    } catch {
      setError('Only valid lender accounts can access CredWise AI. Try vishnu / vishnu@123456 or create a new user.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to review borrower risk, fraud signals, and portfolio intelligence."
      footer={<p>New analyst? <Link className="font-black text-reef" to="/register">Create an account</Link></p>}
    >
      <form onSubmit={submit} className="grid gap-4">
        {error && <div className="rounded-lg border border-coral/30 bg-coral/10 p-3 text-sm font-bold text-coral">{error}</div>}
        <label className="grid gap-2 text-sm font-bold">
          Username
          <input className="auth-input" value={username} onChange={(event) => setUsername(event.target.value)} required />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          Password
          <input className="auth-input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        <button className="btn-primary h-12" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
      </form>
    </AuthLayout>
  );
}

export function AuthLayout({ title, subtitle, footer, children }: { title: string; subtitle: string; footer: ReactNode; children: ReactNode }) {
  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden lg:block">
        <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1500&q=80" alt="Credit risk team reviewing financial data" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/72" />
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          <Link to="/" className="text-2xl font-black">CredWise AI</Link>
          <div>
            <p className="text-sm font-bold uppercase text-mint">Secure decision workspace</p>
            <h1 className="mt-4 max-w-xl text-5xl font-black leading-tight">Smarter Credit Decisions. Faster Approvals.</h1>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {['Risk engine', 'Fraud rules', 'AI explainability'].map((item) => (
                <div key={item} className="rounded-lg border border-white/20 bg-white/10 p-4 text-sm font-bold backdrop-blur">{item}</div>
              ))}
            </div>
          </div>
          <p className="text-sm text-white/70">Demo admin: vishnu / vishnu@123456</p>
        </div>
      </section>
      <section className="grid place-items-center px-5 py-10">
        <div className="w-full max-w-md">
          <Link to="/" className="text-xl font-black lg:hidden">CredWise AI</Link>
          <div className="mt-8 rounded-lg border border-black/10 bg-cloud p-6 shadow-soft lg:mt-0">
            <p className="text-sm font-bold uppercase text-reef">Authorization</p>
            <h2 className="mt-2 text-3xl font-black">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-ink/65">{subtitle}</p>
            <div className="mt-6">{children}</div>
          </div>
          <div className="mt-5 text-center text-sm text-ink/60">{footer}</div>
        </div>
      </section>
    </main>
  );
}
