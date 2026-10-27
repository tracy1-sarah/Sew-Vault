import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Scissors,
  Users,
  Ruler,
  Wallet,
  LayoutDashboard,
  CheckCircle2,
  ArrowRight,
  Phone,
  Search,
  ShieldCheck,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { HeroCarousel } from './HeroCarousel';

const garments = ['Kaba & Slit', 'Agbada', 'Bridal', 'Suits', 'School uniforms', 'Alterations', 'Kente', 'Smocks'];

const features = [
  {
    key: 'records',
    tab: 'Client Records',
    icon: Users,
    eyebrow: 'Names • Phones • Dates',
    title: 'Every client, one tap away',
    body: 'Save each client with their phone number and order date. Search by name or number and find anyone in seconds — no more flipping through worn notebooks.',
    photo: '/landing/seamstress-shop.jpg',
  },
  {
    key: 'measurements',
    tab: 'Measurements',
    icon: Ruler,
    eyebrow: '19 fields • Inches',
    title: 'Measurements that never fade',
    body: 'Bust, waist, hip, kaba length, slit, sleeve, across back and more. Record them once and update whenever your client comes back for a new style.',
    photo: '/landing/seamstress-hat.jpg',
  },
  {
    key: 'payments',
    tab: 'Payments & Balances',
    icon: Wallet,
    eyebrow: 'Charged • Advance • Balance',
    title: 'Know exactly who owes what',
    body: 'Enter the amount charged and the advance paid — SewVault works out the balance for you. Mark orders as paid when the client collects.',
    photo: '/landing/tailor-red-shirt.jpg',
  },
  {
    key: 'overview',
    tab: 'Business Overview',
    icon: LayoutDashboard,
    eyebrow: 'Clients • Revenue • Outstanding',
    title: 'Your whole shop at a glance',
    body: 'See total clients, total revenue and outstanding balances the moment you sign in, so you always know how your business is doing.',
    photo: '/landing/tailor-workshop.jpg',
  },
] as const;

const useCases = [
  { title: 'Bridal & Occasion Wear', body: 'Keep fittings and balances for every bride, bridesmaid and guest.', photo: '/landing/seamstress-machine.jpg', tone: 'bg-[#0C2A22] text-white' },
  { title: 'Kaba & Slit', body: 'Store kaba, slit and skirt lengths so repeat orders fit perfectly.', photo: '/landing/seamstress-hat.jpg', tone: 'bg-[#C8F169] text-[#0C2A22]' },
  { title: 'Menswear & Suits', body: 'Shoulders, chest and sleeves for every gentleman on your books.', photo: '/landing/tailor-plaid.jpg', tone: 'bg-[#DCEBFF] text-[#0C2A22]' },
  { title: 'Everyday Fashion', body: 'Track quick turnarounds and who has paid for their outfit.', photo: '/landing/sewing-wax-print.jpg', tone: 'bg-[#FDE2C8] text-[#0C2A22]' },
  { title: 'Busy Workshops', body: 'One place for every order, even when the shop is full.', photo: '/landing/tailor-workshop.jpg', tone: 'bg-[#0C2A22] text-white' },
];

const steps = [
  { title: 'Create your vault', body: 'Sign up with your email or Google account in under a minute.' },
  { title: 'Add a client', body: 'Enter their name, phone number, order date and what they are paying.' },
  { title: 'Take measurements', body: 'Fill in the measurements you need and save. Edit them any time.' },
];

