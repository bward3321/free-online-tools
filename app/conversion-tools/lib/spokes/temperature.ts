import { SpokeData } from "./types";

export const temperatureSpokes: SpokeData[] = [
  {
    slug: "celsius-to-fahrenheit",
    fromKey: "celsius",
    toKey: "fahrenheit",
    categoryId: "temperature",
    h1: "Celsius to Fahrenheit Converter \u2014 \u00B0C to \u00B0F",
    title: "Celsius to Fahrenheit Converter \u2014 \u00B0C to \u00B0F Conversion | EveryFreeTool",
    meta: "Convert Celsius to Fahrenheit instantly. Free online \u00B0C to \u00B0F converter with formula, reference table, and real-world examples. 0\u00B0C = 32\u00B0F.",
    quickAnswers: [
      "0\u00B0C = 32\u00B0F (freezing point of water)", "10\u00B0C = 50\u00B0F", "15\u00B0C = 59\u00B0F",
      "20\u00B0C = 68\u00B0F (room temperature)", "25\u00B0C = 77\u00B0F", "30\u00B0C = 86\u00B0F",
      "37\u00B0C = 98.6\u00B0F (body temperature)", "40\u00B0C = 104\u00B0F (high fever)",
      "100\u00B0C = 212\u00B0F (boiling point of water)", "180\u00B0C = 356\u00B0F (oven baking)",
      "200\u00B0C = 392\u00B0F", "220\u00B0C = 428\u00B0F",
    ],
    referenceTable: [
      [-40, "-40"], [-20, "-4"], [-10, "14"], [0, "32"], [5, "41"],
      [10, "50"], [15, "59"], [20, "68"], [25, "77"], [30, "86"],
      [35, "95"], [37, "98.6"], [40, "104"], [50, "122"], [60, "140"],
      [80, "176"], [100, "212"], [150, "302"], [200, "392"], [250, "482"],
    ],
    formulaExplanation: "To convert Celsius to Fahrenheit, multiply the Celsius temperature by 9/5 (or 1.8), then add 32. The formula is: \u00B0F = (\u00B0C \u00D7 9/5) + 32.",
    workedExamples: [
      "Convert 25\u00B0C to Fahrenheit: (25 \u00D7 1.8) + 32 = 45 + 32 = 77\u00B0F",
      "Convert 180\u00B0C (baking temp) to Fahrenheit: (180 \u00D7 1.8) + 32 = 324 + 32 = 356\u00B0F",
    ],
    reverseNote: "To convert Fahrenheit to Celsius, subtract 32 then multiply by 5/9: \u00B0C = (\u00B0F \u2212 32) \u00D7 5/9.",
    comparisons: [
      { text: "0\u00B0C (32\u00B0F) is the freezing point of water \u2014 when puddles turn to ice." },
      { text: "20\u00B0C (68\u00B0F) is a comfortable room temperature." },
      { text: "37\u00B0C (98.6\u00B0F) is normal human body temperature." },
      { text: "100\u00B0C (212\u00B0F) is the boiling point of water at sea level." },
    ],
    seoContent: `<p>Celsius and Fahrenheit are the two most widely used temperature scales. Celsius (also called centigrade) is used by every country in the world for weather, science, and daily life \u2014 except the United States, which uses Fahrenheit for weather forecasts, cooking, and everyday temperature references.</p>
<p>The Celsius scale sets 0\u00B0 at the freezing point of water and 100\u00B0 at the boiling point. The Fahrenheit scale sets 32\u00B0 at freezing and 212\u00B0 at boiling. This means the two scales overlap at exactly one point: \u221240\u00B0C = \u221240\u00B0F.</p>
<h3>Weather</h3>
<p>Understanding weather in Celsius when you think in Fahrenheit (or vice versa) is the most common reason for this conversion. Quick anchors: 0\u00B0C = freezing, 10\u00B0C = cool jacket weather, 20\u00B0C = pleasant, 30\u00B0C = hot, 40\u00B0C = dangerously hot. If you hear \"it\u2019s 35 degrees\" in Europe, that\u2019s 95\u00B0F \u2014 very hot.</p>
<h3>Cooking and Baking</h3>
<p>Oven temperatures in recipes from different countries use different scales. A European recipe at 180\u00B0C equals 356\u00B0F. British recipes may reference gas marks too. Key cooking temps: 150\u00B0C = 302\u00B0F (slow roast), 180\u00B0C = 356\u00B0F (standard baking), 200\u00B0C = 392\u00B0F (hot oven), 220\u00B0C = 428\u00B0F (pizza, high-heat roasting).</p>
<h3>Medical: Fever Detection</h3>
<p>Normal body temperature is 37\u00B0C (98.6\u00B0F). A fever is generally considered to start at 38\u00B0C (100.4\u00B0F). High fever is 39.4\u00B0C (103\u00B0F) or above. If a European thermometer reads 38.5\u00B0C, that\u2019s 101.3\u00B0F \u2014 a definite fever.</p>
<h3>Quick Mental Trick</h3>
<p>For a rough estimate, double the Celsius and add 30. This gives: 10\u00B0C \u2192 50\u00B0F (exact: 50\u00B0F \u2714), 20\u00B0C \u2192 70\u00B0F (exact: 68\u00B0F), 30\u00B0C \u2192 90\u00B0F (exact: 86\u00B0F). Not precise, but fast and useful.</p>`,
    faq: [
      { q: "What is the formula for Celsius to Fahrenheit?", a: "The formula is: \u00B0F = (\u00B0C \u00D7 9/5) + 32. Multiply the Celsius temperature by 1.8, then add 32." },
      { q: "What is 0\u00B0C in Fahrenheit?", a: "0\u00B0C equals 32\u00B0F \u2014 the freezing point of water." },
      { q: "What is normal body temperature in Fahrenheit?", a: "Normal body temperature is approximately 37\u00B0C, which equals 98.6\u00B0F." },
      { q: "At what temperature are Celsius and Fahrenheit equal?", a: "Celsius and Fahrenheit are equal at \u221240\u00B0. That is, \u221240\u00B0C = \u221240\u00B0F." },
      { q: "Why does the US use Fahrenheit?", a: "The Fahrenheit scale was widely adopted before the Celsius scale was developed. While most countries switched to Celsius as part of metrication, the US retained Fahrenheit for everyday use due to cultural familiarity and the cost of switching." },
    ],
    relatedSlugs: ["fahrenheit-to-celsius", "celsius-to-kelvin", "km-to-miles", "kg-to-lbs"],
  },
  {
    slug: "fahrenheit-to-celsius",
    fromKey: "fahrenheit",
    toKey: "celsius",
    categoryId: "temperature",
    h1: "Fahrenheit to Celsius Converter \u2014 \u00B0F to \u00B0C",
    title: "Fahrenheit to Celsius Converter \u2014 \u00B0F to \u00B0C Conversion | EveryFreeTool",
    meta: "Convert Fahrenheit to Celsius instantly. Free online \u00B0F to \u00B0C converter with formula, reference table, and real-world examples. 32\u00B0F = 0\u00B0C.",
    quickAnswers: [
      "32\u00B0F = 0\u00B0C (freezing)", "50\u00B0F = 10\u00B0C", "68\u00B0F = 20\u00B0C (room temp)",
      "72\u00B0F = 22.22\u00B0C", "77\u00B0F = 25\u00B0C", "85\u00B0F = 29.44\u00B0C",
      "98.6\u00B0F = 37\u00B0C (body temp)", "100\u00B0F = 37.78\u00B0C",
      "212\u00B0F = 100\u00B0C (boiling)", "350\u00B0F = 176.67\u00B0C (oven baking)",
      "400\u00B0F = 204.44\u00B0C", "450\u00B0F = 232.22\u00B0C",
    ],
    referenceTable: [
      [-40, "-40"], [0, "-17.78"], [10, "-12.22"], [20, "-6.67"], [32, "0"],
      [40, "4.44"], [50, "10"], [60, "15.56"], [68, "20"], [72, "22.22"],
      [77, "25"], [80, "26.67"], [90, "32.22"], [98.6, "37"], [100, "37.78"],
      [120, "48.89"], [150, "65.56"], [212, "100"], [350, "176.67"], [450, "232.22"],
    ],
    formulaExplanation: "To convert Fahrenheit to Celsius, subtract 32 from the Fahrenheit temperature, then multiply by 5/9. The formula is: \u00B0C = (\u00B0F \u2212 32) \u00D7 5/9.",
    workedExamples: [
      "Convert 72\u00B0F (typical AC setting) to Celsius: (72 \u2212 32) \u00D7 5/9 = 40 \u00D7 0.5556 = 22.22\u00B0C",
      "Convert 350\u00B0F (baking temp) to Celsius: (350 \u2212 32) \u00D7 5/9 = 318 \u00D7 0.5556 = 176.67\u00B0C",
    ],
    reverseNote: "To convert Celsius to Fahrenheit, multiply by 9/5 then add 32: \u00B0F = (\u00B0C \u00D7 9/5) + 32.",
    comparisons: [
      { text: "32\u00B0F (0\u00B0C) is when water freezes and you see frost on your windshield." },
      { text: "72\u00B0F (22.2\u00B0C) is a typical comfortable thermostat setting." },
      { text: "98.6\u00B0F (37\u00B0C) is normal human body temperature." },
      { text: "350\u00B0F (176.7\u00B0C) is the standard oven temperature for baking cookies and cakes." },
    ],
    seoContent: `<p>Fahrenheit to Celsius conversion is essential for Americans traveling abroad, cooking from international recipes, or communicating about weather with the rest of the world. The Fahrenheit scale is unique to the United States for everyday use, while Celsius is the global standard.</p>
<h3>Thermostat and HVAC</h3>
<p>American thermostats are set in Fahrenheit. If you\u2019re setting up a smart thermostat that defaults to Celsius, or if you\u2019re following European energy-saving tips, you\u2019ll need to convert. A comfortable 72\u00B0F equals about 22\u00B0C. Dropping your thermostat from 72\u00B0F to 68\u00B0F (20\u00B0C) can save significant energy.</p>
<h3>Cooking Temperatures</h3>
<p>American recipes use Fahrenheit for oven temperatures: 325\u00B0F (163\u00B0C) for slow baking, 350\u00B0F (177\u00B0C) for standard baking, 375\u00B0F (191\u00B0C) for cookies, 400\u00B0F (204\u00B0C) for roasting, 425\u00B0F (218\u00B0C) for pizza, and 450\u00B0F (232\u00B0C) for high-heat cooking. If your oven is metric, these conversions are essential.</p>
<h3>Science and Weather</h3>
<p>All scientific work uses Celsius (or Kelvin). If you\u2019re reading a scientific paper and see temperatures in Celsius but think in Fahrenheit, remember: each degree Celsius is 1.8 degrees Fahrenheit. A 5\u00B0C temperature change equals a 9\u00B0F change.</p>
<h3>Mental Shortcut</h3>
<p>Subtract 30, then halve: 80\u00B0F \u2212 30 = 50, \u00F7 2 = 25\u00B0C (actual: 26.7\u00B0C). It\u2019s quick and gets you within a few degrees \u2014 good enough for weather estimates.</p>`,
    faq: [
      { q: "What is the formula for Fahrenheit to Celsius?", a: "The formula is: \u00B0C = (\u00B0F \u2212 32) \u00D7 5/9. Subtract 32, then multiply by 0.5556." },
      { q: "What is 72\u00B0F in Celsius?", a: "72\u00B0F equals approximately 22.22\u00B0C \u2014 a comfortable room temperature." },
      { q: "What is 350\u00B0F in Celsius?", a: "350\u00B0F equals approximately 176.67\u00B0C \u2014 a standard baking temperature." },
      { q: "What is a fever in Fahrenheit?", a: "A fever is generally considered to start at 100.4\u00B0F (38\u00B0C). A high fever is 103\u00B0F (39.4\u00B0C) or above." },
      { q: "What is absolute zero in Fahrenheit?", a: "Absolute zero is \u2212459.67\u00B0F (\u2212273.15\u00B0C or 0 K). It\u2019s the theoretical lowest possible temperature." },
    ],
    relatedSlugs: ["celsius-to-fahrenheit", "celsius-to-kelvin", "feet-to-meters", "lbs-to-kg"],
  },
  {
    slug: "celsius-to-kelvin",
    fromKey: "celsius",
    toKey: "kelvin",
    categoryId: "temperature",
    h1: "Celsius to Kelvin Converter \u2014 \u00B0C to K",
    title: "Celsius to Kelvin Converter \u2014 \u00B0C to K Conversion | EveryFreeTool",
    meta: "Convert Celsius to Kelvin instantly. Free online \u00B0C to K converter with formula, reference table, and real-world examples. 0\u00B0C = 273.15 K.",
    quickAnswers: [
      "-273.15\u00B0C = 0 K (absolute zero)", "-100\u00B0C = 173.15 K",
      "-40\u00B0C = 233.15 K", "0\u00B0C = 273.15 K (freezing point of water)",
      "20\u00B0C = 293.15 K (room temperature)", "25\u00B0C = 298.15 K",
      "37\u00B0C = 310.15 K (body temperature)", "100\u00B0C = 373.15 K (boiling point of water)",
    ],
    referenceTable: [
      [-273.15, "0"], [-200, "73.15"], [-100, "173.15"], [-50, "223.15"], [-40, "233.15"],
      [-20, "253.15"], [0, "273.15"], [10, "283.15"], [20, "293.15"], [25, "298.15"],
      [30, "303.15"], [37, "310.15"], [50, "323.15"], [100, "373.15"], [150, "423.15"],
      [200, "473.15"], [500, "773.15"], [1000, "1273.15"], [5000, "5273.15"], [5500, "5773.15"],
    ],
    formulaExplanation: "To convert Celsius to Kelvin, simply add 273.15 to the Celsius temperature. The formula is: K = \u00B0C + 273.15.",
    workedExamples: [
      "Convert 25\u00B0C (standard lab temperature) to Kelvin: 25 + 273.15 = 298.15 K",
      "Convert \u221278.5\u00B0C (dry ice temperature) to Kelvin: \u221278.5 + 273.15 = 194.65 K",
    ],
    reverseNote: "To convert Kelvin to Celsius, subtract 273.15: \u00B0C = K \u2212 273.15.",
    comparisons: [
      { text: "0 K (\u2212273.15\u00B0C) is absolute zero \u2014 the theoretical lowest temperature where all molecular motion stops." },
      { text: "77 K (\u2212196\u00B0C) is the boiling point of liquid nitrogen." },
      { text: "273.15 K (0\u00B0C) is the freezing point of water." },
      { text: "5778 K (5505\u00B0C) is the surface temperature of the Sun." },
    ],
    seoContent: `<p>The Kelvin scale is the SI (International System of Units) standard for temperature measurement in science and engineering. Unlike Celsius and Fahrenheit, the Kelvin scale starts at absolute zero \u2014 the point where all thermal motion ceases.</p>
<h3>The Simplest Temperature Conversion</h3>
<p>Converting Celsius to Kelvin is the easiest temperature conversion: just add 273.15. There\u2019s no multiplication or division involved. The two scales have the same \"degree size\" \u2014 a 1-degree change in Celsius equals a 1-degree change in Kelvin. They differ only in their zero point.</p>
<h3>Why Kelvin Matters in Science</h3>
<p>Scientists use Kelvin because it\u2019s an absolute scale \u2014 0 K truly means zero thermal energy. This is crucial for gas law calculations (PV = nRT uses Kelvin), thermodynamic equations, and any physics involving temperature ratios. Saying \"the temperature doubled\" only makes physical sense in Kelvin: 200 K to 400 K is genuinely twice as hot, while 20\u00B0C to 40\u00B0C is not.</p>
<h3>Common Scientific Temperatures</h3>
<p>Liquid helium boils at 4.2 K (\u2212269\u00B0C). Liquid nitrogen boils at 77 K (\u2212196\u00B0C). Standard temperature and pressure (STP) is 273.15 K (0\u00B0C). Room temperature in labs is typically 293-298 K (20-25\u00B0C). These reference points come up constantly in chemistry and physics.</p>`,
    faq: [
      { q: "How do I convert Celsius to Kelvin?", a: "Add 273.15 to the Celsius temperature. For example, 100\u00B0C = 100 + 273.15 = 373.15 K." },
      { q: "What is 0\u00B0C in Kelvin?", a: "0\u00B0C equals 273.15 K. This is the freezing point of water." },
      { q: "What is absolute zero?", a: "Absolute zero is 0 K (\u2212273.15\u00B0C). It\u2019s the theoretical lowest temperature, where all molecular motion would stop. It has never been achieved in practice." },
      { q: "Does Kelvin use a degree symbol?", a: "No. Kelvin is written without the degree symbol: 300 K, not 300\u00B0K. This convention was adopted in 1967 because Kelvin is an absolute scale, not a relative one." },
      { q: "Why do scientists use Kelvin instead of Celsius?", a: "Kelvin is an absolute scale starting at absolute zero, which is necessary for many scientific calculations. Gas laws, thermodynamic equations, and radiation formulas all require absolute temperature." },
    ],
    relatedSlugs: ["celsius-to-fahrenheit", "fahrenheit-to-celsius", "kg-to-lbs", "km-to-miles"],
  },
];
