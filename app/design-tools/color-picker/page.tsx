import type { Metadata } from "next";
import ColorPicker from "./components/ColorPicker";

export const metadata: Metadata = {
  title: "Color Picker & Converter — HEX, RGB, HSL, WCAG Contrast Checker | EveryFreeTool",
  description: "Pick colors visually, convert between HEX/RGB/HSL/CMYK instantly, check WCAG contrast accessibility, generate palettes, and extract colors from images. Free, 100% client-side.",
  openGraph: { title: "Color Picker & Converter — Free Online", description: "Pick, convert, and check contrast for any color. HEX, RGB, HSL, CMYK. Free, instant, 100% client-side.", type: "website" },
  robots: "index, follow",
};

export default function ColorPickerPage() {
  const faqs = [
    { name: "How do I convert HEX to RGB?", text: "Paste your HEX code into the HEX field and RGB values appear instantly. The tool converts in real-time as you type." },
    { name: "What is a WCAG contrast ratio?", text: "It measures how distinguishable two colors are, from 1:1 to 21:1. WCAG 2.1 requires 4.5:1 minimum for normal text (AA) and 7:1 for AAA." },
    { name: "Is my data private?", text: "Yes. All processing happens in your browser. No colors or images are stored on any server." },
    { name: "Can I extract colors from an image?", text: "Yes. Upload any image to the Image Color Picker tab. Click pixels or auto-extract dominant colors." },
    { name: "What color format should I use for CSS?", text: "HEX and RGB are both standard. HSL is increasingly preferred for easier color variations." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Color Picker & Converter",
        url: "https://everyfreetool.com/design-tools/color-picker",
        description: "Pick colors, convert between HEX/RGB/HSL/CMYK, check WCAG contrast, generate palettes, extract from images. 100% client-side.",
        applicationCategory: "DesignApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList: ["Color picker", "HEX to RGB", "RGB to HEX", "HSL converter", "CMYK converter", "WCAG contrast checker", "Palette generator", "Image color extraction"],
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })),
      }) }} />
      <ColorPicker
        title="Color Picker — Pick, Convert, and Check Contrast Instantly"
        subtitle="Pick colors visually, convert between all formats in real-time, check WCAG accessibility contrast, generate harmonious palettes, and extract colors from images. 100% client-side."
      />
    </>
  );
}
