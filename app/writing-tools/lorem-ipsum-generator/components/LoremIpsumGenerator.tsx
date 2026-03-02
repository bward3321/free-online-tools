"use client";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";

/* ── types ── */
type Flavor = "classic" | "business" | "tech" | "hipster" | "pirate" | "legal" | "foodie" | "scifi" | "office" | "motivational";
type Unit = "paragraphs" | "sentences" | "words" | "characters";
type OutputFormat = "text" | "html" | "markdown" | "json";

interface Props {
  title: string;
  subtitle: string;
  articleMode?: boolean;
  defaultFlavor?: Flavor;
}

/* ── flavor config ── */
const FLAVORS: { id: Flavor; name: string; emoji: string }[] = [
  { id: "classic", name: "Classic Latin", emoji: "\uD83D\uDCDC" },
  { id: "business", name: "Business", emoji: "\uD83D\uDCBC" },
  { id: "tech", name: "Tech Startup", emoji: "\uD83D\uDE80" },
  { id: "hipster", name: "Hipster", emoji: "\uD83E\uDDD4" },
  { id: "pirate", name: "Pirate", emoji: "\uD83C\uDFF4\u200D\u2620\uFE0F" },
  { id: "legal", name: "Legal", emoji: "\u2696\uFE0F" },
  { id: "foodie", name: "Foodie", emoji: "\uD83C\uDF73" },
  { id: "scifi", name: "Sci-Fi", emoji: "\uD83D\uDE80" },
  { id: "office", name: "Office", emoji: "\uD83C\uDFE2" },
  { id: "motivational", name: "Motivational", emoji: "\u2728" },
];

const SOCIAL_PRESETS: { name: string; chars: number }[] = [
  { name: "Twitter/X", chars: 280 },
  { name: "Meta Description", chars: 160 },
  { name: "Title Tag", chars: 60 },
  { name: "Facebook", chars: 500 },
  { name: "Instagram", chars: 2200 },
  { name: "LinkedIn", chars: 3000 },
  { name: "TikTok", chars: 2200 },
  { name: "YouTube Desc", chars: 5000 },
];

/* ── Classic Lorem Ipsum corpus ── */
const LOREM_OPENING = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const CLASSIC_WORDS = ["lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua","enim","ad","minim","veniam","quis","nostrud","exercitation","ullamco","laboris","nisi","aliquip","ex","ea","commodo","consequat","duis","aute","irure","in","reprehenderit","voluptate","velit","esse","cillum","fugiat","nulla","pariatur","excepteur","sint","occaecat","cupidatat","non","proident","sunt","culpa","qui","officia","deserunt","mollit","anim","id","est","laborum","at","vero","eos","accusamus","iusto","odio","dignissimos","ducimus","blanditiis","praesentium","voluptatum","deleniti","atque","corrupti","quos","dolores","quas","molestias","nemo","ipsam","voluptatem","quia","voluptas","aspernatur","aut","odit","fugit","consequuntur","magni","ratione","sequi","nesciunt","neque","porro","quisquam","dolorem","adipisci","numquam","eius","modi","tempora","incidunt","magnam","quaerat","minima","nostrum","exercitationem","ullam","corporis","suscipit","laboriosam","autem","vel","eum","fugiat","quo","nihil","impedit","minus","quod","maxime","placeat","facere","possimus","omnis","assumenda","repellendus","temporibus","quibusdam","officiis","debitis","rerum","necessitatibus","saepe","eveniet","voluptates","repudiandae","recusandae","itaque","earum","hic","tenetur","sapiente","delectus","reiciendis","voluptatibus","maiores","alias","perferendis","doloribus","asperiores","repellat","provident","similique","mollitia","animi","harum","quidem","inventore","veritatis","quasi","architecto","beatae","vitae","dicta","explicabo"];

