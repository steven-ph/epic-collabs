const breakpoints = [
  '0320px', // xxs
  '0480px', // xs
  '0576px', // sm
  '0768px', // md
  '0992px', // lg
  '1200px', // xl
  '1500px' // xxl - 1440 + gutter*2
  // nothing > xxl
];

breakpoints.xxs = breakpoints[0];
breakpoints.xs = breakpoints[1];
breakpoints.sm = breakpoints[2];
breakpoints.md = breakpoints[3];
breakpoints.lg = breakpoints[4];
breakpoints.xl = breakpoints[5];
breakpoints.xxl = breakpoints[6];

export { breakpoints };
