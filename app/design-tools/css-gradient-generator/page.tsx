import type { Metadata } from "next";
import CssGradientGenerator from "./components/CssGradientGenerator";

export const metadata: Metadata = {
  title: "Free CSS Gradient Generator — Linear, Radial, Conic & Mesh | EveryFreeTool",
  description: "Create beautiful CSS gradients with our free online generator. Supports linear, radial, conic, and mesh gradients. Copy CSS, Tailwind, or SCSS code instantly. 120+ preset gradients included.",
  openGraph: { title: "Free CSS Gradient Generator", description: "Create linear, radial, conic & mesh CSS gradients with live preview, 120+ presets, and one-click code copy. Free, no signup.", type: "website" },
  robots: "index, follow",
};

export default function CssGradientGeneratorPage() {
  const faqs = [
    { name: "Is this CSS gradient generator free?", text: "Completely free, no signup, no limits. Everything runs in your browser — no data is sent to any server. Create as many gradients as you want." },
    { name: "Does this tool support Tailwind CSS?", text: "Yes. Switch to the Tailwind tab to get Tailwind utility classes for your gradient. Simple 2-3 stop linear gradients use native Tailwind utilities (bg-gradient-to-r, from-color, via-color, to-color). Complex gradients use arbitrary value syntax." },
    { name: "Can I create animated gradients?", text: "Yes. Toggle 'Animate gradient' to add CSS animations. Choose from shift, hue-rotate, or pulse effects with adjustable speed. The generated code includes the @keyframes rule." },
    { name: "How many color stops can I add?", text: "There is no hard limit. Add as many color stops as you need by clicking on the color stop bar or using the + button. Most gradients look best with 2-5 stops." },
    { name: "What browsers support CSS gradients?", text: "CSS gradients are supported in all modern browsers including Chrome, Firefox, Safari, and Edge. Linear and radial gradients have 98%+ global support. Conic gradients work in all current browsers." },
    { name: "What is a mesh gradient?", text: "A mesh gradient blends multiple colors from different positions, creating smooth organic transitions. Since native CSS mesh gradients aren't supported yet, this tool generates the effect using layered radial gradients." },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "CSS Gradient Generator",
        url: "https://everyfreetool.com/design-tools/css-gradient-generator",
        description: "Create linear, radial, conic, and mesh CSS gradients with live preview and instant code output.",
        applicationCategory: "DesignApplication", operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        browserRequirements: "Requires JavaScript. Works in all modern browsers.",
        creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqs.map(f => ({ "@type": "Question", name: f.name, acceptedAnswer: { "@type": "Answer", text: f.text } })),
      }) }} />
      <CssGradientGenerator
        title="Free CSS Gradient Generator"
        subtitle="Create linear, radial, conic, and mesh CSS gradients with live preview. Browse 120+ presets, customize colors, copy CSS/Tailwind/SCSS code instantly."
      />
    </>
  );
}
