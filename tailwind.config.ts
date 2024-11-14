import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'deep-green': '#294B29',
        'olive-green': '#50623A',
        'light-green': '#789461',
        'white-green': '#DBE7C9',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        fadein: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-10px)', // 시작 시 위치
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)', // 끝 위치
          },
        },
      },
      animation: {
        fadein: 'fadein 1s ease-out', // 애니메이션이 1초 동안 ease-out으로 적용
      },
    },
  },
  plugins: [],
} satisfies Config;