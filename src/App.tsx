import { useEffect, useState } from "react";

/* ---------- Reveal hook ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------- Card hover tracker ---------- */
function trackHover(e: React.MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

/* ---------- Nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-5 transition-all duration-300 ${
          scrolled ? "scale-[0.99]" : ""
        }`}
      >
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3 ${
            scrolled ? "glass-strong" : ""
          }`}
        >
          <a href="#top" className="relative flex items-center justify-center group h-16 w-16 rounded-2xl hover:bg-white/[0.03] transition-all duration-500 translate-y-1.5">
            {/* Ambient cinematic backplate glow */}
            <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-br from-[#66e6ff]/20 via-[#4d7cff]/30 to-[#8b5cff]/20 blur-xl opacity-60 group-hover:opacity-100 group-hover:scale-110 transition duration-500" />
            
            {/* Eclipse Logo Symbol (2.5x–3x Larger) */}
            <div className="relative h-14 w-14 flex items-center justify-center">
              <svg viewBox="0 0 64 64" className="h-14 w-14 text-white transition-all duration-700 group-hover:rotate-[20deg] group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="eclipse-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#66e6ff" />
                    <stop offset="45%" stopColor="#4d7cff" />
                    <stop offset="100%" stopColor="#8b5cff" />
                  </linearGradient>
                  <filter id="eclipse-glow-filter-large" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <mask id="eclipse-mask-large">
                    <rect width="64" height="64" fill="white" />
                    <circle cx="44" cy="20" r="18" fill="black" />
                  </mask>
                </defs>
                {/* Outer orbital thin dash ring */}
                <circle cx="32" cy="32" r="28" stroke="url(#eclipse-grad)" strokeWidth="0.75" opacity="0.5" strokeDasharray="6 3 2 3" />
                {/* Inner deep neon ambient glow */}
                <circle cx="32" cy="32" r="20" fill="url(#eclipse-grad)" opacity="0.4" filter="url(#eclipse-glow-filter-large)" />
                {/* Main crescent eclipsed body */}
                <circle cx="32" cy="32" r="20" fill="url(#eclipse-grad)" mask="url(#eclipse-mask-large)" />
                {/* Bright corona edge highlight */}
                <circle cx="32" cy="32" r="20.5" stroke="url(#eclipse-grad)" strokeWidth="1.2" opacity="0.85" />
              </svg>
            </div>
            {/* Outer luxury glowing frame border */}
            <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-white/15 group-hover:shadow-[0_0_25px_rgba(77,124,255,0.3)] transition-all duration-500" />
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <a href="#advantages" className="hover:text-white transition">Преимущества</a>
            <a href="#process" className="hover:text-white transition">Процесс</a>
            <a href="#cases" className="hover:text-white transition">Кейсы</a>
            <a href="#contact" className="hover:text-white transition">Контакты</a>
          </nav>
          <a href="#contact" className="btn-primary !py-2.5 !px-5 text-sm">Получить предложение</a>
        </div>
      </div>
    </header>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const [typed, setTyped] = useState("");
  const phrases = ["сайты для бизнеса", "digital-упаковку", "visual-системы", "motion-дизайн"];
  useEffect(() => {
    let p = 0, c = 0, dir = 1;
    const tick = () => {
      const w = phrases[p];
      c += dir;
      setTyped(w.slice(0, c));
      if (c === w.length) { dir = -1; setTimeout(tick, 1600); return; }
      if (c === 0 && dir === -1) { dir = 1; p = (p + 1) % phrases.length; }
      setTimeout(tick, dir > 0 ? 55 : 28);
    };
    const t = setTimeout(tick, 600);
    return () => clearTimeout(t);
    // eslint-disable-next-line
  }, []);

  return (
    <section id="top" className="relative pt-36 pb-24 overflow-hidden">
      {/* Animated orbs */}
      <div className="absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(139,92,255,0.45),transparent_60%)] blur-3xl orb-1" />
      <div className="absolute top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(77,124,255,0.45),transparent_60%)] blur-3xl orb-2" />
      <div className="absolute inset-0 grid-bg" />

      <div className="relative mx-auto max-w-7xl px-5">
        {/* badge */}
        <div className="flex justify-center mb-8 reveal">
          <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#66e6ff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#66e6ff]"></span>
            </span>
            <span className="text-white/80">Digital studio нового поколения</span>
          </div>
        </div>

        <h1 className="reveal text-center font-display font-bold text-[clamp(44px,8vw,108px)] leading-[0.95] tracking-tight">
          Создаём <span className="text-gradient">premium</span><br />
          <span className="inline-block min-h-[1.05em]">
            <span className="text-gradient-blue">{typed}</span>
            <span className="cursor text-[#8b5cff]">▍</span>
          </span>
        </h1>

        <p className="reveal mx-auto mt-8 max-w-2xl text-center text-lg text-white/60 leading-relaxed">
          Интерактивные сайты с современным visual-подходом и продуманной digital-эстетикой.
        </p>

        <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="#contact" className="btn-primary">Запустить проект →</a>
          <a href="#cases" className="btn-ghost">Смотреть концепции</a>
        </div>

        {/* trust row */}
        <div className="reveal mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs uppercase tracking-[0.18em] text-white/35">
          <span>Интерактивные интерфейсы</span><span className="text-white/15">●</span>
          <span>Визуальные системы</span><span className="text-white/15">●</span>
          <span>Digital production</span>
        </div>

        {/* HERO DASHBOARD MOCKUP */}
        <HeroDashboard />
      </div>
    </section>
  );
}

