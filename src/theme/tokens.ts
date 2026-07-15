/* src/theme/tokens.ts */

export const colors = {
  primary: "#2260FF",
  secondary: "#809CFF",
  tertiary: "#CAD6FF",
  muted: "#ECF1FF",
  white: "#FFFFFF",
  ink: "#070707",
  error: "#EF4444",
} as const;

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
} as const;

export const radius = {
  lg: 16,
  xl: 20,
  "2xl": 24,
  full: 9999,
} as const;

export const font = {
  family: {
    light: "LeagueSpartan-Light",
    regular: "LeagueSpartan-Regular",
    medium: "LeagueSpartan-Medium",
    semibold: "LeagueSpartan-SemiBold",
    bold: "LeagueSpartan-Bold",
  },
} as const;

export const textStyles = {
  description: {
    fontFamily: "LeagueSpartan-Light",
    fontSize: 12,
    lineHeight: 18,
  },
  value: { fontFamily: "LeagueSpartan-Medium", fontSize: 12, lineHeight: 18 },
  subtitle: {
    fontFamily: "LeagueSpartan-Medium",
    fontSize: 14,
    lineHeight: 20,
  },
  label: { fontFamily: "LeagueSpartan-Medium", fontSize: 20, lineHeight: 26 },
  title: { fontFamily: "LeagueSpartan-Medium", fontSize: 24, lineHeight: 30 },
  heading: {
    fontFamily: "LeagueSpartan-SemiBold",
    fontSize: 24,
    lineHeight: 30,
  },
  button: { fontFamily: "LeagueSpartan-Medium", fontSize: 24, lineHeight: 30 },
} as const;
