import type { Metadata } from "next";
import Calculator from "./components/Calculator";

export const metadata: Metadata = {
  title: "Free Concrete Calculator \u2014 How Much Concrete Do I Need?",
  description:
    "Calculate exactly how much concrete you need for slabs, walls, columns, stairs and more. Free instant results with bag counts and cost estimates.",
  openGraph: {
    title: "Free Concrete Calculator \u2014 How Much Concrete Do I Need?",
    description:
      "Calculate exactly how much concrete you need for slabs, walls, columns, stairs and more. Free instant results with bag counts and cost estimates.",
    type: "website",
  },
};

export default function ConcreteCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Free Concrete Calculator",
            description:
              "Calculate exactly how much concrete you need for slabs, walls, columns, stairs and more. Free instant results with bag counts and cost estimates.",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            featureList: [
              "Slab concrete calculator",
              "Wall and footing calculator",
              "Round column calculator",
              "Circular slab calculator",
              "Stairs concrete calculator",
              "Curb and gutter calculator",
              "Bag count estimator",
              "Cost estimator",
              "Multi-section builder",
            ],
          }),
        }}
      />
      <Calculator />
    </>
  );
}
