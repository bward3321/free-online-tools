import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_SPOKES, getSpokeBySlug, getAllSlugs } from "../lib/spokes";
import { getCategoryById } from "../lib/units";
import SpokeConverter from "./components/SpokeConverter";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const spoke = getSpokeBySlug(slug);
  if (!spoke) return {};
  return {
    title: spoke.title,
    description: spoke.meta,
    openGraph: {
      title: spoke.title,
      description: spoke.meta,
      type: "website",
      url: `https://everyfreetool.com/conversion-tools/${slug}`,
      siteName: "EveryFreeTool",
    },
    twitter: {
      card: "summary",
      title: spoke.title,
      description: spoke.meta,
    },
    robots: "index, follow",
  };
}

export default async function SpokePage({ params }: PageProps) {
  const { slug } = await params;
  const spoke = getSpokeBySlug(slug);
  if (!spoke) notFound();

  const cat = getCategoryById(spoke.categoryId);

  return (
    <>
      {/* WebApplication schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: spoke.h1,
            description: spoke.meta,
            url: `https://everyfreetool.com/conversion-tools/${slug}`,
            applicationCategory: "UtilityApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            creator: { "@type": "Organization", name: "EveryFreeTool", url: "https://everyfreetool.com" },
          }),
        }}
      />
      {/* FAQPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: spoke.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
      {/* BreadcrumbList schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://everyfreetool.com" },
              { "@type": "ListItem", position: 2, name: "Conversion Tools", item: "https://everyfreetool.com/conversion-tools/unit-converter" },
              { "@type": "ListItem", position: 3, name: spoke.h1.split(" \u2014")[0], item: `https://everyfreetool.com/conversion-tools/${slug}` },
            ],
          }),
        }}
      />
      <SpokeConverter spoke={spoke} />
    </>
  );
}
