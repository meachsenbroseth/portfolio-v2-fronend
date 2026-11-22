<template>
  <div ref="root"
    class="relative min-h-svh bg-[#fafafa] font-mono text-[#131313] overflow-x-hidden selection:bg-[#131313] selection:text-white"
    @pointermove="onPointerMove" @pointerdown="onPointerMove" @pointerleave="onPointerLeave">

    <!-- Cursor glow + grid revealed around the cursor -->
    <div class="glow pointer-events-none fixed inset-0 z-0" aria-hidden="true"></div>
    <div class="grid-reveal pointer-events-none fixed inset-0 z-0" aria-hidden="true"></div>

    <!-- Scanline texture -->
    <div
      class="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]">
    </div>

    <!-- HERO -->
    <main class="relative z-10 flex min-h-[calc(100svh-45px)] flex-col overflow-hidden">
      <div class="relative min-h-[520px] flex-1">
        <h1
          class="absolute inset-x-0 top-[5%] z-0 px-6 text-center font-sans text-[13vw] font-black uppercase leading-[0.9] tracking-tighter md:top-[10%] md:px-0 md:text-[8.6vw] md:whitespace-nowrap">
          <span class="sr-only">Full-Stack Developer Cambodia: </span>
          <span class="outline-text block md:inline">Meach</span>
          <span class="block md:ml-[0.25em] md:inline">Senbroseth</span>
        </h1>

        <!-- Tech stack popups (behind the portrait) -->
        <div class="pointer-events-none absolute inset-0 z-[5]" aria-hidden="true">
          <div v-for="(tech, i) in techStack" :key="tech.name" class="tech-chip absolute"
            :class="[tech.pos, tech.mobile ? '' : 'hidden md:block']" :style="{ '--d': tech.depth }">
            <div class="tech-pop" :style="{ '--r': tech.rotate + 'deg', animationDelay: 500 + i * 110 + 'ms' }">
              <div class="tech-float" :style="{ animationDelay: i * 0.45 + 's', animationDuration: 4.5 + (i % 4) * 0.7 + 's' }">
                <div
                  class="pointer-events-auto flex cursor-default items-center gap-2 border-2 border-[#131313] bg-white px-2 py-1.5 shadow-[3px_3px_0_#131313] transition-colors duration-200 hover:bg-[#131313] hover:text-white md:gap-3 md:px-4 md:py-2.5 md:shadow-[5px_5px_0_#131313]">
                  <Icon :name="tech.icon" class="h-3.5 w-3.5 md:h-6 md:w-6" :style="{ color: tech.color }" />
                  <span class="text-[9px] font-black uppercase tracking-widest md:text-xs">{{ tech.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <img src="~/assets/images/hero-cutout.webp" width="900" height="1145"
          alt="Meach Senbroseth, full-stack developer in Phnom Penh"
          class="reveal-up absolute bottom-0 left-1/2 z-10 h-[74%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom transition-transform duration-500 hover:scale-[1.02] md:h-[80%]"
          loading="eager" fetchpriority="high" />
      </div>

      <!-- Role / Telegram CTA / socials -->
      <div
        class="relative z-20 flex shrink-0 flex-col gap-5 border-y-2 border-[#131313] bg-white px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6 md:pointer-events-none md:absolute md:inset-x-0 md:bottom-0 md:border-y-0 md:bg-transparent md:px-12 md:pb-12 md:pt-0">

        <div class="reveal-left flex max-w-sm flex-col gap-4 md:pointer-events-auto">

          <p class="text-xs leading-relaxed text-[#131313]/70">
            Full-stack developer in Phnom Penh. I build Laravel and Nuxt apps, APIs and dashboards that ship to production.
          </p>
          <a :href="config.public.telegramUrl" target="_blank" rel="noopener noreferrer"
            aria-label="Message Meach Senbroseth on Telegram"
            class="group inline-flex w-full items-center justify-between gap-6 border-2 border-[#131313] bg-[#229ED9] px-5 py-3.5 text-white shadow-[6px_6px_0_#131313] transition-all duration-150 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_#131313] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none sm:w-auto">
            <span class="text-xs font-black uppercase tracking-widest">Message me on Telegram</span>
            <Icon name="simple-icons:telegram" size="20" class="transition-transform duration-200 group-hover:-rotate-12 group-hover:scale-110" />
          </a>
        </div>

        <div class="reveal-right flex gap-2 sm:flex-col md:pointer-events-auto">
          <a v-for="social in socialLinks" :key="social.name" :href="social.url" target="_blank"
            rel="noopener noreferrer" :aria-label="`${social.name} profile for Meach Senbroseth`"
            class="group flex flex-1 items-center justify-between gap-6 border-2 border-[#131313] bg-white px-3 py-2.5 transition-all hover:bg-[#131313] hover:text-white sm:flex-none md:px-4">
            <span class="text-[10px] font-black uppercase tracking-widest">{{ social.name }}</span>
            <Icon :name="social.icon" size="14" class="opacity-70 transition-opacity group-hover:opacity-100" />
          </a>
        </div>
      </div>
    </main>

    <!-- Tech stack for screen readers and crawlers -->
    <ul class="sr-only" aria-label="Tech stack">
      <li v-for="tech in techStack" :key="tech.name">{{ tech.name }}</li>
    </ul>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

useSEO({
  title: 'Meach Senbroseth - Full-Stack Developer Cambodia',
  description: 'Hire Meach Senbroseth, a full-stack developer in Phnom Penh, Cambodia building Laravel, Nuxt.js, Vue.js, APIs, dashboards, and production web applications.',
  path: '/',
  jsonLd: createWebsiteSchema()
});

const socialLinks = [
  { name: 'GitHub', icon: 'simple-icons:github', url: config.public.githubUrl },
  { name: 'LinkedIn', icon: 'simple-icons:linkedin', url: config.public.linkedinUrl },

];

// pos = tailwind position classes (mobile first), depth = parallax strength in px, mobile = shown below md
const techStack = [
  { name: "Vue.js", icon: "simple-icons:vuedotjs", color: "#42b883", pos: "left-[2%] top-[30%] md:left-[6%] md:top-[30%]", depth: 22, rotate: -4, mobile: true },
  { name: "Laravel", icon: "simple-icons:laravel", color: "#FF2D20", pos: "left-[4%] top-[48%] md:left-[3%] md:top-[46%]", depth: 34, rotate: 3, mobile: true },
  { name: "TypeScript", icon: "simple-icons:typescript", color: "#3178c6", pos: "left-[1%] top-[66%] md:left-[19%] md:top-[37%]", depth: 16, rotate: -2, mobile: true },
  { name: "Docker", icon: "simple-icons:docker", color: "#2496ED", pos: "left-[5%] top-[82%] md:left-[11%] md:top-[60%]", depth: 28, rotate: 4, mobile: true },
  { name: "Nuxt.js", icon: "simple-icons:nuxtdotjs", color: "#00dc82", pos: "hidden md:block md:left-[22%] md:top-[52%]", depth: 40, rotate: -3, mobile: false },
  { name: "Figma", icon: "simple-icons:figma", color: "#F24E1E", pos: "hidden md:block md:left-[24%] md:top-[68%]", depth: 18, rotate: 5, mobile: false },

  { name: "Tailwind", icon: "simple-icons:tailwindcss", color: "#38bdf8", pos: "right-[2%] top-[34%] md:right-[7%] md:top-[31%]", depth: 26, rotate: 4, mobile: true },
  { name: "PostgreSQL", icon: "simple-icons:postgresql", color: "#336791", pos: "right-[3%] top-[52%] md:right-[3%] md:top-[47%]", depth: 36, rotate: -3, mobile: true },
  { name: "PHP", icon: "simple-icons:php", color: "#777BB4", pos: "right-[1%] top-[70%] md:right-[19%] md:top-[38%]", depth: 20, rotate: 2, mobile: true },
  { name: "Git", icon: "simple-icons:git", color: "#F05032", pos: "right-[6%] top-[86%] md:right-[12%] md:top-[61%]", depth: 30, rotate: -5, mobile: true },
  { name: "Node.js", icon: "simple-icons:nodedotjs", color: "#339933", pos: "hidden md:block md:right-[22%] md:top-[53%]", depth: 42, rotate: 3, mobile: false },
  { name: "MongoDB", icon: "simple-icons:mongodb", color: "#47A248", pos: "hidden md:block md:right-[24%] md:top-[69%]", depth: 14, rotate: -4, mobile: false },
];

// ── Cursor glow + parallax ────────────────────────
const root = ref(null);
let frame = 0;

const onPointerMove = (e) => {
  if (!root.value || frame) return;
  const { clientX, clientY } = e;
  frame = requestAnimationFrame(() => {
    frame = 0;
    const el = root.value;
    if (!el) return;
    el.style.setProperty("--mx", `${clientX}px`);
    el.style.setProperty("--my", `${clientY}px`);
    el.style.setProperty("--px", ((clientX / window.innerWidth - 0.5) * 2).toFixed(3));
    el.style.setProperty("--py", ((clientY / window.innerHeight - 0.5) * 2).toFixed(3));
  });
};

const onPointerLeave = () => {
  const el = root.value;
  if (!el) return;
  el.style.setProperty("--px", "0");
  el.style.setProperty("--py", "0");
};

// ── Progressive Scroll Reveal ─────────────────────
let observer = null;

const observeElements = () => {
  if (typeof IntersectionObserver === "undefined" || !observer) return;
  document
    .querySelectorAll(".reveal-up, .reveal-left, .reveal-right")
    .forEach((el) => {
      if (!el.classList.contains("visible")) {
        observer.observe(el);
      }
    });
};

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "60px 0px" }
  );

  nextTick(() => {
    observeElements();
  });
});

