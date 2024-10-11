// tailwind.config.js
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#294C60", // primary color
              foreground: "#FFFFFF",
            },
            secondary: {
              DEFAULT: "#34E4EA", // secondary color
              foreground: "#FFFFFF",
            },
          },
        },
      },
    }),
  ],
};
