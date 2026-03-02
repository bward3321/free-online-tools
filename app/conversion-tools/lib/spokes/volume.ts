import { SpokeData } from "./types";

export const volumeSpokes: SpokeData[] = [
  {
    slug: "liters-to-gallons",
    fromKey: "liter",
    toKey: "gallonUS",
    categoryId: "volume",
    h1: "Liters to Gallons Converter \u2014 L to gal",
    title: "Liters to Gallons Converter \u2014 L to gal (US) Conversion | EveryFreeTool",
    meta: "Convert liters to US gallons instantly. Free online L to gal converter with formula, reference table, and real-world examples. 1 liter = 0.2642 gallons.",
    quickAnswers: [
      "1 liter = 0.2642 gallons", "2 liters = 0.5283 gallons", "3.785 liters = 1 gallon",
      "5 liters = 1.3209 gallons", "10 liters = 2.6417 gallons", "20 liters = 5.2834 gallons",
      "40 liters = 10.567 gallons", "50 liters = 13.209 gallons", "100 liters = 26.417 gallons",
    ],
    referenceTable: [
      [1, "0.2642"], [2, "0.5283"], [3, "0.7925"], [3.785, "1"], [5, "1.3209"],
      [8, "2.1134"], [10, "2.6417"], [15, "3.9626"], [20, "5.2834"], [25, "6.6043"],
      [30, "7.9252"], [40, "10.567"], [50, "13.209"], [60, "15.8503"], [75, "19.8129"],
      [100, "26.4172"], [150, "39.6258"], [200, "52.8344"], [500, "132.086"], [1000, "264.172"],
    ],
    formulaExplanation: "To convert liters to US gallons, multiply the number of liters by 0.264172, or divide by 3.78541.",
    workedExamples: [
      "Convert 50 liters (a car fuel tank) to gallons: 50 \u00D7 0.264172 = 13.21 gallons",
      "Convert 20 liters to gallons: 20 \u00D7 0.264172 = 5.28 gallons",
    ],
    reverseNote: "To convert US gallons to liters, multiply the gallons by 3.78541.",
    comparisons: [
      { text: "1 liter (0.26 gallons) is a standard water bottle size." },
      { text: "3.785 liters equals exactly 1 US gallon \u2014 a typical milk jug." },
      { text: "50 liters (13.2 gallons) is the fuel tank capacity of many compact cars." },
      { text: "A standard bathtub holds about 300 liters (79 gallons) of water." },
    ],
    seoContent: `<p>Liters and gallons are the two main units for measuring volume in everyday life. Liters are standard worldwide, while the US gallon is used in the United States for fuel, beverages, and household measurements. Note that UK (imperial) gallons are different \u2014 this converter uses US gallons.</p>
<h3>Fuel and Gas</h3>
<p>Fuel is sold by the liter in most of the world and by the gallon in the US. If you\u2019re renting a car in Europe and the pump shows liters, knowing the conversion helps estimate costs. A car with a 50-liter tank holds about 13.2 US gallons. Gas prices in Europe might show \u20AC1.60/liter, which works out to about \u20AC6.06 per gallon.</p>
<h3>Cooking and Beverages</h3>
<p>Large-quantity recipes, beverage production, and water measurements frequently cross between liters and gallons. A 2-liter soda bottle is about half a gallon (0.53 gal). A 5-gallon water cooler jug holds about 18.9 liters.</p>
<h3>Pool and Hot Tub Volume</h3>
<p>Swimming pools are often measured in gallons in the US and liters elsewhere. A typical residential pool holds 40,000-80,000 liters (10,500-21,000 gallons). Hot tubs range from 1,000-2,500 liters (264-660 gallons). These conversions matter for chemical treatments and water heating calculations.</p>`,
    faq: [
      { q: "How many gallons is 1 liter?", a: "One liter equals approximately 0.2642 US gallons." },
      { q: "How many liters in a gallon?", a: "One US gallon equals approximately 3.785 liters." },
      { q: "Is a US gallon the same as a UK gallon?", a: "No. A US gallon is 3.785 liters, while a UK (imperial) gallon is 4.546 liters \u2014 about 20% larger." },
      { q: "How many liters is a gallon of gas?", a: "A US gallon of gasoline equals approximately 3.785 liters." },
      { q: "How do I convert gas prices from liters to gallons?", a: "Multiply the per-liter price by 3.785 to get the per-gallon price. For example, \u20AC1.50/liter \u00D7 3.785 = \u20AC5.68 per gallon." },
    ],
    relatedSlugs: ["gallons-to-liters", "cups-to-ml", "ml-to-cups", "pints-to-liters", "fluid-ounces-to-ml"],
  },
  {
    slug: "gallons-to-liters",
    fromKey: "gallonUS",
    toKey: "liter",
    categoryId: "volume",
    h1: "Gallons to Liters Converter \u2014 gal to L",
    title: "Gallons to Liters Converter \u2014 gal (US) to L Conversion | EveryFreeTool",
    meta: "Convert US gallons to liters instantly. Free online gal to L converter with formula, reference table, and real-world examples. 1 gallon = 3.78541 liters.",
    quickAnswers: [
      "1 gallon = 3.7854 liters", "2 gallons = 7.5708 liters", "3 gallons = 11.3562 liters",
      "5 gallons = 18.927 liters", "10 gallons = 37.854 liters", "15 gallons = 56.781 liters",
      "20 gallons = 75.708 liters", "50 gallons = 189.271 liters", "100 gallons = 378.541 liters",
    ],
    referenceTable: [
      [0.25, "0.9464"], [0.5, "1.8927"], [1, "3.7854"], [2, "7.5708"], [3, "11.3562"],
      [4, "15.1416"], [5, "18.927"], [6, "22.7125"], [8, "30.2833"], [10, "37.8541"],
      [12, "45.4249"], [15, "56.7812"], [20, "75.7082"], [25, "94.6353"], [30, "113.562"],
      [40, "151.416"], [50, "189.271"], [75, "283.906"], [100, "378.541"], [500, "1892.71"],
    ],
    formulaExplanation: "To convert US gallons to liters, multiply the number of gallons by 3.78541.",
    workedExamples: [
      "Convert 15 gallons (a gas tank) to liters: 15 \u00D7 3.78541 = 56.78 liters",
      "Convert 5 gallons (a water jug) to liters: 5 \u00D7 3.78541 = 18.93 liters",
    ],
    reverseNote: "To convert liters to US gallons, divide the liters by 3.78541.",
    comparisons: [
      { text: "1 gallon (3.785 L) is the size of a standard milk jug." },
      { text: "5 gallons (18.9 L) is a large water cooler jug or a bucket." },
      { text: "15 gallons (56.8 L) is a typical car fuel tank capacity." },
      { text: "300 gallons (1,136 L) is a small residential hot tub." },
    ],
    seoContent: `<p>Converting gallons to liters is essential when working with fuel, water systems, aquariums, and recipes that span the US and metric systems. The US gallon (3.785 liters) is the standard for liquid measurement in America, while liters are used virtually everywhere else.</p>
<h3>Aquariums and Fish Tanks</h3>
<p>Aquariums in the US are sold by gallon capacity: 10-gallon, 20-gallon, 55-gallon, etc. But water treatment products, international equipment, and scientific guides often reference liters. A 55-gallon aquarium is about 208 liters. A popular 20-gallon tank is about 75.7 liters.</p>
<h3>Water Usage and Conservation</h3>
<p>Understanding water consumption in both units helps compare usage data internationally. A 10-minute shower uses about 20 gallons (75.7 liters). A standard washing machine uses 15-30 gallons (57-114 liters) per cycle. Water bills may be in gallons (US) or cubic meters (1,000 liters).</p>
<h3>Homebrew and Winemaking</h3>
<p>Homebrewing recipes from American sources use gallons, while international recipes use liters. A standard homebrew batch is 5 gallons (18.9 liters). Wine kits often come in 6-gallon (22.7-liter) batches. Fermenter capacities and ingredient ratios need accurate conversion.</p>`,
    faq: [
      { q: "How many liters in a gallon?", a: "One US gallon equals approximately 3.78541 liters." },
      { q: "How many gallons is 1 liter?", a: "One liter equals approximately 0.2642 US gallons." },
      { q: "What is the difference between US and UK gallons?", a: "A US gallon is 3.785 liters, while a UK (imperial) gallon is 4.546 liters. UK gallons are about 20% larger." },
      { q: "How much is 5 gallons in liters?", a: "5 US gallons equals approximately 18.93 liters." },
    ],
    relatedSlugs: ["liters-to-gallons", "ml-to-cups", "cups-to-ml", "pints-to-liters", "fluid-ounces-to-ml"],
  },
  {
    slug: "cups-to-ml",
    fromKey: "cupUS",
    toKey: "milliliter",
    categoryId: "volume",
    h1: "Cups to Milliliters Converter \u2014 cups to mL",
    title: "Cups to Milliliters Converter \u2014 cups to mL Conversion | EveryFreeTool",
    meta: "Convert US cups to milliliters instantly. Free online cups to mL converter with formula, reference table, and real-world examples. 1 cup = 236.588 mL.",
    quickAnswers: [
      "1/4 cup = 59.15 mL", "1/3 cup = 78.86 mL", "1/2 cup = 118.29 mL",
      "2/3 cup = 157.73 mL", "3/4 cup = 177.44 mL", "1 cup = 236.59 mL",
      "1.5 cups = 354.88 mL", "2 cups = 473.18 mL", "3 cups = 709.76 mL",
      "4 cups = 946.35 mL",
    ],
    referenceTable: [
      [0.125, "29.5735"], [0.25, "59.1471"], [0.333, "78.8627"], [0.5, "118.294"],
      [0.667, "157.726"], [0.75, "177.441"], [1, "236.588"], [1.25, "295.735"],
      [1.5, "354.882"], [1.75, "414.029"], [2, "473.176"], [2.5, "591.471"],
      [3, "709.765"], [3.5, "828.059"], [4, "946.353"], [5, "1182.94"],
      [6, "1419.53"], [8, "1892.71"], [10, "2365.88"], [12, "2839.06"],
    ],
    formulaExplanation: "To convert US cups to milliliters, multiply the number of cups by 236.588. One US cup equals exactly 8 US fluid ounces or approximately 236.588 mL.",
    workedExamples: [
      "Convert 1.5 cups of milk to mL: 1.5 \u00D7 236.588 = 354.88 mL",
      "Convert 2/3 cup of sugar to mL: 0.667 \u00D7 236.588 = 157.73 mL",
    ],
    reverseNote: "To convert milliliters to US cups, divide the mL by 236.588.",
    comparisons: [
      { text: "1 US cup (237 mL) is a bit less than a standard 250 mL metric cup." },
      { text: "2 cups (473 mL) is close to half a liter \u2014 a standard bottle of water." },
      { text: "4 cups (946 mL) is just under 1 liter, or 1 US quart." },
      { text: "A standard coffee mug holds about 1.5 cups (354 mL)." },
    ],
    seoContent: `<p>Cups and milliliters are both common volume measurements in cooking, but they come from different systems. The cup is an American (and to some extent Australian and Canadian) measurement, while milliliters are used internationally. Accurate conversion is critical for baking success.</p>
<h3>Why Cup-to-mL Conversion Matters</h3>
<p>American recipes use cups, while European, Asian, and most international recipes use milliliters or grams. If you\u2019re following a recipe from a different country, you need precise conversion. Baking is particularly sensitive \u2014 too much or too little flour can ruin a cake.</p>
<h3>US Cup vs. Metric Cup</h3>
<p>Be aware that a US cup (236.588 mL) differs from a metric cup (250 mL) used in Australia and some other countries. A UK cup is 284 mL (10 imperial fluid ounces). Japanese cups are 200 mL. When following international recipes, check which cup standard is being used.</p>
<h3>Common Kitchen Conversions</h3>
<p>1/4 cup = about 60 mL, 1/3 cup = about 79 mL, 1/2 cup = about 118 mL, 1 cup = about 237 mL, 2 cups = about 473 mL. For measuring spoons: 1 tablespoon = about 15 mL, 1 teaspoon = about 5 mL. These approximate values are close enough for most cooking (within 1%).</p>`,
    faq: [
      { q: "How many mL is 1 cup?", a: "One US cup equals approximately 236.588 mL. For most cooking purposes, rounding to 237 mL or even 240 mL is close enough." },
      { q: "How many cups is 250 mL?", a: "250 mL is approximately 1.057 US cups, or just over 1 cup. Note that 250 mL equals exactly 1 metric cup." },
      { q: "Is a US cup the same as a metric cup?", a: "No. A US cup is 236.588 mL, while a metric cup (used in Australia, etc.) is 250 mL \u2014 about 5.7% larger." },
      { q: "How many mL is 1/2 cup?", a: "1/2 US cup equals approximately 118.3 mL." },
      { q: "How do I measure mL without a metric measuring cup?", a: "Use the conversion: 1 US cup = 237 mL, 1 tablespoon = 14.8 mL, 1 teaspoon = 4.9 mL. Combine these to approximate any mL measurement." },
    ],
    relatedSlugs: ["ml-to-cups", "tablespoons-to-ml", "fluid-ounces-to-ml", "liters-to-gallons", "gallons-to-liters"],
  },
  {
    slug: "ml-to-cups",
    fromKey: "milliliter",
    toKey: "cupUS",
    categoryId: "volume",
    h1: "Milliliters to Cups Converter \u2014 mL to cups",
    title: "Milliliters to Cups Converter \u2014 mL to cups Conversion | EveryFreeTool",
    meta: "Convert milliliters to US cups instantly. Free online mL to cups converter with formula, reference table, and real-world examples. 1 mL = 0.00423 cups.",
    quickAnswers: [
      "50 mL = 0.211 cups", "100 mL = 0.423 cups", "125 mL = 0.528 cups",
      "150 mL = 0.634 cups", "200 mL = 0.845 cups", "237 mL = 1 cup",
      "250 mL = 1.057 cups", "300 mL = 1.268 cups", "500 mL = 2.113 cups",
      "750 mL = 3.17 cups", "1000 mL = 4.227 cups",
    ],
    referenceTable: [
      [15, "0.0634"], [30, "0.1268"], [50, "0.2113"], [60, "0.2536"], [80, "0.3381"],
      [100, "0.4227"], [120, "0.5072"], [150, "0.6341"], [175, "0.7397"], [200, "0.8454"],
      [237, "1.0017"], [250, "1.0567"], [300, "1.2681"], [350, "1.4795"], [400, "1.6907"],
      [475, "2.0078"], [500, "2.1134"], [600, "2.5361"], [750, "3.1701"], [1000, "4.2268"],
    ],
    formulaExplanation: "To convert milliliters to US cups, divide the number of mL by 236.588.",
    workedExamples: [
      "Convert 500 mL of broth to cups: 500 \u00F7 236.588 = 2.11 cups",
      "Convert 150 mL of cream to cups: 150 \u00F7 236.588 = 0.63 cups (about 2/3 cup)",
    ],
    reverseNote: "To convert US cups to milliliters, multiply the cups by 236.588.",
    comparisons: [
      { text: "50 mL is about 3.3 tablespoons or a small espresso shot." },
      { text: "237 mL (1 cup) is a standard measuring cup." },
      { text: "250 mL is a typical juice box or 1 metric cup." },
      { text: "500 mL (2.1 cups) is a standard water bottle." },
    ],
    seoContent: `<p>Converting milliliters to cups is a daily task for anyone following international recipes with American measuring equipment. Since most of the world\u2019s recipes use milliliters (or grams for dry ingredients), and American kitchens use cup measures, this conversion bridges the gap.</p>
<h3>International Recipe Conversion</h3>
<p>European, Japanese, and many other cuisines specify liquids in milliliters. When you see \"add 200 mL of cream\" in a French recipe, that\u2019s about 0.845 cups \u2014 just a bit less than a cup. For 300 mL of stock, use about 1\u00BC cups. These approximations work well for cooking (though baking demands more precision).</p>
<h3>Beverage Sizes</h3>
<p>Drinks are often sold in metric sizes. A standard can of soda is 355 mL (about 1.5 cups). A wine bottle is 750 mL (about 3.17 cups). An espresso shot is 30 mL (about 2 tablespoons). Understanding these in cups helps with recipe planning and portion awareness.</p>
<h3>Medicine Dosing</h3>
<p>Liquid medications are measured in milliliters but you might need to convert to cups or tablespoons for measurement at home. Always use the measuring device provided with medications \u2014 kitchen spoons are not accurate enough. But for reference: 5 mL = 1 teaspoon, 15 mL = 1 tablespoon, 30 mL = 1 fluid ounce.</p>`,
    faq: [
      { q: "How many cups is 250 mL?", a: "250 mL is approximately 1.057 US cups, or just over 1 cup." },
      { q: "How many cups is 500 mL?", a: "500 mL is approximately 2.113 US cups, or just over 2 cups." },
      { q: "How many mL in 1 cup?", a: "One US cup is approximately 236.588 mL." },
      { q: "How many cups is 100 mL?", a: "100 mL is approximately 0.423 US cups, or just under half a cup." },
    ],
    relatedSlugs: ["cups-to-ml", "fluid-ounces-to-ml", "tablespoons-to-ml", "liters-to-gallons", "gallons-to-liters"],
  },
  {
    slug: "tablespoons-to-ml",
    fromKey: "tablespoon",
    toKey: "milliliter",
    categoryId: "volume",
    h1: "Tablespoons to Milliliters Converter \u2014 tbsp to mL",
    title: "Tablespoons to Milliliters Converter \u2014 tbsp to mL Conversion | EveryFreeTool",
    meta: "Convert tablespoons to milliliters instantly. Free online tbsp to mL converter with formula, reference table, and real-world examples. 1 tbsp = 14.787 mL.",
    quickAnswers: [
      "1/2 tbsp = 7.39 mL", "1 tbsp = 14.79 mL", "1.5 tbsp = 22.18 mL",
      "2 tbsp = 29.57 mL (1 fl oz)", "3 tbsp = 44.36 mL", "4 tbsp = 59.15 mL (1/4 cup)",
      "5 tbsp = 73.93 mL", "6 tbsp = 88.72 mL", "8 tbsp = 118.29 mL (1/2 cup)",
      "16 tbsp = 236.59 mL (1 cup)",
    ],
    referenceTable: [
      [0.25, "3.6967"], [0.5, "7.3934"], [0.75, "11.09"], [1, "14.787"], [1.5, "22.18"],
      [2, "29.574"], [2.5, "36.967"], [3, "44.36"], [4, "59.147"], [5, "73.934"],
      [6, "88.721"], [7, "103.508"], [8, "118.294"], [10, "147.868"], [12, "177.441"],
      [14, "207.015"], [16, "236.588"], [20, "295.735"], [24, "354.882"], [32, "473.176"],
    ],
    formulaExplanation: "To convert tablespoons to milliliters, multiply the number of tablespoons by 14.787. One US tablespoon equals approximately 14.787 mL.",
    workedExamples: [
      "Convert 3 tbsp of olive oil to mL: 3 \u00D7 14.787 = 44.36 mL",
      "Convert 2 tbsp of medicine to mL: 2 \u00D7 14.787 = 29.57 mL",
    ],
    reverseNote: "To convert mL to tablespoons, divide the mL by 14.787.",
    comparisons: [
      { text: "1 tablespoon (14.8 mL) is about 3 teaspoons." },
      { text: "2 tablespoons (29.6 mL) equals 1 fluid ounce \u2014 a standard shot glass." },
      { text: "4 tablespoons (59.1 mL) equals 1/4 cup." },
      { text: "16 tablespoons (236.6 mL) equals 1 cup." },
    ],
    seoContent: `<p>Tablespoons and milliliters are both used for small-volume measurements, particularly in cooking and medicine. The tablespoon is a standard US cooking measure, while milliliters are the international standard for precise small-volume measurement.</p>
<h3>Medicine Dosing</h3>
<p>Liquid medications are often prescribed in milliliters but measured at home with tablespoons. A standard dose of cough syrup might be 10 mL or 15 mL (about 2/3 or 1 tablespoon). However, medical professionals recommend using a graduated syringe or dosing cup rather than a kitchen tablespoon, which can vary by up to 20% in volume.</p>
<h3>Cooking Precision</h3>
<p>When a European recipe calls for \"15 mL of vanilla extract,\" that\u2019s 1 tablespoon. Recipes from metric countries list oil, vinegar, sauces, and extracts in mL. Knowing the conversion means you can follow these recipes with your existing measuring spoons: 5 mL = 1 teaspoon, 15 mL \u2248 1 tablespoon.</p>
<h3>Note on Metric Tablespoons</h3>
<p>The Australian tablespoon is 20 mL, not 15 mL. The UK tablespoon was traditionally 17.7 mL but has largely been standardized to 15 mL in modern recipes. Always check which standard your recipe uses.</p>`,
    faq: [
      { q: "How many mL is 1 tablespoon?", a: "One US tablespoon equals approximately 14.787 mL. For cooking purposes, 15 mL is a commonly used rounded value." },
      { q: "How many tablespoons is 30 mL?", a: "30 mL is approximately 2 tablespoons (2.03 tbsp)." },
      { q: "How many teaspoons in a tablespoon?", a: "There are 3 teaspoons in 1 tablespoon." },
      { q: "Is a tablespoon the same worldwide?", a: "No. A US tablespoon is about 14.8 mL, while an Australian tablespoon is 20 mL. Most international recipes now standardize on 15 mL." },
    ],
    relatedSlugs: ["cups-to-ml", "ml-to-cups", "fluid-ounces-to-ml", "liters-to-gallons", "gallons-to-liters"],
  },
  {
    slug: "fluid-ounces-to-ml",
    fromKey: "fluidOzUS",
    toKey: "milliliter",
    categoryId: "volume",
    h1: "Fluid Ounces to Milliliters Converter \u2014 fl oz to mL",
    title: "Fluid Ounces to Milliliters Converter \u2014 fl oz to mL Conversion | EveryFreeTool",
    meta: "Convert US fluid ounces to milliliters instantly. Free online fl oz to mL converter with formula, reference table, and real-world examples. 1 fl oz = 29.5735 mL.",
    quickAnswers: [
      "1 fl oz = 29.57 mL", "2 fl oz = 59.15 mL", "4 fl oz = 118.29 mL",
      "6 fl oz = 177.44 mL", "8 fl oz (1 cup) = 236.59 mL", "10 fl oz = 295.74 mL",
      "12 fl oz (1 can) = 354.88 mL", "16 fl oz (1 pint) = 473.18 mL",
      "20 fl oz = 591.47 mL", "32 fl oz (1 quart) = 946.35 mL",
    ],
    referenceTable: [
      [0.5, "14.787"], [1, "29.574"], [1.5, "44.36"], [2, "59.147"], [3, "88.721"],
      [4, "118.294"], [5, "147.868"], [6, "177.441"], [8, "236.588"], [10, "295.735"],
      [12, "354.882"], [14, "414.029"], [16, "473.176"], [20, "591.471"], [24, "709.765"],
      [28, "828.059"], [32, "946.353"], [48, "1419.53"], [64, "1892.71"], [128, "3785.41"],
    ],
    formulaExplanation: "To convert US fluid ounces to milliliters, multiply the number of fluid ounces by 29.5735.",
    workedExamples: [
      "Convert 12 fl oz (a soda can) to mL: 12 \u00D7 29.5735 = 354.88 mL",
      "Convert 8 fl oz (a cup) to mL: 8 \u00D7 29.5735 = 236.59 mL",
    ],
    reverseNote: "To convert mL to US fluid ounces, divide the mL by 29.5735.",
    comparisons: [
      { text: "1 fl oz (29.6 mL) is about 2 tablespoons \u2014 a small shot." },
      { text: "8 fl oz (236.6 mL) is 1 standard US cup." },
      { text: "12 fl oz (354.9 mL) is a standard soda can." },
      { text: "16 fl oz (473.2 mL) is a US pint or a large coffee cup." },
    ],
    seoContent: `<p>Fluid ounces and milliliters are commonly used for beverages, cooking liquids, and personal care products. US fluid ounces are the standard for liquid measurement in the United States, while milliliters are used internationally.</p>
<h3>Beverage Sizes</h3>
<p>Understanding fluid ounces to milliliters helps when comparing drink sizes internationally. A small coffee might be 8 fl oz (237 mL), a medium 12 fl oz (355 mL), and a large 16 fl oz (473 mL). A 20 fl oz water bottle is 591 mL. A 2-liter soda bottle is about 67.6 fl oz.</p>
<h3>Baby Formula</h3>
<p>Infant formula instructions often specify amounts in fluid ounces, while many baby bottles are marked in milliliters. A 4 fl oz feeding is about 118 mL. A 6 fl oz bottle is about 177 mL. Accurate conversion ensures your baby gets the right amount of nutrition.</p>
<h3>Cocktail Recipes</h3>
<p>Classic cocktail recipes use fluid ounces (1.5 oz for a standard spirit pour, 0.75 oz for a liqueur), while many modern and international bartending resources use milliliters. A 1.5 fl oz standard pour is about 44.4 mL. A 0.75 fl oz measure is about 22.2 mL.</p>`,
    faq: [
      { q: "How many mL is 1 fluid ounce?", a: "One US fluid ounce equals approximately 29.5735 mL." },
      { q: "How many fluid ounces in a liter?", a: "There are approximately 33.814 US fluid ounces in 1 liter." },
      { q: "Is a fluid ounce the same as a weight ounce?", a: "No. A fluid ounce measures volume (how much space a liquid takes up), while an ounce (avoirdupois) measures weight. For water, 1 fl oz weighs approximately 1.043 weight ounces." },
      { q: "How many fl oz in a cup?", a: "There are 8 US fluid ounces in 1 US cup." },
    ],
    relatedSlugs: ["cups-to-ml", "ml-to-cups", "tablespoons-to-ml", "liters-to-gallons", "pints-to-liters"],
  },
  {
    slug: "pints-to-liters",
    fromKey: "pintUS",
    toKey: "liter",
    categoryId: "volume",
    h1: "Pints to Liters Converter \u2014 pt to L",
    title: "Pints to Liters Converter \u2014 pt to L Conversion | EveryFreeTool",
    meta: "Convert US pints to liters instantly. Free online pt to L converter with formula, reference table, and real-world examples. 1 pint = 0.4732 liters.",
    quickAnswers: [
      "1 pint = 0.4732 liters", "1.5 pints = 0.7098 liters", "2 pints = 0.9464 liters",
      "3 pints = 1.4195 liters", "4 pints (1/2 gallon) = 1.8927 liters",
      "5 pints = 2.3659 liters", "6 pints = 2.8391 liters",
      "8 pints (1 gallon) = 3.7854 liters", "10 pints = 4.7318 liters",
    ],
    referenceTable: [
      [0.5, "0.2366"], [1, "0.4732"], [1.5, "0.7098"], [2, "0.9464"], [2.5, "1.183"],
      [3, "1.4195"], [3.5, "1.6561"], [4, "1.8927"], [5, "2.3659"], [6, "2.8391"],
      [7, "3.3123"], [8, "3.7854"], [10, "4.7318"], [12, "5.6781"], [15, "7.0977"],
      [16, "7.5708"], [20, "9.4635"], [24, "11.3562"], [32, "15.1416"], [48, "22.7125"],
    ],
    formulaExplanation: "To convert US pints to liters, multiply the number of pints by 0.473176.",
    workedExamples: [
      "Convert 6 pints to liters: 6 \u00D7 0.473176 = 2.84 liters",
      "Convert a half-gallon (4 pints) to liters: 4 \u00D7 0.473176 = 1.89 liters",
    ],
    reverseNote: "To convert liters to US pints, divide the liters by 0.473176, or multiply by 2.11338.",
    comparisons: [
      { text: "1 US pint (473 mL) is a standard beer glass or a pint of ice cream." },
      { text: "1 UK pint (568 mL) is larger \u2014 about 20% more than a US pint." },
      { text: "2 pints (946 mL) is almost 1 liter." },
      { text: "8 pints (3.785 L) equals 1 US gallon." },
    ],
    seoContent: `<p>The pint is a traditional unit of volume used in the US and UK, particularly for beer, milk, and ice cream. However, the US pint and UK pint are different sizes \u2014 a fact that catches many travelers off guard.</p>
<h3>US Pint vs. UK Pint</h3>
<p>A US pint is 473.176 mL (16 US fluid ounces), while a UK (imperial) pint is 568.261 mL (20 imperial fluid ounces). That\u2019s a 20% difference! A British pint of beer is noticeably larger than an American one. This converter uses US pints \u2014 if you need UK pints, multiply liters by 1.75975.</p>
<h3>Beer and Pub Culture</h3>
<p>In British and Irish pubs, beer is served in pints (568 mL) and half-pints (284 mL). In America, a \"pint\" of draft beer is 16 fl oz (473 mL). In continental Europe, beer is typically served in metric sizes: 250 mL, 330 mL, or 500 mL. Knowing these equivalents helps when ordering abroad.</p>
<h3>Ice Cream</h3>
<p>In the US, ice cream is commonly sold by the pint (473 mL). Premium brands like Ben & Jerry\u2019s are famous for their pint containers. In metric countries, the equivalent is typically a 500 mL tub \u2014 slightly larger than a US pint.</p>`,
    faq: [
      { q: "How many liters in a pint?", a: "One US pint equals approximately 0.4732 liters. One UK pint equals approximately 0.5683 liters." },
      { q: "How many pints in a liter?", a: "There are approximately 2.113 US pints in 1 liter, or about 1.76 UK pints." },
      { q: "Is a US pint the same as a UK pint?", a: "No. A US pint is 473 mL (16 US fl oz) while a UK pint is 568 mL (20 imperial fl oz). The UK pint is about 20% larger." },
      { q: "How many pints in a gallon?", a: "There are 8 US pints in a US gallon, and 8 UK pints in a UK gallon." },
    ],
    relatedSlugs: ["liters-to-gallons", "gallons-to-liters", "cups-to-ml", "fluid-ounces-to-ml", "ml-to-cups"],
  },
];