function HeroDashboard() {
  return (
    <div className="reveal relative mt-20">
      <div className="absolute -inset-x-10 -inset-y-6 bg-[radial-gradient(ellipse_at_center,rgba(139,92,255,0.2),transparent_70%)] blur-2xl" />
      <div className="relative glass-strong rounded-2xl p-3 md:p-4 shadow-[0_50px_120px_-30px_rgba(77,124,255,0.5)]">
        {/* window chrome */}
        <div className="flex items-center justify-between px-3 pb-3 border-b border-white/5">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="font-mono text-[11px] text-white/40">studio — noir / creative-board</div>
          <div className="font-mono text-[11px] text-[#66e6ff]">в работе</div>
        </div>

        <div className="grid grid-cols-12 gap-3 p-3">
          {/* sidebar */}
          <div className="col-span-12 md:col-span-3 glass rounded-xl p-4 space-y-3">
            <div className="text-[11px] uppercase tracking-widest text-white/40">Этапы</div>
            {[
              ["Бриф", "01"],
              ["Анализ ниши", "02"],
              ["Визуальная система", "03"],
              ["Структура интерфейса", "04"],
              ["Motion-концепция", "05"],
              ["Финальная сборка", "06"],
            ].map(([t, b]) => (
              <div key={t} className="flex items-center justify-between text-sm py-1.5 px-2 rounded-lg hover:bg-white/5 transition">
                <span className="text-white/80">{t}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-white/40">{b}</span>
              </div>
            ))}
          </div>

          {/* main */}
          <div className="col-span-12 md:col-span-6 glass rounded-xl p-5 relative overflow-hidden">
            <div className="scan-line" />
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[11px] uppercase tracking-widest text-white/40">Creative research</div>
                <div className="font-display text-lg font-semibold mt-0.5">Исследование digital-подачи</div>
              </div>
              <div className="text-xs text-white/40 font-mono">visual map</div>
            </div>

            {/* bars */}
            <div className="flex items-end gap-2 h-32 mb-4">
              {[40, 65, 50, 85, 70, 95, 60, 78, 45, 88, 72, 92, 55, 80].map((h, i) => (
                <div
                  key={i}
                  className="bar flex-1 rounded-t-md bg-gradient-to-t from-[#4d7cff] to-[#8b5cff]"
                  style={{ height: `${h}%`, animationDelay: `${i * 60}ms` }}
                />
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-2 text-xs">
              {[
                ["UX-подход", "Минималистичный стиль"],
                ["Визуальное направление", "Визуальная атмосфера"],
                ["Motion-система", "Интерактивная динамика"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-white/5 p-2.5">
                  <div className="text-white/40 text-[10px] uppercase tracking-wider">{k}</div>
                  <div className="font-display font-semibold mt-0.5 text-base">{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* offers */}
          <div className="col-span-12 md:col-span-3 glass rounded-xl p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="text-[11px] uppercase tracking-widest text-white/40">Направления</div>
              <div className="text-[10px] font-mono text-white/40">03</div>
            </div>
            {[
              { t: "Визуальная подача", n: "I", c: "from-[#66e6ff] to-[#4d7cff]" },
              { t: "Типографика", n: "II", c: "from-[#8b5cff] to-[#4d7cff]" },
              { t: "Интерактивный сценарий", n: "III", c: "from-[#66e6ff] to-[#8b5cff]" },
            ].map((o) => (
              <div key={o.t} className="rounded-lg p-2.5 bg-white/5 border border-white/5">
                <div className="text-[12px] text-white/85">{o.t}</div>
                <div className="mt-1.5 flex items-center justify-between">
                  <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${o.c}`} />
                  <div className="text-[10px] font-mono text-white/40">{o.n}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Marquee ---------- */
function Marquee() {
  const items = ["Beauty", "EdTech", "FinTech", "Real Estate", "B2B SaaS", "E-commerce", "Услуги", "Онлайн-школы", "Производство", "Health"];
  return (
    <div className="relative py-12 border-y border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#07080c] via-transparent to-[#07080c] z-10 pointer-events-none" />
      <div className="flex marquee-track gap-16 whitespace-nowrap">
        {[...items, ...items].map((it, i) => (
          <div key={i} className="font-display text-2xl text-white/30 hover:text-white transition">
            {it} <span className="text-[#8b5cff]">/</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Advantages ---------- */
function Advantages() {
  const items = [
    {
      t: "AI-анализ конкурентов",
      d: "Парсим топ-сайты ниши, разбираем их офферы, структуру, визуал и слабые места. На выходе — карта рынка с инсайтами.",
      icon: "M3 12h4l3-9 4 18 3-9h4",
    },
    {
      t: "AI-генерация офферов",
      d: "Нейросеть собирает 20+ вариантов оффера под вашу аудиторию. Тестируем сильнейшие гипотезы прямо в макете.",
      icon: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83",
    },
    {
      t: "Запуск за 5 дней",
      d: "Быстрый production-процесс, понятная структура работы и поэтапная сборка проекта.",
      icon: "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
    },
    {
      t: "Premium-дизайн",
      d: "Уровень Apple, Linear, Stripe. Кастомная типографика, motion design, авторские иллюстрации и 3D.",
      icon: "M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z",
    },
    {
      t: "Интерфейсы, продуманные до деталей",
      d: "Каждый экран строится вокруг восприятия, навигации и пользовательского опыта.",
      icon: "M3 3v18h18M7 14l4-4 4 4 6-6",
    },
    {
      t: "Современный UX",
      d: "Микроанимации, scroll-эффекты, осмысленные интеракции. Сайт ощущается как премиум-приложение.",
      icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
    },
  ];

  return (
    <section id="advantages" className="relative py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#66e6ff] mb-4">/ 01 — Преимущества</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
              Интерфейсы, <span className="text-gradient">продуманные до деталей</span>
            </h2>
          </div>
          <p className="text-white/55 max-w-sm">
            Каждый проект строится вокруг визуального опыта, структуры и пользовательского восприятия.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <div
              key={it.t}
              onMouseMove={trackHover}
              className="card-hover reveal glass rounded-2xl p-7 group"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="relative mb-6">
                <div className="absolute -inset-3 rounded-xl bg-gradient-to-br from-[#4d7cff]/20 to-[#8b5cff]/20 blur-xl opacity-0 group-hover:opacity-100 transition" />
                <div className="relative h-12 w-12 rounded-xl glass flex items-center justify-center">
                  <svg className="h-5 w-5 text-[#66e6ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={it.icon} />
                  </svg>
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2.5">{it.t}</h3>
              <p className="text-white/55 text-[15px] leading-relaxed">{it.d}</p>
              <div className="mt-6 font-mono text-[10px] tracking-widest text-white/25">0{i + 1} — N/{items.length}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- How we work ---------- */
function Process() {
  const steps = [
    { n: "01", t: "Бриф", d: "Определяем задачи проекта, визуальное направление и digital-подачу." },
    { n: "02", t: "Анализ ниши", d: "Исследуем визуальные подходы, структуру и интерфейсы внутри ниши." },
    { n: "03", t: "Визуальные концепции", d: "Формируем 2–3 visual-направления будущего интерфейса." },
    { n: "04", t: "Доработка", d: "Уточняем детали, собираем структуру и финализируем visual-систему." },
    { n: "05", t: "Финальная сборка", d: "Подготавливаем готовый interactive-проект к запуску." },
  ];

  return (
    <section id="how" className="relative py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5">
        <div className="reveal mb-16">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#66e6ff] mb-4">/ 02 — Как мы работаем</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
            Как мы <span className="text-gradient">работаем</span>
          </h2>
        </div>

        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#8b5cff]/40 to-transparent" />

          <div className="space-y-10 md:space-y-14">
            {steps.map((s, i) => {
              const left = i % 2 === 0;
              return (
                <div key={s.n} className={`reveal relative flex md:items-center gap-6 ${left ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* node */}
                  <div className="absolute left-0 md:left-1/2 -translate-x-0 md:-translate-x-1/2 z-10">
                    <div className="relative h-14 w-14 rounded-full glass-strong flex items-center justify-center pulse-ring">
                      <span className="font-mono text-[#66e6ff] text-sm">{s.n}</span>
                    </div>
                  </div>

                  {/* spacer */}
                  <div className="hidden md:block flex-1" />

                  <div
                    onMouseMove={trackHover}
                    className={`card-hover glass rounded-2xl p-6 md:p-7 ml-24 pl-6 md:ml-0 md:flex-1 ${
                      left
                        ? "md:ml-16 lg:ml-24 md:pl-10 lg:pl-12"
                        : "md:mr-16 lg:mr-24 md:pr-10 lg:pr-12"
                    }`}
                  >
                    <h3 className="font-display text-xl font-semibold mb-2">{s.t}</h3>
                    <p className="text-white/55 text-[15px] leading-relaxed">{s.d}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Process visualisation ---------- */
function ProcessVis() {
  return (
    <section id="process" className="relative py-32 border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5">
        <div className="reveal mb-16 max-w-3xl">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#66e6ff] mb-4">/ 03 — Внутренняя кухня</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
            Как выглядит работа <span className="text-gradient-blue">изнутри</span>
          </h2>
          <p className="text-white/55 mt-5 text-lg">
            Визуальные системы, интерфейсы и структура проекта собираются в едином digital-пространстве.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Strategy */}
          <div onMouseMove={trackHover} className="card-hover reveal glass rounded-2xl p-6 col-span-12 lg:col-span-5">
            <div className="flex items-center justify-between mb-5">
              <div className="text-[11px] uppercase tracking-widest text-white/40">Creative direction</div>
              <span className="text-[10px] font-mono text-[#66e6ff]">в работе</span>
            </div>
            <div className="space-y-3">
              {[
                { l: "Визуальный стиль", v: "Минималистичная visual-система с акцентом на восприятие интерфейса." },
                { l: "Структура интерфейса", v: "Модульная структура экранов с акцентом на навигацию и visual-ритм." },
                { l: "Типографика", v: "Контрастная типографика и cinematic-подача интерфейса." },
                { l: "Motion-подача", v: "Плавные переходы, micro-interactions и motion-динамика." },
                { l: "Интерактивный сценарий", v: "Интерактивные элементы и продуманная глубина интерфейса." },
              ].map((r) => (
                <div key={r.l} className="grid grid-cols-3 gap-3 py-2 border-b border-white/5 last:border-0">
                  <div className="text-[12px] text-white/40 uppercase tracking-wider">{r.l}</div>
                  <div className="col-span-2 text-sm text-white/85">{r.v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Wireframe */}
          <div onMouseMove={trackHover} className="card-hover reveal glass rounded-2xl p-6 col-span-12 lg:col-span-7 relative overflow-hidden">
            <div className="flex items-center justify-between mb-5">
              <div className="text-[11px] uppercase tracking-widest text-white/40">Interface structure</div>
              <div className="flex gap-2">
                <span className="h-2 w-2 rounded-full bg-[#4d7cff]" />
                <span className="h-2 w-2 rounded-full bg-[#8b5cff]" />
                <span className="h-2 w-2 rounded-full bg-[#66e6ff]" />
              </div>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-12 h-16 rounded-lg bg-gradient-to-r from-[#4d7cff]/20 to-[#8b5cff]/20 border border-white/5 flex items-center px-4">
                <div className="h-3 w-32 bg-white/30 rounded" />
                <div className="ml-auto h-3 w-20 bg-white/15 rounded" />
              </div>
              <div className="col-span-7 h-44 rounded-lg bg-white/5 border border-white/5 p-4 flex flex-col justify-end">
                <div className="h-2 w-3/4 bg-white/30 rounded mb-2" />
                <div className="h-2 w-1/2 bg-white/15 rounded mb-4" />
                <div className="h-8 w-32 rounded-lg bg-gradient-to-r from-[#4d7cff] to-[#8b5cff]" />
              </div>
              <div className="col-span-5 h-44 rounded-lg bg-gradient-to-br from-[#8b5cff]/30 to-[#4d7cff]/20 border border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-50" />
              </div>
              <div className="col-span-4 h-24 rounded-lg bg-white/5 border border-white/5 p-3">
                <div className="h-6 w-6 rounded-full bg-[#66e6ff]/30 mb-2" />
                <div className="h-2 w-full bg-white/15 rounded" />
              </div>
              <div className="col-span-4 h-24 rounded-lg bg-white/5 border border-white/5 p-3">
                <div className="h-6 w-6 rounded-full bg-[#8b5cff]/30 mb-2" />
                <div className="h-2 w-full bg-white/15 rounded" />
              </div>
              <div className="col-span-4 h-24 rounded-lg bg-white/5 border border-white/5 p-3">
                <div className="h-6 w-6 rounded-full bg-[#4d7cff]/30 mb-2" />
                <div className="h-2 w-full bg-white/15 rounded" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div onMouseMove={trackHover} className="card-hover reveal glass rounded-2xl p-6 col-span-12 lg:col-span-7">
            <div className="flex items-center justify-between mb-5">
              <div className="text-[11px] uppercase tracking-widest text-white/40">Визуальная система</div>
              <span className="text-[10px] font-mono text-[#66e6ff]">05 направлений</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-white/5">
              <div className="grid grid-cols-12 px-4 py-2.5 text-[11px] uppercase tracking-wider text-white/40 bg-white/5">
                <div className="col-span-7">Направление</div>
                <div className="col-span-3">Подход</div>
                <div className="col-span-2 text-right">№</div>
              </div>
              {[
                ["Визуальная подача", "Редакционный", "I"],
                ["Типографическая система", "Контрастный", "II"],
                ["Структура экранов", "Модульный", "III"],
                ["Motion-ритм", "Кинематографичный", "IV"],
                ["Интерактивный сценарий", "Многослойный", "V"],
              ].map(([t, k, n], i) => (
                <div key={i} className="grid grid-cols-12 px-4 py-3 text-sm border-t border-white/5 hover:bg-white/[0.03] transition">
                  <div className="col-span-7 text-white/85">{t}</div>
                  <div className="col-span-3 font-mono text-white/60">{k}</div>
                  <div className="col-span-2 font-mono text-right">
                    <span className="px-2 py-0.5 rounded bg-white/5 text-white/70">{n}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI dashboard */}
          <div onMouseMove={trackHover} className="card-hover reveal glass rounded-2xl p-6 col-span-12 lg:col-span-5 relative overflow-hidden">
            <div className="scan-line" />
            <div className="flex items-center justify-between mb-5">
              <div className="text-[11px] uppercase tracking-widest text-white/40">Motion-система</div>
              <span className="text-[10px] font-mono text-[#8b5cff]">studio — noir</span>
            </div>
            <div className="grid md:grid-cols-2 gap-3 mb-4">
              <div className="rounded-xl bg-gradient-to-br from-[#4d7cff]/15 to-transparent border border-white/5 p-4">
                <div className="text-[11px] text-white/40 uppercase tracking-wider">Визуальный ритм</div>
                <div className="font-display text-lg md:text-2xl font-semibold mt-1 leading-tight break-words">Редакционный</div>
                <div className="text-[10px] text-[#66e6ff] mt-1 font-mono">— баланс</div>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-[#8b5cff]/15 to-transparent border border-white/5 p-4">
                <div className="text-[11px] text-white/40 uppercase tracking-wider">Глубина интерфейса</div>
                <div className="font-display text-lg md:text-2xl font-semibold mt-1 leading-tight break-words">Многослойность</div>
                <div className="text-[10px] text-[#66e6ff] mt-1 font-mono">— глубина</div>
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4">
              <div className="text-[11px] text-white/40 uppercase tracking-wider mb-3">Motion-динамика</div>
              <svg viewBox="0 0 300 80" className="w-full">
                <defs>
                  <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cff" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#8b5cff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 60 L40 50 L80 55 L120 35 L160 40 L200 20 L240 25 L300 8 L300 80 L0 80 Z" fill="url(#g)" />
                <path d="M0 60 L40 50 L80 55 L120 35 L160 40 L200 20 L240 25 L300 8" stroke="#66e6ff" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Cases ---------- */
function Cases() {
  const cases = [
    {
      badge: "КОНЦЕПЦИЯ",
      title: "Концепт 01",
      subtitle: "Минималистичная visual-подача для premium beauty-интерфейса.",
      bottomLabel: "Beauty-направление",
      bottomLink: "Смотреть концепцию",
      tags: ["Минимализм", "Premium UI", "Геометрия"],
      image: "/images/concept1.jpg",
    },
    {
      badge: "КОНЦЕПЦИЯ",
      title: "Концепт 02",
      subtitle: "Контрастная структура экранов для современного digital-проекта.",
      bottomLabel: "Сервисный интерфейс",
      bottomLink: "Смотреть концепцию",
      tags: ["Apple Grid", "Interactive UI", "Чистая структура"],
      image: "/images/concept2.jpg",
    },
    {
      badge: "КОНЦЕПЦИЯ",
      title: "Концепт 03",
      subtitle: "Editorial-структура для онлайн-проектов и digital-продуктов.",
      bottomLabel: "Образовательная подача",
      bottomLink: "Смотреть концепцию",
      tags: ["Neon Glow", "Типографика", "Editorial style"],
      image: "/images/concept3.jpg",
    },
    {
      badge: "КОНЦЕПЦИЯ",
      title: "Концепт 04",
      subtitle: "Тёмная cinematic-подача для корпоративного интерфейса.",
      bottomLabel: "B2B-направление",
      bottomLink: "Смотреть концепцию",
      tags: ["Минимализм", "Cinematic", "Clean Grid"],
      image: "/images/concept4.jpg",
    },
  ];

  return (
    <section id="cases" className="relative py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5">
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#66e6ff] mb-4">/ 04 — Концепции</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
              Возможные <span className="text-gradient">визуальные системы</span>
            </h2>
          </div>
          <a href="#contact" className="btn-ghost shrink-0">Смотреть концепции →</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cases.map((c, i) => (
            <div
              key={c.title}
              onMouseMove={trackHover}
              className="card-hover reveal glass rounded-2xl overflow-hidden group"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* visual */}
              <div className="relative h-64 overflow-hidden">
                {/* background image */}
                <img 
                  src={c.image} 
                  alt={c.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.06] transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080c]/80 via-[#07080c]/30 to-transparent pointer-events-none" />
                
                {/* mock UI */}
                <div className="absolute bottom-4 left-4 right-4 glass-strong rounded-xl p-3 transform group-hover:translate-y-[-4px] transition-transform duration-500">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                    <div className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                    <div className="h-2 w-2 rounded-full bg-[#27c93f]" />
                    <div className="font-mono text-[10px] text-white/50 ml-2">studio — noir / 0{i + 1}</div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-2 w-3/4 bg-white/30 rounded" />
                    <div className="h-2 w-1/2 bg-white/15 rounded" />
                    <div className="h-6 w-24 mt-2 rounded bg-white/20" />
                  </div>
                </div>
                
                {/* top left badge */}
                <div className="absolute top-4 left-4 glass-strong rounded-full px-3.5 py-1.5 text-[11px] font-mono tracking-[0.1em] text-white/90">
                  {c.badge}
                </div>

                {/* top right bottomLabel */}
                <div className="absolute top-4 right-4 glass-strong rounded-xl px-3.5 py-1.5 text-[11px] font-mono text-white/70">
                  {c.bottomLabel}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold mb-2 text-white group-hover:text-[#66e6ff] transition-colors">{c.title}</h3>
                <p className="text-white/55 text-[15px] leading-relaxed mb-6">{c.subtitle}</p>
                
                <div className="mt-5 flex items-center justify-between text-sm border-t border-white/5 pt-5">
                  <div className="flex flex-wrap gap-1.5">
                    {c.tags.map((tag) => (
                      <span key={tag} className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 text-white/60 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-[#66e6ff] font-mono text-xs group-hover:translate-x-1.5 transition-transform shrink-0 ml-4 flex items-center gap-1">
                    {c.bottomLink} <span className="text-base">→</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA Block ---------- */
function CTA() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-5">
        <div className="reveal relative glass-strong rounded-3xl overflow-hidden p-10 md:p-20 glow-border">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#8b5cff]/30 blur-[100px]" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#4d7cff]/30 blur-[100px]" />
          <div className="absolute inset-0 grid-bg opacity-40" />

          <div className="relative max-w-3xl">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#66e6ff] mb-5">/ Готовы запустить</div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
              Интерактивные сайты <br />
              с <span className="text-gradient">современным визуальным подходом</span>.
            </h2>
            <p className="mt-7 text-white/60 text-lg max-w-xl">
              Проектируем визуальные интерфейсы с акцентом на анимацию, структуру и digital-эстетику.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#contact" className="btn-primary">Обсудить проект</a>
              <a href="#cases" className="btn-ghost">Смотреть концепции</a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 text-sm">
              {[
                ["Motion-подача", "динамика"],
                ["Интерактивные интерфейсы", "структура"],
                ["Визуальные системы", "дизайн"],
                ["Digital production", "сборка"],
              ].map(([n, t]) => (
                <div key={n}>
                  <div className="font-display text-xl font-bold text-gradient-blue">{n}</div>
                  <div className="text-white/45 text-xs uppercase tracking-wider mt-1">{t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Form ---------- */
function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [projectType, setProjectType] = useState("Digital-интерфейс");
  
  const [name, setName] = useState("");
  const [telegram, setTelegram] = useState("");
  const [phone, setPhone] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const form = e.target as HTMLFormElement;

  try {
    const response = await fetch("https://formsubmit.co/ajax/alyoka.art@ya.ru", {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      alert("Заявка успешно отправлена!");
      form.reset();
    } else {
      alert("Ошибка при отправке.");
    }
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const form = e.target as HTMLFormElement;

  const data = new FormData(form);

  try {
    const response = await fetch("https://formsubmit.co/ajax/alyoka.art@ya.ru", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      alert("Заявка отправлена!");
      form.reset();
    } else {
      alert("Ошибка отправки.");
    }
  } catch (error) {
    alert("Ошибка сети.");
  }
};
  return (
    <section id="contact" className="relative py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="reveal">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#66e6ff] mb-4">/ 05 — Связь</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Расскажите <span className="text-gradient">о проекте</span>
          </h2>
          <p className="mt-5 text-white/55 text-lg max-w-md">
            Оставьте контакт для связи — подготовим бесплатный прототип будущего интерфейса.
          </p>

          <div className="mt-10 space-y-5">
            {[
              ["Email", "alyoka.art@ya.ru", "M3 8l9 6 9-6M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"],
              ["Telegram", "@Alyoka338", "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"],
              ["Москва", "Работаем удалённо", "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],
            ].map(([l, v, p]) => (
              <div key={l} className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl glass flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#66e6ff]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={p} /></svg>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-white/40">{l}</div>
                  <div className="text-white/90 mt-0.5">
                    {l === "Email" ? (
                      <a href={`mailto:${v}`} className="hover:text-[#66e6ff] transition-colors duration-200 lowercase">
                        {v}
                      </a>
                    ) : l === "Telegram" ? (
                      <a href={`https://t.me/${v.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#66e6ff] transition-colors duration-200">
                        {v}
                      </a>
                    ) : (
                      v
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal">
 <form
  action="https://formsubmit.co/alyoka.art@ya.ru"
  method="POST"
  className="glass-strong rounded-2xl p-7 md:p-9 glow-border space-y-7"
>
            {sent ? (
              <div className="text-center py-12">
                <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-[#4d7cff] to-[#8b5cff] flex items-center justify-center mb-5">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h3 className="font-display text-2xl font-semibold">Запрос отправлен</h3>
                <p className="text-white/55 mt-3">Свяжемся в течение часа для обсуждения деталей.<br />Спасибо за доверие!</p>
              </div>
            ) : (
              <>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-widest text-white/40 mb-2 block">Имя</label>
                    <input 
                      name="Имя"
                      className="field" 
                      placeholder="Имя" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required 
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-widest text-white/40 mb-2 block">Telegram</label>
                    <input 
                      name="Telegram"
                      className="field" 
                      placeholder="@username" 
                      value={telegram}
                      onChange={(e) => setTelegram(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-widest text-white/40 mb-2 block">Номер телефона</label>
                  <input 
                    name="Телефон"
                    className="field" 
                    placeholder="+7 (999) 999-99-99" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required 
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-widest text-white/40 mb-2.5 block">Тип проекта</label>
                  <div className="grid md:grid-cols-2 sm:grid-cols-4 gap-2">
                    {["Лендинг", "Digital-интерфейс", "Концепт-страница", "Визуальная система"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setProjectType(t)}
                        className={`text-xs py-3 rounded-lg border transition duration-200 ${
                          projectType === t
                            ? "bg-gradient-to-r from-[#4d7cff] to-[#8b5cff] border-transparent text-white"
                            : "bg-white/[0.03] border-white/10 text-white/60 hover:border-[#8b5cff]/40"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn-primary w-full !py-4 mt-2 disabled:opacity-65 disabled:cursor-not-allowed"
                >
                  Заказать бесплатный прототип
                </button>
                <p className="text-xs text-white/40 text-center">
                  Нажимая кнопку, вы соглашаетесь с <span className="text-white/60">политикой конфиденциальности</span>
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid md:grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2">
            <div className="mb-5">
              <div className="font-display text-[17px] font-medium tracking-[0.01em] text-white leading-none">
                Alyoka.art
              </div>
              <div className="mt-2 text-[10px] font-mono tracking-[0.15em] text-white/30 uppercase">
                Digital-студия визуальных интерфейсов
              </div>
            </div>
            <p className="text-white/45 text-sm max-w-xs leading-relaxed">
              Независимая digital-студия. Создаём визуальные интерфейсы и интерактивные web-концепции.
            </p>
          </div>

          {[
            { t: "Услуги", l: ["Лендинги", "Digital-интерфейсы", "Visual-концепции", "Motion-системы"] },
            { t: "Студия", l: ["Подход", "Концепции", "Процесс", "Контакты"] },
            { t: "Контакты", l: ["alyoka.art@ya.ru", "@Alyoka338", "Москва · Удалённо"] },
          ].map((g) => (
            <div key={g.t}>
              <div className="text-[11px] uppercase tracking-widest text-white/40 mb-4">{g.t}</div>
              <ul className="space-y-2.5">
                {g.l.map((i) => {
                  let href = "#";
                  let target = undefined;
                  if (i.includes("@") && !i.startsWith("@")) {
                    href = `mailto:${i}`;
                  } else if (i.startsWith("@")) {
                    href = `https://t.me/${i.replace('@', '')}`;
                    target = "_blank";
                  }
                  return (
                    <li key={i}>
                      <a 
                        href={href} 
                        target={target}
                        rel={target ? "noopener noreferrer" : undefined}
                        className="text-white/70 hover:text-white text-sm transition-colors duration-200 lowercase"
                      >
                        {i}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Big logo removed for clean visual direction */}

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/35">
          <div>© 2026 Alyoka.art · Все права защищены</div>
          <div className="flex gap-5 opacity-0 pointer-events-none">
            <a href="#" className="hover:text-white/70 transition">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white/70 transition">Оферта</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- App ---------- */
export default function App() {
  useReveal();
  return (
    <div className="relative">
      <div className="noise" />
      <Nav />
      <Hero />
      <Marquee />
      <Advantages />
      <Process />
      <ProcessVis />
      <Cases />
      <CTA />
      <ContactForm />
      <Footer />
    </div>
  );
}
