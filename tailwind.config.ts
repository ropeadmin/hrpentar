import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		// borderRadius: {
  		// 	lg: 'var(--radius)',
  		// 	md: 'calc(var(--radius) - 2px)',
  		// 	sm: 'calc(var(--radius) - 4px)'
  		// },
  		colors: {
        n50: "#FBFBFC",
        n75: "#F9FAFB",
        n100: "#F0F2F5",
        n200: "#E4E8EC",
        n300: "#D0D6DD",
        n400: "#A0AEC0",
        n500: "#687588",
        n600: "#323B49",
        n800: "#182434",
        n900: "#0F1625",
        r200: "#FFF3F3",
        r600: '#F55C5C'
      }
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
