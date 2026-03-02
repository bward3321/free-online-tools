import { SpokeData } from "./types";

// ── Area Spokes ──────────────────────────────────────────────────────
export const areaSpokes: SpokeData[] = [
  {
    slug: "acres-to-sq-feet",
    fromKey: "acre",
    toKey: "squareFoot",
    categoryId: "area",
    h1: "Acres to Square Feet Converter \u2014 ac to ft\u00B2",
    title: "Acres to Square Feet Converter \u2014 ac to ft\u00B2 Conversion | EveryFreeTool",
    meta: "Convert acres to square feet instantly. Free online ac to ft\u00B2 converter with formula, reference table, and real-world examples. 1 acre = 43,560 sq ft.",
    quickAnswers: ["0.25 acres = 10,890 sq ft", "0.5 acres = 21,780 sq ft", "1 acre = 43,560 sq ft", "2 acres = 87,120 sq ft", "5 acres = 217,800 sq ft", "10 acres = 435,600 sq ft", "40 acres = 1,742,400 sq ft", "100 acres = 4,356,000 sq ft"],
    referenceTable: [[0.1,"4356"],[0.25,"10890"],[0.33,"14375"],[0.5,"21780"],[0.75,"32670"],[1,"43560"],[1.5,"65340"],[2,"87120"],[3,"130680"],[4,"174240"],[5,"217800"],[7.5,"326700"],[10,"435600"],[15,"653400"],[20,"871200"],[25,"1089000"],[40,"1742400"],[50,"2178000"],[75,"3267000"],[100,"4356000"]],
    formulaExplanation: "To convert acres to square feet, multiply the number of acres by 43,560. One acre is defined as exactly 43,560 square feet.",
    workedExamples: ["Convert 2.5 acres to sq ft: 2.5 \u00D7 43,560 = 108,900 sq ft", "Convert 0.25 acres (a quarter-acre lot) to sq ft: 0.25 \u00D7 43,560 = 10,890 sq ft"],
    reverseNote: "To convert square feet to acres, divide the square feet by 43,560.",
    comparisons: [{ text: "1 acre (43,560 sq ft) is about the size of a football field without end zones (48,000 sq ft is a field with end zones)." }, { text: "A quarter-acre lot (10,890 sq ft) is a typical suburban home plot in the US." }, { text: "10 acres (435,600 sq ft) is about 7.5 football fields." }, { text: "640 acres equals 1 square mile \u2014 a standard section of land in US land surveys." }],
    seoContent: `<p>Acres and square feet are both used in US real estate, land measurement, and agriculture. The acre is the standard unit for measuring land parcels, while square feet are used for building footprints, lot sizes, and smaller areas.</p>
<h3>Real Estate</h3>
<p>Understanding acres in square feet is crucial for real estate. A typical suburban lot is 0.15\u20130.5 acres (6,534\u201321,780 sq ft). Rural properties are measured in acres. When a listing says "2.3 acres," that\u2019s 100,188 sq ft \u2014 enough for a house, yard, garden, and more. Developers need this conversion to plan subdivisions.</p>
<h3>Agriculture</h3>
<p>Farmers and ranchers think in acres. A small hobby farm might be 5 acres (217,800 sq ft). A large agricultural operation could span thousands of acres. Knowing the square footage helps calculate material needs \u2014 seed, fertilizer, and irrigation coverage.</p>
<h3>Historical Context</h3>
<p>The acre was originally defined as the amount of land a team of oxen could plow in one day. It was standardized at 43,560 square feet (or a strip 1 chain by 1 furlong). While the metric hectare has replaced the acre in most countries, it remains the standard land unit in the US and UK.</p>`,
    faq: [{ q: "How many square feet is 1 acre?", a: "One acre equals exactly 43,560 square feet." }, { q: "How big is an acre visually?", a: "An acre is roughly the size of a football field (minus the end zones). It\u2019s about 209 feet \u00D7 209 feet if square." }, { q: "How many acres is a football field?", a: "A football field (including end zones) is about 1.32 acres. Without end zones, it\u2019s about 1.1 acres." }, { q: "How many acres in a square mile?", a: "There are 640 acres in one square mile." }],
    relatedSlugs: ["sq-feet-to-sq-meters", "hectares-to-acres", "sq-meters-to-sq-feet", "feet-to-meters"],
  },
  {
    slug: "sq-feet-to-sq-meters",
    fromKey: "squareFoot",
    toKey: "squareMeter",
    categoryId: "area",
    h1: "Square Feet to Square Meters Converter \u2014 ft\u00B2 to m\u00B2",
    title: "Square Feet to Square Meters Converter \u2014 ft\u00B2 to m\u00B2 Conversion | EveryFreeTool",
    meta: "Convert square feet to square meters instantly. Free online ft\u00B2 to m\u00B2 converter with formula, reference table, and real-world examples. 1 sq ft = 0.0929 m\u00B2.",
    quickAnswers: ["100 sq ft = 9.29 m\u00B2", "200 sq ft = 18.58 m\u00B2", "500 sq ft = 46.45 m\u00B2", "750 sq ft = 69.68 m\u00B2", "1000 sq ft = 92.9 m\u00B2", "1200 sq ft = 111.48 m\u00B2", "1500 sq ft = 139.35 m\u00B2", "2000 sq ft = 185.81 m\u00B2", "2500 sq ft = 232.26 m\u00B2", "3000 sq ft = 278.71 m\u00B2"],
    referenceTable: [[1,"0.0929"],[10,"0.929"],[25,"2.3226"],[50,"4.6452"],[100,"9.2903"],[150,"13.9355"],[200,"18.5806"],[250,"23.2258"],[300,"27.871"],[400,"37.1612"],[500,"46.4515"],[600,"55.7418"],[750,"69.6773"],[1000,"92.903"],[1200,"111.484"],[1500,"139.355"],[2000,"185.806"],[2500,"232.258"],[3000,"278.709"],[5000,"464.515"]],
    formulaExplanation: "To convert square feet to square meters, multiply by 0.092903. One square foot equals 0.092903 square meters.",
    workedExamples: ["Convert 1,500 sq ft (a mid-size apartment) to m\u00B2: 1,500 \u00D7 0.092903 = 139.35 m\u00B2", "Convert 200 sq ft (a small bedroom) to m\u00B2: 200 \u00D7 0.092903 = 18.58 m\u00B2"],
    reverseNote: "To convert square meters to square feet, multiply by 10.7639.",
    comparisons: [{ text: "100 sq ft (9.3 m\u00B2) is about the size of a small bathroom." }, { text: "500 sq ft (46.5 m\u00B2) is a typical studio apartment." }, { text: "1,500 sq ft (139 m\u00B2) is an average US home size for a 2-3 bedroom." }, { text: "2,500 sq ft (232 m\u00B2) is a spacious family home." }],
    seoContent: `<p>Square feet to square meters is the essential conversion for international real estate. American properties are measured in square feet, while most of the world uses square meters. This conversion matters for anyone buying, selling, or renting property across borders.</p>
<h3>International Real Estate</h3>
<p>If you\u2019re apartment hunting in Europe, Asia, or South America, listings show area in square meters. A 50 m\u00B2 apartment is about 538 sq ft \u2014 a typical studio. A 100 m\u00B2 apartment is about 1,076 sq ft \u2014 a comfortable 2-bedroom. A 200 m\u00B2 home is about 2,153 sq ft \u2014 spacious by most international standards.</p>
<h3>Flooring and Renovation</h3>
<p>Flooring materials may be priced per square meter internationally and per square foot in the US. Knowing the conversion helps compare prices. Tile from Italy priced at \u20AC30/m\u00B2 is about $2.79/sq ft. Hardwood at $8/sq ft is about $86.11/m\u00B2.</p>
<h3>Quick Shortcut</h3>
<p>For a fast approximation, divide square feet by 10.8 (or multiply by 0.093). 1,000 sq ft \u00F7 10.8 \u2248 93 m\u00B2 (actual: 92.9 m\u00B2). For a rougher estimate, divide by 11: 2,000 sq ft \u00F7 11 \u2248 182 m\u00B2 (actual: 185.8 m\u00B2).</p>`,
    faq: [{ q: "How many square meters is 1 square foot?", a: "One square foot equals approximately 0.0929 square meters." }, { q: "How many square feet in a square meter?", a: "One square meter equals approximately 10.764 square feet." }, { q: "How many sq ft is 100 m\u00B2?", a: "100 square meters is approximately 1,076 square feet." }, { q: "What is 1,000 sq ft in m\u00B2?", a: "1,000 square feet is approximately 92.9 square meters." }],
    relatedSlugs: ["sq-meters-to-sq-feet", "acres-to-sq-feet", "hectares-to-acres", "feet-to-meters"],
  },
  {
    slug: "hectares-to-acres",
    fromKey: "hectare",
    toKey: "acre",
    categoryId: "area",
    h1: "Hectares to Acres Converter \u2014 ha to ac",
    title: "Hectares to Acres Converter \u2014 ha to ac Conversion | EveryFreeTool",
    meta: "Convert hectares to acres instantly. Free online ha to ac converter with formula, reference table, and real-world examples. 1 hectare = 2.47105 acres.",
    quickAnswers: ["0.5 ha = 1.236 acres", "1 ha = 2.471 acres", "2 ha = 4.942 acres", "5 ha = 12.355 acres", "10 ha = 24.711 acres", "50 ha = 123.553 acres", "100 ha = 247.105 acres", "1000 ha = 2,471.05 acres"],
    referenceTable: [[0.1,"0.2471"],[0.25,"0.6178"],[0.5,"1.2355"],[1,"2.4711"],[2,"4.9421"],[3,"7.4132"],[4,"9.8842"],[5,"12.3553"],[7.5,"18.5329"],[10,"24.7105"],[15,"37.0658"],[20,"49.4211"],[25,"61.7763"],[50,"123.553"],[75,"185.329"],[100,"247.105"],[200,"494.211"],[500,"1235.53"],[750,"1853.29"],[1000,"2471.05"]],
    formulaExplanation: "To convert hectares to acres, multiply by 2.47105. One hectare equals 10,000 square meters or about 2.47 acres.",
    workedExamples: ["Convert 5 hectares to acres: 5 \u00D7 2.47105 = 12.36 acres", "Convert 100 hectares to acres: 100 \u00D7 2.47105 = 247.11 acres"],
    reverseNote: "To convert acres to hectares, divide by 2.47105, or multiply by 0.404686.",
    comparisons: [{ text: "1 hectare (2.47 acres) is about 2.5 American football fields." }, { text: "4 hectares (9.88 acres) is about the size of a small city park." }, { text: "100 hectares (247 acres) is 1 square kilometer." }, { text: "The Amazon rainforest covers about 550 million hectares (1.36 billion acres)." }],
    seoContent: `<p>Hectares and acres are both used for measuring large areas of land, but in different parts of the world. The hectare is the standard metric unit for land measurement, used internationally for agriculture, forestry, and land planning. The acre is used primarily in the US, UK, and some Commonwealth countries.</p>
<h3>Agriculture and Forestry</h3>
<p>International agricultural data and forestry reports use hectares. The FAO (Food and Agriculture Organization) reports crop yields per hectare. If a report says "wheat yields 3.5 tonnes per hectare," converting to acres gives about 1.42 tonnes per acre. Farm subsidies, environmental reports, and land-use planning all use hectares in metric countries.</p>
<h3>Land Development</h3>
<p>International property developers and land investors need to convert between hectares and acres regularly. A 10-hectare development site is about 24.7 acres. Understanding both units helps compare opportunities across markets.</p>
<h3>Quick Reference</h3>
<p>Remember that 1 hectare is roughly 2.5 acres. For quick estimates, multiply hectares by 2.5: 20 hectares \u2248 50 acres (actual: 49.4 acres). Close enough for conversation and rough planning.</p>`,
    faq: [{ q: "How many acres is 1 hectare?", a: "One hectare equals approximately 2.47105 acres." }, { q: "How big is a hectare?", a: "A hectare is 10,000 square meters (100m \u00D7 100m), or about 2.47 acres. It\u2019s roughly 2.5 American football fields." }, { q: "How many hectares in a square kilometer?", a: "There are exactly 100 hectares in one square kilometer." }, { q: "Is a hectare bigger than an acre?", a: "Yes, one hectare is about 2.47 times larger than one acre." }],
    relatedSlugs: ["acres-to-sq-feet", "sq-feet-to-sq-meters", "sq-meters-to-sq-feet", "km-to-miles"],
  },
  {
    slug: "sq-meters-to-sq-feet",
    fromKey: "squareMeter",
    toKey: "squareFoot",
    categoryId: "area",
    h1: "Square Meters to Square Feet Converter \u2014 m\u00B2 to ft\u00B2",
    title: "Square Meters to Square Feet Converter \u2014 m\u00B2 to ft\u00B2 Conversion | EveryFreeTool",
    meta: "Convert square meters to square feet instantly. Free online m\u00B2 to ft\u00B2 converter with formula, reference table, and real-world examples. 1 m\u00B2 = 10.7639 ft\u00B2.",
    quickAnswers: ["1 m\u00B2 = 10.764 sq ft", "10 m\u00B2 = 107.639 sq ft", "20 m\u00B2 = 215.278 sq ft", "30 m\u00B2 = 322.917 sq ft", "50 m\u00B2 = 538.196 sq ft", "75 m\u00B2 = 807.293 sq ft", "100 m\u00B2 = 1,076.39 sq ft", "150 m\u00B2 = 1,614.59 sq ft", "200 m\u00B2 = 2,152.78 sq ft", "250 m\u00B2 = 2,690.98 sq ft"],
    referenceTable: [[1,"10.7639"],[2,"21.5278"],[5,"53.8196"],[10,"107.639"],[15,"161.459"],[20,"215.278"],[25,"269.098"],[30,"322.917"],[40,"430.556"],[50,"538.196"],[60,"645.835"],[75,"807.293"],[80,"861.113"],[100,"1076.39"],[120,"1291.67"],[150,"1614.59"],[200,"2152.78"],[250,"2690.98"],[300,"3229.17"],[500,"5381.96"]],
    formulaExplanation: "To convert square meters to square feet, multiply by 10.7639.",
    workedExamples: ["Convert 80 m\u00B2 (a European apartment) to sq ft: 80 \u00D7 10.7639 = 861.11 sq ft", "Convert 150 m\u00B2 to sq ft: 150 \u00D7 10.7639 = 1,614.59 sq ft"],
    reverseNote: "To convert square feet to square meters, divide by 10.7639, or multiply by 0.092903.",
    comparisons: [{ text: "25 m\u00B2 (269 sq ft) is a typical European studio apartment." }, { text: "50 m\u00B2 (538 sq ft) is a comfortable one-bedroom in many cities." }, { text: "100 m\u00B2 (1,076 sq ft) is a standard 2-3 bedroom apartment in Europe." }, { text: "200 m\u00B2 (2,153 sq ft) is considered spacious worldwide." }],
    seoContent: `<p>Square meters to square feet is the reverse of one of the most important real estate conversions. International property listings use square meters, while American buyers and renters think in square feet. This conversion helps you understand apartment sizes, office spaces, and land areas across borders.</p>
<h3>Apartment Hunting Internationally</h3>
<p>When browsing listings in Tokyo, Paris, London, or Sydney, property sizes are in square meters. A 30 m\u00B2 Tokyo apartment is 323 sq ft \u2014 small by American standards but normal for central Tokyo. A 70 m\u00B2 Paris apartment is 753 sq ft \u2014 a comfortable one-bedroom. A 120 m\u00B2 Sydney home is 1,292 sq ft \u2014 a decent family space.</p>
<h3>Office Space Planning</h3>
<p>International commercial real estate quotes office space in square meters. If a company needs 500 m\u00B2 of office space, that\u2019s about 5,382 sq ft. Workspace planning standards suggest 5-10 m\u00B2 (54-108 sq ft) per employee for open-plan offices.</p>
<h3>Quick Mental Multiplication</h3>
<p>To quickly convert m\u00B2 to sq ft, multiply by 11 (slightly more than the exact 10.764). 50 m\u00B2 \u00D7 11 = 550 sq ft (actual: 538 sq ft). For a closer estimate, multiply by 10.8: 50 \u00D7 10.8 = 540 sq ft.</p>`,
    faq: [{ q: "How many square feet is 1 square meter?", a: "One square meter equals approximately 10.764 square feet." }, { q: "How big is 100 square meters in square feet?", a: "100 m\u00B2 is approximately 1,076 square feet." }, { q: "How do I convert m\u00B2 to sq ft?", a: "Multiply the square meters by 10.7639. For example, 75 m\u00B2 \u00D7 10.7639 = 807.3 sq ft." }, { q: "What is 50 m\u00B2 in square feet?", a: "50 m\u00B2 is approximately 538 square feet." }],
    relatedSlugs: ["sq-feet-to-sq-meters", "hectares-to-acres", "acres-to-sq-feet", "meters-to-feet"],
  },
];

