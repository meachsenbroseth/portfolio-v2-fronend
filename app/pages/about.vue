<template>
    <div class="min-h-screen bg-white text-[#131313] font-mono overflow-x-hidden">

        <section class="relative border-b border-[#e0dddc] px-4 sm:px-8 md:px-12 pt-16 pb-20 md:py-32 overflow-hidden">
            <div class="absolute inset-0 opacity-[0.03] pointer-events-none"
                style="background-size:32px 32px; background-image: linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px);">
            </div>

            <div class="absolute inset-4 pointer-events-none border-x border-y border-transparent">
                <span class="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#ccc]"></span>
                <span class="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#ccc]"></span>
            </div>

            <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">

                <div class="order-2 lg:order-1 space-y-8 reveal-left">
                    <p class="text-[9px] tracking-[0.32em] uppercase text-[#aaa] font-bold">// @system.profile_v2</p>

                    <h1
                        class="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight whitespace-pre-line min-h-[2.2em]">
                        <span>{{ typedText }}</span>
                        <span
                            class="inline-block w-[3px] h-[0.8em] bg-[#131313] align-middle ml-1 transition-opacity duration-75"
                            :class="cursorVisible ? 'opacity-100' : 'opacity-0'"></span>
                    </h1>

                    <div class="max-w-md space-y-6">
                        <p
                            class="text-[#5d5f5f] leading-relaxed text-sm sm:text-base border-l-2 border-[#131313] pl-5 py-1">
                            Hey, I'm <span class="text-[#131313] font-bold">Seth</span>.
                            I'm a professional nerd who obsessed with the <span class="text-[#131313] font-bold">TALL
                                Stack</span>
                            and <span class="text-[#131313] font-bold">Nuxt</span>. I build enterprise systems,
                            high-performance APIs, and occasionally break things just to learn how to fix them.
                        </p>

                        <div class="flex flex-wrap gap-3 pt-2">
                            <div
                                class="bg-[#131313] text-white px-4 py-2.5 text-[9px] tracking-[0.2em] uppercase flex items-center gap-2 border border-[#131313]">
                                <span class="w-1.5 h-1.5 bg-[#28c840] animate-pulse"></span>
                                Status: Available
                            </div>
                            <div
                                class="border border-[#e0dddc] px-4 py-2.5 text-[9px] tracking-[0.2em] uppercase text-[#5d5f5f] bg-[#fafafa]">
                                Phnom Penh, KH
                            </div>
                            <div
                                class="border border-[#e0dddc] px-4 py-2.5 text-[9px] tracking-[0.2em] uppercase text-[#5d5f5f]">
                                UTC+7
                            </div>
                        </div>
                    </div>
                </div>

                <div class="order-1 lg:order-2 reveal-right relative group">
                    <div
                        class="absolute inset-0 border border-[#e0dddc] translate-x-3 translate-y-3 group-hover:translate-x-5 group-hover:translate-y-5 transition-transform duration-500">
                    </div>
                    <div
                        class="absolute inset-0 border border-[#e0dddc] -translate-x-3 -translate-y-3 group-hover:-translate-x-5 group-hover:-translate-y-5 transition-transform duration-500">
                    </div>

                    <div class="relative border border-[#131313] overflow-hidden bg-[#f5f3f2]">
                        <img src="https://i.pinimg.com/736x/ad/83/26/ad83266f29567835516024bb1fdff3a7.jpg"
                            class="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105"
                            alt="Meach Senbroseth" />
                        <div
                            class="absolute top-3 left-3 bg-white/90 border border-[#e0dddc] px-2 py-1 backdrop-blur-sm text-[8px] tracking-widest text-[#9e9a98] uppercase">
                            MSB_PROFILE.JPG
                        </div>
                        <div
                            class="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_60%,rgba(0,0,0,0.1)_100%)]">
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="relative px-4 sm:px-6 md:px-10 py-16 sm:py-20 md:py-24 bg-white border-t border-[#e0dddc]">
            <div class="max-w-6xl mx-auto">

                <div class="reveal-up flex items-center gap-4 mb-12 sm:mb-16 md:mb-20">
                    <span class="text-[9px] tracking-[0.22em] uppercase text-[#aaa]">[ 002 ]</span>
                    <div class="flex-1 h-px bg-[#e0dddc]"></div>
                    <span class="text-[9px] tracking-[0.22em] uppercase text-[#aaa]">BACKGROUND_LOGS</span>
                </div>

                <div class="grid md:grid-cols-2 gap-12 md:gap-16">

                    <div class="space-y-8 sm:space-y-10">
                        <div class="flex items-center gap-3 mb-6 sm:mb-8">
                            <Icon name="ph:terminal-window-bold" size="20" class="text-[#131313]" />
                            <h2 class="text-xs font-black uppercase tracking-[0.4em] text-[#131313]">experience.sys</h2>
                        </div>

                        <div class="space-y-0 border-l border-[#e0dddc]">
                            <div v-for="(item, i) in experience" :key="item.id"
                                class="relative pl-6 sm:pl-8 pb-10 sm:pb-12 group last:pb-0">
                                <div
                                    class="absolute left-[-5px] top-0 w-[9px] h-[9px] bg-white border border-[#131313] group-hover:bg-[#131313] transition-colors duration-300">
                                </div>

                                <div class="reveal-up" :style="`animation-delay:${i * 0.1}s`">
                                    <div class="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                                        <span
                                            class="text-[9px] sm:text-[10px] font-bold text-[#131313] uppercase tracking-widest">{{
                                                item.date }}</span>
                                        <span class="text-[9px] sm:text-[10px] text-[#aaa]">—</span>
                                        <span
                                            class="text-[9px] sm:text-[10px] font-bold text-[#28c840] uppercase tracking-tighter">{{
                                                item.company }}</span>
                                    </div>

                                    <h3
                                        class="text-base sm:text-lg font-black text-[#131313] uppercase tracking-tight mb-2 sm:mb-3 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform duration-300">
                                        {{ item.title }}
                                    </h3>

                                    <p class="text-xs sm:text-sm text-[#5d5f5f] leading-relaxed max-w-md">
                                        {{ item.desc }}
                                    </p>

                                    <div class="flex gap-1.5 sm:gap-2 mt-3 sm:mt-4 flex-wrap">
                                        <span v-for="tag in item.tags" :key="tag"
                                            class="text-[7px] sm:text-[8px] border border-[#e0dddc] px-1.5 sm:px-2 py-0.5 text-[#aaa] uppercase tracking-widest">
                                            {{ tag }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-8 sm:space-y-10">
                        <div class="flex items-center gap-3 mb-6 sm:mb-8">
                            <Icon name="ph:graduation-cap-bold" size="20" class="text-[#131313]" />
                            <h2 class="text-xs font-black uppercase tracking-[0.4em] text-[#131313]">education.cfg</h2>
                        </div>

                        <div class="space-y-0 border-l border-[#e0dddc]">
                            <div v-for="(item, i) in education" :key="item.id"
                                class="relative pl-6 sm:pl-8 pb-10 sm:pb-12 group last:pb-0">
                                <div
                                    class="absolute left-[-5px] top-0 w-[9px] h-[9px] bg-white border border-[#131313] group-hover:bg-[#131313] transition-colors duration-300">
                                </div>

                                <div class="reveal-up" :style="`animation-delay:${0.2 + i * 0.1}s`">
                                    <div class="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                                        <span
                                            class="text-[9px] sm:text-[10px] font-bold text-[#131313] uppercase tracking-widest">{{
                                                item.date }}</span>
                                        <span class="text-[9px] sm:text-[10px] text-[#aaa]">—</span>
                                        <span
                                            class="text-[9px] sm:text-[10px] font-bold text-[#131313] uppercase tracking-tighter">{{
                                                item.institution }}</span>
                                    </div>

                                    <h3
                                        class="text-base sm:text-lg font-black text-[#131313] uppercase tracking-tight mb-2 sm:mb-3 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform duration-300">
                                        {{ item.title }}
                                    </h3>

                                    <p class="text-xs sm:text-sm text-[#5d5f5f] leading-relaxed max-w-md">
                                        {{ item.desc }}
                                    </p>

                                    <div class="flex gap-1.5 sm:gap-2 mt-3 sm:mt-4 flex-wrap">
                                        <span v-for="tag in item.focus" :key="tag"
                                            class="text-[7px] sm:text-[8px] border border-[#e0dddc] px-1.5 sm:px-2 py-0.5 text-[#aaa] uppercase tracking-widest">
                                            {{ tag }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

    </div>
</template>

<script setup>
// Typing words adjusted to your specific expertise
const experience = [
    {
        id: 1,
        title: 'Full-Stack Developer',
        company: 'Phanna Computer',
        date: '2025 — PRESENT',
        desc: 'Architecting a comprehensive e-commerce and inventory management system using the TALL stack. Implementing ABA PayWay and KHQR payment integrations.',
        tags: ['Laravel', 'Filament', 'Livewire', 'PostgreSQL']
    },
    {
        id: 2,
        title: 'Web Developer (Freelance)',
        company: 'Self-Employed',
        date: '2023 — 2024',
        desc: 'Developed custom Portfolio CMS solutions and business landing pages with Nuxt 3 and Tailwind CSS. Focused on SEO and performance optimization.',
        tags: ['Nuxt 3', 'Vue.js', 'Express.js', 'MongoDB']
    }
]

const education = [
    {
        id: 1,
        title: 'Computer Science & Engineering',
        date: '2020 — 2024',
        desc: 'Deep focus on MVC architecture, database normalization, and secure API design. Final projects specialized in management system automation.',
        institution: 'University',
        focus: ['MVC', 'Database', 'API Design']
    },
    {
        id: 2,
        title: 'Full-Stack Certification',
        date: '2022',
        desc: 'Advanced training in modern JavaScript frameworks and backend PHP ecosystems (Laravel/Filament).',
        institution: 'Institute',
        focus: ['JavaScript', 'PHP', 'Laravel']
    }
]

const words = [
    'IT WORKS\nON MY MACHINE',
    'STACK OVERFLOW\nENGINEER',
    'JUST ONE MORE\nCOMMIT',
    'SHIP IT\nIT IS FINE',
]

const typedText = ref('')
const cursorVisible = ref(true)
let wordIndex = 0
let charIndex = 0
let deleting = false

const typeLoop = () => {
    const current = words[wordIndex]
    if (!deleting) {
        typedText.value = current.slice(0, charIndex + 1)
        charIndex++
        if (charIndex === current.length) {
            deleting = true
            setTimeout(typeLoop, 2000)
            return
        }
    } else {
        typedText.value = current.slice(0, charIndex - 1)
        charIndex--
        if (charIndex === 0) {
            deleting = false
            wordIndex = (wordIndex + 1) % words.length
            setTimeout(typeLoop, 500)
            return
        }
    }
    setTimeout(typeLoop, deleting ? 40 : 80)
}

onMounted(() => {
    typeLoop()
    setInterval(() => {
        cursorVisible.value = !cursorVisible.value
    }, 530)

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible')
                observer.unobserve(entry.target)
            }
        })
    }, { threshold: 0.1 })

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => observer.observe(el))
})
</script>

<style scoped>
*,
*::before,
*::after {
    border-radius: 0 !important;
}

.reveal-up,
.reveal-left,
.reveal-right {
    opacity: 0;
    transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-up {
    transform: translateY(30px);
}

.reveal-left {
    transform: translateX(-30px);
}

.reveal-right {
    transform: translateX(30px);
}

.visible {
    opacity: 1;
    transform: translate(0);
}

.skill-item {
    box-shadow: inset 0 0 0 0 #131313;
}
</style>