export type Category =
  | "streaming"
  | "music"
  | "ai"
  | "cloud"
  | "gaming"
  | "productivity"
  | "fitness"
  | "food"
  | "news"
  | "shopping";

export type CancelDifficulty = "easy" | "medium" | "hard";

export interface Subscription {
  id: string;
  name: string;
  plan: string;
  price: number;
  billingCycle: "monthly" | "yearly";
  category: Category;
  icon: string;
  color: string;
  popularity: number;
  cancelDifficulty: CancelDifficulty;
}

export const CATEGORIES: { key: Category | "all"; label: string; icon: string }[] = [
  { key: "all", label: "All", icon: "📋" },
  { key: "streaming", label: "Streaming", icon: "🎬" },
  { key: "music", label: "Music & Audio", icon: "🎵" },
  { key: "ai", label: "AI Tools", icon: "🤖" },
  { key: "cloud", label: "Cloud & Storage", icon: "☁️" },
  { key: "gaming", label: "Gaming", icon: "🎮" },
  { key: "productivity", label: "Productivity", icon: "⚡" },
  { key: "fitness", label: "Fitness & Health", icon: "💪" },
  { key: "food", label: "Food & Delivery", icon: "🍔" },
  { key: "news", label: "News & Reading", icon: "📰" },
  { key: "shopping", label: "Shopping", icon: "🛒" },
];

