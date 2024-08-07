/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          50: "#FFEBEB",
          100: "#FFD6D6",
          200: "#FFADAD",
          300: "#FF8585",
          400: "#FF5C5C",
          500: "#FF3131",
          600: "#F50000",
          700: "#B80000",
          800: "#7A0000",
          900: "#3D0000",
          950: "#1F0000",
        },
        secondary: {
          50: "#DBEBFF",
          100: "#BDD9FF",
          200: "#7AB4FF",
          300: "#338BFF",
          400: "#0068F0",
          500: "#004AAD",
          600: "#003C8A",
          700: "#002C66",
          800: "#001F47",
          900: "#000F24",
          950: "#00070F",
        },
      },
    },
  },
  plugins: [],
};
