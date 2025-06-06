import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function downloadSVG(id: string) {
  const element = document.getElementById(id);

  if (!element) {
    console.error(`Element not found`);
    return;
  }

  const svgData = element.outerHTML;
  const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });

  const downloadUrl = URL.createObjectURL(blob);
  const img = document.createElement('img');

  img.addEventListener('load', () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.fillStyle = 'white';
    context.drawImage(img, 0, 0);

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg');
    link.download = 'download.jpg';
    link.click();

    URL.revokeObjectURL(downloadUrl);
  });

  img.src = downloadUrl;
}
