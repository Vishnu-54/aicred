import { Link, Navigate, NavLink, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';
import Analytics from './pages/Analytics';
import Dashboard from './pages/Dashboard';
import FraudCenter from './pages/FraudCenter';
import History from './pages/History';
import Landing from './pages/Landing';
import Login from './pages/Login';
import NewApplication from './pages/NewApplication';
import Portfolio from './pages/Portfolio';
import Register from './pages/Register';
import Result from './pages/Result';
import Settings from './pages/Settings';

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/fraud', label: 'Fraud Center' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/new', label: 'New Application' },
  { to: '/history', label: 'History' },
  { to: '/settings', label: 'Settings' }
];

export default function App() {
  return (
    <div className="min-h-screen bg-cloud text-ink">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<RequireAuth />}>
          <Route element={<Shell />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/fraud" element={<FraudCenter />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/new" element={<NewApplication />} />
            <Route path="/result" element={<Result />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function RequireAuth() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

function Shell() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="hidden border-r border-black/10 bg-white lg:block">
        <div className="sticky top-0 flex h-screen flex-col p-6">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-ink text-lg font-black text-white">C</span>
            <span>
              <span className="block text-lg font-black">CredWise AI</span>
              <span className="block text-xs text-ink/55">Loan Intelligence</span>
            </span>
          </Link>
          <nav className="mt-10 grid gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-semibold transition ${
                    isActive ? 'bg-ink text-white shadow-soft' : 'text-ink/70 hover:bg-cloud hover:text-ink'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto grid gap-3 rounded-lg border border-black/10 bg-cloud p-4">
            <div>
              <p className="text-xs font-bold uppercase text-reef">Signed in</p>
              <p className="mt-1 text-sm font-black">{user?.username}</p>
              <p className="text-xs text-ink/55">{user?.role} - {user?.institution}</p>
            </div>
            <button onClick={logout} className="rounded-lg border border-black/10 bg-white px-3 py-2 text-xs font-black text-ink transition hover:bg-coral hover:text-white">
              Sign out
            </button>
          </div>
        </div>
      </aside>
      <main>
        <Topbar />
        <Outlet />
      </main>
    </div>
  );
}

function Topbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-20 border-b border-black/10 bg-white/90 px-5 py-4 backdrop-blur lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/" className="font-black lg:hidden">CredWise AI</Link>
        <div className="hidden lg:block">
          <p className="text-sm text-ink/55">Smarter Credit Decisions. Faster Approvals.</p>
        </div>
        <div className="flex max-w-full gap-2 overflow-x-auto lg:hidden">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className="whitespace-nowrap rounded-lg bg-white px-3 py-2 text-xs font-bold shadow-sm">
              {item.label.replace(' Application', '')}
            </NavLink>
          ))}
        </div>
        <div className="hidden items-center gap-3 sm:flex">
          <span className="text-sm font-bold text-ink/60">{user?.username}</span>
          <Link to="/new" className="rounded-lg bg-mint px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-reef">
            Evaluate borrower
          </Link>
          <button onClick={logout} className="rounded-lg border border-black/10 px-4 py-2 text-sm font-bold text-ink transition hover:bg-ink hover:text-white">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
