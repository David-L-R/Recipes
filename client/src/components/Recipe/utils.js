// Nitzan Cohen, 2023
export const pickRandomNumbers = (total, max) => {
  const randomUniqueNumbers = new Set();

  while (randomUniqueNumbers.size < total) {
    randomUniqueNumbers.add(Math.floor(Math.random() * max));
  }

  return Array.from(randomUniqueNumbers);
};
