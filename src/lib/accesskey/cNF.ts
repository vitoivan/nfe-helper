export function generateCNF(): string {
  return String(Math.floor(Math.random() * 1_000_000_000)).padStart(9, '0');
}
