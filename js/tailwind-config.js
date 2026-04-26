tailwind.config = {
    theme: {
        extend: {
            colors: {
                'apex-dark': '#0a192f', // Dark navy blue based on provided images
                'apex-darker': '#050c18', // Even darker navy
                'apex-gold': '#d4af37', // Elegant gold
                'apex-gold-light': '#f3e5ab',
                'apex-gold-dark': '#aa8c2c',
            },
            fontFamily: {
                sans: ['Be Vietnam Pro', 'sans-serif'],
                serif: ['Lora', 'serif'],
                quote: ['Lora', 'serif'],
            },
            backgroundImage: {
                'hero-pattern': "linear-gradient(to right bottom, rgba(10, 25, 47, 0.85), rgba(10, 25, 47, 0.65)), url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80')",
                'contact-pattern': "linear-gradient(to right, rgba(10, 25, 47, 0.95), rgba(10, 25, 47, 0.8)), url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
            }
        }
    }
}
