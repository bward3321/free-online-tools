export interface TrueRateShareCardData {
  salary: number;
  paperRate: number;
  trueRate: number;
  jobTitle: string;
  unpaidHrsPerWeek: number;
  annualExpenses: number;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export function generateTrueRateShareCard(data: TrueRateShareCardData): HTMLCanvasElement {
  const W = 1200, H = 630;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Background
  ctx.fillStyle = "#1a1a1e";
  ctx.fillRect(0, 0, W, H);

  // Inner card
  const pad = 50;
  roundRect(ctx, pad, pad, W - pad * 2, H - pad * 2, 24);
  ctx.fillStyle = "#27272b";
  ctx.fill();
  ctx.strokeStyle = "#3a3a42";
  ctx.lineWidth = 2;
  ctx.stroke();

  const font = "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  // "MY SALARY SAYS $XX,XXX"
  ctx.fillStyle = "#9b9ba6";
  ctx.font = `600 22px ${font}`;
  ctx.textAlign = "center";
  ctx.fillText(`MY SALARY SAYS $${data.salary.toLocaleString()}`, W / 2, pad + 60);

  // "BUT MY TRUE HOURLY RATE IS"
  ctx.fillStyle = "#e8e8ec";
  ctx.font = `600 20px ${font}`;
  ctx.fillText("BUT MY TRUE HOURLY RATE IS", W / 2, pad + 95);

  // Big true rate
  const rateText = "$" + data.trueRate.toFixed(2) + "/hr";
  ctx.fillStyle = "#DC2626";
  ctx.font = `800 80px ${font}`;
  ctx.fillText(rateText, W / 2, pad + 195);

  // Job title comparison
  ctx.fillStyle = "#e8e8ec";
  ctx.font = `500 22px ${font}`;
  ctx.fillText(`That's what a ${data.jobTitle.toLowerCase()} makes.`, W / 2, pad + 240);

  // Stats line
  const stats: string[] = [];
  if (data.unpaidHrsPerWeek > 0) {
    stats.push(`I give ${data.unpaidHrsPerWeek.toFixed(1)} hrs/week of FREE labor`);
  }
  if (data.annualExpenses > 0) {
    stats.push(`and spend $${Math.round(data.annualExpenses / 1000)}K/yr just to show up`);
  }
  if (stats.length > 0) {
    ctx.fillStyle = "#9b9ba6";
    ctx.font = `400 19px ${font}`;
    ctx.fillText(stats.join(" "), W / 2, pad + 290);
  }

  // Divider
  const divY = pad + 340;
  ctx.strokeStyle = "#3a3a42";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad + 80, divY);
  ctx.lineTo(W - pad - 80, divY);
  ctx.stroke();

  // CTA
  ctx.fillStyle = "#e8e8ec";
  ctx.font = `600 24px ${font}`;
  ctx.fillText("What's YOUR true rate?", W / 2, divY + 55);

  // URL
  ctx.fillStyle = "#6b6b76";
  ctx.font = `400 16px ${font}`;
  ctx.fillText("everyfreetool.com/business-tools/true-hourly-rate-calculator", W / 2, divY + 95);

  return canvas;
}

export function shareCardToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), "image/png");
  });
}

export function getShareText(data: TrueRateShareCardData): string {
  const salaryK = Math.round(data.salary / 1000);
  let text = `My salary says $${salaryK}K but my TRUE hourly rate is $${data.trueRate.toFixed(2)} \u2014 what a ${data.jobTitle.toLowerCase()} makes.`;
  if (data.unpaidHrsPerWeek > 0) {
    text += ` I give ${data.unpaidHrsPerWeek.toFixed(1)} hours/week of FREE labor to my employer.`;
  }
  text += ` What\u2019s your true rate? \u2192 everyfreetool.com/business-tools/true-hourly-rate-calculator`;
  return text;
}

export function getTwitterUrl(text: string): string {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
}

export function getLinkedInUrl(): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://everyfreetool.com/business-tools/true-hourly-rate-calculator")}`;
}
