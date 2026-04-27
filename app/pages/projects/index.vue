<template>
  <div class="min-h-screen text-[#131313] font-mono overflow-x-hidden">
                <div class="absolute inset-0 opacity-[0.03] pointer-events-none"
                style="background-size:32px 32px; background-image: linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px);">
            </div>
    <section class="px-4 sm:px-8 md:px-12 py-16 md:py-20">
      <div class="max-w-6xl mx-auto">

        <div class="reveal-up flex items-center gap-4 mb-10">
          <span class="text-[9px] tracking-[0.22em] uppercase text-[#aaa]">[ 001 ]</span>
          <div class="flex-1 h-px bg-[#e0dddc]"></div>
          <span class="text-[9px] tracking-[0.22em] uppercase text-[#aaa]">ALL_PROJECTS</span>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e0dddc]">
          <div
            v-for="(project, i) in projects"
            :key="project.id"
            class="project-card group bg-white flex flex-col overflow-hidden cursor-default"
            :style="`animation-delay:${i * 0.06}s`"
          >
            <!-- Image -->
            <div class="relative overflow-hidden aspect-[16/10] flex-shrink-0 bg-[#f5f3f2]">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <!-- Vignette -->
              <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.12)_100%)]"></div>
              <!-- ID badge -->
              <div class="absolute top-3 right-3 bg-white/90 border border-[#e0dddc] px-2 py-0.5 backdrop-blur-sm">
                <span class="text-[8px] tracking-widest text-[#9e9a98]">{{ String(project.id).padStart(2, '0') }}</span>
              </div>
              <!-- Category badge -->
              <div class="absolute bottom-3 left-3 bg-white/90 border border-[#e0dddc] px-2 py-0.5 backdrop-blur-sm">
                <span class="text-[8px] tracking-[0.15em] uppercase text-[#5d5f5f]">{{ project.category }}</span>
              </div>
            </div>

            <!-- Info -->
            <div class="flex flex-col flex-1 p-5 border-t border-[#e0dddc] group-hover:bg-[#131313] transition-colors duration-300">
              <!-- Title row -->
              <div class="flex items-start justify-between gap-3 mb-2">
                <h3 class="text-sm font-black text-[#131313] group-hover:text-white leading-tight tracking-tight transition-colors duration-300">
                  {{ project.title }}
                </h3>
                <span class="text-[#ccc] group-hover:text-white text-sm group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0 mt-0.5">→</span>
              </div>

              <!-- Description -->
              <p class="text-[11px] text-[#5d5f5f] group-hover:text-[#888] leading-relaxed mb-4 flex-1 transition-colors duration-300">
                {{ project.description }}
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="text-[8px] border border-[#e0dddc] group-hover:border-[#333] px-2 py-0.5 text-[#aaa] group-hover:text-[#666] uppercase tracking-widest transition-colors duration-300"
                >{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup>
const projects = [
  {
    id: 1,
    slug: 'phanna-erp',
    title: 'Phanna Computer ERP',
    category: 'Enterprise System',  
    description: 'Comprehensive e-commerce and inventory management system with ABA PayWay and KHQR payment integrations.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    tags: ['Laravel', 'Filament', 'Livewire', 'PostgreSQL'],
  },
  {
    id: 2,
    slug: 'portfolio-cms',
    title: 'Portfolio CMS',
    category: 'Web App',
    description: 'Custom CMS with headless architecture and a Nuxt 3 frontend for managing portfolio content.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80',
    tags: ['Nuxt 3', 'Vue.js', 'Express.js', 'MongoDB'],
  },
  {
    id: 3,
    slug: 'landing-builder',
    title: 'Landing Page Builder',
    category: 'Tool',
    description: 'Drag-and-drop builder focused on performance and SEO for small business landing pages.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    tags: ['Vue.js', 'Tailwind', 'Node.js'],
  },
  {
    id: 4,
    slug: 'api-gateway',
    title: 'REST API Gateway',
    category: 'Backend',
    description: 'High-performance API gateway with rate limiting, caching, and JWT authentication.',
    image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800&q=80',
    tags: ['Laravel', 'PostgreSQL', 'Redis', 'Docker'],
  },
  {
    id: 5,
    slug: 'khqr-dashboard',
    title: 'KHQR Dashboard',
    category: 'Fintech',
    description: 'Real-time payment monitoring for KHQR transactions with analytics and export features.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    tags: ['Nuxt 3', 'Laravel', 'WebSockets'],
  },
  {
    id: 6,
    slug: 'school-mgmt',
    title: 'School Management System',
    category: 'Enterprise System',
    description: 'Full school administration platform covering students, attendance, grades, and fees.',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
    tags: ['Laravel', 'Filament', 'Alpine.js', 'MySQL'],
  },
]

const allTags = computed(() => [...new Set(projects.flatMap(p => p.tags))])

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.08 }
  )
  document.querySelectorAll('.reveal-up, .project-card').forEach(el => observer.observe(el))
})
</script>

<style scoped>
*, *::before, *::after { border-radius: 0 !important; }

.text-outline {
  -webkit-text-stroke: 2px #131313;
  color: transparent;
}

.reveal-up {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1);
}
.reveal-up.visible { opacity: 1; transform: translateY(0); }

.project-card {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1);
}
.project-card.visible { opacity: 1; transform: translateY(0); }
</style>