export const SUBSCRIPTIONS: Subscription[] = [
  // ─── STREAMING VIDEO ───
  { id: "netflix-standard", name: "Netflix", plan: "Standard (No Ads)", price: 17.99, billingCycle: "monthly", category: "streaming", icon: "🎬", color: "#E50914", popularity: 95, cancelDifficulty: "easy" },
  { id: "netflix-ads", name: "Netflix", plan: "Standard with Ads", price: 7.99, billingCycle: "monthly", category: "streaming", icon: "🎬", color: "#E50914", popularity: 70, cancelDifficulty: "easy" },
  { id: "netflix-premium", name: "Netflix", plan: "Premium (4K)", price: 24.99, billingCycle: "monthly", category: "streaming", icon: "🎬", color: "#E50914", popularity: 60, cancelDifficulty: "easy" },
  { id: "disney-hulu-ads", name: "Disney+ / Hulu", plan: "With Ads", price: 12.99, billingCycle: "monthly", category: "streaming", icon: "🏰", color: "#113CCF", popularity: 75, cancelDifficulty: "medium" },
  { id: "disney-hulu-noads", name: "Disney+ / Hulu", plan: "No Ads", price: 19.99, billingCycle: "monthly", category: "streaming", icon: "🏰", color: "#113CCF", popularity: 55, cancelDifficulty: "medium" },
  { id: "disney-bundle-ads", name: "Disney+ / Hulu / ESPN", plan: "Bundle (Ads)", price: 20.00, billingCycle: "monthly", category: "streaming", icon: "🏰", color: "#113CCF", popularity: 50, cancelDifficulty: "medium" },
  { id: "disney-bundle-noads", name: "Disney+ / Hulu / ESPN", plan: "Bundle (No Ads)", price: 30.00, billingCycle: "monthly", category: "streaming", icon: "🏰", color: "#113CCF", popularity: 35, cancelDifficulty: "medium" },
  { id: "hbo-ads", name: "HBO Max", plan: "With Ads", price: 10.99, billingCycle: "monthly", category: "streaming", icon: "📺", color: "#5822B4", popularity: 65, cancelDifficulty: "easy" },
  { id: "hbo-noads", name: "HBO Max", plan: "No Ads", price: 18.49, billingCycle: "monthly", category: "streaming", icon: "📺", color: "#5822B4", popularity: 50, cancelDifficulty: "easy" },
  { id: "hbo-premium", name: "HBO Max", plan: "Premium (4K)", price: 22.99, billingCycle: "monthly", category: "streaming", icon: "📺", color: "#5822B4", popularity: 30, cancelDifficulty: "easy" },
  { id: "amazon-prime", name: "Amazon Prime", plan: "Includes Video", price: 14.99, billingCycle: "monthly", category: "streaming", icon: "📦", color: "#FF9900", popularity: 92, cancelDifficulty: "medium" },
  { id: "prime-video", name: "Prime Video", plan: "Standalone", price: 8.99, billingCycle: "monthly", category: "streaming", icon: "▶️", color: "#00A8E1", popularity: 40, cancelDifficulty: "easy" },
  { id: "apple-tv", name: "Apple TV+", plan: "Individual", price: 12.99, billingCycle: "monthly", category: "streaming", icon: "🍎", color: "#000000", popularity: 55, cancelDifficulty: "easy" },
  { id: "peacock-ads", name: "Peacock", plan: "Premium (Ads)", price: 10.99, billingCycle: "monthly", category: "streaming", icon: "🦚", color: "#000000", popularity: 45, cancelDifficulty: "easy" },
  { id: "peacock-noads", name: "Peacock", plan: "Premium Plus (No Ads)", price: 16.99, billingCycle: "monthly", category: "streaming", icon: "🦚", color: "#000000", popularity: 25, cancelDifficulty: "easy" },
  { id: "paramount-ads", name: "Paramount+", plan: "Essential (Ads)", price: 8.99, billingCycle: "monthly", category: "streaming", icon: "⛰️", color: "#0164FF", popularity: 40, cancelDifficulty: "easy" },
  { id: "paramount-noads", name: "Paramount+", plan: "Premium (No Ads)", price: 13.99, billingCycle: "monthly", category: "streaming", icon: "⛰️", color: "#0164FF", popularity: 30, cancelDifficulty: "easy" },
  { id: "hulu-live", name: "Hulu + Live TV", plan: "Live TV", price: 90.00, billingCycle: "monthly", category: "streaming", icon: "📡", color: "#1CE783", popularity: 30, cancelDifficulty: "medium" },
  { id: "youtube-tv", name: "YouTube TV", plan: "Base Plan", price: 82.99, billingCycle: "monthly", category: "streaming", icon: "📺", color: "#FF0000", popularity: 35, cancelDifficulty: "easy" },
  { id: "crunchyroll-fan", name: "Crunchyroll", plan: "Fan", price: 10.00, billingCycle: "monthly", category: "streaming", icon: "🎌", color: "#F47521", popularity: 25, cancelDifficulty: "easy" },
  { id: "crunchyroll-mega", name: "Crunchyroll", plan: "Mega Fan", price: 14.00, billingCycle: "monthly", category: "streaming", icon: "🎌", color: "#F47521", popularity: 15, cancelDifficulty: "easy" },

  // ─── MUSIC & AUDIO ───
  { id: "spotify-individual", name: "Spotify", plan: "Premium Individual", price: 12.99, billingCycle: "monthly", category: "music", icon: "🎵", color: "#1DB954", popularity: 85, cancelDifficulty: "easy" },
  { id: "spotify-duo", name: "Spotify", plan: "Premium Duo", price: 19.00, billingCycle: "monthly", category: "music", icon: "🎵", color: "#1DB954", popularity: 30, cancelDifficulty: "easy" },
  { id: "spotify-family", name: "Spotify", plan: "Premium Family", price: 22.00, billingCycle: "monthly", category: "music", icon: "🎵", color: "#1DB954", popularity: 45, cancelDifficulty: "easy" },
  { id: "apple-music", name: "Apple Music", plan: "Individual", price: 10.99, billingCycle: "monthly", category: "music", icon: "🎶", color: "#FC3C44", popularity: 60, cancelDifficulty: "easy" },
  { id: "apple-music-family", name: "Apple Music", plan: "Family", price: 16.99, billingCycle: "monthly", category: "music", icon: "🎶", color: "#FC3C44", popularity: 35, cancelDifficulty: "easy" },
  { id: "youtube-music", name: "YouTube Music", plan: "Premium", price: 10.99, billingCycle: "monthly", category: "music", icon: "🔴", color: "#FF0000", popularity: 40, cancelDifficulty: "easy" },
  { id: "youtube-premium", name: "YouTube Premium", plan: "Music + Video", price: 13.99, billingCycle: "monthly", category: "music", icon: "🔴", color: "#FF0000", popularity: 55, cancelDifficulty: "easy" },
  { id: "amazon-music", name: "Amazon Music", plan: "Unlimited", price: 12.00, billingCycle: "monthly", category: "music", icon: "🎧", color: "#25D1DA", popularity: 30, cancelDifficulty: "easy" },
  { id: "tidal", name: "Tidal", plan: "Individual", price: 10.99, billingCycle: "monthly", category: "music", icon: "🌊", color: "#000000", popularity: 15, cancelDifficulty: "easy" },
  { id: "audible", name: "Audible", plan: "Premium Plus", price: 14.95, billingCycle: "monthly", category: "music", icon: "🎧", color: "#F8991C", popularity: 50, cancelDifficulty: "medium" },

  // ─── AI TOOLS ───
  { id: "chatgpt-plus", name: "ChatGPT", plan: "Plus", price: 20.00, billingCycle: "monthly", category: "ai", icon: "🤖", color: "#10A37F", popularity: 80, cancelDifficulty: "easy" },
  { id: "chatgpt-pro", name: "ChatGPT", plan: "Pro", price: 200.00, billingCycle: "monthly", category: "ai", icon: "🤖", color: "#10A37F", popularity: 15, cancelDifficulty: "easy" },
  { id: "claude-pro", name: "Claude", plan: "Pro", price: 20.00, billingCycle: "monthly", category: "ai", icon: "🧠", color: "#D4A27F", popularity: 50, cancelDifficulty: "easy" },
  { id: "midjourney-basic", name: "Midjourney", plan: "Basic", price: 10.00, billingCycle: "monthly", category: "ai", icon: "🎨", color: "#000000", popularity: 40, cancelDifficulty: "easy" },
  { id: "midjourney-standard", name: "Midjourney", plan: "Standard", price: 30.00, billingCycle: "monthly", category: "ai", icon: "🎨", color: "#000000", popularity: 30, cancelDifficulty: "easy" },
  { id: "github-copilot", name: "GitHub Copilot", plan: "Individual", price: 10.00, billingCycle: "monthly", category: "ai", icon: "💻", color: "#000000", popularity: 45, cancelDifficulty: "easy" },
  { id: "grammarly", name: "Grammarly", plan: "Premium", price: 12.00, billingCycle: "monthly", category: "ai", icon: "✍️", color: "#15C39A", popularity: 55, cancelDifficulty: "medium" },
  { id: "jasper-ai", name: "Jasper AI", plan: "Creator", price: 49.00, billingCycle: "monthly", category: "ai", icon: "✨", color: "#5046E5", popularity: 15, cancelDifficulty: "easy" },
  { id: "perplexity-pro", name: "Perplexity", plan: "Pro", price: 20.00, billingCycle: "monthly", category: "ai", icon: "🔍", color: "#20808D", popularity: 35, cancelDifficulty: "easy" },
  { id: "notion-ai", name: "Notion AI", plan: "Add-on", price: 10.00, billingCycle: "monthly", category: "ai", icon: "📝", color: "#000000", popularity: 30, cancelDifficulty: "easy" },

  // ─── CLOUD & STORAGE ───
  { id: "icloud-50", name: "iCloud+", plan: "50GB", price: 0.99, billingCycle: "monthly", category: "cloud", icon: "☁️", color: "#3693F3", popularity: 70, cancelDifficulty: "easy" },
  { id: "icloud-200", name: "iCloud+", plan: "200GB", price: 2.99, billingCycle: "monthly", category: "cloud", icon: "☁️", color: "#3693F3", popularity: 60, cancelDifficulty: "easy" },
  { id: "icloud-2tb", name: "iCloud+", plan: "2TB", price: 9.99, billingCycle: "monthly", category: "cloud", icon: "☁️", color: "#3693F3", popularity: 40, cancelDifficulty: "easy" },
  { id: "google-one-100", name: "Google One", plan: "100GB", price: 1.99, billingCycle: "monthly", category: "cloud", icon: "🔵", color: "#4285F4", popularity: 55, cancelDifficulty: "easy" },
  { id: "google-one-2tb", name: "Google One", plan: "2TB", price: 9.99, billingCycle: "monthly", category: "cloud", icon: "🔵", color: "#4285F4", popularity: 30, cancelDifficulty: "easy" },
  { id: "dropbox-plus", name: "Dropbox", plan: "Plus", price: 11.99, billingCycle: "monthly", category: "cloud", icon: "📂", color: "#0061FF", popularity: 35, cancelDifficulty: "medium" },
  { id: "ms365-personal", name: "Microsoft 365", plan: "Personal", price: 6.99, billingCycle: "monthly", category: "cloud", icon: "🟦", color: "#0078D4", popularity: 55, cancelDifficulty: "easy" },
  { id: "ms365-family", name: "Microsoft 365", plan: "Family", price: 9.99, billingCycle: "monthly", category: "cloud", icon: "🟦", color: "#0078D4", popularity: 40, cancelDifficulty: "easy" },
  { id: "adobe-all", name: "Adobe Creative Cloud", plan: "All Apps", price: 59.99, billingCycle: "monthly", category: "cloud", icon: "🅰️", color: "#FF0000", popularity: 40, cancelDifficulty: "hard" },
  { id: "adobe-photo", name: "Adobe Photography", plan: "Photo Plan", price: 9.99, billingCycle: "monthly", category: "cloud", icon: "📸", color: "#31A8FF", popularity: 35, cancelDifficulty: "hard" },

  // ─── GAMING ───
  { id: "xbox-core", name: "Xbox Game Pass", plan: "Core", price: 9.99, billingCycle: "monthly", category: "gaming", icon: "🎮", color: "#107C10", popularity: 50, cancelDifficulty: "easy" },
  { id: "xbox-ultimate", name: "Xbox Game Pass", plan: "Ultimate", price: 19.99, billingCycle: "monthly", category: "gaming", icon: "🎮", color: "#107C10", popularity: 45, cancelDifficulty: "easy" },
  { id: "ps-essential", name: "PlayStation Plus", plan: "Essential", price: 9.99, billingCycle: "monthly", category: "gaming", icon: "🕹️", color: "#003791", popularity: 50, cancelDifficulty: "easy" },
  { id: "ps-premium", name: "PlayStation Plus", plan: "Premium", price: 17.99, billingCycle: "monthly", category: "gaming", icon: "🕹️", color: "#003791", popularity: 30, cancelDifficulty: "easy" },
  { id: "nintendo-online", name: "Nintendo Switch Online", plan: "Individual", price: 3.99, billingCycle: "monthly", category: "gaming", icon: "🔴", color: "#E60012", popularity: 40, cancelDifficulty: "easy" },
  { id: "ea-play", name: "EA Play", plan: "Standard", price: 5.99, billingCycle: "monthly", category: "gaming", icon: "⚽", color: "#000000", popularity: 25, cancelDifficulty: "easy" },

  // ─── PRODUCTIVITY & VPN ───
  { id: "1password", name: "1Password", plan: "Individual", price: 2.99, billingCycle: "monthly", category: "productivity", icon: "🔐", color: "#0572EC", popularity: 45, cancelDifficulty: "easy" },
  { id: "nordvpn", name: "NordVPN", plan: "Standard", price: 12.99, billingCycle: "monthly", category: "productivity", icon: "🛡️", color: "#4687FF", popularity: 45, cancelDifficulty: "medium" },
  { id: "expressvpn", name: "ExpressVPN", plan: "Monthly", price: 12.95, billingCycle: "monthly", category: "productivity", icon: "🔒", color: "#DA3940", popularity: 30, cancelDifficulty: "medium" },
  { id: "canva-pro", name: "Canva", plan: "Pro", price: 12.99, billingCycle: "monthly", category: "productivity", icon: "🎨", color: "#00C4CC", popularity: 50, cancelDifficulty: "easy" },
  { id: "slack-pro", name: "Slack", plan: "Pro (per user)", price: 8.75, billingCycle: "monthly", category: "productivity", icon: "💬", color: "#4A154B", popularity: 40, cancelDifficulty: "easy" },
  { id: "zoom", name: "Zoom", plan: "Workplace", price: 13.33, billingCycle: "monthly", category: "productivity", icon: "📹", color: "#2D8CFF", popularity: 45, cancelDifficulty: "easy" },
  { id: "evernote", name: "Evernote", plan: "Personal", price: 14.99, billingCycle: "monthly", category: "productivity", icon: "🐘", color: "#00A82D", popularity: 25, cancelDifficulty: "medium" },

  // ─── FITNESS & HEALTH ───
  { id: "gym", name: "Gym Membership", plan: "Average", price: 50.00, billingCycle: "monthly", category: "fitness", icon: "🏋️", color: "#FF4500", popularity: 60, cancelDifficulty: "hard" },
  { id: "peloton-app", name: "Peloton", plan: "App", price: 12.99, billingCycle: "monthly", category: "fitness", icon: "🚴", color: "#C4242B", popularity: 35, cancelDifficulty: "easy" },
  { id: "peloton-all", name: "Peloton", plan: "All-Access", price: 44.00, billingCycle: "monthly", category: "fitness", icon: "🚴", color: "#C4242B", popularity: 25, cancelDifficulty: "medium" },
  { id: "strava", name: "Strava", plan: "Premium", price: 11.99, billingCycle: "monthly", category: "fitness", icon: "🏃", color: "#FC4C02", popularity: 30, cancelDifficulty: "easy" },
  { id: "myfitnesspal", name: "MyFitnessPal", plan: "Premium", price: 19.99, billingCycle: "monthly", category: "fitness", icon: "🍎", color: "#0070F0", popularity: 30, cancelDifficulty: "easy" },
  { id: "headspace", name: "Headspace", plan: "Individual", price: 12.99, billingCycle: "monthly", category: "fitness", icon: "🧘", color: "#F47D20", popularity: 40, cancelDifficulty: "easy" },
  { id: "calm", name: "Calm", plan: "Premium", price: 14.99, billingCycle: "monthly", category: "fitness", icon: "🌙", color: "#38618C", popularity: 35, cancelDifficulty: "easy" },
  { id: "noom", name: "Noom", plan: "Monthly", price: 59.00, billingCycle: "monthly", category: "fitness", icon: "🥗", color: "#F5C543", popularity: 20, cancelDifficulty: "hard" },

  // ─── FOOD & DELIVERY ───
  { id: "dashpass", name: "DoorDash", plan: "DashPass", price: 9.99, billingCycle: "monthly", category: "food", icon: "🚗", color: "#FF3008", popularity: 55, cancelDifficulty: "easy" },
  { id: "uber-one", name: "Uber One", plan: "Membership", price: 9.99, billingCycle: "monthly", category: "food", icon: "🚙", color: "#000000", popularity: 45, cancelDifficulty: "easy" },
  { id: "instacart", name: "Instacart+", plan: "Annual", price: 9.99, billingCycle: "monthly", category: "food", icon: "🥕", color: "#43B02A", popularity: 35, cancelDifficulty: "easy" },
  { id: "hellofresh", name: "HelloFresh", plan: "2 people, 3 meals", price: 60.00, billingCycle: "monthly", category: "food", icon: "🍳", color: "#6DB542", popularity: 30, cancelDifficulty: "medium" },
  { id: "blue-apron", name: "Blue Apron", plan: "2 people, 3 meals", price: 55.00, billingCycle: "monthly", category: "food", icon: "👨‍🍳", color: "#002F6C", popularity: 20, cancelDifficulty: "medium" },
  { id: "walmart-plus", name: "Walmart+", plan: "Monthly", price: 12.95, billingCycle: "monthly", category: "food", icon: "🛒", color: "#0071CE", popularity: 40, cancelDifficulty: "easy" },
  { id: "costco", name: "Costco", plan: "Executive Membership", price: 10.42, billingCycle: "monthly", category: "food", icon: "🏪", color: "#E31837", popularity: 50, cancelDifficulty: "easy" },

  // ─── NEWS & READING ───
  { id: "nyt", name: "New York Times", plan: "Digital", price: 17.00, billingCycle: "monthly", category: "news", icon: "📰", color: "#000000", popularity: 45, cancelDifficulty: "medium" },
  { id: "wsj", name: "Wall Street Journal", plan: "Digital", price: 38.99, billingCycle: "monthly", category: "news", icon: "📊", color: "#0080C3", popularity: 30, cancelDifficulty: "medium" },
  { id: "wapo", name: "Washington Post", plan: "Digital", price: 10.00, billingCycle: "monthly", category: "news", icon: "🗞️", color: "#000000", popularity: 25, cancelDifficulty: "easy" },
  { id: "athletic", name: "The Athletic", plan: "Individual", price: 9.99, billingCycle: "monthly", category: "news", icon: "⚾", color: "#000000", popularity: 30, cancelDifficulty: "easy" },
  { id: "kindle-unlimited", name: "Kindle Unlimited", plan: "Standard", price: 11.99, billingCycle: "monthly", category: "news", icon: "📚", color: "#FF9900", popularity: 35, cancelDifficulty: "easy" },
  { id: "scribd", name: "Scribd", plan: "Standard", price: 11.99, billingCycle: "monthly", category: "news", icon: "📖", color: "#1E7B85", popularity: 25, cancelDifficulty: "easy" },
  { id: "medium", name: "Medium", plan: "Member", price: 5.00, billingCycle: "monthly", category: "news", icon: "✏️", color: "#000000", popularity: 30, cancelDifficulty: "easy" },
  { id: "substack", name: "Substack", plan: "Average paid", price: 8.00, billingCycle: "monthly", category: "news", icon: "📩", color: "#FF6719", popularity: 25, cancelDifficulty: "easy" },

  // ─── SHOPPING ───
  { id: "amazon-prime-shop", name: "Amazon Prime", plan: "(if not above)", price: 14.99, billingCycle: "monthly", category: "shopping", icon: "📦", color: "#FF9900", popularity: 92, cancelDifficulty: "medium" },
];

export const POPULAR_PRESET_IDS = [
  "netflix-standard",
  "spotify-individual",
  "amazon-prime",
  "icloud-200",
  "youtube-premium",
];

export function formatCurrency(amount: number, decimals = 2): string {
  if (isNaN(amount) || !isFinite(amount)) return "$0.00";
  return "$" + amount.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function monthlyToYearly(monthly: number): number {
  return monthly * 12;
}

export function compoundInvestment(monthlyAmount: number, annualReturn: number, years: number): number {
  const monthlyReturn = annualReturn / 12;
  let total = 0;
  for (let i = 0; i < years * 12; i++) {
    total = (total + monthlyAmount) * (1 + monthlyReturn);
  }
  return total;
}