// ── Digital Storage Spokes ───────────────────────────────────────────
export const digitalStorageSpokes: SpokeData[] = [
  {
    slug: "mb-to-gb",
    fromKey: "megabyte",
    toKey: "gigabyte",
    categoryId: "digitalStorage",
    h1: "Megabytes to Gigabytes Converter \u2014 MB to GB",
    title: "Megabytes to Gigabytes Converter \u2014 MB to GB Conversion | EveryFreeTool",
    meta: "Convert megabytes to gigabytes instantly. Free online MB to GB converter with reference table and real-world examples. 1 GB = 1,000 MB.",
    quickAnswers: ["1 MB = 0.001 GB", "100 MB = 0.1 GB", "250 MB = 0.25 GB", "500 MB = 0.5 GB", "1,000 MB = 1 GB", "1,500 MB = 1.5 GB", "2,000 MB = 2 GB", "5,000 MB = 5 GB", "10,000 MB = 10 GB"],
    referenceTable: [[1,"0.001"],[5,"0.005"],[10,"0.01"],[25,"0.025"],[50,"0.05"],[100,"0.1"],[200,"0.2"],[250,"0.25"],[500,"0.5"],[750,"0.75"],[1000,"1"],[1500,"1.5"],[2000,"2"],[2500,"2.5"],[3000,"3"],[4000,"4"],[5000,"5"],[8000,"8"],[10000,"10"],[50000,"50"]],
    formulaExplanation: "To convert megabytes to gigabytes (decimal), divide by 1,000. In the decimal (SI) system used by storage manufacturers, 1 GB = 1,000 MB.",
    workedExamples: ["Convert 2,500 MB to GB: 2,500 \u00F7 1,000 = 2.5 GB", "Convert 750 MB to GB: 750 \u00F7 1,000 = 0.75 GB"],
    reverseNote: "To convert GB to MB, multiply by 1,000.",
    comparisons: [{ text: "1 MB is roughly the size of a short eBook or a medium-quality photo." }, { text: "100 MB is about the size of a 3-minute MP3 podcast at high quality." }, { text: "1 GB (1,000 MB) is about 250 MP3 songs or 500 high-resolution photos." }, { text: "A Netflix movie in HD uses about 3,000-6,000 MB (3-6 GB)." }],
    seoContent: `<p>Megabytes and gigabytes are the most commonly encountered digital storage units. Understanding the relationship between them is essential for managing phone storage, choosing data plans, evaluating cloud storage, and downloading files.</p>
<h3>MB vs. GB: The Basics</h3>
<p>In the decimal system (used by storage manufacturers and mobile carriers), 1 GB = 1,000 MB. In the binary system (used by operating systems), 1 GiB = 1,024 MiB. This is why a "500 GB" hard drive shows about 465 GB in your operating system \u2014 the manufacturer uses decimal, your OS uses binary.</p>
<h3>Mobile Data Plans</h3>
<p>Mobile data plans are measured in GB. Knowing how many MB your activities use helps you stay within limits: a 5-minute YouTube video at 720p uses about 50-100 MB, browsing web pages uses about 2-5 MB each, and streaming music uses about 1-2 MB per minute.</p>
<h3>File Size Reference</h3>
<p>A typical photo is 3-10 MB, a 3-minute MP3 song is 3-5 MB, a 1-hour podcast is 50-100 MB, and a high-definition movie is 4,000-8,000 MB (4-8 GB). An iPhone app averages about 100-200 MB.</p>`,
    faq: [{ q: "How many MB in a GB?", a: "In the decimal system (used by storage manufacturers), 1 GB = 1,000 MB. In the binary system (used by operating systems), 1 GiB = 1,024 MiB." }, { q: "Is 1 GB 1,000 or 1,024 MB?", a: "It depends on the system. Storage manufacturers and mobile carriers use decimal (1 GB = 1,000 MB). Operating systems often use binary (1 GiB = 1,024 MiB). This converter uses the decimal system." }, { q: "How many GB is 500 MB?", a: "500 MB is 0.5 GB." }, { q: "Why does my 1 TB hard drive show less than 1 TB?", a: "Hard drive manufacturers use decimal (1 TB = 1,000 GB), but your operating system displays in binary (1 TiB = 1,024 GiB). A \"1 TB\" drive is about 931 GiB in your OS." }],
    relatedSlugs: ["gb-to-mb", "gb-to-tb", "tb-to-gb", "kg-to-lbs"],
  },
  {
    slug: "gb-to-tb",
    fromKey: "gigabyte",
    toKey: "terabyte",
    categoryId: "digitalStorage",
    h1: "Gigabytes to Terabytes Converter \u2014 GB to TB",
    title: "Gigabytes to Terabytes Converter \u2014 GB to TB Conversion | EveryFreeTool",
    meta: "Convert gigabytes to terabytes instantly. Free online GB to TB converter with reference table and real-world examples. 1 TB = 1,000 GB.",
    quickAnswers: ["1 GB = 0.001 TB", "100 GB = 0.1 TB", "250 GB = 0.25 TB", "500 GB = 0.5 TB", "1,000 GB = 1 TB", "2,000 GB = 2 TB", "4,000 GB = 4 TB", "8,000 GB = 8 TB"],
    referenceTable: [[1,"0.001"],[5,"0.005"],[10,"0.01"],[25,"0.025"],[50,"0.05"],[100,"0.1"],[128,"0.128"],[200,"0.2"],[250,"0.25"],[256,"0.256"],[500,"0.5"],[512,"0.512"],[750,"0.75"],[1000,"1"],[1024,"1.024"],[1500,"1.5"],[2000,"2"],[4000,"4"],[8000,"8"],[16000,"16"]],
    formulaExplanation: "To convert gigabytes to terabytes, divide by 1,000 (decimal system).",
    workedExamples: ["Convert 2,000 GB to TB: 2,000 \u00F7 1,000 = 2 TB", "Convert 512 GB to TB: 512 \u00F7 1,000 = 0.512 TB"],
    reverseNote: "To convert TB to GB, multiply by 1,000.",
    comparisons: [{ text: "1 GB is about 250 MP3 songs or one HD movie." }, { text: "256 GB (0.256 TB) is common phone storage." }, { text: "1 TB (1,000 GB) can store about 250,000 photos or 200 HD movies." }, { text: "8 TB is a common large external hard drive that can store over 1 million photos." }],
    seoContent: `<p>As digital content grows, understanding the relationship between gigabytes and terabytes becomes increasingly important. Hard drives, SSDs, cloud storage plans, and backup solutions are all measured in these units.</p>
<h3>Storage Planning</h3>
<p>Choosing the right storage depends on your needs. A 256 GB (0.256 TB) SSD is sufficient for a basic laptop. A 1 TB drive handles a moderate photo and document collection. Serious photographers, videographers, and gamers need 2-8 TB. Professional video editors may need 20+ TB of storage.</p>
<h3>Cloud Storage</h3>
<p>Cloud plans typically offer tiers in GB and TB: 100 GB, 200 GB, 1 TB, 2 TB. Google One\u2019s basic plan is 100 GB, while iCloud\u2019s largest consumer plan is 12 TB. Knowing how your data usage converts between units helps choose the right plan.</p>
<h3>Backup Calculations</h3>
<p>Planning backup storage requires understanding your total data in TB. If you have 500 GB of photos, 200 GB of documents, and 1,500 GB of video, that\u2019s 2,200 GB or 2.2 TB. You\u2019d want at least a 4 TB backup drive for comfortable headroom.</p>`,
    faq: [{ q: "How many GB in a TB?", a: "1 TB = 1,000 GB in the decimal system used by storage manufacturers." }, { q: "How much can 1 TB store?", a: "Approximately 250,000 photos (4 MB each), 250 HD movies (4 GB each), or 6.5 million document pages." }, { q: "Is 1 TB enough storage?", a: "For most personal use, 1 TB is plenty. Gamers, photographers, and video editors may need more." }, { q: "What comes after terabyte?", a: "Petabyte (PB) = 1,000 TB, then exabyte (EB), zettabyte (ZB), and yottabyte (YB)." }],
    relatedSlugs: ["tb-to-gb", "mb-to-gb", "gb-to-mb", "km-to-miles"],
  },
  {
    slug: "gb-to-mb",
    fromKey: "gigabyte",
    toKey: "megabyte",
    categoryId: "digitalStorage",
    h1: "Gigabytes to Megabytes Converter \u2014 GB to MB",
    title: "Gigabytes to Megabytes Converter \u2014 GB to MB Conversion | EveryFreeTool",
    meta: "Convert gigabytes to megabytes instantly. Free online GB to MB converter with reference table and real-world examples. 1 GB = 1,000 MB.",
    quickAnswers: ["0.5 GB = 500 MB", "1 GB = 1,000 MB", "1.5 GB = 1,500 MB", "2 GB = 2,000 MB", "3 GB = 3,000 MB", "5 GB = 5,000 MB", "8 GB = 8,000 MB", "10 GB = 10,000 MB", "16 GB = 16,000 MB", "32 GB = 32,000 MB"],
    referenceTable: [[0.1,"100"],[0.25,"250"],[0.5,"500"],[0.75,"750"],[1,"1000"],[1.5,"1500"],[2,"2000"],[3,"3000"],[4,"4000"],[5,"5000"],[6,"6000"],[8,"8000"],[10,"10000"],[12,"12000"],[16,"16000"],[32,"32000"],[50,"50000"],[64,"64000"],[100,"100000"],[128,"128000"]],
    formulaExplanation: "To convert gigabytes to megabytes, multiply by 1,000 (decimal system).",
    workedExamples: ["Convert 5 GB data plan to MB: 5 \u00D7 1,000 = 5,000 MB", "Convert 0.5 GB to MB: 0.5 \u00D7 1,000 = 500 MB"],
    reverseNote: "To convert MB to GB, divide by 1,000.",
    comparisons: [{ text: "1 GB (1,000 MB) is about 1 hour of streaming standard-definition video." }, { text: "3 GB (3,000 MB) is a typical small mobile data plan." }, { text: "5 GB (5,000 MB) is about 5 hours of web browsing and social media per day for a month." }, { text: "50 GB (50,000 MB) is enough for most people\u2019s monthly mobile data usage." }],
    seoContent: `<p>Converting gigabytes to megabytes helps you understand exactly how much data you have in granular terms. This is particularly useful for mobile data tracking, file management, and understanding app sizes.</p>
<h3>Mobile Data Tracking</h3>
<p>When your phone says you\u2019ve used 2.3 GB of data, that\u2019s 2,300 MB. If your plan gives you 5 GB (5,000 MB), you have 2,700 MB remaining. Tracking in MB gives you a clearer picture of exactly how much data individual activities consume.</p>
<h3>App and File Sizes</h3>
<p>Smaller files and apps are measured in MB. A 2 GB game download is 2,000 MB. A 200 MB app update seems small, but 10 of those is 2 GB. Understanding the GB-to-MB relationship helps you manage limited storage.</p>`,
    faq: [{ q: "How many MB is 1 GB?", a: "1 GB = 1,000 MB in the decimal system." }, { q: "How many MB is 5 GB?", a: "5 GB = 5,000 MB." }, { q: "Is GB bigger than MB?", a: "Yes. 1 GB is 1,000 times larger than 1 MB." }, { q: "How do I convert GB to MB?", a: "Multiply the number of GB by 1,000." }],
    relatedSlugs: ["mb-to-gb", "gb-to-tb", "tb-to-gb", "kg-to-lbs"],
  },
  {
    slug: "tb-to-gb",
    fromKey: "terabyte",
    toKey: "gigabyte",
    categoryId: "digitalStorage",
    h1: "Terabytes to Gigabytes Converter \u2014 TB to GB",
    title: "Terabytes to Gigabytes Converter \u2014 TB to GB Conversion | EveryFreeTool",
    meta: "Convert terabytes to gigabytes instantly. Free online TB to GB converter with reference table and real-world examples. 1 TB = 1,000 GB.",
    quickAnswers: ["0.5 TB = 500 GB", "1 TB = 1,000 GB", "2 TB = 2,000 GB", "4 TB = 4,000 GB", "5 TB = 5,000 GB", "8 TB = 8,000 GB", "10 TB = 10,000 GB", "12 TB = 12,000 GB"],
    referenceTable: [[0.1,"100"],[0.25,"250"],[0.5,"500"],[0.75,"750"],[1,"1000"],[1.5,"1500"],[2,"2000"],[3,"3000"],[4,"4000"],[5,"5000"],[6,"6000"],[8,"8000"],[10,"10000"],[12,"12000"],[14,"14000"],[16,"16000"],[18,"18000"],[20,"20000"],[50,"50000"],[100,"100000"]],
    formulaExplanation: "To convert terabytes to gigabytes, multiply by 1,000 (decimal system).",
    workedExamples: ["Convert 2 TB hard drive to GB: 2 \u00D7 1,000 = 2,000 GB", "Convert 8 TB NAS to GB: 8 \u00D7 1,000 = 8,000 GB"],
    reverseNote: "To convert GB to TB, divide by 1,000.",
    comparisons: [{ text: "1 TB (1,000 GB) can store about 250 HD movies." }, { text: "2 TB (2,000 GB) is a common external hard drive size for backups." }, { text: "4 TB (4,000 GB) holds approximately 1 million photos at 4 MB each." }, { text: "12 TB (12,000 GB) is the maximum iCloud storage plan for consumers." }],
    seoContent: `<p>Understanding the TB-to-GB conversion is important when choosing hard drives, SSDs, cloud storage plans, and NAS (network-attached storage) devices. As file sizes grow with higher-resolution media, terabyte-scale storage is becoming standard.</p>
<h3>Choosing Storage Capacity</h3>
<p>A 1 TB SSD provides 1,000 GB \u2014 enough for the operating system, applications, and a moderate collection of files. A 4 TB external drive gives 4,000 GB for backups and media. NAS devices with multiple bays can offer 20+ TB (20,000+ GB) of total storage.</p>
<h3>Data Usage Perspective</h3>
<p>To fill 1 TB, you\u2019d need about 250,000 photos (4 MB each), 200 HD movies (5 GB each), or 17,000 hours of music. Even for heavy digital users, 1-2 TB provides years of storage before running out.</p>`,
    faq: [{ q: "How many GB in 1 TB?", a: "1 TB equals 1,000 GB in the decimal system." }, { q: "How many GB is 2 TB?", a: "2 TB equals 2,000 GB." }, { q: "Is TB or GB bigger?", a: "TB is bigger. 1 TB = 1,000 GB." }, { q: "How much is 1 TB in real terms?", a: "About 250 HD movies, 250,000 photos, or 6.5 million document pages." }],
    relatedSlugs: ["gb-to-tb", "mb-to-gb", "gb-to-mb", "km-to-miles"],
  },
];

