import type { Person } from "../types";

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function generatePairings(parrains: Person[], filleuls: Person[]) {
  const shuffledFilleuls = shuffleArray([...filleuls]);
  const shuffledParrains = shuffleArray([...parrains]);

  // Répéter les parrains si nécessaire pour couvrir tous les filleuls
  const extendedParrains = [...shuffledParrains];
  while (extendedParrains.length < shuffledFilleuls.length) {
    extendedParrains.push(...shuffledParrains);
  }

  return shuffledFilleuls.map((filleul, index) => ({
    parrain: extendedParrains[index],
    filleul,
  }));
}
