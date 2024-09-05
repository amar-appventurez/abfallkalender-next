/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    fontFamily: {
      satoshi: ['Figtree', 'sans-serif'],
    },
    colors: {
      'bg-secondary': '#F0F0F6',
      primary: "#014899",
      'text-inactive': '#8D8D95',
      customBlue: "#4075AD",
      'title3': '#1F1F25',
      'text-secondary': '#63636B',
      'border-color': '#E0E0E9',
      'border-color-1': '#CDCDD6',
      'custom-blue-100': '#CCE4FF',
      'bg-booking-blue': '#192C61',
      'bg-upcoming': '#FFBD70',
      'cyan-200': '#BDEBFB',
      'orange-200': '#FFD7AB',
      'blue-200': '#9AC9FE',
      'red-200': '#FBBEBD',
      "white": "white",
      "worms-brand-2":"#014899"
    },
    fontSize: {
      'title-3': ['24px', '32px'],
      'title-large': ['18px', '22px'],
      'title-large-1': ['18px', '26px'],
      'title-small': ['14px', '14px'],
      'title-tight': ['14px', '20px'],
      'title-5': ['12px', '16px'],
      'title-6': ['12px', '18px'],
      'title-7': ['12px', '12px'],
      'header-description': ['14px', '22px'],
      'header-description-1': ['16px', '20px'],
    },
    fontWeight: {
      normal: 400,
      semiBold: 600,
      'bold-500': 500
    },
  },
  plugins: [],
};
