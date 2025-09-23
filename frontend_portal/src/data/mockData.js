/**
 * Mock data for GLOBAL EXPRESS portal. Replace with API integration later.
 */
export const categories = [
  { name: "Politics", sub: ["Elections", "Policy", "Government"] },
  { name: "Business", sub: ["Markets", "Companies", "Economy"] },
  { name: "Technology", sub: ["AI", "Gadgets", "Startups"] },
  { name: "Sports", sub: ["Football", "Cricket", "Tennis"] },
  { name: "Entertainment", sub: ["Movies", "TV", "Music"] },
  { name: "Health", sub: ["Wellness", "Research", "Medicine"] },
  { name: "Lifestyle", sub: ["Travel", "Food", "Style"] },
  { name: "World", sub: ["Americas", "Europe", "Asia"] },
  { name: "Opinion", sub: ["Editorials", "Columns", "Letters"] },
];

export const breakingNews = [
  { id: 1, title: "Global Markets Rally as Inflation Cools", link: "#" },
  { id: 2, title: "Tech Giants Announce Major AI Collaboration", link: "#" },
  { id: 3, title: "Historic Peace Talks Yield New Accord", link: "#" },
];

export const featuredStories = [
  {
    id: "f1",
    title: "Inside the AI Revolution Transforming Daily Life",
    category: "Technology",
    author: "By Sarah Lin",
    timestamp: "2h ago",
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "f2",
    title: "How Cities Are Redesigning for a Greener Future",
    category: "World",
    author: "By Marcus Doyle",
    timestamp: "3h ago",
    image: "https://images.unsplash.com/photo-1526485797145-2afe5b01088d?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "f3",
    title: "Championship Thriller: A Night to Remember",
    category: "Sports",
    author: "By Anita Kapoor",
    timestamp: "30m ago",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1400&auto=format&fit=crop",
  },
];

export const trending = [
  { id: "t1", title: "5 Startups Rewriting the Rules", reads: "68k", category: "Business" },
  { id: "t2", title: "The Wellness Habits That Actually Work", reads: "47k", category: "Health" },
  { id: "t3", title: "What the New Policy Means for You", reads: "41k", category: "Politics" },
  { id: "t4", title: "Gadgets of the Year: Editor's Picks", reads: "39k", category: "Technology" },
  { id: "t5", title: "World Cup: The Defining Moments", reads: "35k", category: "Sports" },
];

export const articles = Array.from({ length: 12 }).map((_, i) => ({
  id: `a${i + 1}`,
  title: `Explainer: Understanding Today's Headlines ${i + 1}`,
  excerpt:
    "A concise look at the key stories shaping the world today with insights and context.",
  category: categories[i % categories.length].name,
  author: ["Alex Rivera", "Nina Hart", "Priya Menon"][i % 3],
  timestamp: `${(i % 5) + 1}h ago`,
  image: `https://picsum.photos/seed/news${i}/640/420`,
}));

export const markets = {
  stocks: [
    { symbol: "DJA", name: "Dow Jones", change: "+0.9%" },
    { symbol: "S&P", name: "S&P 500", change: "+1.2%" },
    { symbol: "NAS", name: "NASDAQ", change: "+1.6%" },
  ],
  fx: [
    { pair: "USD/EUR", value: "0.91", change: "+0.2%" },
    { pair: "USD/JPY", value: "148.2", change: "-0.1%" },
    { pair: "GBP/USD", value: "1.26", change: "+0.3%" },
  ],
};

export const multimedia = {
  photos: Array.from({ length: 8 }).map((_, i) => ({
    id: `p${i + 1}`,
    title: `Photo Story ${i + 1}`,
    src: `https://picsum.photos/seed/photo${i}/900/600`,
  })),
  videos: Array.from({ length: 6 }).map((_, i) => ({
    id: `v${i + 1}`,
    title: `Video Clip ${i + 1}`,
    thumbnail: `https://picsum.photos/seed/video${i}/640/360`,
    duration: `${2 + i}:${(i * 7) % 60}`.padStart(2, "0"),
  })),
  podcasts: Array.from({ length: 5 }).map((_, i) => ({
    id: `pod${i + 1}`,
    title: `Daily Briefing Episode ${i + 1}`,
    length: `${12 + i} min`,
    url: "#",
  })),
};
