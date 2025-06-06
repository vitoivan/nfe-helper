import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function downloadSVG(id: string, filename = "qrcode.svg") {

  const element = document.getElementById(id);

  if (!element) {
    console.error(`Element not found`);
    return;
  }

  const svgData = element.outerHTML;
  const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });

  const downloadUrl = URL.createObjectURL(blob);

  // Trigger the download
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);
}
