/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './content/**/*.md',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        pink: '#d344e2',
        peach: '#D7837f'
      },
      fontFamily: {
        sans: ['Asap', 'sans-serif']
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem'
      },
      maxWidth: {
        'content': '640px'
      }
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '640px',
        lg: '640px',
        xl: '640px',
        '2xl': '640px'
      }
    }
  },
  plugins: []
}