onUnmounted(() => {
  if (frame) cancelAnimationFrame(frame);
  if (observer) {
    observer.disconnect();
    observer = null;
  }
});
</script>

<style scoped>
*,
*::before,
*::after {
  border-radius: 0 !important;
}

/* Hollow first name — page background shows through the letters */
.outline-text {
  color: transparent;
  -webkit-text-stroke: 2px #131313;
}

@media (min-width: 768px) {
  .outline-text {
    -webkit-text-stroke-width: 3px;
  }
}

/* ── Cursor glow ── */
.glow {
  background: radial-gradient(520px circle at var(--mx, 50%) var(--my, 35%),
      rgba(34, 158, 217, 0.2),
      rgba(91, 91, 255, 0.08) 45%,
      transparent 72%);
}

.grid-reveal {
  background-image:
    linear-gradient(rgba(19, 19, 19, 0.14) 1px, transparent 1px),
    linear-gradient(90deg, rgba(19, 19, 19, 0.14) 1px, transparent 1px);
  background-size: 32px 32px;
  -webkit-mask-image: radial-gradient(260px circle at var(--mx, 50%) var(--my, 35%), #000, transparent 100%);
  mask-image: radial-gradient(260px circle at var(--mx, 50%) var(--my, 35%), #000, transparent 100%);
}

/* ── Tech popups: parallax (outer) > pop-in (middle) > float (inner) ── */
.tech-chip {
  transform: translate3d(calc(var(--px, 0) * var(--d) * 1px),
      calc(var(--py, 0) * var(--d) * 1px),
      0);
  transition: transform 0.35s ease-out;
  will-change: transform;
}

.tech-pop {
  opacity: 0;
  animation: tech-pop 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

.tech-float {
  animation: tech-float 5s ease-in-out infinite;
}

@keyframes tech-pop {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.3) rotate(0deg);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1) rotate(var(--r, 0deg));
  }
}

@keyframes tech-float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-9px);
  }
}

/* ── Scroll reveals ── */
.reveal-up,
.reveal-left,
.reveal-right {
  opacity: 0;
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal-up {
  transform: translateY(24px);
}

.reveal-left {
  transform: translateX(-16px);
}

.reveal-right {
  transform: translateX(16px);
}

.reveal-up.visible,
.reveal-left.visible,
.reveal-right.visible {
  opacity: 1;
  transform: translate(0, 0);
}

@media (prefers-reduced-motion: reduce) {
  img {
    transition: none !important;
  }

  .reveal-up,
  .reveal-left,
  .reveal-right {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .tech-chip {
    transform: none;
    transition: none;
  }

  .tech-pop {
    animation: none;
    opacity: 1;
    transform: rotate(var(--r, 0deg));
  }

  .tech-float {
    animation: none;
  }
}
</style>