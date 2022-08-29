export const randomFiveNumbers = () =>
  (Math.floor(Math.random() * 100000) + 100000).toString().substring(1);
