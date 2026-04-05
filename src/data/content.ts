export type Category = {
  name: string;
  href: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  author: string;
  imageSrc: string;
  heroAccent: string;
  featuredLabel: string;
  imageAlt: string;
  keywords: string[];
  faq: Faq[];
  sections: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  relatedSlugs: string[];
};

export const siteConfig = {
  name: "PixMorphy",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://pixmorphy-trends.vercel.app",
  description:
    "PixMorphy is a fast Hindi and Hinglish blog for AI tools, tech updates, viral trends, online earning and practical how-to guides.",
  nav: [
    { name: "Home", href: "/" },
    { name: "Tech", href: "/#latest" },
    { name: "AI Tools", href: "/#ai-tools" },
    { name: "Earn", href: "/#earn" },
    { name: "How-To", href: "/#how-to" },
    { name: "Trending", href: "/#trending" },
  ] satisfies Category[],
  categories: [
    { name: "Tech", href: "/#latest" },
    { name: "AI Tools", href: "/#ai-tools" },
    { name: "Online Earning", href: "/#earn" },
    { name: "How-To", href: "/#how-to" },
    { name: "Trending", href: "/#trending" },
    { name: "Apps", href: "/#latest" },
  ] satisfies Category[],
};

export const posts: Post[] = [
  {
    slug: "srh-vs-lsg-match-prediction-2026",
    title: "आज का SRH vs LSG मैच कौन जीतेगा | Today IPL Match Prediction 2026",
    excerpt:
      "आज के IPL 2026 मुकाबले में SRH vs LSG के बीच कौन भारी पड़ सकता है, pitch report, probable playing 11 aur final prediction ko simple Hindi mein samjhein.",
    category: "Trending",
    publishedAt: "2026-04-05",
    updatedAt: "2026-04-05",
    readTime: "6 min read",
    author: "Rajat Gupta",
    imageSrc: "/images/blog/srh-vs-lsg-prediction-2026.png",
    heroAccent: "from-orange-500 via-amber-500 to-sky-500",
    featuredLabel: "Match Prediction",
    imageAlt:
      "SRH vs LSG IPL 2026 match prediction thumbnail with two players facing each other",
    keywords: [
      "SRH vs LSG prediction 2026",
      "today IPL match prediction",
      "SRH vs LSG who will win",
      "IPL 2026 match prediction",
      "SRH vs LSG pitch report",
    ],
    faq: [
      {
        question: "Aaj ka SRH vs LSG match kaun jeet sakta hai?",
        answer:
          "Match close lag raha hai, lekin current balance ke hisaab se LSG ko slight edge diya ja sakta hai. Final result toss, pitch aur middle overs par depend karega.",
      },
      {
        question: "Kya aaj SRH ko home advantage milega?",
        answer:
          "Haan, Hyderabad conditions SRH ko support kar sakti hain, especially agar unhe powerplay mein aggressive start mil jaye.",
      },
      {
        question: "Final playing 11 kab confirm hoti hai?",
        answer:
          "Final playing 11 toss ke baad hi confirm hoti hai. Match se pehle sirf probable playing 11 hi discuss ki ja sakti hai.",
      },
    ],
    sections: [
      {
        heading: "SRH vs LSG today match itna exciting kyun lag raha hai?",
        paragraphs: [
          "Aaj ka IPL 2026 मुकाबला Sunrisers Hyderabad aur Lucknow Super Giants ke beech scheduled hai, aur dono teams ke paas aise players hain jo match ko kabhi bhi पलट सकते हैं.",
          "Ek side par SRH ka aggressive approach aur home conditions hain, to doosri side par LSG ka balanced batting order aur finishing depth hai. Isi wajah se yeh match last overs tak जा सकता है.",
        ],
      },
      {
        heading: "SRH vs LSG probable playing 11",
        paragraphs: [
          "Sunrisers Hyderabad ki taraf se Abhishek Sharma aur Travis Head powerplay mein fast start dene ki koshish kar sakte hain. Middle order mein Aiden Markram aur Heinrich Klaasen important role mein dikh sakte hain, jabki bowling unit mein Pat Cummins, Bhuvneshwar Kumar aur T Natarajan key options ho sakte hain.",
          "Lucknow Super Giants ki taraf se KL Rahul aur Quinton de Kock stable opening pair de sakte hain. Nicholas Pooran aur Marcus Stoinis finishing strength ko badhate hain, jabki bowling mein Ravi Bishnoi aur Mohsin Khan game-changing spell daal sakte hain.",
        ],
        bullets: [
          "SRH strength: aggressive opening, pace bowling, home conditions",
          "LSG strength: balanced batting, experienced middle order, stronger finishing",
          "Note: final playing 11 toss ke baad confirm hoti hai",
        ],
      },
      {
        heading: "Today IPL match pitch report",
        paragraphs: [
          "Aaj ki pitch report match result mein bahut bada factor ho sakti hai. Agar surface flat rahi to 180 plus score dekhne ko mil sakta hai, lekin agar wicket slow hui to spinners aur cutters ka impact badh jayega.",
          "Hyderabad conditions mein second innings mein dew factor bhi aa sakta hai, jo chasing side ko advantage de sakta hai. Isi wajah se toss jeetne wali team pehle bowling choose kar sakti hai.",
        ],
      },
      {
        heading: "SRH vs LSG who will win today match?",
        paragraphs: [
          "Agar comparison kiya jaye to SRH ka biggest edge unki attacking start aur home support ho sakta hai. Lekin LSG ke paas middle overs aur death overs mein better control dikhane ki capability hai.",
          "Prediction ke hisaab se match ka key phase middle overs hoga. Agar SRH ko quick start milti hai to unka pressure game strong ho sakta hai, lekin agar LSG spin aur variations se run flow rok deta hai to momentum unke side ja sakta hai.",
        ],
        bullets: [
          "SRH win scenario: strong powerplay plus good death bowling",
          "LSG win scenario: middle overs control plus better finishing",
          "Overall prediction: LSG 55%, SRH 45%",
        ],
      },
      {
        heading: "Key players to watch today",
        paragraphs: [
          "Is match mein kuch players result ko direct impact kar sakte hain. SRH ke liye Travis Head, Heinrich Klaasen aur Pat Cummins important naam honge.",
          "LSG ke liye KL Rahul, Nicholas Pooran aur Ravi Bishnoi ka performance deciding factor ban sakta hai. Inhi players ka execution match ka final difference create karega.",
        ],
      },
      {
        heading: "Final verdict",
        paragraphs: [
          "Yeh मुकाबला close, high-pressure aur entertaining lag raha hai. Dono teams ke paas enough match winners hain, isliye one-sided result ki guarantee nahi hai.",
          "Agar ek team pick karni ho to LSG thodi si aage dikh rahi hai, lekin SRH home support aur aggressive cricket ke saath kabhi bhi game पलट सकती है.",
        ],
        bullets: [
          "Match close rehne ka chance high hai",
          "Decision likely last overs mein aa sakta hai",
          "Prediction article hai, final outcome live match conditions par depend karega",
        ],
      },
    ],
    relatedSlugs: [
      "whatsapp-new-update-2026-hidden-features",
      "instagram-algorithm-2026-reels-viral-trick",
      "chatgpt-se-paise-kaise-kamaye-2026",
    ],
  },
  {
    slug: "whatsapp-new-update-2026-hidden-features",
    title:
      "WhatsApp New Update 2026: Yeh 5 Hidden Features Aapko Shock Kar Denge!",
    excerpt:
      "Storage cleanup, dual accounts, anti-scam alerts aur chat transfer jaise features ko simple Hinglish mein samjho.",
    category: "Tech Update",
    publishedAt: "2026-04-03",
    updatedAt: "2026-04-04",
    readTime: "6 min read",
    author: "Rajat Gupta",
    imageSrc: "/images/blog/whatsapp-update-2026.png",
    heroAccent: "from-sky-500 via-indigo-500 to-violet-500",
    featuredLabel: "Big Update",
    imageAlt:
      "WhatsApp feature banner showing storage cleanup, dual accounts and safety update",
    keywords: [
      "WhatsApp update 2026",
      "WhatsApp hidden features",
      "dual WhatsApp iPhone",
      "chat transfer iPhone to Android",
      "WhatsApp storage cleanup",
    ],
    faq: [
      {
        question: "WhatsApp 2026 ka sabse useful feature kaunsa hai?",
        answer:
          "Most users ke liye in-chat storage cleanup aur iPhone dual account support sabse practical updates hain.",
      },
      {
        question: "Kya yeh features sab phones par ek saath aate hain?",
        answer:
          "Nahi. WhatsApp updates phased rollout mein aate hain, isliye version aur region ke hisaab se delay ho sakta hai.",
      },
      {
        question: "Kya suspicious device warning ko ignore karna safe hai?",
        answer:
          "Bilkul nahi. Agar linking request unusual lage to QR scan ya device link turant stop karke verify karein.",
      },
    ],
    sections: [
      {
        heading: "Update itna important kyun hai?",
        paragraphs: [
          "WhatsApp ab sirf messaging app nahi raha. Daily work chats, family groups, business follow-ups aur personal media sab isi app mein jam ho jata hai.",
          "2026 ke naye features ka focus style se zyada utility par hai. Yaani storage bachana, work-life separation aur scam risk kam karna.",
        ],
        bullets: [
          "Phone storage ko better control",
          "Personal aur work accounts ko alag rakhna",
          "Phone switch ke time chat loss ka risk kam",
        ],
      },
      {
        heading: "1. Chat delete kiye bina media cleanup",
        paragraphs: [
          "Naye storage controls ke through aap large files ko directly manage kar sakte ho. Iska matlab poori conversation delete karne ki zarurat nahi.",
          "Indian users ke liye ye especially useful hai kyunki family aur class groups bahut jaldi media se bhar jaate hain.",
        ],
      },
      {
        heading: "2. iPhone par same phone mein 2 WhatsApp accounts",
        paragraphs: [
          "Freelancers, creators aur resellers ke liye yeh biggest convenience update hai. Ab personal aur work number ke liye alag phone carry karna zaroori nahi.",
          "Daily switching smooth ho to productivity bhi better lagti hai aur privacy bhi maintain hoti hai.",
        ],
      },
      {
        heading: "3. iPhone se Android chat transfer ko easy banana",
        paragraphs: [
          "Phone upgrade ke time sabse bada darr hota hai old chats aur photos lose ho jana. Cross-platform transfer support isi pain point ko address karta hai.",
          "Agar aap platform switch karne wale ho, to yeh feature time bhi bachata hai aur anxiety bhi.",
        ],
      },
      {
        heading: "4. Smart sticker tools chat ko zyada expressive banate hain",
        paragraphs: [
          "Text stickers aur better suggestions se normal replies bhi visually engaging lagti hain. Youth audience aur community groups mein yeh feature kaafi sticky ho sakta hai.",
          "Discover-style content ke liye bhi yeh interesting hai kyunki users is tarah ke lightweight expression features ke baare mein fast click karte hain.",
        ],
      },
      {
        heading: "5. Suspicious device linking warning",
        paragraphs: [
          "Scam prevention flashy feature nahi lagta, lekin real-world value sabse zyada isi mein ho sakti hai. Unknown QR ya linking requests ko verify karna ab aur easy ho jayega.",
          "Jo users digital safety mein confident nahi hote, unke liye ye alert system trust build karta hai.",
        ],
      },
    ],
    relatedSlugs: [
      "top-ai-tools-2026-free-powerful",
      "instagram-algorithm-2026-reels-viral-trick",
      "chatgpt-se-paise-kaise-kamaye-2026",
    ],
  },
  {
    slug: "top-ai-tools-2026-free-powerful",
    title: "Top 7 AI Tools Jo Aapki Life Change Kar Denge: Free Aur Powerful Picks",
    excerpt:
      "Productivity, content, image generation aur study hacks ke liye 2026 ke best AI tools ki practical list.",
    category: "AI Tools",
    publishedAt: "2026-04-02",
    readTime: "7 min read",
    author: "Rajat Gupta",
    imageSrc: "/images/blog/top-ai-tools-2026.png",
    heroAccent: "from-cyan-500 via-blue-600 to-indigo-700",
    featuredLabel: "AI Picks",
    imageAlt: "AI tools dashboard collage with productivity and content apps",
    keywords: ["AI tools 2026", "free AI tools", "best AI apps", "productivity AI"],
    faq: [
      {
        question: "Kya free AI tools beginners ke liye enough hote hain?",
        answer:
          "Haan, start ke liye kaafi hote hain. Paid plans tab useful hote hain jab usage scale ya team collaboration badh jaye.",
      },
      {
        question: "Kya AI tools Hindi content mein useful hote hain?",
        answer:
          "Kaafi tools Hindi aur Hinglish workflows mein helpful hain, especially drafting, summarizing aur image ideation mein.",
      },
      {
        question: "Kya har AI tool safe hota hai?",
        answer:
          "Nahi. Sensitive data upload karne se pehle privacy policy aur official docs zaroor dekhein.",
      },
    ],
    sections: [
      {
        heading: "AI tools ab trend nahi, workflow ban chuke hain",
        paragraphs: [
          "2026 mein AI ka real value tab dikhta hai jab woh repetitive kaam ko short kare. Students, creators aur solo founders sabke use cases alag hain, isliye tools bhi context ke hisaab se choose karne chahiye.",
        ],
      },
      {
        heading: "Kaunsi categories par focus karein",
        paragraphs: [
          "Writing, image generation, research, automation aur video repurposing aaj ke sabse hot categories hain.",
        ],
        bullets: [
          "Writing and summarization",
          "Thumbnail and visual ideation",
          "Automation for repeated tasks",
        ],
      },
    ],
    relatedSlugs: [
      "chatgpt-se-paise-kaise-kamaye-2026",
      "instagram-algorithm-2026-reels-viral-trick",
      "whatsapp-new-update-2026-hidden-features",
    ],
  },
  {
    slug: "instagram-algorithm-2026-reels-viral-trick",
    title: "Instagram Algorithm 2026: Reels Viral Kaise Kare Without Guesswork",
    excerpt:
      "Reels reach, watch-time aur retention signals ko simplify karke samjhaaya gaya hai for creators in India.",
    category: "Trending",
    publishedAt: "2026-04-01",
    readTime: "5 min read",
    author: "Rajat Gupta",
    imageSrc: "/images/blog/instagram-algorithm-2026.png",
    heroAccent: "from-fuchsia-500 via-rose-500 to-orange-400",
    featuredLabel: "Creator Growth",
    imageAlt: "Instagram reels growth dashboard with engagement spikes",
    keywords: ["Instagram algorithm 2026", "reels viral tips", "creator growth"],
    faq: [
      {
        question: "Kya reels viral karne ka ek fixed trick hota hai?",
        answer:
          "Nahi. Retention, save rate aur repeat view intent jaise signals milkar performance drive karte hain.",
      },
      {
        question: "Short hooks ab bhi important hain?",
        answer: "Haan, pehle 1-2 seconds ka hook ab bhi sabse critical parts mein se ek hai.",
      },
      {
        question: "Kya niche consistency zaroori hai?",
        answer:
          "Yes, clear topic memory audience aur algorithm dono ko help karti hai ki aapka content kisko dikhana hai.",
      },
    ],
    sections: [
      {
        heading: "Algorithm ko chase nahi, audience signals ko samjho",
        paragraphs: [
          "Best creators ab random hacks ke peeche nahi bhaagte. Woh first-second hook, completion rate aur repeat watch behavior par focus karte hain.",
        ],
      },
    ],
    relatedSlugs: [
      "top-ai-tools-2026-free-powerful",
      "whatsapp-new-update-2026-hidden-features",
      "chatgpt-se-paise-kaise-kamaye-2026",
    ],
  },
  {
    slug: "chatgpt-se-paise-kaise-kamaye-2026",
    title: "ChatGPT se Paise Kaise Kamaye 2026: Beginner Friendly Real Methods",
    excerpt:
      "Content services, prompts, research help aur small digital offers ke practical earning models Hindi mein.",
    category: "Online Earning",
    publishedAt: "2026-03-31",
    readTime: "8 min read",
    author: "Rajat Gupta",
    imageSrc: "/images/blog/chatgpt-money-2026.png",
    heroAccent: "from-emerald-500 via-teal-500 to-cyan-500",
    featuredLabel: "Earn Smart",
    imageAlt: "Laptop screen showing AI work and digital income ideas",
    keywords: ["ChatGPT se paise", "AI earning methods", "online earning 2026"],
    faq: [
      {
        question: "Kya beginner bina investment start kar sakta hai?",
        answer:
          "Haan, service-based model jaise scripting, rewriting ya research support se low-cost start possible hai.",
      },
      {
        question: "Sabse safe earning model kaunsa hai?",
        answer:
          "Skill-based services sabse sustainable hoti hain kyunki unmein fake promise ka risk kam hota hai.",
      },
      {
        question: "Kya sirf AI use karke passive income guaranteed hai?",
        answer:
          "Nahi. Consistency, audience trust aur clear offer ke bina koi guaranteed income model nahi hota.",
      },
    ],
    sections: [
      {
        heading: "Real earning aur hype mein farq samjho",
        paragraphs: [
          "2026 mein AI se earning ka opportunity real hai, lekin shortcut wali language se trust toot jata hai. Best approach hai clear skill + clear problem + simple offer.",
        ],
      },
    ],
    relatedSlugs: [
      "top-ai-tools-2026-free-powerful",
      "instagram-algorithm-2026-reels-viral-trick",
      "whatsapp-new-update-2026-hidden-features",
    ],
  },
];

export const featuredPosts = posts.slice(0, 3);

export const authors = {
  "Rajat Gupta": {
    role: "Tech Writer & AI Tools Researcher",
    bio: "Rajat practical Hindi and Hinglish explainers likhte hain jahan focus hype par nahi, useful takeaways par hota hai.",
  },
};

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getRelatedPosts(slugs: string[]) {
  return posts.filter((post) => slugs.includes(post.slug));
}