/* ── Word banks for each flavor ── */
const BANKS: Record<Exclude<Flavor, "classic">, { nouns: string[]; adjectives: string[]; verbs: string[]; phrases: string[] }> = {
  business: {
    nouns: ["synergy","stakeholder","deliverables","ecosystem","paradigm","pipeline","bandwidth","ROI","KPIs","alignment","initiative","framework","strategy","revenue","growth","quarter","metrics","portfolio","vertical","platform","infrastructure","innovation","competency","transformation","optimization","acquisition","retention","engagement","conversion","analytics","benchmark","compliance","governance","scalability","workflow","efficiency","integration","architecture","milestone","deadline"],
    adjectives: ["scalable","cross-functional","mission-critical","data-driven","customer-centric","holistic","robust","strategic","proactive","seamless","next-generation","end-to-end","agile","innovative","disruptive","sustainable","actionable","comprehensive","dynamic","enterprise-grade","high-impact","results-oriented","forward-thinking","best-in-class","cutting-edge"],
    verbs: ["leverage","optimize","streamline","empower","accelerate","align","drive","deliver","transform","execute","implement","maximize","facilitate","spearhead","orchestrate","cultivate","amplify","consolidate","monetize","prioritize"],
    phrases: ["value proposition","go-to-market strategy","operational excellence","thought leadership","best practices","bottom line","deep dive","core competency","market penetration","action items","circle back","low-hanging fruit","moving the needle","quarterly objectives","fiscal responsibility"],
  },
  tech: {
    nouns: ["MVP","iteration","sprint","pipeline","deployment","microservice","API","endpoint","cluster","container","algorithm","repository","codebase","database","schema","cache","latency","throughput","scalability","uptime","downtime","refactor","prototype","architecture","stack","framework","module","dependency","runtime","instance","sandbox","webhook","token","payload","middleware"],
    adjectives: ["cloud-native","open-source","serverless","distributed","asynchronous","real-time","fault-tolerant","horizontally-scalable","event-driven","containerized","decoupled","modular","headless","full-stack","zero-downtime","blazingly-fast","type-safe","production-ready","battle-tested","lightweight"],
    verbs: ["ship","deploy","iterate","scale","pivot","disrupt","refactor","optimize","containerize","instrument","deprecate","provision","bootstrap","migrate","automate","orchestrate","parallelize","serialize","index","benchmark"],
    phrases: ["product-market fit","hockey stick growth","burn rate","series A funding","growth hacking","feature flag","tech debt","continuous deployment","breaking change","pull request","code review","pair programming","rubber duck debugging","yak shaving","bikeshedding"],
  },
  hipster: {
    nouns: ["pour-over","vinyl","typewriter","sourdough","kombucha","matcha","terrazzo","succulent","macramé","polaroid","zine","tote bag","fixie","flannel","beanie","latte","espresso","aperitif","charcuterie","aesthetic","vibe","essence","artisan","craftsperson","collective","workshop","gallery","studio","bodega","rooftop"],
    adjectives: ["artisanal","small-batch","craft","single-origin","cold-brew","vintage","reclaimed","bespoke","curated","sustainable","ethically-sourced","handcrafted","organic","locally-sourced","farm-to-table","minimalist","plant-based","upcycled","mid-century","slow-living","intentional","aesthetic","conscious","elevated","raw"],
    verbs: ["curate","ferment","forage","thrift","upcycle","cultivate","infuse","restore","distill","roast","brew","harvest","press","pickle","smoke","age","source","design","create","craft"],
    phrases: ["Edison bulb lighting","exposed brick walls","mason jar cocktails","avocado toast","capsule wardrobe","slow living","cottage core","digital detox","mindful consumption","zero waste lifestyle","golden hour photography","film over digital","analog warmth","third wave coffee","natural wine"],
  },
  pirate: {
    nouns: ["doubloons","booty","treasure","grog","rum","cutlass","cannon","galleon","frigate","gangplank","mast","rigging","anchor","helm","compass","sextant","spyglass","plank","barnacle","crow\u2019s nest","port","starboard","bilge","hold","deck","sail","flag","parrot","eye patch","peg leg","Jolly Roger","kraken","maelstrom","cove","lagoon"],
    adjectives: ["scurvy","barnacled","fearsome","treacherous","uncharted","cursed","legendary","marooned","plundered","swashbuckling","briny","storm-tossed","sun-bleached","battle-scarred","weathered","perilous","mutinous","ghostly","hidden","ancient"],
    verbs: ["plunder","pillage","sail","navigate","maroon","keelhaul","board","loot","commandeer","swab","hoist","fire","broadside","chart","anchor","beach","scuttle","raid","mutiny","surrender"],
    phrases: ["shiver me timbers","Davy Jones\u2019 locker","walk the plank","batten down the hatches","dead men tell no tales","pieces of eight","X marks the spot","hoist the colors","weigh anchor","all hands on deck","blow the man down","full sail ahead","abandon ship","take no quarter","splice the mainbrace"],
  },
  legal: {
    nouns: ["jurisdiction","arbitration","liability","indemnification","covenant","stipulation","addendum","amendment","statute","precedent","tort","negligence","injunction","deposition","plaintiff","defendant","counsel","waiver","severability","lien","probate","equity","tenure","dissolution","subpoena","damages","fiduciary","remuneration","clause","provision","obligation","settlement","adjudication","tribunal","decree"],
    adjectives: ["aforementioned","binding","enforceable","irrevocable","pursuant","notwithstanding","hereinafter","foregoing","substantive","procedural","fiduciary","statutory","contractual","regulatory","judicial","constitutional","lawful","equitable","material","consequential"],
    verbs: ["indemnify","stipulate","adjudicate","arbitrate","litigate","amend","ratify","enforce","dissolve","convene","petition","subpoena","depose","testify","certify","attest","warrant","represent","covenant","waive"],
    phrases: ["force majeure","breach of contract","due diligence","intellectual property","non-disclosure agreement","non-compete clause","burden of proof","beyond reasonable doubt","cease and desist","terms and conditions","good faith","act of God","in perpetuity","without prejudice","to the fullest extent permitted by law"],
  },
  foodie: {
    nouns: ["reduction","emulsion","ganache","confit","roux","béchamel","soufflé","tartare","ceviche","prosciutto","burrata","truffle","saffron","wagyu","broth","glaze","coulis","compote","chutney","aioli","gastrique","velouté","duxelles","gremolata","pesto","tapenade","salsa","vinaigrette","marinade","brine"],
    adjectives: ["caramelized","braised","seared","charred","pickled","fermented","smoked","infused","drizzled","flash-seared","slow-roasted","deglazed","crispy","silky","velvety","tangy","umami-rich","aromatic","seasonal","heirloom","foraged","hand-rolled","wood-fired","stone-ground","cold-pressed"],
    verbs: ["sauté","braise","caramelize","deglaze","julienne","chiffonade","blanch","temper","fold","whisk","reduce","emulsify","roast","grill","poach","cure","smoke","ferment","plate","garnish"],
    phrases: ["mise en place","farm to table","tasting menu","amuse-bouche","nose to tail","slow food movement","seasonal ingredients","barrel-aged perfection","al dente texture","umami bomb","mouthfeel sensation","flavor profile","culinary technique","sous vide precision","Michelin-worthy presentation"],
  },
  scifi: {
    nouns: ["hyperspace","warp drive","singularity","nebula","supernova","hologram","android","cyborg","tachyon","antimatter","starship","exoplanet","void","parsec","photon","quasar","asteroid","galaxy","dimension","portal","matrix","reactor","shield","conduit","beacon","probe","colony","fleet","armada","outpost"],
    adjectives: ["quantum","interstellar","subspace","cryogenic","xenomorphic","sentient","photonic","gravitational","transdimensional","cybernetic","nanoscale","autonomous","terraformed","bioluminescent","electromagnetic","crystalline","synthetic","temporal","dimensional","plasma-infused"],
    verbs: ["terraform","warp","transmit","decrypt","scan","deploy","calibrate","activate","interface","orbit","colonize","synthesize","teleport","decode","modulate","harness","navigate","replicate","ionize","converge"],
    phrases: ["first contact","time dilation","neural implant","stellar cartography","artificial gravity","light speed","galactic senate","clone army","deflector shield","transporter beam","fusion reactor","parallel universe","wormhole travel","cryogenic stasis","alien civilization"],
  },
  office: {
    nouns: ["standup","retro","post-mortem","all-hands","town hall","skip-level","one-on-one","blocker","parking lot","action item","swim lane","headcount","capacity","sprint","backlog","roadmap","stakeholder","deliverable","timeline","deadline","milestone","bandwidth","calendar","meeting","agenda","minutes","deck","slide","spreadsheet","dashboard"],
    adjectives: ["cross-functional","high-priority","time-sensitive","mission-critical","customer-facing","revenue-generating","team-building","goal-oriented","results-driven","detail-oriented","proactive","responsive","collaborative","transparent","accountable","scalable","sustainable","iterative","strategic","tactical"],
    verbs: ["circle back","touch base","table","unpack","drill down","flag","escalate","onboard","offboard","sync","align","prioritize","delegate","schedule","streamline","facilitate","brainstorm","workshop","ideate","iterate"],
    phrases: ["put a pin in it","move the needle","low-hanging fruit","boil the ocean","take this offline","run it up the flagpole","peel the onion","at the end of the day","on my radar","net-net","bake this in","open the kimono","helicopter view","T-shirt sizing","capacity planning"],
  },
  motivational: {
    nouns: ["journey","alignment","purpose","abundance","transformation","breakthrough","peace","acceptance","gratitude","affirmation","visualization","intention","potential","self","space","soul","passion","ritual","flow","resilience","mindset","energy","vibration","growth","empowerment","clarity","wisdom","strength","courage","vision"],
    adjectives: ["authentic","purpose-driven","limitless","sacred","radical","mindful","present","abundant","transformative","empowering","courageous","intentional","resilient","illuminated","awakened","centered","grounded","elevated","infinite","divine"],
    verbs: ["manifest","embrace","cultivate","honor","ignite","awaken","align","transform","transcend","illuminate","nurture","empower","radiate","breathe","surrender","visualize","affirm","attract","elevate","flourish"],
    phrases: ["higher self","growth mindset","abundance mindset","morning ritual","flow state","peak performance","self-actualization","present moment","radical acceptance","inner peace","authentic self","sacred space","life design","soul purpose","limitless potential"],
  },
};

