import { SpokeData } from "./types";

export const speedSpokes: SpokeData[] = [
  {
    slug: "mph-to-kmh",
    fromKey: "milesPerHour",
    toKey: "kmPerHour",
    categoryId: "speed",
    h1: "Miles per Hour to Kilometers per Hour \u2014 mph to km/h",
    title: "MPH to KM/H Converter \u2014 Miles per Hour to Kilometers per Hour | EveryFreeTool",
    meta: "Convert mph to km/h instantly. Free online miles per hour to kilometers per hour converter with formula, reference table, and real-world examples. 1 mph = 1.60934 km/h.",
    quickAnswers: [
      "10 mph = 16.09 km/h", "20 mph = 32.19 km/h", "30 mph = 48.28 km/h",
      "40 mph = 64.37 km/h", "50 mph = 80.47 km/h", "55 mph = 88.51 km/h",
      "60 mph = 96.56 km/h", "65 mph = 104.61 km/h", "70 mph = 112.65 km/h",
      "75 mph = 120.7 km/h", "80 mph = 128.75 km/h", "100 mph = 160.93 km/h",
    ],
    referenceTable: [
      [5, "8.047"], [10, "16.093"], [15, "24.14"], [20, "32.187"], [25, "40.234"],
      [30, "48.28"], [35, "56.327"], [40, "64.374"], [45, "72.42"], [50, "80.467"],
      [55, "88.514"], [60, "96.561"], [65, "104.607"], [70, "112.654"], [75, "120.701"],
      [80, "128.748"], [90, "144.841"], [100, "160.934"], [120, "193.121"], [150, "241.402"],
    ],
    formulaExplanation: "To convert miles per hour to kilometers per hour, multiply by 1.60934.",
    workedExamples: [
      "Convert 65 mph (US highway speed) to km/h: 65 \u00D7 1.60934 = 104.61 km/h",
      "Convert 30 mph (city speed limit) to km/h: 30 \u00D7 1.60934 = 48.28 km/h",
    ],
    reverseNote: "To convert km/h to mph, multiply by 0.621371.",
    comparisons: [
      { text: "30 mph (48 km/h) is a typical city driving speed." },
      { text: "65 mph (105 km/h) is a standard US interstate speed limit." },
      { text: "100 mph (161 km/h) is the top speed of many economy cars." },
      { text: "The world\u2019s fastest human sprint reaches about 27.5 mph (44.3 km/h)." },
    ],
    seoContent: `<p>Miles per hour and kilometers per hour are the two speed units you\u2019ll encounter on roads worldwide. The US, UK, and a handful of other countries use mph, while the rest of the world uses km/h for speed limits, vehicle speedometers, and weather wind speeds.</p>
<h3>Driving Abroad</h3>
<p>When renting a car in Europe, you\u2019ll see speed limits in km/h. Common European speed limits and their mph equivalents: 30 km/h = 18.6 mph (school zones), 50 km/h = 31.1 mph (urban), 80 km/h = 49.7 mph (rural roads), 100 km/h = 62.1 mph (expressways), 120-130 km/h = 74.6-80.8 mph (motorways). The German Autobahn famously has sections with no speed limit.</p>
<h3>Weather and Wind</h3>
<p>Wind speeds in the US are reported in mph, while international forecasts use km/h (or knots for marine forecasts). A tropical storm has winds of 39-73 mph (63-118 km/h). Hurricane force starts at 74 mph (119 km/h). Understanding both units helps interpret weather warnings when traveling.</p>
<h3>Sports</h3>
<p>Baseball pitching speed is measured in mph in the US (a fastball at 95-100 mph = 153-161 km/h). Soccer/football kick speeds are often reported in km/h internationally. Cricket bowling speeds are in km/h. Tennis serve speeds are quoted in both depending on the tournament location.</p>`,
    faq: [
      { q: "How do I convert mph to km/h?", a: "Multiply the mph value by 1.60934. For example, 60 mph \u00D7 1.60934 = 96.56 km/h." },
      { q: "What is 100 mph in km/h?", a: "100 mph is approximately 160.93 km/h." },
      { q: "What is 60 mph in km/h?", a: "60 mph is approximately 96.56 km/h." },
      { q: "Why do some countries use mph and others km/h?", a: "Countries that adopted the metric system use km/h. The US, UK, and some former British territories retained mph. The UK uses mph on roads despite officially adopting metric for most other measurements." },
    ],
    relatedSlugs: ["kmh-to-mph", "knots-to-mph", "knots-to-kmh", "miles-to-km", "km-to-miles"],
  },
  {
    slug: "kmh-to-mph",
    fromKey: "kmPerHour",
    toKey: "milesPerHour",
    categoryId: "speed",
    h1: "Kilometers per Hour to Miles per Hour \u2014 km/h to mph",
    title: "KM/H to MPH Converter \u2014 Kilometers per Hour to Miles per Hour | EveryFreeTool",
    meta: "Convert km/h to mph instantly. Free online km/h to mph converter with formula, reference table, and real-world examples. 1 km/h = 0.6214 mph.",
    quickAnswers: [
      "30 km/h = 18.64 mph", "50 km/h = 31.07 mph", "80 km/h = 49.71 mph",
      "100 km/h = 62.14 mph", "110 km/h = 68.35 mph", "120 km/h = 74.56 mph",
      "130 km/h = 80.78 mph", "150 km/h = 93.21 mph", "200 km/h = 124.27 mph",
      "250 km/h = 155.34 mph", "300 km/h = 186.41 mph",
    ],
    referenceTable: [
      [10, "6.2137"], [20, "12.4274"], [30, "18.6411"], [40, "24.8548"], [50, "31.0686"],
      [60, "37.2823"], [70, "43.496"], [80, "49.7097"], [90, "55.9234"], [100, "62.1371"],
      [110, "68.3508"], [120, "74.5645"], [130, "80.7783"], [140, "86.992"], [150, "93.2057"],
      [160, "99.4194"], [180, "111.847"], [200, "124.274"], [250, "155.343"], [300, "186.411"],
    ],
    formulaExplanation: "To convert km/h to mph, multiply by 0.621371.",
    workedExamples: [
      "Convert 100 km/h to mph: 100 \u00D7 0.621371 = 62.14 mph",
      "Convert 130 km/h (European motorway) to mph: 130 \u00D7 0.621371 = 80.78 mph",
    ],
    reverseNote: "To convert mph to km/h, multiply by 1.60934.",
    comparisons: [
      { text: "50 km/h (31 mph) is a typical urban speed limit in most countries." },
      { text: "100 km/h (62 mph) is a common highway speed limit." },
      { text: "130 km/h (81 mph) is the motorway speed limit in France and Italy." },
      { text: "300 km/h (186 mph) is the cruising speed of many high-speed trains." },
    ],
    seoContent: `<p>If you\u2019re used to thinking in km/h and need to understand mph (or vice versa), this conversion is essential for driving, sports, and weather. The km/h to mph conversion comes up constantly for international travelers, car enthusiasts, and anyone following global motorsports.</p>
<h3>International Speed Limits</h3>
<p>Knowing common speed limits in mph helps when driving in the US or UK. European motorway limits of 120-130 km/h translate to about 75-81 mph. Australian highways at 110 km/h are about 68 mph. Japanese expressways at 100 km/h are about 62 mph.</p>
<h3>Motorsports</h3>
<p>Formula 1 cars reach over 350 km/h (217 mph) on long straights. NASCAR vehicles typically race at around 300 km/h (186 mph). MotoGP bikes hit 350+ km/h (217+ mph). Following international motorsports means constantly converting between the two units.</p>
<h3>Quick Mental Conversion</h3>
<p>To quickly convert km/h to mph, multiply by 0.6 (or multiply by 6 and drop the last digit). 100 km/h \u00D7 0.6 = 60 mph (actual: 62.1 mph). For slightly better accuracy, multiply by 5 and divide by 8: 100 \u00D7 5 = 500, \u00F7 8 = 62.5 mph.</p>`,
    faq: [
      { q: "How do I convert km/h to mph?", a: "Multiply the km/h value by 0.621371. For example, 100 km/h \u00D7 0.621371 = 62.14 mph." },
      { q: "What is 120 km/h in mph?", a: "120 km/h is approximately 74.56 mph." },
      { q: "What is 200 km/h in mph?", a: "200 km/h is approximately 124.27 mph." },
      { q: "How fast is 300 km/h in mph?", a: "300 km/h is approximately 186.41 mph \u2014 close to the top speed of many sports cars and racing vehicles." },
    ],
    relatedSlugs: ["mph-to-kmh", "knots-to-kmh", "knots-to-mph", "km-to-miles", "miles-to-km"],
  },
  {
    slug: "knots-to-mph",
    fromKey: "knot",
    toKey: "milesPerHour",
    categoryId: "speed",
    h1: "Knots to Miles per Hour Converter \u2014 kn to mph",
    title: "Knots to MPH Converter \u2014 Knots to Miles per Hour Conversion | EveryFreeTool",
    meta: "Convert knots to mph instantly. Free online knots to miles per hour converter with formula, reference table, and real-world examples. 1 knot = 1.15078 mph.",
    quickAnswers: [
      "1 knot = 1.1508 mph", "5 knots = 5.7539 mph", "10 knots = 11.508 mph",
      "15 knots = 17.261 mph", "20 knots = 23.015 mph", "25 knots = 28.769 mph",
      "30 knots = 34.523 mph", "50 knots = 57.539 mph",
      "64 knots = 73.65 mph (hurricane threshold)", "100 knots = 115.08 mph",
    ],
    referenceTable: [
      [1, "1.1508"], [2, "2.3016"], [5, "5.7539"], [8, "9.2062"], [10, "11.508"],
      [12, "13.809"], [15, "17.261"], [18, "20.714"], [20, "23.016"], [25, "28.769"],
      [30, "34.523"], [35, "40.277"], [40, "46.031"], [45, "51.785"], [50, "57.539"],
      [60, "69.047"], [64, "73.649"], [75, "86.308"], [100, "115.078"], [150, "172.616"],
    ],
    formulaExplanation: "To convert knots to miles per hour, multiply by 1.15078. One knot equals one nautical mile per hour.",
    workedExamples: [
      "Convert 25 knots (a brisk sailing wind) to mph: 25 \u00D7 1.15078 = 28.77 mph",
      "Convert 64 knots (hurricane threshold) to mph: 64 \u00D7 1.15078 = 73.65 mph",
    ],
    reverseNote: "To convert mph to knots, divide by 1.15078, or multiply by 0.868976.",
    comparisons: [
      { text: "5 knots (5.8 mph) is a gentle breeze \u2014 good for casual sailing." },
      { text: "25 knots (28.8 mph) is a strong breeze that creates whitecaps on water." },
      { text: "64 knots (73.6 mph) is the threshold for hurricane-force winds." },
      { text: "A commercial airplane cruises at about 450-500 knots (518-575 mph)." },
    ],
    seoContent: `<p>Knots are the standard speed unit in aviation and maritime navigation worldwide. One knot equals one nautical mile per hour, and the nautical mile is defined by the geometry of the Earth \u2014 it\u2019s one minute of arc of latitude. This makes knots particularly useful for navigation.</p>
<h3>Sailing and Boating</h3>
<p>Sailors measure boat speed and wind speed in knots. A light breeze is 4-6 knots (4.6-6.9 mph), ideal for casual sailing. A fresh breeze of 17-21 knots (19.6-24.2 mph) offers exciting sailing conditions. Storm warnings typically begin at 34 knots (39.1 mph) \u2014 gale force. Understanding mph equivalents helps land-dwellers understand maritime conditions.</p>
<h3>Aviation</h3>
<p>Air traffic control, flight planning, and aircraft speed are measured in knots. A commercial jet cruises at 450-550 knots (518-633 mph). Landing speed for a commercial aircraft is typically 130-160 knots (150-184 mph). Pilots and aviation enthusiasts need this conversion constantly.</p>
<h3>Weather Forecasting</h3>
<p>Marine weather forecasts report wind speeds in knots. The Beaufort scale, used internationally for wind classification, is defined in knots: Force 0 is calm (0-1 kn), Force 6 is a strong breeze (22-27 kn / 25-31 mph), and Force 12 is hurricane force (64+ kn / 74+ mph).</p>`,
    faq: [
      { q: "How many mph is 1 knot?", a: "One knot equals approximately 1.15078 miles per hour." },
      { q: "Why do sailors use knots instead of mph?", a: "Knots are based on nautical miles, which correspond to the Earth\u2019s coordinates \u2014 one nautical mile equals one minute of latitude. This makes navigation calculations much simpler when working with charts and coordinates." },
      { q: "What is hurricane force in knots and mph?", a: "Hurricane force winds start at 64 knots, which is approximately 73.6 mph or 118.5 km/h." },
      { q: "How fast do commercial airplanes fly in knots?", a: "Commercial jets typically cruise at 450-550 knots (518-633 mph or 833-1019 km/h)." },
    ],
    relatedSlugs: ["knots-to-kmh", "mph-to-kmh", "kmh-to-mph", "miles-to-km", "km-to-miles"],
  },
  {
    slug: "knots-to-kmh",
    fromKey: "knot",
    toKey: "kmPerHour",
    categoryId: "speed",
    h1: "Knots to Kilometers per Hour Converter \u2014 kn to km/h",
    title: "Knots to KM/H Converter \u2014 Knots to Kilometers per Hour Conversion | EveryFreeTool",
    meta: "Convert knots to km/h instantly. Free online knots to kilometers per hour converter with formula, reference table, and real-world examples. 1 knot = 1.852 km/h.",
    quickAnswers: [
      "1 knot = 1.852 km/h", "5 knots = 9.26 km/h", "10 knots = 18.52 km/h",
      "15 knots = 27.78 km/h", "20 knots = 37.04 km/h", "25 knots = 46.3 km/h",
      "30 knots = 55.56 km/h", "50 knots = 92.6 km/h",
      "64 knots = 118.53 km/h (hurricane threshold)", "100 knots = 185.2 km/h",
    ],
    referenceTable: [
      [1, "1.852"], [2, "3.704"], [5, "9.26"], [8, "14.816"], [10, "18.52"],
      [12, "22.224"], [15, "27.78"], [18, "33.336"], [20, "37.04"], [25, "46.3"],
      [30, "55.56"], [35, "64.82"], [40, "74.08"], [45, "83.34"], [50, "92.6"],
      [60, "111.12"], [64, "118.528"], [75, "138.9"], [100, "185.2"], [150, "277.8"],
    ],
    formulaExplanation: "To convert knots to km/h, multiply by 1.852. One knot is exactly 1.852 kilometers per hour.",
    workedExamples: [
      "Convert 30 knots to km/h: 30 \u00D7 1.852 = 55.56 km/h",
      "Convert 450 knots (cruising jet) to km/h: 450 \u00D7 1.852 = 833.4 km/h",
    ],
    reverseNote: "To convert km/h to knots, divide by 1.852.",
    comparisons: [
      { text: "10 knots (18.5 km/h) is a gentle sailing speed \u2014 about as fast as a brisk bicycle ride." },
      { text: "30 knots (55.6 km/h) is fast for a sailboat and moderate for a motorboat." },
      { text: "64 knots (118.5 km/h) is the threshold for hurricane-force winds." },
      { text: "480 knots (889 km/h) is the typical cruising speed of a Boeing 787." },
    ],
    seoContent: `<p>Knots and km/h are both used internationally, but in different contexts. Knots dominate in aviation and maritime, while km/h is the standard for road vehicles and weather reporting in most metric countries.</p>
<h3>The Nautical Mile Connection</h3>
<p>One knot is exactly one nautical mile per hour, and one nautical mile is exactly 1.852 kilometers. This clean relationship (1 kn = 1.852 km/h exactly) comes from the nautical mile\u2019s definition as one minute of arc of latitude on Earth\u2019s surface.</p>
<h3>Weather Reports</h3>
<p>Many international weather services report wind speeds in km/h for the general public, but maritime and aviation forecasts use knots. If a marine forecast warns of 30-knot winds, that\u2019s 55.6 km/h \u2014 strong enough to create rough seas and whitecaps. Severe weather warnings at 50+ knots (92.6+ km/h) indicate dangerous conditions.</p>
<h3>Comparing Boat and Car Speeds</h3>
<p>A fast motorboat at 40 knots is traveling at 74 km/h. A speed boat at 60 knots is doing 111 km/h. A ferry at 20 knots cruises at 37 km/h. Comparing these to road speeds helps visualize how fast vessels are actually moving.</p>`,
    faq: [
      { q: "How many km/h is 1 knot?", a: "One knot equals exactly 1.852 km/h." },
      { q: "How do I convert knots to km/h?", a: "Multiply the knots by 1.852. For example, 20 knots \u00D7 1.852 = 37.04 km/h." },
      { q: "What is a knot in terms of distance?", a: "One knot is one nautical mile per hour. A nautical mile is 1.852 km (or about 1.15 statute miles). It\u2019s based on the geometry of the Earth." },
      { q: "Is 1 knot exactly 1.852 km/h?", a: "Yes, this is an exact relationship. One nautical mile is defined as exactly 1.852 kilometers." },
    ],
    relatedSlugs: ["knots-to-mph", "kmh-to-mph", "mph-to-kmh", "km-to-miles", "miles-to-km"],
  },
];
