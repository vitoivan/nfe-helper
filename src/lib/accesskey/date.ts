export function getYear(year?: string): string {
  if (!year) {
    year = new Date().getFullYear().toString();
  }
  const parsed = parseInt(year, 10);
  return String(parsed % 100).padStart(2, '0');
}

export function getMonth(month?: string): string {
  if (!month) {
    month = String(new Date().getMonth() + 1);
  }
  const parsed = parseInt(month, 10);
  return String(parsed).padStart(2, '0');
}
