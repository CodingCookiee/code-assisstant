/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        generalsans: ["General Sans", "sans-serif"],
        'sf-light': ['SF Pro Text Light', 'sans-serif'],
        'sf-regular': ['SF Pro Text Regular', 'sans-serif'],
        'sf-medium': ['SF Pro Text Medium', 'sans-serif'],
        'sf-semibold': ['SF Pro Text Semibold', 'sans-serif'],
        'sf-bold': ['SF Pro Text Bold', 'sans-serif'],
        'sf-heavy': ['SF Pro Text Heavy', 'sans-serif'],
      },
      colors: {  
        light: {
          primary: "#FFFFFF",
          secondary: "#F0F2FA",
          text: "#1A1A1A",
          accent: "#5724ff",
        },
        dark: {
          primary: "#0E0E10",
          secondary: "#1C1C21",
          text: "#FFFFFF",
          accent: "#edff66",
        },
      },
     
    },
  },
  plugins: [],
};
