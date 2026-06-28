/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Nunito Sans"', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#43A6EE',
          50: '#f0f8fe',
          100: '#e0f0fd',
          200: '#bae0fa',
          300: '#7cc5f5',
          400: '#43a6ee',
          500: '#1b8de0',
          600: '#0e70be',
          700: '#0c5a9b',
          800: '#0f4c80',
          900: '#12406a',
        },
        success: {
          DEFAULT: '#28c76f',
          50: '#eaf9f0',
          100: '#d4f4e2',
          200: '#a0e8c0',
          300: '#62d79a',
          400: '#28c76f',
          500: '#1eb160',
          600: '#138d4a',
          700: '#116f3d',
          800: '#125833',
          900: '#11492b',
          950: '#082917',
        },
        danger: {
          DEFAULT: '#F93C65',
          50: '#fff0f2',
          100: '#ffe3e8',
          200: '#ffcdd6',
          300: '#ffa3b5',
          400: '#fe708c',
          500: '#f93c65',
          600: '#e71b4a',
          700: '#c31039',
          800: '#a41135',
          900: '#891430',
          950: '#4d0515',
        },
        body: '#F5F6FA',
        charcoal: '#202224',
        black: '#1A1A1A',
        white: '#FFFFFF',
        typography: {
          heading: '#4B465C',
          muted: '#4B465C',
          placeholder: '#BABABA',
        },
      }
    },
  },
  plugins: [],
}
