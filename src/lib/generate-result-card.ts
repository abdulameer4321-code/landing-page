export interface ResultCardData {
  name: string;
  score: number;
  total: number;
}

export async function generateResultCard({ name, score, total }: ResultCardData): Promise<void> {
  // Ensure fonts are loaded in the browser
  if (typeof document !== "undefined" && document.fonts) {
    await document.fonts.ready;
  }

  // Load the reversed brand logo with graceful fallback
  let logoImg: HTMLImageElement | null = null;
  try {
    logoImg = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Logo load failed"));
      img.src = "/brand/logo-reversed.png";
    });
  } catch {
    logoImg = null;
  }

  // Canvas geometry at 10 pixels per millimeter (297mm x 210mm => 2970px x 2100px)
  const SCALE = 10;
  const width = 297 * SCALE;
  const height = 210 * SCALE;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create canvas context");

  // 1. Page Background (#FBFAF7)
  ctx.fillStyle = "#FBFAF7";
  ctx.fillRect(0, 0, width, height);

  // 2. Top Band: Solid #203748, full width, 38mm high
  const topBandH = 38 * SCALE;
  ctx.fillStyle = "#203748";
  ctx.fillRect(0, 0, width, topBandH);

  // Top Band Angled Orange Facets (Right side: 120mm wide)
  // Three facets: #EC8C5C, #EC703C, #B8481E
  // Slanted angle: x at y=0 is shifted ~20mm right from x at y=topBandH
  const slope = 20 * SCALE;

  // Facet 1: #EC8C5C (Peach / Light orange)
  ctx.fillStyle = "#EC8C5C";
  ctx.beginPath();
  ctx.moveTo((297 - 120) * SCALE + slope, 0);
  ctx.lineTo((297 - 75) * SCALE + slope, 0);
  ctx.lineTo((297 - 75) * SCALE, topBandH);
  ctx.lineTo((297 - 120) * SCALE, topBandH);
  ctx.closePath();
  ctx.fill();

  // Facet 2: #EC703C (Brand orange)
  ctx.fillStyle = "#EC703C";
  ctx.beginPath();
  ctx.moveTo((297 - 75) * SCALE + slope, 0);
  ctx.lineTo((297 - 35) * SCALE + slope, 0);
  ctx.lineTo((297 - 35) * SCALE, topBandH);
  ctx.lineTo((297 - 75) * SCALE, topBandH);
  ctx.closePath();
  ctx.fill();

  // Facet 3: #B8481E (Deep brick orange)
  ctx.fillStyle = "#B8481E";
  ctx.beginPath();
  ctx.moveTo((297 - 35) * SCALE + slope, 0);
  ctx.lineTo(width, 0);
  ctx.lineTo(width, topBandH);
  ctx.lineTo((297 - 35) * SCALE, topBandH);
  ctx.closePath();
  ctx.fill();

  // Logo: Left 22mm, vertically centered in top band, height 13mm
  const logoH = 13 * SCALE;
  const logoX = 22 * SCALE;
  const logoY = (topBandH - logoH) / 2;

  if (logoImg) {
    const logoW = (logoImg.width / logoImg.height) * logoH;
    ctx.drawImage(logoImg, logoX, logoY, logoW, logoH);
  } else {
    ctx.fillStyle = "#FFFFFF";
    ctx.font = `600 ${6 * SCALE}px Outfit, sans-serif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText("DPDP MatriX", logoX, topBandH / 2);
  }

  // 3. Label: "CERTIFICATE OF PARTICIPATION"
  // Outfit 500, 9.5 pt (~13px at 72dpi, scaled to mm), letter-spacing 0.34em, #203748, 13mm below top band
  const labelY = (38 + 13) * SCALE;
  ctx.fillStyle = "#203748";
  ctx.font = `500 ${3.35 * SCALE}px Outfit, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  if ("letterSpacing" in ctx) {
    ctx.letterSpacing = "0.34em";
  }
  ctx.fillText("CERTIFICATE OF PARTICIPATION", width / 2, labelY);
  if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";

  // Accent rule: 16mm x 0.8mm, #EC703C, 4mm below label
  const ruleY = labelY + 4 * SCALE;
  ctx.fillStyle = "#EC703C";
  ctx.fillRect((297 / 2 - 8) * SCALE, ruleY, 16 * SCALE, 0.8 * SCALE);

  // 4. Title: "Welcome to the Privacy World"
  // Cormorant Garamond 500, 46 pt (~16.2mm), #203748, 6mm below rule
  const titleY = ruleY + 11 * SCALE;
  ctx.fillStyle = "#203748";
  ctx.font = `500 ${14.5 * SCALE}px "Cormorant Garamond", serif`;
  ctx.fillText("Welcome to the Privacy World", width / 2, titleY);

  // 5. Lead-in: "This is presented to"
  // Cormorant Garamond italic 500, 15 pt (~5.3mm), #51636F, 8mm below title
  const leadinY = titleY + 10 * SCALE;
  ctx.fillStyle = "#51636F";
  ctx.font = `italic 500 ${5.3 * SCALE}px "Cormorant Garamond", serif`;
  ctx.fillText("This is presented to", width / 2, leadinY);

  // 6. Name: Visitor's Name
  // Cormorant Garamond italic 600, 40 pt (~14mm), shrinks down to 22 pt (~7.8mm) if long
  // #203748, underline 0.5mm #EC703C, min width 130mm, max width 220mm
  const nameY = leadinY + 14 * SCALE;
  let nameFontSize = 13.5 * SCALE;
  ctx.font = `italic 600 ${nameFontSize}px "Cormorant Garamond", serif`;
  const maxNameWidth = 220 * SCALE;
  let measuredNameW = ctx.measureText(name).width;

  while (measuredNameW > maxNameWidth && nameFontSize > 7.5 * SCALE) {
    nameFontSize -= 0.5 * SCALE;
    ctx.font = `italic 600 ${nameFontSize}px "Cormorant Garamond", serif`;
    measuredNameW = ctx.measureText(name).width;
  }

  ctx.fillStyle = "#203748";
  ctx.fillText(name, width / 2, nameY);

  // Underline for name
  const underlineW = Math.max(130 * SCALE, Math.min(220 * SCALE, measuredNameW + 20 * SCALE));
  const underlineX = width / 2 - underlineW / 2;
  const underlineY = nameY + nameFontSize * 0.38;
  ctx.fillStyle = "#EC703C";
  ctx.fillRect(underlineX, underlineY, underlineW, 0.5 * SCALE);

  // 7. Description:
  // "for completing the DPDP MatriX Privacy Awareness Check and taking a first step"
  // "into privacy."
  // Outfit 400, 11.5 pt (~4mm), line-height 1.55, #51636F, 7mm below name, max width 150mm
  const descY1 = underlineY + 8 * SCALE;
  const descY2 = descY1 + 5.5 * SCALE;
  ctx.fillStyle = "#51636F";
  ctx.font = `400 ${3.8 * SCALE}px Outfit, sans-serif`;
  ctx.fillText(
    "for completing the DPDP MatriX Privacy Awareness Check and taking a first step",
    width / 2,
    descY1
  );
  ctx.fillText("into privacy.", width / 2, descY2);

  // 8. Details Row (Divider Line & Three Columns)
  // Thin line above: #B4C4C4, 0.4mm, max width 230mm
  const detailsDividerY = descY2 + 10 * SCALE;
  const detailsW = 230 * SCALE;
  ctx.fillStyle = "#B4C4C4";
  ctx.fillRect(width / 2 - detailsW / 2, detailsDividerY, detailsW, 0.4 * SCALE);

  // Column centers:
  const col1X = width / 2 - 75 * SCALE;
  const col2X = width / 2;
  const col3X = width / 2 + 75 * SCALE;

  const labelsY = detailsDividerY + 6.5 * SCALE;
  const valuesY = labelsY + 5.5 * SCALE;

  // Small caps labels: Outfit 500, 8 pt (~2.8mm), tracking 0.26em, #7D7E7D
  ctx.fillStyle = "#7D7E7D";
  ctx.font = `500 ${2.8 * SCALE}px Outfit, sans-serif`;
  if ("letterSpacing" in ctx) ctx.letterSpacing = "0.26em";

  ctx.fillText("SCORE", col1X, labelsY);
  ctx.fillText("ISSUED BY", col2X, labelsY);
  ctx.fillText("DATE", col3X, labelsY);

  if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";

  // Values: Outfit 500, 13 pt (~4.6mm), #203748
  ctx.fillStyle = "#203748";
  ctx.font = `500 ${4.5 * SCALE}px Outfit, sans-serif`;

  // Score
  ctx.fillText(`${score} / ${total}`, col1X, valuesY);

  // Issued By: Line 1: DPDP MatriX, Line 2: Ameer Riaz · Privacy Professional
  ctx.fillText("DPDP MatriX", col2X, valuesY);
  ctx.font = `400 ${3.4 * SCALE}px Outfit, sans-serif`;
  ctx.fillStyle = "#51636F";
  ctx.fillText("Ameer Riaz · Privacy Professional", col2X, valuesY + 4.2 * SCALE);

  // Date: Day Month Year (e.g. 5 November 2026)
  const now = new Date();
  const day = now.getDate();
  const month = now.toLocaleString("en-US", { month: "long" });
  const year = now.getFullYear();
  const dateStr = `${day} ${month} ${year}`;
  ctx.fillStyle = "#203748";
  ctx.font = `500 ${4.5 * SCALE}px Outfit, sans-serif`;
  ctx.fillText(dateStr, col3X, valuesY);

  // 9. Bottom Band: Solid #203748, full width, 29mm high (from y = 210 - 29 = 181mm to 210mm)
  const bottomBandY = (210 - 29) * SCALE;
  const bottomBandH = 29 * SCALE;
  ctx.fillStyle = "#203748";
  ctx.fillRect(0, bottomBandY, width, bottomBandH);

  // Two angled orange facets at the right (70mm wide): #EC8C5C, #EC703C
  const bSlope = 15 * SCALE;

  // Facet 1: #EC8C5C
  ctx.fillStyle = "#EC8C5C";
  ctx.beginPath();
  ctx.moveTo((297 - 70) * SCALE + bSlope, bottomBandY);
  ctx.lineTo((297 - 35) * SCALE + bSlope, bottomBandY);
  ctx.lineTo((297 - 35) * SCALE, height);
  ctx.lineTo((297 - 70) * SCALE, height);
  ctx.closePath();
  ctx.fill();

  // Facet 2: #EC703C
  ctx.fillStyle = "#EC703C";
  ctx.beginPath();
  ctx.moveTo((297 - 35) * SCALE + bSlope, bottomBandY);
  ctx.lineTo(width, bottomBandY);
  ctx.lineTo(width, height);
  ctx.lineTo((297 - 35) * SCALE, height);
  ctx.closePath();
  ctx.fill();

  // Disclaimer:
  // Outfit 400, 7.8 pt (~2.7mm), line-height 1.5, #B4C4C4 on the band
  // Left 22mm, width 200mm, 6.5mm from top of band
  ctx.textAlign = "left";
  ctx.fillStyle = "#B4C4C4";
  ctx.font = `400 ${2.7 * SCALE}px Outfit, sans-serif`;

  const disclaimerText =
    "This is a fun, informal result card from a short beginner quiz. It is not a certification, qualification, licence or professional credential. It has no legal, academic or professional value, and it is not endorsed by any regulator, institution or certifying body. The score only reflects answers to a short self-check and does not measure anyone's knowledge or skill.";

  const discX = 22 * SCALE;
  const discY = bottomBandY + 6.5 * SCALE;
  const discMaxW = 200 * SCALE;
  const discLineH = 3.8 * SCALE;

  // Wrap disclaimer text into lines
  const words = disclaimerText.split(" ");
  let currentLine = "";
  let lineCount = 0;

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(testLine).width > discMaxW) {
      ctx.fillText(currentLine, discX, discY + lineCount * discLineH);
      currentLine = word;
      lineCount++;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    ctx.fillText(currentLine, discX, discY + lineCount * discLineH);
  }

  // Website: "DPDPMATRIX.IN"
  // Outfit 500, 7.5 pt (~2.6mm), tracking 0.2em, #EC8C5C, left 22mm, 4.5mm from bottom
  const webY = height - 4.5 * SCALE;
  ctx.fillStyle = "#EC8C5C";
  ctx.font = `500 ${2.6 * SCALE}px Outfit, sans-serif`;
  if ("letterSpacing" in ctx) ctx.letterSpacing = "0.2em";
  ctx.fillText("DPDPMATRIX.IN", discX, webY);
  if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";

  // Dynamic import of jsPDF for lightweight bundle
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const imgData = canvas.toDataURL("image/png", 1.0);
  pdf.addImage(imgData, "PNG", 0, 0, 297, 210, undefined, "FAST");
  pdf.save("privacy-world-result-card.pdf");
}
