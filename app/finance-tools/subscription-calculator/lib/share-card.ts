export interface ShareCardData {
  monthly: number;
  yearly: number;
  fiveYear: number;
  count: number;
  topThree: string[];
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

export function generateShareCard(data: ShareCardData): HTMLCanvasElement {
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

  // "I SPEND" label
  ctx.fillStyle = "#9b9ba6";
  ctx.font = "600 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("I SPEND", W / 2, pad + 70);

  // Monthly amount
  const monthly = "$" + Math.round(data.monthly).toLocaleString() + "/month";
  ctx.fillStyle = "#EF4444";
  ctx.font = "800 64px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText(monthly, W / 2, pad + 155);

  // "ON SUBSCRIPTIONS"
  ctx.fillStyle = "#9b9ba6";
  ctx.font = "600 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText("ON SUBSCRIPTIONS", W / 2, pad + 190);

  // Yearly + 5-year
  ctx.fillStyle = "#e8e8ec";
  ctx.font = "400 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText(
    `That\u2019s $${Math.round(data.yearly).toLocaleString()}/year \u2022 $${Math.round(data.fiveYear).toLocaleString()} over 5 years`,
    W / 2, pad + 240
  );

  // Top 3
  if (data.topThree.length > 0) {
    ctx.fillStyle = "#6b6b76";
    ctx.font = "400 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.fillText(`Top: ${data.topThree.join(", ")}`, W / 2, pad + 280);
  }

  // Divider
  const divY = pad + 330;
  ctx.strokeStyle = "#3a3a42";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad + 80, divY);
  ctx.lineTo(W - pad - 80, divY);
  ctx.stroke();

  // CTA
  ctx.fillStyle = "#e8e8ec";
  ctx.font = "600 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText("How much do YOU spend?", W / 2, divY + 45);

  // URL
  ctx.fillStyle = "#6b6b76";
  ctx.font = "400 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText("everyfreetool.com/finance-tools/subscription-calculator", W / 2, divY + 80);

  return canvas;
}

export function shareCardToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), "image/png");
  });
}
