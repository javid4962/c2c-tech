import forms from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#08111f",
        slateblue: "#0f2744",
        marine: "#13335f",
        mist: "#ebf1f7",
        aqua: "#62e2d0",
        ember: "#ff8a5b",
        ink: "#071731",
        steel: "#6e7d92",
        haze: "#efeee9",
        frost: "#f7f8fb",
      },
      fontFamily: {
        sans: ["'Manrope'", "sans-serif"],
        display: ["'Archivo'", "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 60px rgba(8, 17, 31, 0.12)",
        panel: "0 20px 50px rgba(7, 23, 49, 0.12)",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top left, rgba(98,226,208,0.22), transparent 34%), radial-gradient(circle at 80% 10%, rgba(255,138,91,0.15), transparent 30%), linear-gradient(135deg, #08111f, #102447 62%, #16305a)",
        "navy-grid":
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 1px, transparent 1px), radial-gradient(circle at 80% 40%, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(135deg, #071731, #0d2851 65%, #12386f)",
      },
    },
  },
  plugins: [forms],
};
