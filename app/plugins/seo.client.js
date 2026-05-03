export default defineNuxtPlugin(() => {
    const router = useRouter()

    // Update meta tags on route change
    router.afterEach((to) => {
        const defaultTitle = 'MSB Seth - Full-Stack Developer Portfolio'
        const defaultDescription = 'Professional full-stack developer specializing in TALL Stack, Nuxt.js, and Laravel. Building enterprise systems and high-performance web applications.'

        // Dynamic titles based on route
        const titles = {
            '/': 'MSB Seth - Full-Stack Developer Portfolio',
            '/projects': 'Projects - MSB Seth Portfolio',
            '/about': 'About Me - Full-Stack Developer',
            '/contact': 'Contact - MSB Seth',
            '/admin': 'Admin Dashboard - MSB Seth'
        }

        const title = titles[to.path] || defaultTitle
        useHead({
            title,
            meta: [
                { name: 'description', content: defaultDescription },
                { property: 'og:title', content: title },
                { property: 'og:url', content: `https://msbseth.com${to.path}` },
                { name: 'twitter:title', content: title }
            ]
        })
    })
})