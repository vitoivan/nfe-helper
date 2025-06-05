export function generateNNF(): string {
  return String(Math.floor(Math.random() * 100_000_000)).padStart(8, '0');
}
