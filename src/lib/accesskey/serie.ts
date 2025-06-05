export function generateSerie(): string {
  return String(Math.floor(Math.random() * 1000)).padStart(3, '0');
}
