import { FormEvent, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { ApplicationRequest } from '../types';
import { Field, inputClass, Page } from './shared';

const initialForm: ApplicationRequest = {
  applicantName: '',
  email: '',
  phone: '',
  employmentType: 'Salaried',
  employerName: '',
  salary: 85000,
  creditScore: 720,
  existingLoans: 1,
  missedEmi: 0,
  requestedAmount: 120000,
  loanPurpose: 'Home renovation',
  tenureMonths: 36
};

export default function NewApplication() {
  const [form, setForm] = useState<ApplicationRequest>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function update<K extends keyof ApplicationRequest>(key: K, value: ApplicationRequest[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await api.createApplication(form);
      localStorage.setItem('credwise:lastResult', JSON.stringify(result));
      navigate('/result', { state: result });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to evaluate application.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Page title="New Loan Application" eyebrow="Borrower intake">
      <form onSubmit={submit} className="grid gap-5">
        {error && <div className="rounded-lg border border-coral/30 bg-coral/10 p-4 text-sm font-semibold text-coral">{error}</div>}
        <Section title="Personal">
          <Field label="Applicant name"><input className={inputClass} value={form.applicantName} onChange={(e) => update('applicantName', e.target.value)} required /></Field>
          <Field label="Email"><input className={inputClass} type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required /></Field>
          <Field label="Phone"><input className={inputClass} value={form.phone} onChange={(e) => update('phone', e.target.value)} required /></Field>
        </Section>
        <Section title="Employment">
          <Field label="Employment type">
            <select className={inputClass} value={form.employmentType} onChange={(e) => update('employmentType', e.target.value)}>
              <option>Salaried</option><option>Self-employed</option><option>Business owner</option><option>Contract</option>
            </select>
          </Field>
          <Field label="Employer name"><input className={inputClass} value={form.employerName} onChange={(e) => update('employerName', e.target.value)} /></Field>
          <Field label="Annual salary"><input className={inputClass} type="number" min="1" value={form.salary} onChange={(e) => update('salary', Number(e.target.value))} required /></Field>
        </Section>
        <Section title="Financial">
          <Field label="Credit score"><input className={inputClass} type="number" min="300" max="900" value={form.creditScore} onChange={(e) => update('creditScore', Number(e.target.value))} required /></Field>
          <Field label="Existing loans"><input className={inputClass} type="number" min="0" value={form.existingLoans} onChange={(e) => update('existingLoans', Number(e.target.value))} required /></Field>
          <Field label="Missed EMIs"><input className={inputClass} type="number" min="0" value={form.missedEmi} onChange={(e) => update('missedEmi', Number(e.target.value))} required /></Field>
        </Section>
        <Section title="Loan Request">
          <Field label="Requested amount"><input className={inputClass} type="number" min="1" value={form.requestedAmount} onChange={(e) => update('requestedAmount', Number(e.target.value))} required /></Field>
          <Field label="Purpose"><input className={inputClass} value={form.loanPurpose} onChange={(e) => update('loanPurpose', e.target.value)} required /></Field>
          <Field label="Tenure months"><input className={inputClass} type="number" min="6" value={form.tenureMonths} onChange={(e) => update('tenureMonths', Number(e.target.value))} required /></Field>
        </Section>
        <div className="flex justify-end">
          <button className="btn-primary min-w-[190px]" disabled={loading}>{loading ? 'Evaluating...' : 'Evaluate Risk'}</button>
        </div>
      </form>
    </Page>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
      <h2 className="mb-5 text-lg font-black">{title}</h2>
      <div className="grid gap-4 md:grid-cols-3">{children}</div>
    </section>
  );
}
