const defaultTheme = require('tailwindcss/defaultTheme');
const forms = require('@tailwindcss/forms');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },

            colors: {
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring))',

                background: 'oklch(var(--background))',
                foreground: 'oklch(var(--foreground))',

                primary: 'oklch(var(--primary))',
                'primary-foreground': 'oklch(var(--primary-foreground))',

                secondary: 'oklch(var(--secondary))',
                'secondary-foreground': 'oklch(var(--secondary-foreground))',

                muted: 'oklch(var(--muted))',
                'muted-foreground': 'oklch(var(--muted-foreground))',

                accent: 'oklch(var(--accent))',
                'accent-foreground': 'oklch(var(--accent-foreground))',

                destructive: 'oklch(var(--destructive))',
            },

            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
        },
    },

    plugins: [forms],
};