/* ── heading banks for "Include headings" option ── */
const HEADINGS: Record<Exclude<Flavor, "classic">, string[]> = {
  business: ["Strategic Vision","Quarterly Results","Market Opportunity","Growth Trajectory","Operational Excellence","Core Values","Executive Summary","Performance Metrics"],
  tech: ["System Architecture","Deployment Pipeline","Technical Overview","API Reference","Performance Benchmarks","Migration Guide","Release Notes","Infrastructure Design"],
  hipster: ["Our Philosophy","The Process","Sourcing & Origins","Community","Studio Notes","Behind the Scenes","Seasonal Collection","Workshop Events"],
  pirate: ["The Voyage Ahead","Crew Manifest","Treasure Map","Ship's Log","Battle Plans","Port of Call","The Captain's Orders","Legends of the Sea"],
  legal: ["Definitions","Scope and Purpose","Terms of Agreement","Limitations of Liability","Dispute Resolution","Governing Law","General Provisions","Amendments"],
  foodie: ["The Menu","Chef's Selection","Seasonal Highlights","Wine Pairing Notes","Kitchen Philosophy","Ingredient Spotlight","Tasting Notes","Culinary Traditions"],
  scifi: ["Mission Briefing","Star System Catalog","Research Findings","Fleet Communications","Exploration Log","Xenobiology Report","Engineering Updates","Colony Status"],
  office: ["Meeting Agenda","Action Items","Quarterly Goals","Team Updates","Project Timeline","Resource Allocation","Key Metrics","Next Steps"],
  motivational: ["Your Journey Begins","Finding Inner Strength","The Path Forward","Daily Practice","Unlocking Potential","Embracing Change","Mindful Living","Gratitude & Growth"],
};
const CLASSIC_HEADINGS = ["De Finibus Bonorum et Malorum","Sed Ut Perspiciatis","At Vero Eos et Accusamus","Nemo Enim Ipsam","Quis Autem Vel","Temporibus Autem","Ut Enim Ad Minima"];

