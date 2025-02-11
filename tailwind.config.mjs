/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        generalsans: ["General Sans", "sans-serif"],
        "pattanakarn-black": ["Pattanakarn Black", "sans-serif"],
        "pattanakarn-bold": ["Pattanakarn Bold", "sans-serif"],
        "pattanakarn-extrabold": ["Pattanakarn ExtraBold", "sans-serif"],
        "pattanakarn-extralight": ["Pattanakarn ExtraLight", "sans-serif"],
        "pattanakarn-light": ["Pattanakarn Light", "sans-serif"],
        "pattanakarn-medium": ["Pattanakarn Medium", "sans-serif"],
        "pattanakarn-semibold": ["Pattanakarn SemiBold", "sans-serif"],
        "pattanakarn-thin": ["Pattanakarn Thin", "sans-serif"],
        "sf-light": ["SF Pro Text Light", "sans-serif"],
        "sf-regular": ["SF Pro Text Regular", "sans-serif"],
        "sf-medium": ["SF Pro Text Medium", "sans-serif"],
        "sf-semibold": ["SF Pro Text Semibold", "sans-serif"],
        "sf-bold": ["SF Pro Text Bold", "sans-serif"],
        "sf-heavy": ["SF Pro Text Heavy", "sans-serif"],
      },
      colors: {
        black: {
          DEFAULT: "#000",
          100: "#010103",
          200: "#0E0E10",
          300: "#1C1C21",
          500: "#3A3A49",
          600: "#1A1A1A",
        },
        white: {
          DEFAULT: "#FFFFFF",
          800: "#E4E4E6",
          700: "#D6D9E9",
          600: "#AFB0B6",
          500: "#62646C",
        },
        light: {
          primary: "#FFFFFF",
          secondary: "#F0F2FA",
          text: "#1A1A1A",
        },
        dark: {
          primary: "#29292c",
          secondary: "#3b3b3f",
          text: "#FFFFFF",
        },
        green: {
          light: "#43dc9b",
        },
        blue: {
          light: "#00c1ff",
          lighter: "#48e9fa",
          medium_light: "#00c1ff",
          medium_dark: "#0084ff",
          dark: "#0084ff",
          darker: "#005ffe",
        },
        app: {
          light: "#08405f",
          dark: "#062636",
        },
      },
    },
  },
  plugins: [],
};