// ── Time Spokes ──────────────────────────────────────────────────────
export const timeSpokes: SpokeData[] = [
  {
    slug: "hours-to-minutes",
    fromKey: "hour",
    toKey: "minute",
    categoryId: "time",
    h1: "Hours to Minutes Converter \u2014 hr to min",
    title: "Hours to Minutes Converter \u2014 hr to min Conversion | EveryFreeTool",
    meta: "Convert hours to minutes instantly. Free online hr to min converter with reference table and examples. 1 hour = 60 minutes.",
    quickAnswers: ["0.25 hours = 15 min", "0.5 hours = 30 min", "0.75 hours = 45 min", "1 hour = 60 min", "1.5 hours = 90 min", "2 hours = 120 min", "3 hours = 180 min", "4 hours = 240 min", "6 hours = 360 min", "8 hours = 480 min", "10 hours = 600 min", "24 hours = 1,440 min"],
    referenceTable: [[0.1,"6"],[0.25,"15"],[0.33,"20"],[0.5,"30"],[0.75,"45"],[1,"60"],[1.25,"75"],[1.5,"90"],[1.75,"105"],[2,"120"],[2.5,"150"],[3,"180"],[4,"240"],[5,"300"],[6,"360"],[8,"480"],[10,"600"],[12,"720"],[16,"960"],[24,"1440"]],
    formulaExplanation: "To convert hours to minutes, multiply the number of hours by 60.",
    workedExamples: ["Convert 2.5 hours to minutes: 2.5 \u00D7 60 = 150 minutes", "Convert 0.75 hours (45 min billing increment) to minutes: 0.75 \u00D7 60 = 45 minutes"],
    reverseNote: "To convert minutes to hours, divide the minutes by 60.",
    comparisons: [{ text: "0.5 hours (30 min) is a typical lunch break." }, { text: "1.5 hours (90 min) is the length of a standard movie." }, { text: "8 hours (480 min) is a standard workday." }, { text: "24 hours (1,440 min) is one full day." }],
    seoContent: `<p>Hours to minutes is one of the most basic time conversions, but it comes up constantly in project management, billing, scheduling, and fitness tracking.</p>
<h3>Billing and Time Tracking</h3>
<p>Freelancers and lawyers often bill in fractions of hours: 0.25 hours (15 min), 0.5 hours (30 min), 0.75 hours (45 min). Timesheet software may display hours as decimals (1.75 hours = 1 hour 45 minutes = 105 minutes). Understanding these conversions ensures accurate billing and payment.</p>
<h3>Scheduling and Planning</h3>
<p>Project managers convert between hours and minutes for task estimation. A 2.5-hour meeting is 150 minutes. Breaking the workday into minute blocks helps with scheduling: an 8-hour day is 480 minutes, leaving time for 6 one-hour meetings with 120 minutes for focused work.</p>
<h3>Cooking and Baking</h3>
<p>Recipes may specify cooking times in hours, minutes, or both. \u201CBake for 1.5 hours\u201D means 90 minutes. A slow-cook recipe of 6 hours is 360 minutes. Timer apps work in minutes, so this conversion is practical in the kitchen.</p>`,
    faq: [{ q: "How many minutes is 1 hour?", a: "1 hour equals exactly 60 minutes." }, { q: "How many minutes is 2.5 hours?", a: "2.5 hours equals 150 minutes." }, { q: "How do I convert decimal hours to minutes?", a: "Multiply the decimal by 60. For example, 1.75 hours \u00D7 60 = 105 minutes (1 hour 45 minutes)." }, { q: "How many hours is 90 minutes?", a: "90 minutes equals 1.5 hours." }],
    relatedSlugs: ["days-to-hours", "weeks-to-days", "feet-to-meters", "kg-to-lbs"],
  },
  {
    slug: "days-to-hours",
    fromKey: "day",
    toKey: "hour",
    categoryId: "time",
    h1: "Days to Hours Converter \u2014 days to hr",
    title: "Days to Hours Converter \u2014 days to hr Conversion | EveryFreeTool",
    meta: "Convert days to hours instantly. Free online days to hours converter with reference table and examples. 1 day = 24 hours.",
    quickAnswers: ["0.5 days = 12 hours", "1 day = 24 hours", "2 days = 48 hours", "3 days = 72 hours", "5 days = 120 hours", "7 days = 168 hours", "10 days = 240 hours", "14 days = 336 hours", "30 days = 720 hours", "365 days = 8,760 hours"],
    referenceTable: [[0.25,"6"],[0.5,"12"],[0.75,"18"],[1,"24"],[1.5,"36"],[2,"48"],[3,"72"],[4,"96"],[5,"120"],[6,"144"],[7,"168"],[10,"240"],[14,"336"],[21,"504"],[28,"672"],[30,"720"],[31,"744"],[60,"1440"],[90,"2160"],[365,"8760"]],
    formulaExplanation: "To convert days to hours, multiply the number of days by 24.",
    workedExamples: ["Convert 7 days (one week) to hours: 7 \u00D7 24 = 168 hours", "Convert 30 days to hours: 30 \u00D7 24 = 720 hours"],
    reverseNote: "To convert hours to days, divide the hours by 24.",
    comparisons: [{ text: "2 days (48 hours) is a standard weekend." }, { text: "5 days (120 hours) is a standard work week." }, { text: "30 days (720 hours) is approximately one month." }, { text: "365 days (8,760 hours) is one year." }],
    seoContent: `<p>Days to hours is a fundamental time conversion used in project management, shipping, medicine, and everyday planning.</p>
<h3>Project Deadlines</h3>
<p>When a deadline is \"3 days away,\" that\u2019s 72 hours. Breaking deadlines into hours helps with realistic planning. A 5-day project has 120 total hours, but with 8-hour workdays, only 40 hours of actual work time. This perspective helps avoid overcommitting.</p>
<h3>Shipping and Delivery</h3>
<p>Shipping times are often quoted in days but tracked in hours. \"2-day shipping\" means delivery within 48 hours of dispatch. Understanding this in hours helps set realistic expectations, especially when weekends and holidays are involved.</p>
<h3>Medical and Scientific</h3>
<p>Medical instructions often specify time in hours (\"take every 8 hours\") or days (\"continue for 10 days\"). A 10-day course of medication taken every 8 hours means 30 doses over 240 hours. Lab experiments and incubation periods are tracked in both units.</p>`,
    faq: [{ q: "How many hours in a day?", a: "One day equals exactly 24 hours." }, { q: "How many hours is 7 days?", a: "7 days equals 168 hours." }, { q: "How many hours in a month?", a: "A 30-day month has 720 hours. A 31-day month has 744 hours. February has 672 hours (or 696 in a leap year)." }, { q: "How many hours in a year?", a: "A standard year has 8,760 hours. A leap year has 8,784 hours." }],
    relatedSlugs: ["hours-to-minutes", "weeks-to-days", "celsius-to-fahrenheit", "km-to-miles"],
  },
  {
    slug: "weeks-to-days",
    fromKey: "week",
    toKey: "day",
    categoryId: "time",
    h1: "Weeks to Days Converter \u2014 wk to days",
    title: "Weeks to Days Converter \u2014 wk to days Conversion | EveryFreeTool",
    meta: "Convert weeks to days instantly. Free online weeks to days converter with reference table and examples. 1 week = 7 days.",
    quickAnswers: ["1 week = 7 days", "2 weeks = 14 days", "3 weeks = 21 days", "4 weeks = 28 days", "6 weeks = 42 days", "8 weeks = 56 days", "10 weeks = 70 days", "12 weeks = 84 days", "26 weeks = 182 days", "52 weeks = 364 days"],
    referenceTable: [[1,"7"],[2,"14"],[3,"21"],[4,"28"],[5,"35"],[6,"42"],[7,"49"],[8,"56"],[9,"63"],[10,"70"],[12,"84"],[13,"91"],[16,"112"],[20,"140"],[24,"168"],[26,"182"],[36,"252"],[40,"280"],[48,"336"],[52,"364"]],
    formulaExplanation: "To convert weeks to days, multiply the number of weeks by 7.",
    workedExamples: ["Convert 6 weeks to days: 6 \u00D7 7 = 42 days", "Convert 52 weeks to days: 52 \u00D7 7 = 364 days"],
    reverseNote: "To convert days to weeks, divide the days by 7.",
    comparisons: [{ text: "2 weeks (14 days) is a common vacation length." }, { text: "4 weeks (28 days) is close to one month." }, { text: "12 weeks (84 days) is a typical school quarter." }, { text: "40 weeks (280 days) is the average human pregnancy duration." }],
    seoContent: `<p>Weeks to days is a simple but frequently needed conversion for pregnancy tracking, project planning, academic scheduling, and fitness programs.</p>
<h3>Pregnancy Tracking</h3>
<p>Pregnancy is measured in weeks (40 weeks average), but many people think in months and days. Each trimester is about 13 weeks: first trimester ends at week 13 (91 days), second at week 27 (189 days), and birth around week 40 (280 days). Converting weeks to days helps track milestones precisely.</p>
<h3>Project Planning</h3>
<p>Agile software development uses 2-week sprints (14 days). A 12-week project roadmap spans 84 days. Academic quarters are typically 10-12 weeks (70-84 days). College semesters run about 15-16 weeks (105-112 days).</p>
<h3>Fitness and Training</h3>
<p>Training programs often run in weeks: an 8-week fitness plan is 56 days, a 12-week marathon training program is 84 days, and a 16-week program for advanced runners is 112 days. Counting in days helps with daily scheduling.</p>`,
    faq: [{ q: "How many days is 1 week?", a: "1 week equals exactly 7 days." }, { q: "How many days is 6 weeks?", a: "6 weeks equals 42 days." }, { q: "How many weeks in a year?", a: "A year has 52 weeks and 1 day (or 52 weeks and 2 days in a leap year)." }, { q: "How many days is 40 weeks?", a: "40 weeks equals 280 days \u2014 the average duration of a human pregnancy." }],
    relatedSlugs: ["days-to-hours", "hours-to-minutes", "kg-to-lbs", "miles-to-km"],
  },
];