/* ── sentence builder ── */
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, shuffled.length));
}

function buildSentence(bank: { nouns: string[]; adjectives: string[]; verbs: string[]; phrases: string[] }): string {
  const templates = [
    () => `The ${pick(bank.adjectives)} ${pick(bank.nouns)} ${pick(bank.verbs)}s ${pick(bank.adjectives)} ${pick(bank.nouns)} across the ${pick(bank.nouns)}.`,
    () => `By ${pick(bank.verbs)}ing ${pick(bank.nouns)}, we deliver ${pick(bank.adjectives)} ${pick(bank.nouns)} that drives ${pick(bank.nouns)}.`,
    () => `${pick(bank.phrases).split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")} remains essential for ${pick(bank.adjectives)} ${pick(bank.nouns)}.`,
    () => `Every ${pick(bank.adjectives)} ${pick(bank.nouns)} requires ${pick(bank.adjectives)} ${pick(bank.nouns)} and ${pick(bank.nouns)}.`,
    () => `We ${pick(bank.verbs)} ${pick(bank.nouns)} to ${pick(bank.verbs)} ${pick(bank.adjectives)} ${pick(bank.nouns)}.`,
    () => `${pick(bank.adjectives).charAt(0).toUpperCase() + pick(bank.adjectives).slice(1)} ${pick(bank.nouns)} enables ${pick(bank.nouns)} and ${pick(bank.nouns)} at scale.`,
    () => `Our approach to ${pick(bank.nouns)} combines ${pick(bank.adjectives)} ${pick(bank.nouns)} with ${pick(bank.phrases)}.`,
    () => `The team focused on ${pick(bank.verbs)}ing ${pick(bank.adjectives)} ${pick(bank.nouns)}, resulting in stronger ${pick(bank.nouns)}.`,
    () => `Consider how ${pick(bank.adjectives)} ${pick(bank.nouns)} can ${pick(bank.verbs)} your ${pick(bank.nouns)}.`,
    () => `When ${pick(bank.verbs)}ing ${pick(bank.nouns)}, ${pick(bank.adjectives)} ${pick(bank.nouns)} becomes ${pick(bank.adjectives)}.`,
    () => `${pick(bank.phrases).charAt(0).toUpperCase() + pick(bank.phrases).slice(1)} is ${pick(bank.adjectives)} and ${pick(bank.adjectives)}.`,
    () => `Through ${pick(bank.adjectives)} ${pick(bank.nouns)}, the ${pick(bank.nouns)} will ${pick(bank.verbs)} ${pick(bank.nouns)}.`,
    () => `It is clear that ${pick(bank.adjectives)} ${pick(bank.nouns)} and ${pick(bank.nouns)} are intertwined.`,
    () => `The ${pick(bank.nouns)} of ${pick(bank.adjectives)} ${pick(bank.nouns)} cannot be understated.`,
    () => `${pick(bank.verbs).charAt(0).toUpperCase() + pick(bank.verbs).slice(1)}ing ${pick(bank.nouns)} creates ${pick(bank.adjectives)} ${pick(bank.nouns)} for the entire ${pick(bank.nouns)}.`,
  ];
  return pick(templates)();
}

