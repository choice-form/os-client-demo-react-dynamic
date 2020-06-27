const plugin = require("tailwindcss/plugin");

module.exports = {
  // purge: [
  //   './src/**/*.html',
  //   './src/**/*.tsx',
  //   './src/**/*.jsx',
  // ],
  theme: {
    screens: {
      m: { max: "640px" },
      om: { min: "640px" },
      it: { max: "768px" },
      t: { min: "640px", max: "768px" },
      ot: { min: "768px" },
      id: { max: "1280px" },
      d: { min: "768px", max: "1280px" },
      od: { min: "1280px" },
    },
    extend: {
      width: {
        "240": "240px",
        "320": "320px",
        "360": "360px",
        "480": "480px",
        "512": "512px",
        "640": "640px",
        "720": "720px",
        "90vw": "90vw",
        "column-2": "calc(50% - 0.5rem)",
        "column-3": "calc(33.333333% - 0.5rem)",
        "column-4": "calc(25% - 0.5rem)",
      },
      inset: {
        "0": 0,
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        full: "100%",
        "-1": "-0.25rem",
        "-2": "-0.5rem",
        "-3": "-0.75rem",
        "-4": "-1rem",
        "-5": "-1.25rem",
        "-6": "-1.5rem",
        "-7": "-1.75rem",
        "-8": "-2rem",
        auto: "auto",
      },
    },
  },
  variants: {
    textColor: ["responsive", "hover", "focus", "active", "group-hover"],
    backgroundColor: [
      "responsive",
      "hover",
      "group-hover",
      "focus",
      "focus-within",
      "active",
      "odd",
      "even"
    ],
    boxShadow: ["responsive", "hover", "focus", "focus-within"],
  },
  plugins: [
    plugin(function baseAddon({ addBase, config }) {
      addBase({
        h1: { fontSize: config("theme.fontSize.5xl") },
        h2: { fontSize: config("theme.fontSize.4xl") },
        h3: { fontSize: config("theme.fontSize.3xl") },
        h4: { fontSize: config("theme.fontSize.2xl") },
        h5: { fontSize: config("theme.fontSize.xl") },
        h6: { fontSize: config("theme.fontSize.base") },
      });
    }),
  ],
};