// ── Energy Spokes ────────────────────────────────────────────────────
export const energySpokes: SpokeData[] = [
  {
    slug: "calories-to-joules",
    fromKey: "calorie",
    toKey: "joule",
    categoryId: "energy",
    h1: "Calories to Joules Converter \u2014 cal to J",
    title: "Calories to Joules Converter \u2014 cal to J Conversion | EveryFreeTool",
    meta: "Convert calories to joules instantly. Free online cal to J converter with formula, reference table, and examples. 1 calorie = 4.184 joules.",
    quickAnswers: ["1 calorie = 4.184 joules", "10 cal = 41.84 J", "50 cal = 209.2 J", "100 cal = 418.4 J", "200 cal = 836.8 J", "500 cal = 2,092 J", "1,000 cal (1 kcal) = 4,184 J", "2,000 cal (2 kcal) = 8,368 J"],
    referenceTable: [[1,"4.184"],[5,"20.92"],[10,"41.84"],[25,"104.6"],[50,"209.2"],[100,"418.4"],[200,"836.8"],[250,"1046"],[500,"2092"],[750,"3138"],[1000,"4184"],[1500,"6276"],[2000,"8368"],[2500,"10460"],[5000,"20920"],[10000,"41840"],[50000,"209200"],[100000,"418400"],[500000,"2092000"],[1000000,"4184000"]],
    formulaExplanation: "To convert calories (thermochemical) to joules, multiply by 4.184. Note: the food \"Calorie\" (uppercase C, or kilocalorie) = 1,000 small calories = 4,184 joules.",
    workedExamples: ["Convert 250 small calories to joules: 250 \u00D7 4.184 = 1,046 J", "Convert 2,000 food Calories (kcal) to joules: 2,000 \u00D7 4,184 = 8,368,000 J (8,368 kJ)"],
    reverseNote: "To convert joules to calories, divide by 4.184.",
    comparisons: [{ text: "1 calorie (4.184 J) is the energy needed to heat 1 gram of water by 1\u00B0C." }, { text: "1 food Calorie (4,184 J) is 1,000 small calories \u2014 what you see on nutrition labels." }, { text: "2,000 food Calories (8.37 MJ) is the average daily energy intake for an adult." }, { text: "A 100-watt lightbulb uses 100 joules per second." }],
    seoContent: `<p>Calories and joules both measure energy but in different contexts. The calorie originated in heat measurement, while the joule is the SI standard for all forms of energy. Understanding the relationship is important for nutrition science, physics, and chemistry.</p>
<h3>Calories vs. Kilocalories (Calories)</h3>
<p>There\u2019s a common confusion: the \"calorie\" on food labels is actually a kilocalorie (kcal), sometimes written with a capital C as \"Calorie.\" One food Calorie = 1 kcal = 1,000 small calories = 4,184 joules. This converter uses small (thermochemical) calories. For food Calories, multiply the result by 1,000.</p>
<h3>Physics and Chemistry</h3>
<p>In science, the joule has largely replaced the calorie as the standard energy unit. Chemical reaction energies, heat capacities, and thermodynamic calculations all use joules. However, the calorie persists in some chemistry contexts (calorie per gram, calorie per mole).</p>
<h3>Nutrition and Exercise</h3>
<p>Nutrition labels worldwide are shifting toward kilojoules. A 2,000 kcal daily diet is about 8,368 kJ. A banana has about 105 kcal (440 kJ). Running burns about 400-600 kcal (1,674-2,510 kJ) per hour. Many countries now require both kcal and kJ on food labels.</p>`,
    faq: [{ q: "How many joules is 1 calorie?", a: "One small (thermochemical) calorie equals 4.184 joules. One food Calorie (kilocalorie) equals 4,184 joules." }, { q: "What is the difference between a calorie and a Calorie?", a: "A small calorie (cal) is the energy to heat 1g of water by 1\u00B0C. A food Calorie (Cal or kcal) is 1,000 small calories. Nutrition labels use kilocalories." }, { q: "How many kilojoules in a food Calorie?", a: "1 food Calorie (kcal) = 4.184 kilojoules (kJ)." }, { q: "Why do scientists prefer joules over calories?", a: "The joule is the SI standard energy unit and works consistently across all energy types (thermal, electrical, mechanical). The calorie is specific to heat and water." }],
    relatedSlugs: ["kwh-to-joules", "celsius-to-fahrenheit", "kg-to-lbs", "liters-to-gallons"],
  },
  {
    slug: "kwh-to-joules",
    fromKey: "kilowattHour",
    toKey: "joule",
    categoryId: "energy",
    h1: "Kilowatt Hours to Joules Converter \u2014 kWh to J",
    title: "Kilowatt Hours to Joules Converter \u2014 kWh to J Conversion | EveryFreeTool",
    meta: "Convert kilowatt hours to joules instantly. Free online kWh to J converter with formula, reference table, and examples. 1 kWh = 3,600,000 joules.",
    quickAnswers: ["0.001 kWh = 3,600 J", "0.01 kWh = 36,000 J", "0.1 kWh = 360,000 J", "1 kWh = 3,600,000 J (3.6 MJ)", "5 kWh = 18,000,000 J (18 MJ)", "10 kWh = 36,000,000 J (36 MJ)", "100 kWh = 360,000,000 J (360 MJ)"],
    referenceTable: [[0.001,"3600"],[0.005,"18000"],[0.01,"36000"],[0.05,"180000"],[0.1,"360000"],[0.25,"900000"],[0.5,"1800000"],[1,"3600000"],[2,"7200000"],[3,"10800000"],[5,"18000000"],[10,"36000000"],[25,"90000000"],[50,"180000000"],[75,"270000000"],[100,"360000000"],[250,"900000000"],[500,"1800000000"],[750,"2700000000"],[1000,"3600000000"]],
    formulaExplanation: "To convert kilowatt hours to joules, multiply by 3,600,000. One kWh is the energy of 1,000 watts running for 1 hour (3,600 seconds), so 1 kWh = 1,000 \u00D7 3,600 = 3,600,000 joules.",
    workedExamples: ["Convert 10 kWh (daily household usage) to joules: 10 \u00D7 3,600,000 = 36,000,000 J (36 MJ)", "Convert 0.1 kWh to joules: 0.1 \u00D7 3,600,000 = 360,000 J"],
    reverseNote: "To convert joules to kWh, divide by 3,600,000.",
    comparisons: [{ text: "1 kWh (3.6 MJ) is the energy to run a 100W lightbulb for 10 hours." }, { text: "0.1 kWh (360 kJ) is roughly the energy to run a laptop for 1 hour." }, { text: "10 kWh (36 MJ) is the average daily electricity use of a US household." }, { text: "75 kWh is the battery capacity of a typical electric car (like a Tesla Model 3)." }],
    seoContent: `<p>Kilowatt hours and joules both measure energy, but in different contexts. The kWh is the standard unit on electricity bills, while the joule is the fundamental SI energy unit used in physics and engineering.</p>
<h3>Electricity Bills</h3>
<p>Your electricity bill is measured in kWh. The average US household uses about 30 kWh per day (about 900 kWh per month). Each kWh equals 3.6 million joules. At $0.12/kWh, you\u2019re paying 12 cents per 3.6 million joules of energy.</p>
<h3>Electric Vehicles</h3>
<p>EV battery capacity is measured in kWh: a Tesla Model 3 has about 60-82 kWh (216-295 million joules). Efficiency is measured in kWh per 100 miles. Understanding the joule equivalent helps appreciate the enormous energy stored in these batteries.</p>
<h3>Energy Efficiency</h3>
<p>Comparing energy sources and appliances in joules provides a common baseline. A gas water heater might use 40,000 BTU/hour (about 42 MJ or 11.7 kWh). An electric heat pump might use 4 kWh (14.4 MJ) for the same heating output \u2014 much more efficient.</p>`,
    faq: [{ q: "How many joules in 1 kWh?", a: "1 kWh = 3,600,000 joules (3.6 megajoules)." }, { q: "Why is the number so large?", a: "A joule is a very small unit of energy. A watt-second is 1 joule, and there are 3,600 seconds in an hour, times 1,000 watts in a kilowatt." }, { q: "How do I convert kWh to megajoules?", a: "Multiply kWh by 3.6. For example, 10 kWh = 36 MJ." }, { q: "What uses 1 kWh of electricity?", a: "A 100-watt bulb for 10 hours, a microwave for about 1 hour, or charging a phone about 50 times." }],
    relatedSlugs: ["calories-to-joules", "celsius-to-fahrenheit", "liters-to-gallons", "kg-to-lbs"],
  },
];

