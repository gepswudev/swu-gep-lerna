/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "dark",
      {
        main: {
          primary: "#00A2E0",
          secondary: "#9AC2D1",
          accent: "#1DCDBC",
          neutral: "#2B3440",
          "base-100": "#ffffff",
          info: "#3ABFF8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
          gray:"#D3D3D3",
          "dark-gray":"#636466",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