function FeatureVisual({ featureKey }: { featureKey: (typeof features)[number]['key'] }) {
  if (featureKey === 'measurements') {
    const rows = [
      ['Bust', '36.0"'],
      ['Waist', '29.5"'],
      ['Hip', '40.0"'],
      ['Kaba Length', '24.0"'],
      ['Slit Length', '38.5"'],
      ['Sleeve Length', '17.0"'],
    ];
    return (
      <div className="w-full rounded-2xl bg-white p-4 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-semibold">Akosua Mensah</p>
          <Ruler className="h-4 w-4 text-[#1C5A45]" />
        </div>
        <div className="divide-y divide-black/5 text-sm">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between py-1.5">
              <span className="text-black/55">{label}</span>
              <span className="font-semibold tabular-nums">{value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (featureKey === 'payments') {
    return (
      <div className="w-full rounded-2xl bg-white p-4 shadow-xl">
        <p className="text-sm text-black/55">Efua Asante · Bridal gown</p>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-black/55">Amount charged</span><span className="font-semibold">GHS 1,200.00</span></div>
          <div className="flex justify-between"><span className="text-black/55">Advance paid</span><span className="font-semibold">GHS 600.00</span></div>
          <div className="flex justify-between border-t border-black/5 pt-2"><span className="font-semibold">Balance</span><span className="font-bold text-orange-600">GHS 600.00</span></div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#0C2A22] py-2 text-sm font-semibold text-white">
          <CheckCircle2 className="h-4 w-4 text-[#C8F169]" /> Mark as paid
        </div>
      </div>
    );
  }
  if (featureKey === 'overview') {
    const stats = [
      ['Total clients', '48'],
      ['Total revenue', 'GHS 18,400'],
      ['Outstanding', 'GHS 2,450'],
      ['With measurements', '45'],
    ];
    return (
      <div className="grid w-full grid-cols-2 gap-3">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-white p-3 shadow-xl">
            <p className="text-xs text-black/55">{label}</p>
            <p className="mt-1 text-lg font-bold tracking-tight">{value}</p>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="w-full rounded-2xl bg-white p-4 shadow-xl">
      <div className="flex items-center gap-2 rounded-xl bg-[#F3F1EA] px-3 py-2 text-sm text-black/40">
        <Search className="h-4 w-4" /> Search clients by name or phone…
      </div>
      <div className="mt-3 space-y-2">
        {[
          ['Akosua Mensah', '024 555 0132'],
          ['Kwame Boateng', '020 555 0178'],
          ['Efua Asante', '055 555 0119'],
        ].map(([name, phone]) => (
          <div key={name} className="flex items-center justify-between rounded-xl border border-black/5 px-3 py-2 text-sm">
            <span className="font-semibold">{name}</span>
            <span className="flex items-center gap-1 text-black/50"><Phone className="h-3 w-3" />{phone}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LandingPage() {
  const { user } = useAuth();
  const [active, setActive] = useState<(typeof features)[number]['key']>('records');
  const [menuOpen, setMenuOpen] = useState(false);
  const feature = features.find((f) => f.key === active)!;

  const primaryCta = user ? { to: '/dashboard', label: 'Open My Vault' } : { to: '/signup', label: 'Create Free Account' };

  return (
    <div className="min-h-screen bg-[#F3F1EA] font-['Plus_Jakarta_Sans',ui-sans-serif,system-ui,sans-serif] text-[#0C2A22] antialiased">
      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden bg-[#0C2A22] text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgba(124,242,156,0.18),transparent_60%)]" />

        <nav className="relative z-30 mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#C8F169] text-[#0C2A22]">
              <Scissors className="h-4 w-4" />
            </span>
            SewVault
          </Link>
          <div className="hidden items-center gap-8 text-sm text-white/75 md:flex">
            <a href="#features" className="transition hover:text-white">Features</a>
            <a href="#who" className="transition hover:text-white">Who it's for</a>
            <a href="#how" className="transition hover:text-white">How it works</a>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            {!user && (
              <Link to="/login" className="rounded-lg border border-white/25 px-4 py-2 text-sm font-semibold transition hover:bg-white/10">
                Sign In
              </Link>
            )}
            <Link to={primaryCta.to} className="rounded-lg bg-[#C8F169] px-4 py-2 text-sm font-semibold text-[#0C2A22] transition hover:bg-[#d6f78a]">
              {user ? 'Dashboard' : 'Get Started'}
            </Link>
          </div>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/20 md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="relative z-30 mx-4 mb-2 flex flex-col gap-1 rounded-2xl border border-white/10 bg-[#0f3329] p-3 text-sm md:hidden"
            >
              {[
                ['#features', 'Features'],
                ['#who', "Who it's for"],
                ['#how', 'How it works'],
              ].map(([href, label]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 hover:bg-white/5">
                  {label}
                </a>
              ))}
              <div className="mt-2 flex gap-2">
                {!user && (
                  <Link to="/login" className="flex-1 rounded-lg border border-white/25 py-2 text-center font-semibold">Sign In</Link>
                )}
                <Link to={primaryCta.to} className="flex-1 rounded-lg bg-[#C8F169] py-2 text-center font-semibold text-[#0C2A22]">
                  {user ? 'Dashboard' : 'Get Started'}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-20 mx-auto max-w-3xl px-4 pt-10 text-center sm:pt-14">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold leading-[1.1] tracking-tight text-[#8EF0B5] sm:text-5xl lg:text-6xl"
          >
            The client book that keeps every stitch in order.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-5 max-w-xl text-base text-white/75 sm:text-lg"
          >
            SewVault helps seamstresses and tailors keep client details, measurements and payments safe in one place — on any phone, tablet or computer.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-col items-center gap-3"
          >
            <Link
              to={primaryCta.to}
              className="group inline-flex items-center gap-2 rounded-xl bg-[#C8F169] px-6 py-3 font-semibold text-[#0C2A22] transition hover:bg-[#d6f78a]"
            >
              {primaryCta.label}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <p className="flex items-center gap-1.5 text-xs text-white/55">
              <ShieldCheck className="h-3.5 w-3.5 text-[#8EF0B5]" />
              Sign up with email or Google · Your records sync to the cloud
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative mt-4 pb-10"
        >
          <HeroCarousel />
        </motion.div>
      </section>

      {/* ───────── Garment strip ───────── */}
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-black/40">Built for every kind of order</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-lg font-semibold text-black/45 sm:text-xl">
            {garments.map((g) => (
              <span key={g} className="flex items-center gap-2">
                <Scissors className="h-4 w-4 text-black/25" />
                {g}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Features ───────── */}
      <section id="features" className="scroll-mt-8 bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Core features that power your sewing business</h2>
            <p className="mt-4 text-black/55">Simple tools built around how seamstresses and tailors already work — just without the paper.</p>
          </div>

          <div className="mx-auto mt-10 flex max-w-3xl gap-1 overflow-x-auto border-b border-black/10 [scrollbar-width:none]">
            {features.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setActive(f.key)}
                className={`relative shrink-0 flex-1 whitespace-nowrap px-4 py-3 text-sm font-medium transition ${
                  active === f.key ? 'text-[#0C2A22]' : 'text-black/45 hover:text-black/70'
                }`}
              >
                {f.tab}
                {active === f.key && (
                  <motion.span layoutId="tab-underline" className="absolute inset-x-0 -bottom-px h-0.5 bg-[#0C2A22]" />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_1.6fr]"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-black/45">{feature.eyebrow}</p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">{feature.title}</h3>
                <p className="mt-4 text-black/60">{feature.body}</p>
                <Link
                  to={primaryCta.to}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#0C2A22] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#164034]"
                >
                  {user ? 'Open My Vault' : 'Open An Account'}
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-[1.4fr_1fr]">
                <div className="flex min-h-[320px] items-center justify-center rounded-3xl bg-[#C8F169] p-6 sm:p-10">
                  <FeatureVisual featureKey={feature.key} />
                </div>
                <div className="relative hidden overflow-hidden rounded-3xl sm:block">
                  <img src={feature.photo} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-xl bg-white/90 px-3 py-2 text-xs font-semibold backdrop-blur">
                    <feature.icon className="h-4 w-4 text-[#1C5A45]" />
                    {feature.tab}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ───────── Use cases ───────── */}
      <section id="who" className="scroll-mt-8 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Made for the people behind the needle</h2>
            <p className="mt-4 text-black/55">From one-woman shops to busy workshops — if you measure, cut and sew, SewVault fits.</p>
          </div>
        </div>
        <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scroll-px-4 sm:px-6 sm:scroll-px-6 xl:px-[calc((100vw-72rem)/2_+_1.5rem)] xl:scroll-px-[calc((100vw-72rem)/2_+_1.5rem)] [scrollbar-width:none]">
          {useCases.map((u, i) => (
            <motion.article
              key={u.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative h-[380px] w-[260px] shrink-0 snap-start overflow-hidden rounded-3xl sm:w-[280px]"
            >
              <img src={u.photo} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className={`absolute inset-x-0 bottom-0 p-4 ${u.tone}`}>
                <h3 className="text-lg font-bold">{u.title}</h3>
                <p className="mt-1 text-sm opacity-75">{u.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ───────── How it works ───────── */}
      <section id="how" className="scroll-mt-8 bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Up and running in three steps</h2>
            <p className="mt-4 text-black/55">No training needed — just sign up and start adding clients.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-3xl border border-black/5 bg-[#F3F1EA] p-6"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#0C2A22] font-bold text-[#C8F169]">{i + 1}</span>
                <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-black/60">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="px-4 py-20 sm:px-6">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#0C2A22] px-6 py-14 text-center text-white sm:px-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,242,156,0.2),transparent_60%)]" />
          <h2 className="relative text-3xl font-bold tracking-tight text-[#8EF0B5] sm:text-4xl">Put down the notebook.</h2>
          <p className="relative mx-auto mt-4 max-w-lg text-white/70">
            Keep every client, measurement and balance safe in SewVault — and spend more time doing what you love.
          </p>
          <Link
            to={primaryCta.to}
            className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-[#C8F169] px-6 py-3 font-semibold text-[#0C2A22] transition hover:bg-[#d6f78a]"
          >
            {primaryCta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ───────── Footer ───────── */}
      <footer className="border-t border-black/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-black/50 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 font-semibold text-[#0C2A22]">
            <Scissors className="h-4 w-4" /> SewVault
          </div>
          <p>© {new Date().getFullYear()} SewVault. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