// ── Pressure Spokes ──────────────────────────────────────────────────
export const pressureSpokes: SpokeData[] = [
  {
    slug: "psi-to-bar",
    fromKey: "psi",
    toKey: "bar",
    categoryId: "pressure",
    h1: "PSI to Bar Converter \u2014 psi to bar",
    title: "PSI to Bar Converter \u2014 psi to bar Conversion | EveryFreeTool",
    meta: "Convert PSI to bar instantly. Free online psi to bar converter with formula, reference table, and real-world examples. 1 psi = 0.06895 bar.",
    quickAnswers: ["1 psi = 0.0689 bar", "10 psi = 0.6895 bar", "14.5 psi = 1 bar", "20 psi = 1.3790 bar", "30 psi = 2.0684 bar", "32 psi = 2.2064 bar", "35 psi = 2.4132 bar", "40 psi = 2.7579 bar", "50 psi = 3.4474 bar", "100 psi = 6.8948 bar"],
    referenceTable: [[1,"0.0689"],[2,"0.1379"],[5,"0.3447"],[10,"0.6895"],[14.504,"1"],[15,"1.0342"],[20,"1.379"],[25,"1.7237"],[30,"2.0684"],[32,"2.2064"],[35,"2.4132"],[40,"2.7579"],[45,"3.1026"],[50,"3.4474"],[60,"4.1369"],[75,"5.1711"],[80,"5.5158"],[100,"6.8948"],[150,"10.3421"],[200,"13.7895"]],
    formulaExplanation: "To convert PSI to bar, multiply by 0.0689476. Alternatively, divide by 14.5038.",
    workedExamples: ["Convert 35 psi (typical tire pressure) to bar: 35 \u00D7 0.0689476 = 2.41 bar", "Convert 100 psi to bar: 100 \u00D7 0.0689476 = 6.89 bar"],
    reverseNote: "To convert bar to PSI, multiply by 14.5038.",
    comparisons: [{ text: "1 bar (14.5 psi) is approximately atmospheric pressure at sea level." }, { text: "2.2 bar (32 psi) is typical car tire pressure." }, { text: "3.4 bar (50 psi) is mountain bike tire pressure." }, { text: "200 bar (2,900 psi) is a full scuba tank." }],
    seoContent: `<p>PSI (pounds per square inch) and bar are the two most common pressure units in everyday and industrial use. PSI is standard in the US, while bar is common in Europe and much of the world. The conversion is essential for automotive, industrial, and diving applications.</p>
<h3>Tire Pressure</h3>
<p>Tire pressure is the most common reason people convert between PSI and bar. US tire gauges read in PSI, while European gauges and many car door stickers show bar. Typical car tire pressure: 30-35 PSI = 2.07-2.41 bar. Bicycle road tires: 80-130 PSI = 5.5-9.0 bar. Mountain bike tires: 30-50 PSI = 2.1-3.4 bar.</p>
<h3>Scuba Diving</h3>
<p>Dive tanks are rated in bar in most of the world and PSI in the US. A full aluminum 80 tank is about 200 bar (2,900 PSI). Dive computers and gauges may display in either unit. Understanding the conversion is important for safety and planning.</p>
<h3>Industrial Applications</h3>
<p>Hydraulic systems, pneumatic tools, and pressure vessels use both units depending on the country. A compressor rated at 150 PSI provides about 10.3 bar. Industrial specifications, safety ratings, and equipment manuals may use either or both units.</p>`,
    faq: [{ q: "How do I convert PSI to bar?", a: "Multiply the PSI value by 0.0689476. For example, 35 PSI \u00D7 0.0689476 = 2.41 bar." }, { q: "What is 32 PSI in bar?", a: "32 PSI is approximately 2.21 bar \u2014 a common car tire pressure." }, { q: "Is bar or PSI more common?", a: "PSI is standard in the US and UK. Bar is standard in continental Europe and much of the world. Both are widely used internationally." }, { q: "What is normal atmospheric pressure in PSI and bar?", a: "Standard atmospheric pressure is 14.696 PSI or 1.01325 bar." }],
    relatedSlugs: ["bar-to-psi", "celsius-to-fahrenheit", "kg-to-lbs", "liters-to-gallons"],
  },
  {
    slug: "bar-to-psi",
    fromKey: "bar",
    toKey: "psi",
    categoryId: "pressure",
    h1: "Bar to PSI Converter \u2014 bar to psi",
    title: "Bar to PSI Converter \u2014 bar to psi Conversion | EveryFreeTool",
    meta: "Convert bar to PSI instantly. Free online bar to psi converter with formula, reference table, and real-world examples. 1 bar = 14.5038 psi.",
    quickAnswers: ["1 bar = 14.504 psi", "1.5 bar = 21.756 psi", "2 bar = 29.008 psi", "2.2 bar = 31.908 psi", "2.4 bar = 34.809 psi", "2.5 bar = 36.26 psi", "3 bar = 43.511 psi", "4 bar = 58.015 psi", "5 bar = 72.519 psi", "10 bar = 145.038 psi"],
    referenceTable: [[0.5,"7.252"],[1,"14.504"],[1.5,"21.756"],[2,"29.008"],[2.2,"31.909"],[2.4,"34.809"],[2.5,"36.26"],[2.8,"40.611"],[3,"43.511"],[3.5,"50.763"],[4,"58.015"],[5,"72.519"],[6,"87.023"],[7,"101.526"],[8,"116.03"],[10,"145.038"],[15,"217.557"],[20,"290.076"],[50,"725.189"],[200,"2900.76"]],
    formulaExplanation: "To convert bar to PSI, multiply by 14.5038.",
    workedExamples: ["Convert 2.4 bar (tire pressure) to PSI: 2.4 \u00D7 14.5038 = 34.81 PSI", "Convert 200 bar (scuba tank) to PSI: 200 \u00D7 14.5038 = 2,900.76 PSI"],
    reverseNote: "To convert PSI to bar, divide by 14.5038, or multiply by 0.0689476.",
    comparisons: [{ text: "1 bar (14.5 psi) is roughly equal to atmospheric pressure at sea level." }, { text: "2.4 bar (34.8 psi) is standard car tire pressure in many vehicles." }, { text: "8 bar (116 psi) is a typical air compressor operating pressure." }, { text: "200 bar (2,901 psi) is the pressure in a full scuba diving tank." }],
    seoContent: `<p>Bar to PSI conversion is needed when working with pressure specifications across international borders. Equipment manufactured in Europe typically uses bar, while American specifications use PSI.</p>
<h3>Automotive</h3>
<p>If your European car\u2019s door placard recommends 2.4 bar for front tires and 2.2 bar for rear tires, you need 34.8 PSI and 31.9 PSI respectively at a US gas station air pump. Many tire pressure monitoring systems (TPMS) can be set to display in either unit.</p>
<h3>Coffee and Espresso</h3>
<p>Espresso machines operate at 9 bar (130.5 PSI). This specific pressure is critical for proper extraction. Home espresso machine specifications are often in bar, while American discussions may reference PSI. Understanding both helps evaluate machine quality.</p>
<h3>Pressure Washers</h3>
<p>European pressure washers are rated in bar, while American models use PSI. A light-duty washer runs at about 70-100 bar (1,015-1,450 PSI). Heavy-duty commercial units reach 200+ bar (2,900+ PSI). Comparing models internationally requires this conversion.</p>`,
    faq: [{ q: "How many PSI is 1 bar?", a: "1 bar equals approximately 14.5038 PSI." }, { q: "How do I convert bar to PSI?", a: "Multiply the bar value by 14.5038. For example, 2.5 bar \u00D7 14.5038 = 36.26 PSI." }, { q: "What pressure is 2.2 bar in PSI?", a: "2.2 bar is approximately 31.9 PSI." }, { q: "What is bar pressure?", a: "Bar is a metric unit of pressure. 1 bar is approximately equal to atmospheric pressure at sea level (1 atm = 1.01325 bar). It\u2019s widely used in Europe for tire pressure, industrial applications, and weather." }],
    relatedSlugs: ["psi-to-bar", "fahrenheit-to-celsius", "lbs-to-kg", "gallons-to-liters"],
  },
];

