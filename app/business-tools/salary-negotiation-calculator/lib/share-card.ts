export interface SalaryShareCardData {
  raisePercent: number;
  totalLoss: number;
  years: number;
  perDay: number;
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

export function generateSalaryShareCard(data: SalaryShareCardData): HTMLCanvasElement {
  const W = 1200, H = 630;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Background
  ctx.fillStyle = "#1a1a1e";
  ctx.fillRect(0, 0, W, H);

  // Inner card
  const pad = 60;
  roundRect(ctx, pad, pad, W - pad * 2, H - pad * 2, 24);
  ctx.fillStyle = "#27272b";
  ctx.fill();
  ctx.strokeStyle = "#3a3a42";
  ctx.lineWidth = 2;
  ctx.stroke();

  // "NOT NEGOTIATING A X% RAISE" label
  ctx.fillStyle = "#9b9ba6";
  ctx.font = "600 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`NOT NEGOTIATING A ${data.raisePercent}% RAISE`, W / 2, pad + 65);

  // "IS COSTING ME"
  ctx.fillStyle = "#9b9ba6";
  ctx.font = "600 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText("IS COSTING ME", W / 2, pad + 100);

  // Big loss number
  const lossText = "$" + Math.round(data.totalLoss).toLocaleString();
  ctx.fillStyle = "#DC2626";
  ctx.font = "800 80px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText(lossText, W / 2, pad + 200);

  // "OVER X YEARS"
  ctx.fillStyle = "#e8e8ec";
  ctx.font = "600 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText(`OVER ${data.years} YEARS`, W / 2, pad + 245);

  // Per day line
  ctx.fillStyle = "#9b9ba6";
  ctx.font = "400 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText(
    `That\u2019s $${data.perDay.toFixed(2)}/day I\u2019m leaving on the table.`,
    W / 2, pad + 300
  );

  // Divider
  const divY = pad + 350;
  ctx.strokeStyle = "#3a3a42";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad + 80, divY);
  ctx.lineTo(W - pad - 80, divY);
  ctx.stroke();

  // CTA
  ctx.fillStyle = "#e8e8ec";
  ctx.font = "600 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText("How much are YOU leaving behind?", W / 2, divY + 50);

  // URL
  ctx.fillStyle = "#6b6b76";
  ctx.font = "400 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText("everyfreetool.com/business-tools/salary-negotiation-calculator", W / 2, divY + 90);

  return canvas;
}

export function shareCardToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), "image/png");
  });
}

export function getShareText(raisePercent: number, totalLoss: number, years: number, perDay: number): string {
  return `Not negotiating a ${raisePercent}% raise is costing me $${Math.round(totalLoss).toLocaleString()} over ${years} years \u2014 that\u2019s $${perDay.toFixed(2)} every single day. \ud83d\ude33 How much are YOU leaving behind? \u2192 everyfreetool.com/business-tools/salary-negotiation-calculator`;
}

export function getTwitterUrl(text: string): string {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
}

export function getLinkedInUrl(): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://everyfreetool.com/business-tools/salary-negotiation-calculator")}`;
}
