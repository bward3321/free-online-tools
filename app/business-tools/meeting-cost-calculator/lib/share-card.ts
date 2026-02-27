export interface ShareData {
  totalCost: number;
  duration: string;
  attendees: number;
  annualCost: number | null;
  frequency: string | null;
  isLive: boolean;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
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

export function generateShareCard(data: ShareData): HTMLCanvasElement {
  const W = 1200;
  const H = 630;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Background
  roundRect(ctx, 0, 0, W, H, 0);
  ctx.fillStyle = "#1a1a1e";
  ctx.fill();

  // Inner card
  const pad = 60;
  roundRect(ctx, pad, pad, W - pad * 2, H - pad * 2, 24);
  ctx.fillStyle = "#27272b";
  ctx.fill();
  ctx.strokeStyle = "#3a3a42";
  ctx.lineWidth = 2;
  ctx.stroke();

  // "THIS MEETING COST" label
  ctx.fillStyle = "#9b9ba6";
  ctx.font = "600 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(
    data.isLive ? "THIS MEETING COST" : "MEETING COST ESTIMATE",
    W / 2,
    pad + 80
  );

  // Dollar amount
  const formatted = "$" + data.totalCost.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  ctx.fillStyle = "#F59E0B";
  ctx.font = "800 72px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText(formatted, W / 2, pad + 180);

  // Details line
  ctx.fillStyle = "#e8e8ec";
  ctx.font = "400 22px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText(
    `${data.duration} \u2022 ${data.attendees} attendee${data.attendees !== 1 ? "s" : ""}`,
    W / 2,
    pad + 230
  );

  // Annual projection
  if (data.annualCost && data.frequency) {
    const annualFormatted = "$" + Math.round(data.annualCost).toLocaleString("en-US");
    ctx.fillStyle = "#EF4444";
    ctx.font = "600 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    ctx.fillText(
      `That\u2019s ${annualFormatted}/year if ${data.frequency}`,
      W / 2,
      pad + 280
    );
  }

  // Divider line
  const divY = pad + 330;
  ctx.strokeStyle = "#3a3a42";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad + 80, divY);
  ctx.lineTo(W - pad - 80, divY);
  ctx.stroke();

  // Site URL
  ctx.fillStyle = "#6b6b76";
  ctx.font = "500 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText("everyfreetool.com/business-tools/meeting-cost-calculator", W / 2, divY + 50);

  return canvas;
}

export function shareCardToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => resolve(blob!),
      "image/png"
    );
  });
}

export function getShareText(data: ShareData): string {
  const cost = "$" + data.totalCost.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  let text = `Our ${data.duration} meeting with ${data.attendees} people cost ${cost}.`;
  if (data.annualCost && data.frequency) {
    const annual = "$" + Math.round(data.annualCost).toLocaleString("en-US");
    text += ` That\u2019s ${annual}/year.`;
  }
  text += ` \u2192 everyfreetool.com/business-tools/meeting-cost-calculator`;
  return text;
}

export function getTwitterUrl(data: ShareData): string {
  const text = getShareText(data);
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
}

export function getLinkedInUrl(): string {
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    "https://everyfreetool.com/business-tools/meeting-cost-calculator"
  )}`;
}
