/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                bask: {
                    100: "#6796c2",
                    200: "#466e94",
                },
                "r-black": {
                    100: "#1a1a1a",
                },
                "r-gray": {
                    100: "#444444",
                    200: "#e1e4e7",
                },
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    1: "hsl(var(--chart-1))",
                    2: "hsl(var(--chart-2))",
                    3: "hsl(var(--chart-3))",
                    4: "hsl(var(--chart-4))",
                    5: "hsl(var(--chart-5))",
                },
            },
            boxShadow: {
                header: "-6px 9px 14px rgba(0, 0, 0, 0.04)",
            },
            keyframes: {
                pulseFontWeight: {
                    "0%, 100%": {
                        transform: "scale(1)",
                        opacity: "1",
                    },
                    "50%": {
                        transform: "scale(1.1)",
                        opacity: "0.9",
                    },
                },
                logoSpin: {
                    "0%": {
                        transform: "rotate(0deg)",
                    },
                    "30%": {
                        transform: "rotate(10deg)",
                    },
                    "60%": {
                        transform: "rotate(00deg)",
                    },
                    "80%": {
                        transform: "rotate(-10deg)",
                    },
                    "100%": {
                        transform: "rotate(0deg)",
                    },
                },
            },
            animation: {
                pulseFontWeight: "pulseFontWeight 800ms infinite",
                logoSpin: "logoSpin 3s linear infinite",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
    },
    plugins: [import("tailwindcss-animate")],
};
