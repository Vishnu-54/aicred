import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { AuthLayout } from './Login';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '', institution: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? 'This username may already exist, or the password is too short.' : 'Unable to create account.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create analyst account"
      subtitle="New users can create access for the demo workspace and start reviewing credit applications immediately."
      footer={<p>Already have access? <Link className="font-black text-reef" to="/login">Sign in</Link></p>}
    >
      <form onSubmit={submit} className="grid gap-4">
        {error && <div className="rounded-lg border border-coral/30 bg-coral/10 p-3 text-sm font-bold text-coral">{error}</div>}
        <label className="grid gap-2 text-sm font-bold">
          Username
          <input className="auth-input" value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} required />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          Password
          <input className="auth-input" type="password" minLength={8} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          Institution
          <input className="auth-input" value={form.institution} onChange={(event) => setForm({ ...form, institution: event.target.value })} placeholder="CredWise Lending Team" />
        </label>
        <button className="btn-primary h-12" disabled={loading}>{loading ? 'Creating...' : 'Create user'}</button>
      </form>
    </AuthLayout>
  );
}
