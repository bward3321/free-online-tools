import { SpokeData } from "./types";

export const lengthSpokes: SpokeData[] = [
  {
    slug: "feet-to-meters",
    fromKey: "foot",
    toKey: "meter",
    categoryId: "length",
    h1: "Feet to Meters Converter \u2014 ft to m",
    title: "Feet to Meters Converter \u2014 ft to m Conversion | EveryFreeTool",
    meta: "Convert feet to meters instantly. Free online ft to m converter with formula, reference table, and real-world examples. 1 foot = 0.3048 meters.",
    quickAnswers: [
      "1 foot = 0.3048 meters",
      "3 feet = 0.9144 meters",
      "5 feet = 1.524 meters",
      "5 feet 4 inches = 1.6256 meters",
      "5 feet 6 inches = 1.6764 meters",
      "5 feet 8 inches = 1.7272 meters",
      "5 feet 10 inches = 1.778 meters",
      "6 feet = 1.8288 meters",
      "6 feet 2 inches = 1.8796 meters",
      "10 feet = 3.048 meters",
      "100 feet = 30.48 meters",
    ],
    referenceTable: [
      [0.5, "0.1524"], [1, "0.3048"], [2, "0.6096"], [3, "0.9144"], [4, "1.2192"],
      [5, "1.524"], [6, "1.8288"], [7, "2.1336"], [8, "2.4384"], [9, "2.7432"],
      [10, "3.048"], [15, "4.572"], [20, "6.096"], [25, "7.62"], [50, "15.24"],
      [75, "22.86"], [100, "30.48"], [250, "76.2"], [500, "152.4"], [1000, "304.8"],
    ],
    formulaExplanation: "To convert feet to meters, multiply the number of feet by 0.3048. This is because one foot is defined as exactly 0.3048 meters by international agreement since 1959.",
    workedExamples: [
      "Convert 5.5 feet to meters: 5.5 \u00D7 0.3048 = 1.6764 meters",
      "Convert 12 feet to meters: 12 \u00D7 0.3048 = 3.6576 meters",
    ],
    reverseNote: "To convert meters to feet, divide the meters by 0.3048, or multiply by 3.28084.",
    comparisons: [
      { text: "1 meter (about 3.3 feet) is roughly the height of a kitchen counter or a guitar." },
      { text: "2 meters (about 6.6 feet) is the height of a standard door frame." },
      { text: "10 meters (about 33 feet) is the length of a school bus." },
      { text: "100 meters (about 328 feet) is the length of a standard athletics sprint track." },
    ],
    seoContent: `<p>The foot and the meter are two of the most commonly used units of length worldwide. While the metric system — with the meter as its base unit — is the official standard in most countries, the foot remains the primary unit of measurement in the United States, Liberia, and Myanmar for everyday and construction purposes.</p>
<p>The modern foot is defined as exactly 0.3048 meters. This precise definition was established by the International Yard and Pound Agreement of 1959, which standardized the relationship between imperial and metric units across English-speaking nations. Before this agreement, slightly different definitions of the foot were used in different countries.</p>
<h3>When You Need Feet-to-Meters Conversion</h3>
<p>One of the most common reasons to convert feet to meters is for height measurements. If you\u2019re filling out a passport application, medical form, or athletic registration in a country that uses the metric system, you\u2019ll need to convert your height from feet and inches to meters. For example, a person who is 5\u2019 10\u201D is 1.778 meters tall.</p>
<p>Construction and architecture professionals frequently convert between feet and meters, especially on international projects. Building codes, material specifications, and architectural plans may use either system depending on the country. A 10-foot ceiling, common in American homes, is 3.048 meters — slightly above the 3-meter ceilings standard in many metric countries.</p>
<p>Athletes and sports fans also encounter this conversion regularly. An American football field is 100 yards (300 feet / 91.44 meters). Olympic swimming pools are 50 meters (164 feet). Understanding both units helps when comparing athletic performances across different sports and countries.</p>
<h3>Quick Mental Approximation</h3>
<p>For a rough estimate, divide the number of feet by 3.3 to get meters. This gives you a result that\u2019s accurate to within about 1%, which is close enough for everyday purposes. For example, 10 feet \u00F7 3.3 \u2248 3 meters (actual: 3.048 meters).</p>
<p>Another handy shortcut: 1 meter is roughly one long step for an average adult. So if a room is 12 feet long, that\u2019s about 3.7 meters — roughly 4 long steps.</p>`,
    faq: [
      { q: "How many meters is 1 foot?", a: "One foot equals exactly 0.3048 meters. This is an exact definition established by the International Yard and Pound Agreement of 1959." },
      { q: "How do I convert feet and inches to meters?", a: "First convert the total measurement to feet (feet + inches/12), then multiply by 0.3048. For example, 5 feet 6 inches = 5.5 feet = 5.5 \u00D7 0.3048 = 1.6764 meters." },
      { q: "Is a meter longer than a foot?", a: "Yes, one meter is about 3.28 feet, making it roughly 3.3 times longer than a foot." },
      { q: "Why does the US use feet instead of meters?", a: "The US customary system evolved from English units that predated the metric system. While Congress authorized metric use in 1866, it was never mandated for everyday use. Industrial inertia, the cost of conversion, and cultural familiarity have kept feet as the standard for most everyday measurements." },
      { q: "What is the formula for feet to meters?", a: "The formula is: meters = feet \u00D7 0.3048. Simply multiply any value in feet by 0.3048 to get the equivalent in meters." },
    ],
    relatedSlugs: ["meters-to-feet", "inches-to-cm", "yards-to-meters", "miles-to-km", "feet-to-cm", "cm-to-inches"],
  },
  {
    slug: "meters-to-feet",
    fromKey: "meter",
    toKey: "foot",
    categoryId: "length",
    h1: "Meters to Feet Converter \u2014 m to ft",
    title: "Meters to Feet Converter \u2014 m to ft Conversion | EveryFreeTool",
    meta: "Convert meters to feet instantly. Free online m to ft converter with formula, reference table, and real-world examples. 1 meter = 3.28084 feet.",
    quickAnswers: [
      "1 meter = 3.2808 feet",
      "1.5 meters = 4.9213 feet",
      "1.6 meters = 5.2493 feet (5 ft 3 in)",
      "1.7 meters = 5.5774 feet (5 ft 7 in)",
      "1.75 meters = 5.7415 feet (5 ft 9 in)",
      "1.8 meters = 5.9055 feet (5 ft 11 in)",
      "1.85 meters = 6.0696 feet (6 ft 1 in)",
      "2 meters = 6.5617 feet",
      "5 meters = 16.4042 feet",
      "10 meters = 32.8084 feet",
      "100 meters = 328.084 feet",
    ],
    referenceTable: [
      [0.5, "1.6404"], [1, "3.2808"], [1.5, "4.9213"], [2, "6.5617"], [2.5, "8.2021"],
      [3, "9.8425"], [4, "13.1234"], [5, "16.4042"], [6, "19.685"], [7, "22.9659"],
      [8, "26.2467"], [9, "29.5276"], [10, "32.8084"], [15, "49.2126"], [20, "65.6168"],
      [25, "82.021"], [50, "164.042"], [75, "246.063"], [100, "328.084"], [1000, "3280.84"],
    ],
    formulaExplanation: "To convert meters to feet, multiply the number of meters by 3.28084. Alternatively, divide the meters by 0.3048 for the exact same result.",
    workedExamples: [
      "Convert 1.75 meters to feet: 1.75 \u00D7 3.28084 = 5.7415 feet (about 5 ft 9 in)",
      "Convert 25 meters to feet: 25 \u00D7 3.28084 = 82.021 feet",
    ],
    reverseNote: "To convert feet to meters, multiply the feet by 0.3048.",
    comparisons: [
      { text: "1.7 meters (about 5\u2019 7\u201D) is roughly the average height of an adult male worldwide." },
      { text: "3 meters (about 10 feet) is the typical height of a residential ceiling." },
      { text: "50 meters (about 164 feet) is the length of an Olympic swimming pool." },
      { text: "828 meters (about 2,717 feet) is the height of the Burj Khalifa, the world\u2019s tallest building." },
    ],
    seoContent: `<p>Converting meters to feet is one of the most common unit conversions in the world. Whether you\u2019re checking your height on an international form, measuring a room, or comparing athletic performances across countries, understanding this conversion is essential.</p>
<p>The meter is the fundamental unit of length in the International System of Units (SI), used officially by every country except the United States, Myanmar, and Liberia. It was originally defined in 1793 as one ten-millionth of the distance from the equator to the North Pole, and is now defined by the speed of light: the distance light travels in 1/299,792,458 of a second.</p>
<h3>Height Conversion: The Most Common Use</h3>
<p>The most frequent reason people convert meters to feet is for height. If someone tells you they\u2019re 1.83 meters tall, you might wonder what that means in feet. The answer: about 6 feet. Medical records, driver\u2019s licenses, and dating profiles in the US all use feet and inches, while most of the world uses meters and centimeters.</p>
<p>A quick reference: 1.5 m \u2248 4\u2019 11\u201D, 1.6 m \u2248 5\u2019 3\u201D, 1.7 m \u2248 5\u2019 7\u201D, 1.8 m \u2248 5\u2019 11\u201D, 1.9 m \u2248 6\u2019 3\u201D, and 2.0 m \u2248 6\u2019 7\u201D. These approximations are handy for quick mental conversion.</p>
<h3>Real Estate and Construction</h3>
<p>International real estate listings often specify room dimensions in meters. Knowing that a 4 \u00D7 5 meter room is roughly 13 \u00D7 16.4 feet helps buyers and renters visualize the space. Architects working on international projects routinely convert between the two systems.</p>
<h3>Quick Mental Shortcut</h3>
<p>To quickly estimate meters in feet, multiply by 3 and add 10%. For example, 10 meters \u00D7 3 = 30, plus 10% (3) = 33 feet. The actual answer is 32.8 feet \u2014 close enough for most everyday situations.</p>`,
    faq: [
      { q: "How many feet is 1 meter?", a: "One meter equals approximately 3.28084 feet, or about 3 feet and 3.37 inches." },
      { q: "How do I convert meters to feet and inches?", a: "Multiply meters by 3.28084 to get feet. The whole number is the feet. Multiply the decimal by 12 to get inches. For example, 1.75 m = 5.7415 ft = 5 ft + (0.7415 \u00D7 12) = 5 ft 8.9 in." },
      { q: "Is 6 feet the same as 2 meters?", a: "No, 6 feet is 1.8288 meters. 2 meters is about 6 feet 6.7 inches \u2014 noticeably taller than 6 feet." },
      { q: "What is the difference between a meter and a foot?", a: "A meter is a metric unit equal to about 3.28 feet. A foot is an imperial unit equal to 0.3048 meters. The meter is used worldwide for scientific and everyday measurement, while the foot is primarily used in the US and UK." },
      { q: "How tall is 1.8 meters in feet?", a: "1.8 meters is approximately 5 feet 10.9 inches, or roughly 5\u201911\u201D." },
    ],
    relatedSlugs: ["feet-to-meters", "cm-to-inches", "meters-to-yards", "km-to-miles", "cm-to-feet"],
  },
  {
    slug: "inches-to-cm",
    fromKey: "inch",
    toKey: "centimeter",
    categoryId: "length",
    h1: "Inches to Centimeters Converter \u2014 in to cm",
    title: "Inches to Centimeters Converter \u2014 in to cm Conversion | EveryFreeTool",
    meta: "Convert inches to centimeters instantly. Free online in to cm converter with formula, reference table, and real-world examples. 1 inch = 2.54 cm.",
    quickAnswers: [
      "1 inch = 2.54 cm",
      "2 inches = 5.08 cm",
      "3 inches = 7.62 cm",
      "4 inches = 10.16 cm",
      "5 inches = 12.7 cm",
      "6 inches = 15.24 cm",
      "10 inches = 25.4 cm",
      "12 inches = 30.48 cm",
      "24 inches = 60.96 cm",
      "36 inches = 91.44 cm",
    ],
    referenceTable: [
      [0.25, "0.635"], [0.5, "1.27"], [1, "2.54"], [2, "5.08"], [3, "7.62"],
      [4, "10.16"], [5, "12.7"], [6, "15.24"], [8, "20.32"], [10, "25.4"],
      [12, "30.48"], [15, "38.1"], [18, "45.72"], [24, "60.96"], [30, "76.2"],
      [36, "91.44"], [48, "121.92"], [60, "152.4"], [72, "182.88"], [96, "243.84"],
    ],
    formulaExplanation: "To convert inches to centimeters, multiply the number of inches by 2.54. One inch is defined as exactly 2.54 centimeters.",
    workedExamples: [
      "Convert 15 inches to cm: 15 \u00D7 2.54 = 38.1 cm",
      "Convert 65 inches (a 65\u201D TV) to cm: 65 \u00D7 2.54 = 165.1 cm diagonal",
    ],
    reverseNote: "To convert centimeters to inches, divide the centimeters by 2.54.",
    comparisons: [
      { text: "1 inch (2.54 cm) is roughly the width of your thumb at the first knuckle." },
      { text: "12 inches (30.48 cm) is the length of a standard ruler." },
      { text: "55 inches (139.7 cm) is the diagonal of a 55\u201D television screen." },
      { text: "72 inches (182.88 cm) is the height of a standard interior door (6 feet)." },
    ],
    seoContent: `<p>Inches and centimeters are the two most commonly used small-length units for everyday measurements. The inch is standard in the United States, Canada (partially), and the UK, while the centimeter is used in virtually every other country.</p>
<p>The conversion factor is exact: 1 inch = 2.54 centimeters. This was established by international agreement in 1959 and makes the math refreshingly simple compared to many other unit conversions.</p>
<h3>Screen Sizes and Electronics</h3>
<p>One of the most frequent uses of this conversion is for screen sizes. Television, monitor, laptop, and phone screens are measured diagonally in inches worldwide, but many consumers think in centimeters. A 27-inch monitor has a diagonal of 68.58 cm. A 6.7-inch phone screen is 17.02 cm. Knowing the conversion helps when comparing devices across different markets.</p>
<h3>Clothing and Body Measurements</h3>
<p>International clothing sizes often require converting body measurements between inches and centimeters. Waist, chest, hip, and inseam measurements may be listed in either unit depending on the brand and country. A 32-inch waist is 81.28 cm, while a 34-inch inseam is 86.36 cm.</p>
<h3>Crafting, DIY, and Precision Work</h3>
<p>Crafters, seamstresses, and DIY enthusiasts frequently switch between inches and centimeters. Sewing patterns from different countries use different units. Woodworking plans, knitting gauges, and scrapbook layouts all benefit from quick conversion between these units.</p>
<h3>Mental Shortcut</h3>
<p>To roughly convert inches to centimeters in your head, multiply by 2.5. It\u2019s slightly less than the exact 2.54, but fast and easy: 10 inches \u00D7 2.5 = 25 cm (actual: 25.4 cm). Close enough for quick estimates.</p>`,
    faq: [
      { q: "How many cm is 1 inch?", a: "One inch equals exactly 2.54 centimeters. This is a precise, internationally agreed-upon definition." },
      { q: "How do I convert inches to cm?", a: "Multiply the number of inches by 2.54. For example, 8 inches \u00D7 2.54 = 20.32 cm." },
      { q: "What is 5 inches in cm?", a: "5 inches equals 12.7 centimeters (5 \u00D7 2.54 = 12.7)." },
      { q: "Which is bigger, 1 inch or 1 cm?", a: "One inch is bigger. It equals 2.54 centimeters, so an inch is about 2.5 times longer than a centimeter." },
      { q: "How many inches is 10 cm?", a: "10 cm equals approximately 3.937 inches (10 \u00F7 2.54 = 3.937)." },
    ],
    relatedSlugs: ["cm-to-inches", "feet-to-meters", "mm-to-inches", "inches-to-mm", "feet-to-cm"],
  },
  {
    slug: "cm-to-inches",
    fromKey: "centimeter",
    toKey: "inch",
    categoryId: "length",
    h1: "Centimeters to Inches Converter \u2014 cm to in",
    title: "Centimeters to Inches Converter \u2014 cm to in Conversion | EveryFreeTool",
    meta: "Convert centimeters to inches instantly. Free online cm to in converter with formula, reference table, and real-world examples. 1 cm = 0.3937 inches.",
    quickAnswers: [
      "1 cm = 0.3937 inches",
      "5 cm = 1.9685 inches",
      "10 cm = 3.937 inches",
      "15 cm = 5.9055 inches",
      "20 cm = 7.874 inches",
      "25 cm = 9.8425 inches",
      "30 cm = 11.811 inches",
      "50 cm = 19.685 inches",
      "100 cm = 39.37 inches",
    ],
    referenceTable: [
      [1, "0.3937"], [2, "0.7874"], [3, "1.1811"], [5, "1.9685"], [7, "2.7559"],
      [10, "3.937"], [12, "4.7244"], [15, "5.9055"], [20, "7.874"], [25, "9.8425"],
      [30, "11.811"], [40, "15.748"], [50, "19.685"], [60, "23.622"], [75, "29.5276"],
      [80, "31.496"], [90, "35.4331"], [100, "39.3701"], [150, "59.0551"], [200, "78.7402"],
    ],
    formulaExplanation: "To convert centimeters to inches, divide the number of centimeters by 2.54. Alternatively, multiply by 0.393701.",
    workedExamples: [
      "Convert 30 cm to inches: 30 \u00F7 2.54 = 11.811 inches",
      "Convert 170 cm (a person\u2019s height) to inches: 170 \u00F7 2.54 = 66.929 inches (5 ft 6.9 in)",
    ],
    reverseNote: "To convert inches to centimeters, multiply the inches by 2.54.",
    comparisons: [
      { text: "1 cm (about 0.39 inches) is roughly the width of a pencil." },
      { text: "10 cm (about 3.9 inches) is approximately the width of a standard smartphone." },
      { text: "30 cm (about 11.8 inches) is the length of a standard ruler." },
      { text: "100 cm (about 39.4 inches) equals one meter \u2014 roughly the height of a kitchen counter." },
    ],
    seoContent: `<p>Centimeters to inches is one of the most frequently searched unit conversions, especially for people comparing measurements between the metric and imperial systems. Whether you\u2019re shopping for furniture, sizing clothing, or reading medical measurements, this conversion comes up constantly.</p>
<p>The relationship is precise: 1 centimeter = 0.393701 inches, which means there are about 2.54 centimeters in every inch. This exact ratio was fixed by international agreement in 1959.</p>
<h3>Medical and Health Measurements</h3>
<p>Hospitals and clinics in many countries record measurements in centimeters \u2014 newborn length, wound size, tumor dimensions, and growth charts. If you\u2019re reviewing medical records from a metric country, or if your doctor records in centimeters while you think in inches, this conversion is essential. A newborn measuring 51 cm is about 20 inches long.</p>
<h3>Shopping Across Borders</h3>
<p>Online shopping from international retailers often means decoding centimeter measurements. A 42 cm backpack is about 16.5 inches tall. A 100 cm wide desk is about 39.4 inches. Getting comfortable with this conversion helps you visualize products before they arrive.</p>
<h3>Quick Mental Shortcut</h3>
<p>For a fast estimate, divide centimeters by 2.5 instead of 2.54. It\u2019s slightly less accurate but much easier to do in your head: 50 cm \u00F7 2.5 = 20 inches (actual: 19.685 inches). For most practical purposes, this is close enough.</p>`,
    faq: [
      { q: "How many inches is 1 cm?", a: "One centimeter equals approximately 0.3937 inches, or just under 2/5 of an inch." },
      { q: "How do I convert cm to inches?", a: "Divide the centimeters by 2.54. For example, 50 cm \u00F7 2.54 = 19.685 inches." },
      { q: "How many cm is 12 inches?", a: "12 inches (one foot) equals 30.48 centimeters." },
      { q: "Is 2.54 cm exactly 1 inch?", a: "Yes, since 1959 the inch has been defined as exactly 2.54 centimeters by international agreement." },
      { q: "How tall is 170 cm in feet and inches?", a: "170 cm is approximately 5 feet 6.9 inches (about 5\u20197\u201D)." },
    ],
    relatedSlugs: ["inches-to-cm", "cm-to-feet", "mm-to-inches", "meters-to-feet", "feet-to-cm"],
  },
  {
    slug: "km-to-miles",
    fromKey: "kilometer",
    toKey: "mile",
    categoryId: "length",
    h1: "Kilometers to Miles Converter \u2014 km to mi",
    title: "Kilometers to Miles Converter \u2014 km to mi Conversion | EveryFreeTool",
    meta: "Convert kilometers to miles instantly. Free online km to mi converter with formula, reference table, and real-world examples. 1 km = 0.6214 miles.",
    quickAnswers: [
      "1 km = 0.6214 miles",
      "5 km = 3.1069 miles",
      "10 km = 6.2137 miles",
      "21.1 km (half marathon) = 13.1 miles",
      "42.195 km (marathon) = 26.219 miles",
      "50 km = 31.069 miles",
      "100 km = 62.137 miles",
      "160 km = 99.419 miles",
    ],
    referenceTable: [
      [1, "0.6214"], [2, "1.2427"], [3, "1.8641"], [5, "3.1069"], [8, "4.971"],
      [10, "6.2137"], [15, "9.3206"], [20, "12.4274"], [25, "15.5343"], [30, "18.6411"],
      [40, "24.8548"], [50, "31.0686"], [75, "46.6028"], [100, "62.1371"], [150, "93.2057"],
      [200, "124.274"], [250, "155.343"], [300, "186.411"], [500, "310.686"], [1000, "621.371"],
    ],
    formulaExplanation: "To convert kilometers to miles, multiply the number of kilometers by 0.621371. One kilometer equals approximately 0.621 miles.",
    workedExamples: [
      "Convert 10 km to miles: 10 \u00D7 0.621371 = 6.2137 miles",
      "Convert 100 km/h speed limit to mph: 100 \u00D7 0.621371 = 62.14 mph",
    ],
    reverseNote: "To convert miles to kilometers, multiply the miles by 1.60934.",
    comparisons: [
      { text: "5 km (3.1 miles) is the length of a standard 5K race \u2014 about a 30-minute jog for most people." },
      { text: "10 km (6.2 miles) is a popular race distance and about a 50-minute run." },
      { text: "42.195 km (26.2 miles) is the length of a marathon." },
      { text: "100 km (62.1 miles) is roughly the distance from New York City to Philadelphia." },
    ],
    seoContent: `<p>Kilometers and miles are the two main units for measuring long distances. The kilometer is the standard in virtually every country on Earth, while the mile remains primary in the United States and United Kingdom for road distances and speed limits.</p>
<p>One kilometer equals exactly 1,000 meters, making it a clean metric unit. One mile equals 5,280 feet or approximately 1.609 kilometers. The mile has ancient Roman origins \u2014 it derives from \u201Cmille passus\u201D (a thousand paces).</p>
<h3>Driving and Speed Limits</h3>
<p>If you\u2019re renting a car abroad, understanding km-to-mile conversion is crucial. A speed limit sign showing 120 km/h means about 75 mph. A sign showing 50 km/h means about 31 mph. Many rental cars in Europe show both km/h and mph on the speedometer, but road signs are always in kilometers.</p>
<h3>Running and Racing</h3>
<p>Runners constantly convert between kilometers and miles. The most common race distances \u2014 5K, 10K, half marathon (21.1 km), and marathon (42.195 km) \u2014 are defined in kilometers but often discussed in miles: 3.1, 6.2, 13.1, and 26.2 miles respectively. Knowing the conversion helps you compare paces and set race goals.</p>
<h3>Quick Fibonacci Trick</h3>
<p>Here\u2019s a fun shortcut: consecutive Fibonacci numbers (1, 1, 2, 3, 5, 8, 13, 21, 34, 55...) approximate the km-to-miles conversion. 5 km \u2248 3 miles, 8 km \u2248 5 miles, 13 km \u2248 8 miles. The ratio between consecutive Fibonacci numbers approaches 1.618, remarkably close to the 1.609 km-per-mile conversion factor.</p>`,
    faq: [
      { q: "How many miles is 1 km?", a: "One kilometer equals approximately 0.6214 miles." },
      { q: "How many km is a mile?", a: "One mile equals approximately 1.60934 kilometers." },
      { q: "How far is a 5K in miles?", a: "A 5K (5 kilometers) is approximately 3.107 miles." },
      { q: "What is 100 km/h in mph?", a: "100 km/h is approximately 62.14 mph." },
      { q: "Which countries use miles instead of kilometers?", a: "The United States, United Kingdom, and a handful of Caribbean and other nations use miles for road distances. Most other countries worldwide use kilometers." },
    ],
    relatedSlugs: ["miles-to-km", "meters-to-feet", "yards-to-meters", "feet-to-meters", "kmh-to-mph"],
  },
  {
    slug: "miles-to-km",
    fromKey: "mile",
    toKey: "kilometer",
    categoryId: "length",
    h1: "Miles to Kilometers Converter \u2014 mi to km",
    title: "Miles to Kilometers Converter \u2014 mi to km Conversion | EveryFreeTool",
    meta: "Convert miles to kilometers instantly. Free online mi to km converter with formula, reference table, and real-world examples. 1 mile = 1.60934 km.",
    quickAnswers: [
      "1 mile = 1.6093 km",
      "3 miles = 4.828 km",
      "5 miles = 8.047 km",
      "10 miles = 16.093 km",
      "13.1 miles (half marathon) = 21.082 km",
      "26.2 miles (marathon) = 42.165 km",
      "50 miles = 80.467 km",
      "100 miles = 160.934 km",
    ],
    referenceTable: [
      [0.5, "0.8047"], [1, "1.6093"], [2, "3.2187"], [3, "4.828"], [5, "8.0467"],
      [8, "12.8748"], [10, "16.0934"], [15, "24.1402"], [20, "32.1869"], [25, "40.2336"],
      [30, "48.2803"], [40, "64.3738"], [50, "80.4672"], [60, "96.5606"], [75, "120.701"],
      [100, "160.934"], [150, "241.402"], [200, "321.869"], [500, "804.672"], [1000, "1609.34"],
    ],
    formulaExplanation: "To convert miles to kilometers, multiply the number of miles by 1.60934.",
    workedExamples: [
      "Convert 26.2 miles (marathon) to km: 26.2 \u00D7 1.60934 = 42.16 km",
      "Convert 60 mph to km/h: 60 \u00D7 1.60934 = 96.56 km/h",
    ],
    reverseNote: "To convert kilometers to miles, multiply the kilometers by 0.621371.",
    comparisons: [
      { text: "1 mile (1.609 km) is about a 15-20 minute walk at a brisk pace." },
      { text: "5 miles (8 km) is roughly the distance across central Manhattan, north to south." },
      { text: "26.2 miles (42.2 km) is the marathon distance, the length of a serious day of running." },
      { text: "238,900 miles (384,400 km) is the average distance from the Earth to the Moon." },
    ],
    seoContent: `<p>Converting miles to kilometers is essential for international travel, sports, and understanding distances in a global context. The mile is one of the oldest units still in active use, while the kilometer is the world\u2019s standard for measuring road distances.</p>
<p>One mile equals exactly 1.609344 kilometers. The mile originated from the Roman \u201Cmille passus\u201D (1,000 double steps), while the kilometer was designed as part of the metric system to be one-thousandth of the distance from the equator to the North Pole.</p>
<h3>International Travel</h3>
<p>When driving abroad in countries that use the metric system (virtually everywhere except the US and UK), you need to convert speed limits and distances. A 65 mph highway speed in the US is about 105 km/h. European motorways often have limits of 120-130 km/h, which is 75-81 mph. GPS units can usually be switched between systems, but understanding the conversion helps you stay oriented.</p>
<h3>Sports and Fitness</h3>
<p>Many running apps and fitness trackers let you choose between miles and kilometers. A 7-minute mile pace equals about 4:21 per kilometer. Cyclists often track rides in both units \u2014 a century ride is 100 miles (160.9 km), while metric centuries are 100 km (62.1 miles).</p>
<h3>Quick Mental Math</h3>
<p>For a fast approximation, multiply miles by 1.6. This is very close to the exact 1.60934 factor: 10 miles \u00D7 1.6 = 16 km (actual: 16.09 km). For even faster estimation, add 60% to the mile value: 10 miles + 6 = 16 km. Good enough for everyday use.</p>`,
    faq: [
      { q: "How many km is 1 mile?", a: "One mile equals approximately 1.60934 kilometers." },
      { q: "How many miles is 100 km?", a: "100 kilometers is approximately 62.14 miles." },
      { q: "What is 60 mph in km/h?", a: "60 mph is approximately 96.56 km/h." },
      { q: "Why are miles and kilometers different?", a: "Miles come from the ancient Roman system based on paces, while kilometers were designed as part of the metric system in the late 18th century. They developed independently, which is why the conversion isn\u2019t a round number." },
      { q: "Is a nautical mile the same as a regular mile?", a: "No. A nautical mile is 1.852 km (about 1.15 regular miles). Nautical miles are used in aviation and maritime navigation." },
    ],
    relatedSlugs: ["km-to-miles", "feet-to-meters", "yards-to-meters", "mph-to-kmh", "meters-to-feet"],
  },
  {
    slug: "yards-to-meters",
    fromKey: "yard",
    toKey: "meter",
    categoryId: "length",
    h1: "Yards to Meters Converter \u2014 yd to m",
    title: "Yards to Meters Converter \u2014 yd to m Conversion | EveryFreeTool",
    meta: "Convert yards to meters instantly. Free online yd to m converter with formula, reference table, and real-world examples. 1 yard = 0.9144 meters.",
    quickAnswers: [
      "1 yard = 0.9144 meters",
      "5 yards = 4.572 meters",
      "10 yards = 9.144 meters",
      "25 yards = 22.86 meters",
      "50 yards = 45.72 meters",
      "100 yards = 91.44 meters",
      "110 yards = 100.584 meters",
      "300 yards = 274.32 meters",
    ],
    referenceTable: [
      [1, "0.9144"], [2, "1.8288"], [3, "2.7432"], [5, "4.572"], [10, "9.144"],
      [15, "13.716"], [20, "18.288"], [25, "22.86"], [30, "27.432"], [40, "36.576"],
      [50, "45.72"], [60, "54.864"], [75, "68.58"], [100, "91.44"], [150, "137.16"],
      [200, "182.88"], [250, "228.6"], [300, "274.32"], [500, "457.2"], [1000, "914.4"],
    ],
    formulaExplanation: "To convert yards to meters, multiply the number of yards by 0.9144. One yard is defined as exactly 0.9144 meters.",
    workedExamples: [
      "Convert 100 yards (football field) to meters: 100 \u00D7 0.9144 = 91.44 meters",
      "Convert 200 yards to meters: 200 \u00D7 0.9144 = 182.88 meters",
    ],
    reverseNote: "To convert meters to yards, divide the meters by 0.9144, or multiply by 1.09361.",
    comparisons: [
      { text: "1 yard (0.9144 m) is approximately the distance from your nose to the tip of your outstretched hand." },
      { text: "25 yards (22.86 m) is the length of a short-course swimming pool." },
      { text: "100 yards (91.44 m) is the length of an American football field (between end zones)." },
      { text: "A golf drive of 250 yards covers about 228.6 meters." },
    ],
    seoContent: `<p>The yard and the meter are close in size \u2014 a yard is about 91% of a meter \u2014 which makes this conversion useful in sports, fabric measurement, and construction. The yard is used primarily in the United States and United Kingdom, while the meter is the global standard.</p>
<p>One yard is defined as exactly 0.9144 meters. Historically, the yard was based on the length of a man\u2019s belt or girdle, and later standardized by various English monarchs. The current definition has been fixed since 1959.</p>
<h3>Football and Sports</h3>
<p>American football fields are measured in yards (100 yards between end zones, 120 yards total with end zones). Understanding the yard-to-meter conversion helps international fans and athletes compare with soccer fields, which are typically 100-110 meters long. A 100-yard football field is 91.44 meters \u2014 slightly shorter than a 100-meter soccer pitch.</p>
<h3>Golf</h3>
<p>Golf courses worldwide measure distances in yards, even in metric countries. A 150-yard approach shot is 137.16 meters. Many golf GPS devices and rangefinders let you switch between yards and meters, but thinking in yards is deeply embedded in golf culture.</p>
<h3>Fabric and Textiles</h3>
<p>In the US, fabric is sold by the yard. If you\u2019re following a sewing pattern from a metric country, or ordering fabric internationally, you\u2019ll need to convert. One yard of fabric is 0.9144 meters. A pattern requiring 3 meters of fabric needs about 3.28 yards.</p>
<h3>Quick Estimation</h3>
<p>Since a yard is about 91.4% of a meter, they\u2019re almost the same. For rough estimates, 1 yard \u2248 1 meter. For slightly better accuracy, subtract about 9% from yards to get meters: 100 yards \u2212 9 = 91 meters (actual: 91.44 m).</p>`,
    faq: [
      { q: "How many meters is 1 yard?", a: "One yard equals exactly 0.9144 meters." },
      { q: "Are yards and meters almost the same?", a: "They\u2019re close \u2014 a yard is about 91.4% of a meter. For rough estimates, they\u2019re nearly interchangeable, but for precise work the 8.6% difference matters." },
      { q: "How long is a football field in meters?", a: "An American football field (100 yards between end zones) is 91.44 meters. Including both end zones (120 yards total), it\u2019s 109.73 meters." },
      { q: "How do I convert yards to meters?", a: "Multiply the number of yards by 0.9144. For example, 50 yards \u00D7 0.9144 = 45.72 meters." },
    ],
    relatedSlugs: ["meters-to-yards", "feet-to-meters", "miles-to-km", "inches-to-cm", "km-to-miles"],
  },
  {
    slug: "meters-to-yards",
    fromKey: "meter",
    toKey: "yard",
    categoryId: "length",
    h1: "Meters to Yards Converter \u2014 m to yd",
    title: "Meters to Yards Converter \u2014 m to yd Conversion | EveryFreeTool",
    meta: "Convert meters to yards instantly. Free online m to yd converter with formula, reference table, and real-world examples. 1 meter = 1.09361 yards.",
    quickAnswers: [
      "1 meter = 1.0936 yards",
      "5 meters = 5.4681 yards",
      "10 meters = 10.9361 yards",
      "25 meters = 27.3403 yards",
      "50 meters = 54.6807 yards",
      "91.44 meters = 100 yards",
      "100 meters = 109.361 yards",
    ],
    referenceTable: [
      [1, "1.0936"], [2, "2.1872"], [3, "3.2808"], [5, "5.4681"], [10, "10.9361"],
      [15, "16.4042"], [20, "21.8723"], [25, "27.3403"], [30, "32.8084"], [40, "43.7445"],
      [50, "54.6807"], [60, "65.6168"], [75, "82.021"], [100, "109.361"], [150, "164.042"],
      [200, "218.723"], [250, "273.403"], [300, "328.084"], [500, "546.807"], [1000, "1093.61"],
    ],
    formulaExplanation: "To convert meters to yards, multiply the number of meters by 1.09361. Alternatively, divide the meters by 0.9144.",
    workedExamples: [
      "Convert 50 meters (pool length) to yards: 50 \u00D7 1.09361 = 54.68 yards",
      "Convert 91.44 meters to yards: 91.44 \u00D7 1.09361 = 100 yards (a football field)",
    ],
    reverseNote: "To convert yards to meters, multiply the yards by 0.9144.",
    comparisons: [
      { text: "50 meters (54.68 yards) is the length of an Olympic swimming pool." },
      { text: "100 meters (109.36 yards) is the distance of the premier Olympic sprint event." },
      { text: "400 meters (437.4 yards) is one lap of a standard running track." },
      { text: "A par-4 golf hole might be 370 meters (about 405 yards)." },
    ],
    seoContent: `<p>Converting meters to yards is common in sports, swimming, and golf. The two units are close in size \u2014 one meter is about 1.094 yards \u2014 but the difference adds up over longer distances.</p>
<p>The meter is the base unit of length in the metric system, while the yard (equal to 3 feet) is the intermediate imperial unit between the foot and the mile.</p>
<h3>Swimming</h3>
<p>Swimming pools come in two standard competitive lengths: 25 meters (short course) and 50 meters (long course/Olympic). In the US, many pools are 25 yards. Swimmers converting times between meter and yard pools need this conversion. A 50-meter pool is about 54.68 yards \u2014 roughly 9.4% longer than a 50-yard pool, which is why times in meters are slightly slower.</p>
<h3>Golf Distances</h3>
<p>Golf courses measure distances in yards in most countries, but some courses (particularly in continental Europe) use meters. A 150-meter approach is about 164 yards. Laser rangefinders can display in either unit, but knowing the conversion helps you think about distances in whichever system you\u2019re more comfortable with.</p>
<h3>Track and Field</h3>
<p>Olympic track events are measured in meters (100 m, 200 m, 400 m, etc.), while American track events have historically used yards (though this is now rare at competitive levels). The 100-yard dash (91.44 m) was once a premier event but has been entirely replaced by the 100-meter dash (109.36 yards) in international competition.</p>`,
    faq: [
      { q: "How many yards is 1 meter?", a: "One meter equals approximately 1.09361 yards." },
      { q: "Is a meter longer than a yard?", a: "Yes, one meter is about 9.4% longer than one yard. A meter is 1.09361 yards." },
      { q: "How long is a 50-meter pool in yards?", a: "A 50-meter pool is approximately 54.68 yards." },
      { q: "How do I convert meters to yards?", a: "Multiply the number of meters by 1.09361. For example, 100 meters \u00D7 1.09361 = 109.36 yards." },
    ],
    relatedSlugs: ["yards-to-meters", "meters-to-feet", "km-to-miles", "feet-to-meters", "cm-to-inches"],
  },
  {
    slug: "mm-to-inches",
    fromKey: "millimeter",
    toKey: "inch",
    categoryId: "length",
    h1: "Millimeters to Inches Converter \u2014 mm to in",
    title: "Millimeters to Inches Converter \u2014 mm to in Conversion | EveryFreeTool",
    meta: "Convert millimeters to inches instantly. Free online mm to in converter with formula, reference table, and real-world examples. 1 mm = 0.03937 inches.",
    quickAnswers: [
      "1 mm = 0.0394 inches",
      "2 mm = 0.0787 inches",
      "3 mm = 0.1181 inches",
      "5 mm = 0.1969 inches",
      "10 mm = 0.3937 inches",
      "12.7 mm = 0.5 inches",
      "25.4 mm = 1 inch",
      "50 mm = 1.9685 inches",
      "100 mm = 3.937 inches",
    ],
    referenceTable: [
      [0.5, "0.0197"], [1, "0.0394"], [2, "0.0787"], [3, "0.1181"], [4, "0.1575"],
      [5, "0.1969"], [6, "0.2362"], [8, "0.315"], [10, "0.3937"], [12, "0.4724"],
      [15, "0.5906"], [20, "0.7874"], [25, "0.9843"], [25.4, "1"], [30, "1.1811"],
      [40, "1.5748"], [50, "1.9685"], [75, "2.9528"], [100, "3.937"], [150, "5.9055"],
    ],
    formulaExplanation: "To convert millimeters to inches, divide the number of millimeters by 25.4. There are exactly 25.4 millimeters in one inch.",
    workedExamples: [
      "Convert 10 mm to inches: 10 \u00F7 25.4 = 0.3937 inches",
      "Convert 8 mm (camera lens focal point) to inches: 8 \u00F7 25.4 = 0.315 inches",
    ],
    reverseNote: "To convert inches to millimeters, multiply the inches by 25.4.",
    comparisons: [
      { text: "1 mm is about the thickness of a credit card or a dime." },
      { text: "5 mm (0.197 inches) is roughly the diameter of a pencil lead (mechanical pencil)." },
      { text: "10 mm (0.394 inches) is about the width of a AAA battery." },
      { text: "25.4 mm is exactly 1 inch \u2014 the width of a US quarter coin." },
    ],
    seoContent: `<p>Millimeter-to-inch conversion is critical for engineering, 3D printing, machining, and precision manufacturing. While millimeters are the global standard for precision measurements, many US-based specifications still use inches and fractions of inches.</p>
<p>The relationship is exact: 25.4 millimeters = 1 inch. This makes the conversion straightforward but the numbers often have many decimal places, which is why a converter tool is so useful.</p>
<h3>Engineering and Manufacturing</h3>
<p>Machinists, engineers, and manufacturers work in tight tolerances where even a fraction of a millimeter matters. Bolt sizes, drill bits, and pipe fittings come in both metric (M6, M8, M10) and imperial (1/4\u201D, 3/8\u201D, 1/2\u201D) sizes. Knowing that an M6 bolt is about 0.236 inches helps when selecting the right tool or replacement part.</p>
<h3>3D Printing</h3>
<p>3D printers typically work in millimeters, but many designs from US-based makers specify dimensions in inches. Layer heights like 0.2 mm (0.008 inches) and nozzle diameters like 0.4 mm (0.016 inches) are standard specifications that benefit from accurate conversion.</p>
<h3>Jewelry and Small Items</h3>
<p>Ring sizes, gemstone measurements, and jewelry wire gauges often use millimeters internationally and inches in the US. A 6mm wedding band is about 0.236 inches (just under 1/4 inch). A 1-carat round diamond is approximately 6.5 mm (0.256 inches) in diameter.</p>`,
    faq: [
      { q: "How many inches is 1 mm?", a: "One millimeter equals approximately 0.03937 inches." },
      { q: "How many mm is 1 inch?", a: "One inch equals exactly 25.4 millimeters." },
      { q: "How do I convert mm to fractional inches?", a: "Divide mm by 25.4 to get decimal inches, then find the nearest fraction. For example, 6 mm = 0.236 inches \u2248 15/64 inch." },
      { q: "What is 10 mm in inches?", a: "10 mm equals approximately 0.3937 inches, or about 25/64 of an inch." },
      { q: "Is mm or inches more precise?", a: "Neither is inherently more precise \u2014 precision depends on how many decimal places you use. However, millimeters are smaller units, so whole-number mm measurements are more precise than whole-number inch measurements." },
    ],
    relatedSlugs: ["inches-to-mm", "cm-to-inches", "inches-to-cm", "feet-to-cm", "mm-to-inches"],
  },
  {
    slug: "inches-to-mm",
    fromKey: "inch",
    toKey: "millimeter",
    categoryId: "length",
    h1: "Inches to Millimeters Converter \u2014 in to mm",
    title: "Inches to Millimeters Converter \u2014 in to mm Conversion | EveryFreeTool",
    meta: "Convert inches to millimeters instantly. Free online in to mm converter with formula, reference table, and real-world examples. 1 inch = 25.4 mm.",
    quickAnswers: [
      "1/16 inch = 1.5875 mm",
      "1/8 inch = 3.175 mm",
      "1/4 inch = 6.35 mm",
      "3/8 inch = 9.525 mm",
      "1/2 inch = 12.7 mm",
      "3/4 inch = 19.05 mm",
      "1 inch = 25.4 mm",
      "2 inches = 50.8 mm",
      "3 inches = 76.2 mm",
      "6 inches = 152.4 mm",
    ],
    referenceTable: [
      [0.0625, "1.5875"], [0.125, "3.175"], [0.1875, "4.7625"], [0.25, "6.35"], [0.375, "9.525"],
      [0.5, "12.7"], [0.625, "15.875"], [0.75, "19.05"], [0.875, "22.225"], [1, "25.4"],
      [1.5, "38.1"], [2, "50.8"], [3, "76.2"], [4, "101.6"], [5, "127"],
      [6, "152.4"], [8, "203.2"], [10, "254"], [12, "304.8"], [24, "609.6"],
    ],
    formulaExplanation: "To convert inches to millimeters, multiply the number of inches by 25.4. There are exactly 25.4 mm in one inch.",
    workedExamples: [
      "Convert 3/8 inch to mm: 0.375 \u00D7 25.4 = 9.525 mm",
      "Convert 4.5 inches to mm: 4.5 \u00D7 25.4 = 114.3 mm",
    ],
    reverseNote: "To convert millimeters to inches, divide the millimeters by 25.4.",
    comparisons: [
      { text: "1 inch (25.4 mm) is the approximate diameter of a US quarter coin." },
      { text: "3/8 inch (9.525 mm) is a common drill bit size and socket wrench size." },
      { text: "6 inches (152.4 mm) is about the length of a dollar bill." },
      { text: "12 inches (304.8 mm) is one foot \u2014 roughly the length of a standard ruler." },
    ],
    seoContent: `<p>Converting inches to millimeters is essential for anyone working with precision measurements in engineering, woodworking, machining, or hardware. Since 1 inch equals exactly 25.4 mm, the conversion is precise but the numbers can be cumbersome \u2014 making a calculator tool invaluable.</p>
<h3>Hardware and Fasteners</h3>
<p>Screws, bolts, nuts, and nails come in both imperial (inches) and metric (mm) sizes. A 1/4-inch bolt is 6.35 mm, a 5/16-inch is 7.9375 mm, and a 3/8-inch is 9.525 mm. When working with imported machinery or replacing parts, having the exact mm equivalent prevents costly mistakes.</p>
<h3>Woodworking and Carpentry</h3>
<p>American woodworkers measure in fractions of inches (1/4\u201D, 3/8\u201D, 1/2\u201D), while European plans and machinery often use millimeters. Table saw blades, router bits, and plywood thicknesses are specified differently depending on origin. A \u201C3/4-inch\u201D plywood sheet is 19.05 mm, but metric plywood is often 18 mm \u2014 a difference that matters for joinery.</p>
<h3>CNC and Precision Manufacturing</h3>
<p>CNC machines, lathes, and milling machines accept programs in either inches or millimeters. Converting between them accurately is critical for producing parts that fit together. A tolerance of \u00B10.001 inches is \u00B10.0254 mm \u2014 knowing this conversion ensures your specifications translate correctly between measurement systems.</p>`,
    faq: [
      { q: "How many mm is 1 inch?", a: "One inch equals exactly 25.4 millimeters." },
      { q: "How do I convert fractions of inches to mm?", a: "First convert the fraction to a decimal (e.g., 3/8 = 0.375), then multiply by 25.4. So 3/8 inch = 0.375 \u00D7 25.4 = 9.525 mm." },
      { q: "What is 1/4 inch in mm?", a: "1/4 inch equals exactly 6.35 millimeters." },
      { q: "What is 1/2 inch in mm?", a: "1/2 inch equals exactly 12.7 millimeters." },
      { q: "Why is the conversion factor exactly 25.4?", a: "In 1959, the international yard and pound agreement defined the inch as exactly 25.4 millimeters. This is an exact definition, not an approximation." },
    ],
    relatedSlugs: ["mm-to-inches", "inches-to-cm", "cm-to-inches", "feet-to-meters", "feet-to-cm"],
  },
  {
    slug: "feet-to-cm",
    fromKey: "foot",
    toKey: "centimeter",
    categoryId: "length",
    h1: "Feet to Centimeters Converter \u2014 ft to cm",
    title: "Feet to Centimeters Converter \u2014 ft to cm Conversion | EveryFreeTool",
    meta: "Convert feet to centimeters instantly. Free online ft to cm converter with formula, reference table, and real-world examples. 1 foot = 30.48 cm.",
    quickAnswers: [
      "1 foot = 30.48 cm",
      "2 feet = 60.96 cm",
      "3 feet = 91.44 cm",
      "4 feet = 121.92 cm",
      "5 feet = 152.4 cm",
      "5.5 feet = 167.64 cm",
      "6 feet = 182.88 cm",
      "7 feet = 213.36 cm",
      "8 feet = 243.84 cm",
      "10 feet = 304.8 cm",
    ],
    referenceTable: [
      [0.5, "15.24"], [1, "30.48"], [1.5, "45.72"], [2, "60.96"], [2.5, "76.2"],
      [3, "91.44"], [3.5, "106.68"], [4, "121.92"], [4.5, "137.16"], [5, "152.4"],
      [5.5, "167.64"], [6, "182.88"], [6.5, "198.12"], [7, "213.36"], [7.5, "228.6"],
      [8, "243.84"], [9, "274.32"], [10, "304.8"], [12, "365.76"], [15, "457.2"],
    ],
    formulaExplanation: "To convert feet to centimeters, multiply the number of feet by 30.48. One foot is exactly 30.48 centimeters (12 inches \u00D7 2.54 cm per inch).",
    workedExamples: [
      "Convert 5 feet 4 inches to cm: 5.333 \u00D7 30.48 = 162.56 cm",
      "Convert 3 feet (a yardstick) to cm: 3 \u00D7 30.48 = 91.44 cm",
    ],
    reverseNote: "To convert centimeters to feet, divide the centimeters by 30.48.",
    comparisons: [
      { text: "1 foot (30.48 cm) is about the length of a standard ruler." },
      { text: "3 feet (91.44 cm) is roughly the height of a typical 3-year-old child." },
      { text: "5 feet (152.4 cm) is the height of an average 12-year-old." },
      { text: "8 feet (243.84 cm) is a standard residential ceiling height in the US." },
    ],
    seoContent: `<p>Converting feet to centimeters is particularly useful for tracking children\u2019s growth, measuring furniture, and understanding room dimensions across measurement systems. Since feet are the standard for height and household measurements in the US, while centimeters dominate globally, this conversion bridges the gap.</p>
<h3>Child Height and Growth</h3>
<p>Pediatricians worldwide use centimeters for height measurements, while many American parents think in feet and inches. Tracking a child\u2019s growth on international percentile charts requires converting to centimeters. A child who is 3 feet 6 inches (3.5 feet) is 106.68 cm \u2014 typical for a 4-year-old.</p>
<h3>Furniture and Interior Design</h3>
<p>When shopping for furniture internationally or measuring rooms for new pieces, you often need to convert between feet and centimeters. A 6-foot bookshelf is 182.88 cm. A 4-foot wide desk is 121.92 cm. These conversions ensure furniture fits before you buy.</p>
<h3>Room Measurements</h3>
<p>Real estate listings in the US specify room sizes in feet (12\u2019 \u00D7 14\u2019), while international listings use meters or centimeters. Knowing that a 12-foot room is 365.76 cm (or 3.6576 meters) helps when comparing spaces across different markets.</p>
<h3>Quick Shortcut</h3>
<p>Multiply feet by 30 for a fast estimate. One foot \u00D7 30 = 30 cm (actual: 30.48 cm). For 5 feet: 5 \u00D7 30 = 150 cm (actual: 152.4 cm). The error is small enough for quick mental calculations.</p>`,
    faq: [
      { q: "How many cm is 1 foot?", a: "One foot equals exactly 30.48 centimeters." },
      { q: "How do I convert feet and inches to cm?", a: "Convert inches to feet first (divide inches by 12 and add to feet), then multiply total feet by 30.48. Or multiply feet by 30.48 and inches by 2.54, then add them together." },
      { q: "How tall is 5 feet in cm?", a: "5 feet equals exactly 152.4 centimeters." },
      { q: "How many feet is 100 cm?", a: "100 cm is approximately 3.281 feet, or about 3 feet 3.4 inches." },
      { q: "Is 6 feet tall?", a: "6 feet (182.88 cm) is considered tall in most countries. The global average male height is about 5\u20197\u201D (170 cm), so 6 feet is well above average." },
    ],
    relatedSlugs: ["cm-to-feet", "feet-to-meters", "inches-to-cm", "cm-to-inches", "meters-to-feet"],
  },
  {
    slug: "cm-to-feet",
    fromKey: "centimeter",
    toKey: "foot",
    categoryId: "length",
    h1: "Centimeters to Feet Converter \u2014 cm to ft",
    title: "Centimeters to Feet Converter \u2014 cm to ft Conversion | EveryFreeTool",
    meta: "Convert centimeters to feet instantly. Free online cm to ft converter with formula, reference table, and real-world examples. 1 cm = 0.03281 feet.",
    quickAnswers: [
      "150 cm = 4.921 feet (4\u2019 11\u201D)",
      "155 cm = 5.085 feet (5\u2019 1\u201D)",
      "160 cm = 5.249 feet (5\u2019 3\u201D)",
      "165 cm = 5.413 feet (5\u2019 5\u201D)",
      "170 cm = 5.577 feet (5\u2019 7\u201D)",
      "175 cm = 5.741 feet (5\u2019 9\u201D)",
      "180 cm = 5.906 feet (5\u2019 11\u201D)",
      "185 cm = 6.07 feet (6\u2019 1\u201D)",
      "190 cm = 6.234 feet (6\u2019 3\u201D)",
      "200 cm = 6.562 feet (6\u2019 7\u201D)",
    ],
    referenceTable: [
      [10, "0.3281"], [20, "0.6562"], [30, "0.9843"], [50, "1.6404"], [75, "2.4606"],
      [100, "3.2808"], [120, "3.937"], [140, "4.5932"], [150, "4.9213"], [155, "5.0853"],
      [160, "5.2493"], [165, "5.4134"], [170, "5.5774"], [175, "5.7415"], [180, "5.9055"],
      [185, "6.0696"], [190, "6.2336"], [195, "6.3976"], [200, "6.5617"], [250, "8.2021"],
    ],
    formulaExplanation: "To convert centimeters to feet, divide the number of centimeters by 30.48.",
    workedExamples: [
      "Convert 170 cm to feet: 170 \u00F7 30.48 = 5.577 feet (5\u2019 7\u201D)",
      "Convert 243 cm (a standard 8\u2019 ceiling) to feet: 243 \u00F7 30.48 = 7.972 feet",
    ],
    reverseNote: "To convert feet to centimeters, multiply the feet by 30.48.",
    comparisons: [
      { text: "30 cm (about 1 foot) is the length of a standard ruler." },
      { text: "152 cm (about 5 feet) is the average height of a woman worldwide." },
      { text: "183 cm (about 6 feet) is the average height of a Dutch man \u2014 the tallest national average." },
      { text: "244 cm (about 8 feet) is a standard US residential ceiling height." },
    ],
    seoContent: `<p>Centimeters to feet is one of the most searched height conversions. Whether you\u2019re reading a medical report, comparing international height data, or just curious how tall someone is, this conversion is endlessly useful.</p>
<p>The centimeter is the most common unit for human height in most of the world. Medical records, driver\u2019s licenses, and everyday conversation in metric countries all use centimeters. But in the US and often in the UK, height is expressed in feet and inches.</p>
<h3>Converting Heights</h3>
<p>The most common reason for this conversion is understanding a person\u2019s height. Here\u2019s a quick guide: 152 cm is about 5\u20190\u201D, 160 cm is about 5\u20193\u201D, 170 cm is about 5\u20197\u201D, 175 cm is about 5\u20199\u201D, 180 cm is about 5\u201911\u201D, and 190 cm is about 6\u20193\u201D.</p>
<h3>Furniture and Room Dimensions</h3>
<p>International furniture measurements are given in centimeters. A desk height of 75 cm is about 2.46 feet (29.5 inches). A wardrobe that\u2019s 200 cm tall is about 6.56 feet. Knowing these equivalents helps when furnishing a space with items from different countries.</p>
<h3>Quick Mental Method</h3>
<p>Divide the cm by 30 for a fast approximation in feet. 180 cm \u00F7 30 = 6 feet (actual: 5\u201911\u201D). It\u2019s not exact but gives a quick ballpark. For better accuracy with heights, remember these anchors: 150 cm \u2248 5\u20190\u201D, 160 cm \u2248 5\u20193\u201D, 170 cm \u2248 5\u20197\u201D, 180 cm \u2248 5\u201911\u201D, 190 cm \u2248 6\u20193\u201D.</p>`,
    faq: [
      { q: "How do I convert cm to feet and inches?", a: "Divide cm by 30.48 to get total feet. The whole number is feet. Multiply the remaining decimal by 12 to get inches. Example: 175 cm \u00F7 30.48 = 5.741 feet = 5 feet + (0.741 \u00D7 12) = 5 feet 8.9 inches." },
      { q: "How many feet is 170 cm?", a: "170 cm is approximately 5 feet 6.9 inches, or roughly 5\u20197\u201D." },
      { q: "How many feet is 180 cm?", a: "180 cm is approximately 5 feet 10.9 inches, or roughly 5\u201911\u201D." },
      { q: "How tall is 160 cm in feet?", a: "160 cm is approximately 5 feet 3 inches." },
      { q: "What is the average height in cm?", a: "The global average adult height is approximately 171 cm (5\u20197\u201D) for men and 159 cm (5\u20193\u201D) for women." },
    ],
    relatedSlugs: ["feet-to-cm", "cm-to-inches", "meters-to-feet", "inches-to-cm", "feet-to-meters"],
  },
];