// ── Fuel Economy Spokes ──────────────────────────────────────────────
export const fuelEconomySpokes: SpokeData[] = [
  {
    slug: "mpg-to-l-per-100km",
    fromKey: "mpgUS",
    toKey: "lPer100km",
    categoryId: "fuelEconomy",
    h1: "MPG to L/100km Converter \u2014 Miles per Gallon to Liters per 100 km",
    title: "MPG to L/100km Converter \u2014 Fuel Economy Conversion | EveryFreeTool",
    meta: "Convert MPG to L/100km instantly. Free online fuel economy converter with formula, reference table, and real-world examples. 30 MPG = 7.84 L/100km.",
    quickAnswers: ["15 mpg = 15.68 L/100km", "20 mpg = 11.76 L/100km", "25 mpg = 9.41 L/100km", "30 mpg = 7.84 L/100km", "35 mpg = 6.72 L/100km", "40 mpg = 5.88 L/100km", "45 mpg = 5.23 L/100km", "50 mpg = 4.70 L/100km", "60 mpg = 3.92 L/100km"],
    referenceTable: [[10,"23.521"],[12,"19.601"],[15,"15.681"],[18,"13.068"],[20,"11.761"],[22,"10.692"],[25,"9.409"],[28,"8.4"],[30,"7.84"],[32,"7.35"],[35,"6.72"],[38,"6.19"],[40,"5.88"],[42,"5.6"],[45,"5.227"],[48,"4.9"],[50,"4.704"],[55,"4.277"],[60,"3.92"],[70,"3.36"]],
    formulaExplanation: "To convert MPG (US) to L/100km, divide 235.215 by the MPG value. The formula is: L/100km = 235.215 \u00F7 MPG. Note this is an INVERSE relationship \u2014 higher MPG means lower L/100km (better fuel economy).",
    workedExamples: ["Convert 30 MPG to L/100km: 235.215 \u00F7 30 = 7.84 L/100km", "Convert 50 MPG (a hybrid car) to L/100km: 235.215 \u00F7 50 = 4.70 L/100km"],
    reverseNote: "To convert L/100km to MPG, divide 235.215 by the L/100km value.",
    comparisons: [{ text: "15 mpg (15.7 L/100km) is typical for a large SUV or truck." }, { text: "30 mpg (7.8 L/100km) is average for a modern sedan." }, { text: "50 mpg (4.7 L/100km) is typical for a hybrid vehicle." }, { text: "In L/100km: lower is better. 5 L/100km is excellent, 10 is average, 15+ is thirsty." }],
    seoContent: `<p>MPG and L/100km both measure fuel economy, but they work in opposite directions. MPG (miles per gallon) measures distance per unit of fuel \u2014 higher is better. L/100km (liters per 100 kilometers) measures fuel per distance \u2014 lower is better. This inverse relationship is the trickiest part of the conversion.</p>
<h3>Car Shopping Internationally</h3>
<p>If you\u2019re comparing cars between the US and Europe, you need this conversion. A European car rated at 5.5 L/100km gets about 42.8 MPG \u2014 excellent by American standards. An American truck getting 15 MPG uses 15.7 L/100km \u2014 high by European standards.</p>
<h3>Rental Cars Abroad</h3>
<p>When renting a car in a metric country, the fuel economy sticker will show L/100km. Understanding that 6 L/100km \u2248 39 MPG helps you choose an efficient vehicle and estimate fuel costs for your trip.</p>
<h3>The Inverse Math</h3>
<p>The formula is simple: L/100km = 235.215 \u00F7 MPG. The constant 235.215 comes from converting miles to kilometers and gallons to liters. The key insight is that doubling your MPG cuts your L/100km in half. Going from 20 to 40 MPG cuts fuel usage from 11.8 to 5.9 L/100km.</p>
<h3>UK vs US MPG</h3>
<p>UK MPG uses the larger imperial gallon (4.546 L), so UK MPG numbers are always higher than US MPG for the same car. A car getting 40 US MPG gets about 48 UK MPG. The formula for UK MPG to L/100km is: 282.481 \u00F7 UK MPG.</p>`,
    faq: [{ q: "How do I convert MPG to L/100km?", a: "Divide 235.215 by the MPG value. For example, 30 MPG = 235.215 \u00F7 30 = 7.84 L/100km." }, { q: "Is higher or lower L/100km better?", a: "Lower is better. L/100km measures fuel consumption \u2014 a car using 5 L/100km is more efficient than one using 10 L/100km." }, { q: "What is good fuel economy in L/100km?", a: "Under 6 L/100km (over 39 MPG) is excellent. 6-8 L/100km (29-39 MPG) is good. 8-12 L/100km (20-29 MPG) is average. Over 12 L/100km (under 20 MPG) is poor." }, { q: "Why is the conversion not a simple multiplication?", a: "Because MPG and L/100km have an inverse relationship. MPG measures distance per fuel, while L/100km measures fuel per distance. The conversion uses division, not multiplication." }],
    relatedSlugs: ["liters-to-gallons", "gallons-to-liters", "km-to-miles", "miles-to-km"],
  },
];