function buildClassicSentence(): string {
  const len = 6 + Math.floor(Math.random() * 14);
  const words = pickN(CLASSIC_WORDS, len);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

/* ── main generate function ── */
function generateText(
  flavor: Flavor, count: number, unit: Unit, startWithLorem: boolean,
): string[] {
  const sentencesNeeded = unit === "paragraphs" ? count * 5 : unit === "sentences" ? count : unit === "words" ? Math.ceil(count / 12) + 2 : Math.ceil(count / 60) + 2;
  const usedSentences = new Set<string>();
  const buildOne = (): string => {
    if (flavor === "classic") return buildClassicSentence();
    const bank = BANKS[flavor];
    let s = buildSentence(bank);
    let tries = 0;
    while (usedSentences.has(s) && tries < 20) { s = buildSentence(bank); tries++; }
    usedSentences.add(s);
    return s;
  };

  const sentences: string[] = [];
  if (flavor === "classic" && startWithLorem) sentences.push(LOREM_OPENING);
  while (sentences.length < sentencesNeeded) sentences.push(buildOne());

  if (unit === "sentences") return [sentences.slice(0, count).join(" ")];

  if (unit === "words") {
    const allWords = sentences.join(" ").split(/\s+/);
    return [allWords.slice(0, count).join(" ")];
  }

  if (unit === "characters") {
    let text = sentences.join(" ");
    if (text.length > count) {
      text = text.slice(0, count);
      const lastSpace = text.lastIndexOf(" ");
      if (lastSpace > count - 20) text = text.slice(0, lastSpace);
    }
    return [text.trim()];
  }

  // paragraphs
  const paragraphs: string[] = [];
  let idx = 0;
  for (let p = 0; p < count; p++) {
    const pLen = 3 + Math.floor(Math.random() * 5);
    const pSentences = sentences.slice(idx, idx + pLen);
    idx += pLen;
    if (pSentences.length === 0) {
      for (let i = 0; i < pLen; i++) pSentences.push(buildOne());
    }
    paragraphs.push(pSentences.join(" "));
  }
  return paragraphs;
}

/* ── component ── */
export default function LoremIpsumGenerator({ title, subtitle, articleMode, defaultFlavor }: Props) {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const accent = "#059669";
  const bg = isDark ? "#0f172a" : "#F8F7F5";
  const surface = isDark ? "#1e293b" : "#ffffff";
  const text = isDark ? "#e2e8f0" : "#1a1a2e";
  const textMuted = isDark ? "#94a3b8" : "#6b7280";
  const border = isDark ? "#334155" : "#e5e7eb";

  const [flavor, setFlavor] = useState<Flavor>(defaultFlavor || "classic");
  const [count, setCount] = useState(5);
  const [unit, setUnit] = useState<Unit>("paragraphs");
  const [startLorem, setStartLorem] = useState(true);
  const [includeHtml, setIncludeHtml] = useState(false);
  const [includeHeadings, setIncludeHeadings] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [socialLabel, setSocialLabel] = useState("");
  const [toast, setToast] = useState("");
  const [fadeKey, setFadeKey] = useState(0);
  const outputRef = useRef<HTMLDivElement>(null);

  const doGenerate = useCallback((f?: Flavor, c?: number, u?: Unit) => {
    const fl = f ?? flavor;
    const ct = c ?? count;
    const un = u ?? unit;
    const result = generateText(fl, ct, un, fl === "classic" && startLorem);
    setOutput(result);
    setFadeKey(k => k + 1);
  }, [flavor, count, unit, startLorem]);

  // Generate on mount
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      doGenerate();
    }
  }, [doGenerate]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2000); };

  const plainText = useMemo(() => output.join("\n\n"), [output]);
  const htmlText = useMemo(() => {
    const headingList = flavor === "classic" ? CLASSIC_HEADINGS : HEADINGS[flavor];
    return output.map((p, i) => {
      let heading = "";
      if (includeHeadings && i > 0 && i % 2 === 0 && headingList) {
        const tag = i % 4 === 0 ? "h2" : "h3";
        heading = `<${tag}>${pick(headingList)}</${tag}>\n`;
      }
      return heading + `<p>${p}</p>`;
    }).join("\n\n");
  }, [output, includeHeadings, flavor]);
  const markdownText = useMemo(() => {
    const headingList = flavor === "classic" ? CLASSIC_HEADINGS : HEADINGS[flavor];
    return output.map((p, i) => {
      let heading = "";
      if (includeHeadings && i > 0 && i % 2 === 0 && headingList) {
        const prefix = i % 4 === 0 ? "## " : "### ";
        heading = prefix + pick(headingList) + "\n\n";
      }
      return heading + p;
    }).join("\n\n");
  }, [output, includeHeadings, flavor]);
  const jsonText = useMemo(() => JSON.stringify(output, null, 2), [output]);

  const displayText = includeHtml ? htmlText : plainText;

  const wordCount = useMemo(() => plainText.trim() ? plainText.trim().split(/\s+/).length : 0, [plainText]);
  const charCount = useMemo(() => plainText.length, [plainText]);

  const copy = async (text: string, msg: string) => {
    try { await navigator.clipboard.writeText(text); showToast(msg); } catch { showToast("Copy failed"); }
  };

  const download = () => {
    const blob = new Blob([plainText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "lorem-ipsum.txt"; a.click();
    URL.revokeObjectURL(url);
    showToast("Downloaded!");
  };

  const applySocialPreset = (preset: { name: string; chars: number }) => {
    setUnit("characters");
    setCount(preset.chars);
    setSocialLabel(`Generated for ${preset.name} (${preset.chars.toLocaleString()} characters)`);
    const result = generateText(flavor, preset.chars, "characters", flavor === "classic" && startLorem);
    setOutput(result);
    setFadeKey(k => k + 1);
  };

  const handleGenerate = () => { setSocialLabel(""); doGenerate(); };

  const btnCls = "px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors";

  return (
    <div className="min-h-screen" style={{ backgroundColor: bg, color: text }}>
      <div className="max-w-[900px] mx-auto px-4 py-6">
        {!articleMode && (
          <>
            <nav className="flex items-center gap-1 text-sm mb-4" style={{ color: textMuted }}>
              <a href="/" className="hover:underline" style={{ color: accent }}>Home</a><span>/</span><span>Writing Tools</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
            <p className="text-lg mb-6" style={{ color: textMuted }}>{subtitle}</p>
          </>
        )}
        {articleMode && <div className="mb-6" />}

        {/* Flavor pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4" style={{ scrollbarWidth: "thin" }}>
          {FLAVORS.map(f => (
            <button key={f.id} onClick={() => { setFlavor(f.id); setSocialLabel(""); }}
              className="flex-shrink-0 px-3 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors"
              style={{
                backgroundColor: flavor === f.id ? accent : surface,
                color: flavor === f.id ? "#fff" : textMuted,
                border: `1px solid ${flavor === f.id ? accent : border}`,
              }}>
              {f.emoji} {f.name}
            </button>
          ))}
        </div>

        {/* Controls row */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold" style={{ color: textMuted }}>Amount:</label>
            <input type="number" min={1} max={50} value={count}
              onChange={e => { setCount(Math.max(1, Math.min(50, +e.target.value || 1))); setSocialLabel(""); }}
              className="w-20 rounded-lg border p-2 text-center text-sm" style={{ backgroundColor: bg, borderColor: border, color: text }} />
          </div>
          <select value={unit} onChange={e => { setUnit(e.target.value as Unit); setSocialLabel(""); }}
            className="rounded-lg border p-2 text-sm" style={{ backgroundColor: bg, borderColor: border, color: text }}>
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
            <option value="characters">Characters</option>
          </select>
          <button onClick={handleGenerate}
            className="px-5 py-2 rounded-lg text-sm font-bold text-white transition-colors"
            style={{ backgroundColor: accent }}>
            Generate
          </button>
        </div>

        {unit === "characters" && (
          <p className="text-sm mb-3" style={{ color: textMuted }}>Output will be truncated to the exact character count.</p>
        )}

        {/* Options toggles */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {flavor === "classic" && (
            <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: textMuted }}>
              <input type="checkbox" checked={startLorem} onChange={e => setStartLorem(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 rounded" />
              Start with &ldquo;Lorem ipsum...&rdquo;
            </label>
          )}
          <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: textMuted }}>
            <input type="checkbox" checked={includeHtml} onChange={e => setIncludeHtml(e.target.checked)}
              className="w-4 h-4 accent-emerald-600 rounded" />
            Include HTML tags
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: textMuted }}>
            <input type="checkbox" checked={includeHeadings} onChange={e => setIncludeHeadings(e.target.checked)}
              className="w-4 h-4 accent-emerald-600 rounded" />
            Include headings
          </label>
        </div>

        {/* Social presets */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="font-semibold text-sm self-center" style={{ color: textMuted }}>Presets:</span>
          {SOCIAL_PRESETS.map(p => (
            <button key={p.name} onClick={() => applySocialPreset(p)}
              className="px-2.5 py-1 rounded-full font-medium text-sm"
              style={{ backgroundColor: surface, color: textMuted, border: `1px solid ${border}` }}>
              {p.name}
            </button>
          ))}
        </div>

        {/* Social label */}
        {socialLabel && (
          <p className="font-semibold text-sm mb-2" style={{ color: accent }}>{socialLabel}</p>
        )}

        {/* Output area */}
        <div ref={outputRef} key={fadeKey} className="rounded-xl border p-5 mb-4 relative"
          style={{
            backgroundColor: isDark ? "#1e293b" : "#f9fafb",
            borderColor: border,
            fontSize: "16px",
            lineHeight: "1.7",
            minHeight: "200px",
            animation: "fadeIn 0.3s ease",
          }}>
          <style dangerouslySetInnerHTML={{ __html: "@keyframes fadeIn { from { opacity: 0.4; } to { opacity: 1; } }" }} />
          <div className="absolute top-3 right-4 text-sm" style={{ color: textMuted }}>
            {wordCount.toLocaleString()} words &middot; {charCount.toLocaleString()} characters
          </div>
          <div className="pt-4" style={{ color: text, fontFamily: includeHtml ? "'JetBrains Mono', monospace" : "inherit", fontSize: includeHtml ? "14px" : "16px", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {displayText || <span style={{ color: textMuted }}>Click Generate to create text.</span>}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => copy(plainText, "Copied to clipboard!")} className={btnCls} style={{ backgroundColor: accent, color: "#fff" }}>Copy Text</button>
          <button onClick={() => copy(htmlText, "HTML copied!")} className={btnCls} style={{ backgroundColor: surface, color: text, border: `1px solid ${border}` }}>Copy HTML</button>
          <button onClick={() => copy(markdownText, "Markdown copied!")} className={btnCls} style={{ backgroundColor: surface, color: text, border: `1px solid ${border}` }}>Copy Markdown</button>
          <button onClick={() => copy(jsonText, "JSON copied!")} className={btnCls} style={{ backgroundColor: surface, color: text, border: `1px solid ${border}` }}>Copy JSON</button>
          <button onClick={download} className={btnCls} style={{ backgroundColor: surface, color: text, border: `1px solid ${border}` }}>Download .txt</button>
          <button onClick={() => { setOutput([]); setSocialLabel(""); }} className={btnCls} style={{ backgroundColor: surface, color: "#DC2626", border: `1px solid ${border}` }}>Clear</button>
        </div>

        {/* ═══ SEO: FAQs ═══ */}
        {!articleMode && (
          <section className="mb-8">
            <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {[
                ["Is this Lorem Ipsum generator free?", "Completely free, no signup, no limits. Everything runs in your browser — nothing is sent to any server. Generate as much text as you need."],
                ["How is this different from lipsum.com?", "This generator offers 10 text flavors beyond classic Latin, including Business, Tech, Hipster, Pirate, Legal, and more. It also outputs in multiple formats (HTML, Markdown, JSON) and includes social media character presets."],
                ["Can I use the generated text commercially?", "Yes. All generated text is random placeholder content with no copyright restrictions. Use it freely in any project — personal, commercial, or open-source."],
                ["What output formats are available?", "Four formats: Plain Text, HTML (with <p> tags), Markdown, and JSON (array of paragraphs). You can also toggle HTML tags and headings in the output."],
                ["How many paragraphs can I generate at once?", "Up to 50 paragraphs, sentences, or words. For character-based generation, you can set any count up to 50,000 characters."],
                ["Does the generator work offline?", "Yes. Once the page loads, all text generation happens in your browser with zero external API calls. It works without an internet connection."],
              ].map(([q, a]) => (
                <details key={q} className="rounded-xl border" style={{ backgroundColor: surface, borderColor: border }}>
                  <summary className="p-4 cursor-pointer font-semibold" style={{ fontSize: "16px" }}>{q}</summary>
                  <p className="px-4 pb-4" style={{ fontSize: "16px", color: textMuted }}>{a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* ═══ Related Tools ═══ */}
        <section className="mb-8">
          <h2 className="text-[22px] sm:text-[28px] font-bold mb-4">More Free Writing & Text Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              ["Word Counter", "/writing-tools/word-counter", "Count words, characters, sentences & reading time"],
              ["Markdown Editor", "/writing-tools/markdown-editor", "Write and preview Markdown with live formatting"],
              ["JSON Formatter", "/developer-tools/json-formatter", "Format and validate JSON data"],
              ["Password Generator", "/utility-tools/password-generator", "Generate strong, secure passwords"],
            ].map(([name, href, desc]) => (
              <a key={name} href={href} className="block rounded-xl border p-4 hover:shadow-md transition-shadow" style={{ backgroundColor: surface, borderColor: border }}>
                <h3 className="font-semibold mb-1" style={{ fontSize: "16px" }}>{name}</h3>
                <p style={{ fontSize: "15px", color: textMuted }}>{desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-6 pb-8 border-t" style={{ borderColor: border, color: textMuted, fontSize: "15px" }}>
          <p>&copy; {new Date().getFullYear()} <a href="/" style={{ color: accent }} className="hover:underline">EveryFreeTool.com</a> &mdash; Free tools, no signup, no nonsense.</p>
        </footer>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg shadow-lg text-sm font-semibold" style={{ backgroundColor: accent, color: "#fff" }}>
          {toast}
        </div>
      )}
    </div>
  );
}
