import { useEffect, useRef, useState } from "react";

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
          <a href="#top" className="flex items-center gap-2.5">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#5ea0ff] to-[#8b5cff] blur-md opacity-70" />
              <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-[#5ea0ff] to-[#8b5cff] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M12 2 L4 7 V17 L12 22 L20 17 V7 Z" />
                  <path d="M12 2 V12 M4 7 L12 12 M20 7 L12 12 M12 12 V22" />
                </svg>
              </div>
            </div>
            <div className="font-display text-lg font-bold tracking-tight">NEURA<span className="text-[#8b5cff]">.</span></div>
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
  const phrases = ["продающие лендинги.", "сайты для бизнеса.", "digital-упаковку.", "конверсионные офферы."];
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
            <span className="text-white/80">AI-powered · принимаем 3 проекта в феврале</span>
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
          AI-студия, которая упаковывает бизнес в дорогой digital. Анализируем конкурентов нейросетями,
          формируем офферы и собираем сайты, которые продают с первого экрана.
        </p>

        <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="#contact" className="btn-primary">Запустить проект →</a>
          <a href="#cases" className="btn-ghost">Смотреть кейсы</a>
        </div>

        {/* trust row */}
        <div className="reveal mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs uppercase tracking-[0.18em] text-white/35">
          <span>120+ проектов</span><span className="text-white/15">●</span>
          <span>9 лет в digital</span><span className="text-white/15">●</span>
          <span>Tilda · Webflow · Next.js</span><span className="text-white/15">●</span>
          <span>NDA-friendly</span>
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
          <div className="font-mono text-[11px] text-white/40">neura.studio / dashboard / project-001</div>
          <div className="font-mono text-[11px] text-[#66e6ff]">● live</div>
        </div>

        <div className="grid grid-cols-12 gap-3 p-3">
          {/* sidebar */}
          <div className="col-span-12 md:col-span-3 glass rounded-xl p-4 space-y-3">
            <div className="text-[11px] uppercase tracking-widest text-white/40">Workspace</div>
            {[
              ["Brief", "✓"],
              ["Анализ конкурентов", "AI"],
              ["Офферы", "AI"],
              ["Концепции", "3"],
              ["Прототип", "→"],
              ["Запуск", ""],
            ].map(([t, b]) => (
              <div key={t} className="flex items-center justify-between text-sm py-1.5 px-2 rounded-lg hover:bg-white/5 transition">
                <span className="text-white/80">{t}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#66e6ff]">{b}</span>
              </div>
            ))}
          </div>

          {/* main */}
          <div className="col-span-12 md:col-span-6 glass rounded-xl p-5 relative overflow-hidden">
            <div className="scan-line" />
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[11px] uppercase tracking-widest text-white/40">Анализ конкурентов</div>
                <div className="font-display text-lg font-semibold mt-0.5">Beauty · Москва · 14 сайтов</div>
              </div>
              <div className="text-xs text-[#66e6ff] font-mono">98% complete</div>
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

            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                ["Средний CR", "1.8%"],
                ["Наш прогноз", "4.7%"],
                ["Сила оффера", "8.4/10"],
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
              <div className="text-[11px] uppercase tracking-widest text-white/40">AI · офферы</div>
              <div className="text-[10px] font-mono text-[#8b5cff]">v3.2</div>
            </div>
            {[
              { t: "Сайт за 14 дней", s: "+82%", c: "from-[#66e6ff] to-[#4d7cff]" },
              { t: "Гарантия результата", s: "+64%", c: "from-[#8b5cff] to-[#4d7cff]" },
              { t: "Премиум-упаковка под ключ", s: "+91%", c: "from-[#66e6ff] to-[#8b5cff]" },
            ].map((o) => (
              <div key={o.t} className="rounded-lg p-2.5 bg-white/5 border border-white/5">
                <div className="text-[12px] text-white/85">{o.t}</div>
                <div className="mt-1.5 flex items-center justify-between">
                  <div className={`h-1 w-16 rounded-full bg-gradient-to-r ${o.c}`} />
                  <div className="text-[10px] font-mono text-[#66e6ff]">{o.s}</div>
                </div>
              </div>
            ))}
            <button className="w-full mt-2 text-xs py-2 rounded-lg bg-gradient-to-r from-[#4d7cff] to-[#8b5cff] text-white font-medium hover:brightness-110 transition">
              Сгенерировать ещё
            </button>
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
      t: "Запуск за 14 дней",
      d: "Никаких затянутых правок. Жёсткий процесс, прозрачный таймлайн, ежедневные апдейты в Notion.",
      icon: "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
    },
    {
      t: "Premium-дизайн",
      d: "Уровень Apple, Linear, Stripe. Кастомная типографика, motion design, авторские иллюстрации и 3D.",
      icon: "M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z",
    },
    {
      t: "Конверсионная структура",
      d: "Каждый блок — продаёт. Маркетинговая логика, проверенная на 120+ проектах. Считаем не лайки, а заявки.",
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
              Почему с нами получается <span className="text-gradient">дороже, быстрее и точнее</span>
            </h2>
          </div>
          <p className="text-white/55 max-w-sm">
            Мы не делаем сайты «как у всех». Каждый проект — это маркетинговая система, упакованная в премиум-визуал.
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
    { n: "01", t: "Бриф", d: "30-минутный созвон. Разбираем продукт, аудиторию, цели и метрики.", time: "День 1" },
    { n: "02", t: "Анализ конкурентов", d: "AI парсит топ-15 сайтов ниши. Готовим карту рынка с инсайтами.", time: "День 2–3" },
    { n: "03", t: "AI-офферы", d: "Генерируем 20+ офферов. Отбираем сильнейшие под вашу ЦА.", time: "День 3–4" },
    { n: "04", t: "2–3 концепции", d: "Делаем визуальные направления. Вы выбираете то, что заходит.", time: "День 5–7" },
    { n: "05", t: "Согласование", d: "Один раунд правок. Финализируем дизайн до пикселя.", time: "День 8–9" },
    { n: "06", t: "Перенос в Tilda", d: "Адаптив, скорость, SEO-базу, аналитику и интеграции.", time: "День 10–13" },
    { n: "07", t: "Запуск", d: "Тесты, домен, Метрика. Передаём проект и ведём 14 дней поддержки.", time: "День 14" },
  ];

  return (
    <section id="how" className="relative py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5">
        <div className="reveal mb-16">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#66e6ff] mb-4">/ 02 — Как мы работаем</div>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
            7 шагов от идеи <span className="text-gradient">до запуска</span>
          </h2>
        </div>

        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#8b5cff]/40 to-transparent" />

          <div className="space-y-6">
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
                    className={`card-hover glass rounded-2xl p-6 md:p-7 ml-20 md:ml-0 md:flex-1 ${left ? "md:mr-20" : "md:ml-20"}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display text-xl font-semibold">{s.t}</h3>
                      <span className="text-[11px] font-mono px-2 py-1 rounded bg-white/5 text-white/60">{s.time}</span>
                    </div>
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
            Дашборды, AI-стратегии, wireframes и таблицы — вы видите весь процесс в одном Notion-окне.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Strategy */}
          <div onMouseMove={trackHover} className="card-hover reveal glass rounded-2xl p-6 col-span-12 lg:col-span-5">
            <div className="flex items-center justify-between mb-5">
              <div className="text-[11px] uppercase tracking-widest text-white/40">AI Strategy Block</div>
              <span className="text-[10px] font-mono text-[#66e6ff]">analysed</span>
            </div>
            <div className="space-y-3">
              {[
                { l: "Целевая аудитория", v: "B2C · 25–40 · доход выше среднего" },
                { l: "Боль", v: "Шаблонные сайты — низкая конверсия, нет доверия" },
                { l: "Триггер", v: "Премиум-визуал + социальные доказательства" },
                { l: "Главный оффер", v: "Сайт под ключ за 14 дней или вернём 100%" },
                { l: "USP", v: "AI-анализ ниши + кастомный дизайн в одном продукте" },
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
              <div className="text-[11px] uppercase tracking-widest text-white/40">Wireframe · prototype.v2</div>
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
              <div className="text-[11px] uppercase tracking-widest text-white/40">Таблица — AI офферы</div>
              <span className="text-[10px] font-mono text-[#66e6ff]">23 hypotheses</span>
            </div>
            <div className="overflow-hidden rounded-xl border border-white/5">
              <div className="grid grid-cols-12 px-4 py-2.5 text-[11px] uppercase tracking-wider text-white/40 bg-white/5">
                <div className="col-span-6">Оффер</div>
                <div className="col-span-2">CTR</div>
                <div className="col-span-2">CR</div>
                <div className="col-span-2">Score</div>
              </div>
              {[
                ["Сайт за 14 дней или вернём деньги", "9.2%", "5.1%", "94"],
                ["Premium-упаковка бренда под ключ", "7.8%", "4.4%", "88"],
                ["AI-анализ ниши + дизайн в подарок", "8.6%", "3.9%", "82"],
                ["Сайт уровня Apple за стоимость Tilda", "10.4%", "5.7%", "97"],
                ["Гарантия первой заявки за 7 дней", "6.9%", "3.2%", "76"],
              ].map(([t, ctr, cr, sc], i) => (
                <div key={i} className="grid grid-cols-12 px-4 py-3 text-sm border-t border-white/5 hover:bg-white/[0.03] transition">
                  <div className="col-span-6 text-white/85">{t}</div>
                  <div className="col-span-2 font-mono text-white/60">{ctr}</div>
                  <div className="col-span-2 font-mono text-white/60">{cr}</div>
                  <div className="col-span-2 font-mono">
                    <span className={`px-2 py-0.5 rounded ${parseInt(sc) > 90 ? "bg-[#66e6ff]/20 text-[#66e6ff]" : "bg-white/5 text-white/70"}`}>{sc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI dashboard */}
          <div onMouseMove={trackHover} className="card-hover reveal glass rounded-2xl p-6 col-span-12 lg:col-span-5 relative overflow-hidden">
            <div className="scan-line" />
            <div className="flex items-center justify-between mb-5">
              <div className="text-[11px] uppercase tracking-widest text-white/40">AI Dashboard</div>
              <span className="text-[10px] font-mono text-[#8b5cff]">neura · v3</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded-xl bg-gradient-to-br from-[#4d7cff]/15 to-transparent border border-white/5 p-4">
                <div className="text-[11px] text-white/40 uppercase tracking-wider">Конверсия</div>
                <div className="font-display text-3xl font-bold mt-1">4.7<span className="text-base text-white/40">%</span></div>
                <div className="text-[10px] text-[#66e6ff] mt-1 font-mono">↑ +2.9% vs avg</div>
              </div>
              <div className="rounded-xl bg-gradient-to-br from-[#8b5cff]/15 to-transparent border border-white/5 p-4">
                <div className="text-[11px] text-white/40 uppercase tracking-wider">Срок</div>
                <div className="font-display text-3xl font-bold mt-1">14<span className="text-base text-white/40">дн</span></div>
                <div className="text-[10px] text-[#66e6ff] mt-1 font-mono">→ on track</div>
              </div>
            </div>
            <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4">
              <div className="text-[11px] text-white/40 uppercase tracking-wider mb-3">Прогноз заявок · 30 дней</div>
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
      tag: "Beauty",
      title: "Esthé — клиника эстетической косметологии",
      stat: "+312%",
      stat_l: "к заявкам за 30 дней",
      desc: "Переупаковали премиум-клинику. Новая структура, кастомный визуал, AI-офферы под 4 сегмента ЦА.",
      grad: "from-[#ff7eb6] via-[#ff5fa6] to-[#8b5cff]",
    },
    {
      tag: "Услуги",
      title: "Lex&Co — юридическая компания",
      stat: "×2.4",
      stat_l: "конверсия по сравнению со старым сайтом",
      desc: "Сделали лендинг, который продаёт сложную услугу. Кейсы, гарантии, экспертиза — всё на первом экране.",
      grad: "from-[#4d7cff] via-[#5ea0ff] to-[#66e6ff]",
    },
    {
      tag: "Online School",
      title: "Skillforge — школа дизайна",
      stat: "412 ₽",
      stat_l: "стоимость заявки (было 1 840 ₽)",
      desc: "Полная переупаковка курсов. AI помог сформулировать офферы, мы — превратили их в визуальную систему.",
      grad: "from-[#8b5cff] via-[#a37bff] to-[#66e6ff]",
    },
    {
      tag: "B2B",
      title: "Vector — производство мебели",
      stat: "+186%",
      stat_l: "органического трафика",
      desc: "Сайт-каталог уровня премиум-бренда. Кастомные карточки, конфигуратор, интеграция с amoCRM.",
      grad: "from-[#66e6ff] via-[#4d7cff] to-[#8b5cff]",
    },
  ];

  return (
    <section id="cases" className="relative py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5">
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#66e6ff] mb-4">/ 04 — Кейсы</div>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
              Проекты, которые <span className="text-gradient">приносят деньги</span>
            </h2>
          </div>
          <a href="#contact" className="btn-ghost shrink-0">Все кейсы →</a>
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
              <div className={`relative h-64 bg-gradient-to-br ${c.grad} overflow-hidden`}>
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {/* mock UI */}
                <div className="absolute bottom-4 left-4 right-4 glass-strong rounded-xl p-3 transform group-hover:translate-y-[-4px] transition-transform duration-500">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                    <div className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                    <div className="h-2 w-2 rounded-full bg-[#27c93f]" />
                    <div className="font-mono text-[10px] text-white/50 ml-2">{c.tag.toLowerCase()}.neura.studio</div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-2 w-3/4 bg-white/30 rounded" />
                    <div className="h-2 w-1/2 bg-white/15 rounded" />
                    <div className="h-6 w-24 mt-2 rounded bg-white/20" />
                  </div>
                </div>
                {/* stat overlay */}
                <div className="absolute top-4 right-4 glass-strong rounded-xl px-3 py-2">
                  <div className="font-display font-bold text-2xl text-white">{c.stat}</div>
                  <div className="text-[10px] text-white/70">{c.stat_l}</div>
                </div>
                <div className="absolute top-4 left-4 glass-strong rounded-full px-3 py-1 text-[11px] font-mono">{c.tag}</div>
              </div>

              <div className="p-6">
                <h3 className="font-display text-xl font-semibold mb-2">{c.title}</h3>
                <p className="text-white/55 text-[15px] leading-relaxed">{c.desc}</p>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <div className="flex gap-2">
                    <span className="text-[11px] px-2 py-1 rounded-md bg-white/5 text-white/60">Tilda</span>
                    <span className="text-[11px] px-2 py-1 rounded-md bg-white/5 text-white/60">amoCRM</span>
                    <span className="text-[11px] px-2 py-1 rounded-md bg-white/5 text-white/60">Метрика</span>
                  </div>
                  <span className="text-[#66e6ff] group-hover:translate-x-1 transition-transform">→</span>
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
              Превратим ваш бизнес <br />
              в <span className="text-gradient">premium digital-бренд</span>.
            </h2>
            <p className="mt-7 text-white/60 text-lg max-w-xl">
              Бесплатная 30-минутная консультация. Покажем 2 кейса из вашей ниши и оценим вашу упаковку.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#contact" className="btn-primary">Оставить заявку</a>
              <a href="#cases" className="btn-ghost">Посмотреть портфолио</a>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 text-sm">
              {[
                ["120+", "проектов"],
                ["98%", "клиентов возвращаются"],
                ["14 дней", "средний срок запуска"],
                ["4.9/5", "оценка на Behance"],
              ].map(([n, t]) => (
                <div key={t}>
                  <div className="font-display text-3xl font-bold text-gradient-blue">{n}</div>
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
  const [budget, setBudget] = useState("300–600k");
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <section id="contact" className="relative py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="reveal">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#66e6ff] mb-4">/ 05 — Заявка</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Расскажите <span className="text-gradient">о проекте</span>
          </h2>
          <p className="mt-5 text-white/55 text-lg max-w-md">
            Ответим в течение часа в рабочее время. Подготовим референсы, предварительную смету и таймлайн.
          </p>

          <div className="mt-10 space-y-5">
            {[
              ["Email", "hello@neura.studio", "M3 8l9 6 9-6M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"],
              ["Telegram", "@neura_studio", "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"],
              ["Москва", "Студия · Большая Никитская, 14", "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],
            ].map(([l, v, p]) => (
              <div key={l} className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl glass flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#66e6ff]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={p} /></svg>
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-white/40">{l}</div>
                  <div className="text-white/90 mt-0.5">{v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal">
          <form
            ref={formRef}
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="glass-strong rounded-2xl p-7 md:p-9 glow-border space-y-5"
          >
            {sent ? (
              <div className="text-center py-12">
                <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-[#4d7cff] to-[#8b5cff] flex items-center justify-center mb-5">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h3 className="font-display text-2xl font-semibold">Заявка отправлена</h3>
                <p className="text-white/55 mt-3">Свяжемся в течение часа в рабочее время.<br />А пока — посмотрите кейсы 👀</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] uppercase tracking-widest text-white/40 mb-2 block">Имя</label>
                    <input className="field" placeholder="Александр" required />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-widest text-white/40 mb-2 block">Telegram / Email</label>
                    <input className="field" placeholder="@username" required />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-widest text-white/40 mb-2 block">Компания / ниша</label>
                  <input className="field" placeholder="Beauty-клиника / онлайн-школа / B2B" />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-widest text-white/40 mb-2 block">Бюджет</label>
                  <div className="grid grid-cols-4 gap-2">
                    {["до 300k", "300–600k", "600k–1M", "1M+"].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBudget(b)}
                        className={`text-xs py-2.5 rounded-lg border transition ${
                          budget === b
                            ? "bg-gradient-to-r from-[#4d7cff] to-[#8b5cff] border-transparent text-white"
                            : "bg-white/[0.03] border-white/10 text-white/60 hover:border-[#8b5cff]/40"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-widest text-white/40 mb-2 block">О задаче</label>
                  <textarea className="field min-h-[110px] resize-none" placeholder="Что нужно сделать, какие сроки, есть ли готовый бренд…" />
                </div>

                <button type="submit" className="btn-primary w-full !py-4">Отправить заявку →</button>
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#5ea0ff] to-[#8b5cff] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M12 2 L4 7 V17 L12 22 L20 17 V7 Z" />
                </svg>
              </div>
              <div className="font-display text-xl font-bold">NEURA<span className="text-[#8b5cff]">.</span></div>
            </div>
            <p className="text-white/45 text-sm max-w-xs leading-relaxed">
              AI-студия премиум-уровня. Превращаем бизнес в digital-бренды, которые продают.
            </p>
            <div className="flex gap-2 mt-6">
              {["TG", "BE", "DR", "IG"].map((s) => (
                <a key={s} href="#" className="h-9 w-9 rounded-lg glass flex items-center justify-center text-xs text-white/60 hover:text-white hover:border-[#8b5cff]/40 transition">{s}</a>
              ))}
            </div>
          </div>

          {[
            { t: "Услуги", l: ["Лендинги", "Корпоративные сайты", "Digital-брендинг", "AI-исследования"] },
            { t: "Студия", l: ["О нас", "Кейсы", "Процесс", "Карьера"] },
            { t: "Контакты", l: ["hello@neura.studio", "+7 (495) 800 12 00", "@neura_studio", "Москва"] },
          ].map((g) => (
            <div key={g.t}>
              <div className="text-[11px] uppercase tracking-widest text-white/40 mb-4">{g.t}</div>
              <ul className="space-y-2.5">
                {g.l.map((i) => (
                  <li key={i}><a href="#" className="text-white/70 hover:text-white text-sm transition">{i}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Big logo */}
        <div className="font-display font-bold text-[clamp(60px,18vw,260px)] leading-none tracking-tighter text-gradient text-center select-none opacity-90">
          NEURA.
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/35">
          <div>© 2026 NEURA Studio · Все права защищены</div>
          <div className="flex gap-5">
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
