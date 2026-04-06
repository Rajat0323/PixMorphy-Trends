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
  galleryImages?: {
    src: string;
    alt: string;
  }[];
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
    slug: "rcb-vs-csk-result-2026-viral-reason",
    title:
      "RCB vs CSK Result 2026 (5 April): Kohli-Dhoni Fever Mein Bengaluru Blast, 250 Run Se Macha Hadkamp!",
    excerpt:
      "5 April 2026 ke RCB vs CSK match mein 250/3 ka dhamaka, Tim David ki toofani batting aur CSK par 43-run ki badi jeet ko simple Hindi mein samjhein.",
    category: "Trending",
    publishedAt: "2026-04-06",
    updatedAt: "2026-04-06",
    readTime: "6 min read",
    author: "Rajat Gupta",
    imageSrc: "https://c.ndtvimg.com/2026-03/fcr9678c_rcb_625x300_24_March_26.jpg?im=FeatureCrop%2Calgorithm%3Ddnn%2Cwidth%3D1200%2Cheight%3D738",
    heroAccent: "from-red-600 via-orange-500 to-yellow-400",
    featuredLabel: "IPL Fever",
    imageAlt: "RCB vs CSK IPL 2026 result featured image",
    galleryImages: [
      {
        src: "https://c.ndtvimg.com/2026-03/fcr9678c_rcb_625x300_24_March_26.jpg?im=FeatureCrop%2Calgorithm%3Ddnn%2Cwidth%3D1200%2Cheight%3D738",
        alt: "RCB team featured image",
      },
      {
        src: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_wide_w_800,q_50/lsci/db/PICTURES/CMS/415300/415345.6.jpg",
        alt: "RCB vs CSK action image",
      },
      {
        src: "https://media.assettype.com/outlookindia/2026-03-28/78qavqkf/Virat-Kohli-2.jpeg",
        alt: "Virat Kohli image",
      },
      {
        src: "https://c.files.bbci.co.uk/b485/live/ab39cf20-2ad1-11f1-934f-036468834728.jpg",
        alt: "RCB vs CSK BBC match image",
      },
      {
        src: "https://ichef.bbci.co.uk/ace/branded_sport/1200/cpsprodpb/f7fb/live/c2336830-3111-11f1-8078-2797c344ad7d.jpg",
        alt: "RCB batting celebration image",
      },
      {
        src: "https://c.ndtvimg.com/2026-04/73st72ag_rajat-patidar-and-tim-david-bcci_625x300_06_April_26.jpg?im=FeatureCrop%2Calgorithm%3Ddnn%2Cwidth%3D1200%2Cheight%3D738",
        alt: "Rajat Patidar and Tim David image",
      },
      {
        src: "https://img.mathrubhumi.com/view/acePublic/alias/contentid/1jmf4lx7siszaos7bjn/0/ipl-rcb-win-celebration.webp?$p=f162f31&f=16:9&q=0.8&w=1080",
        alt: "RCB win celebration image",
      },
      {
        src: "https://img.republicworld.com/all_images/rcb-felicitation-ceremony-1749033557463-16_9.webp?format=webp&h=225&q=75&w=400",
        alt: "RCB celebration visual",
      },
      {
        src: "https://images.indianexpress.com/2026/04/RCB-CSK-6.jpg",
        alt: "RCB vs CSK Indian Express image",
      },
      {
        src: "https://static.toiimg.com/thumb/imgsize-103644,msid-127488210,width-375,resizemode-4/127488210.jpg",
        alt: "CSK batting image",
      },
      {
        src: "https://static.toiimg.com/thumb/msid-130014099,imgsize-199038,width-400,height-225,resizemode-4/chennai-apr-03-ani-chennai-super-kings39-sarfaraz-khan-and-teammate-celebrate.jpg",
        alt: "CSK players image",
      },
      {
        src: "https://m.economictimes.com/thumb/msid-130001737,width-1200,height-900,resizemode-4,imgsize-16940/news/sports/csk-vs-pbks-ipl-live-score-updates-chennai-super-kings-vs-punjab-kings-live-match-score-today-03-april-2026.jpg",
        alt: "CSK related image from Economic Times",
      },
    ],
    keywords: [
      "RCB vs CSK result 5 April 2026",
      "IPL 2026 RCB 250 score",
      "Tim David 70 runs 25 balls",
      "CSK all out 207 analysis",
      "RCB vs CSK full match report Hindi",
    ],
    faq: [
      {
        question: "RCB vs CSK 5 April 2026 match ka result kya raha?",
        answer:
          "RCB ne CSK ko 43 runs se haraya. RCB ne 250/3 banaye aur CSK 207 par all out ho gayi.",
      },
      {
        question: "Match ka sabse bada hero kaun raha?",
        answer:
          "Tim David ne 25 balls par 70 runs ki toofani innings kheli aur match ka sabse bada talking point bane.",
      },
      {
        question: "RCB batting ka biggest turning point kya tha?",
        answer:
          "Last 5 overs mein 90 plus runs ne match ko poori tarah RCB ke favour mein tilt kar diya.",
      },
    ],
    sections: [
      {
        heading: "Official match scorecard",
        paragraphs: [
          "5 April 2026 ko M. Chinnaswamy Stadium, Bengaluru mein khele gaye IPL Match 11 mein Royal Challengers Bengaluru ne Chennai Super Kings ko 43 runs se haraya.",
          "RCB ne 20 overs mein 250/3 ka huge total banaya, jabki CSK 19.4 overs mein 207 par all out ho gayi. Scoreline hi batati hai ki match kitna one-sided ho gaya tha.",
        ],
      },
      {
        heading: "Match hero: Tim David ne game ka mood hi badal diya",
        paragraphs: [
          "Tim David ne sirf 25 balls mein 70 runs ki destructive innings kheli aur CSK bowlers ko completely pressure mein daal diya. Unki hitting ne death overs ko run explosion mein convert kar diya.",
          "Player of the Match level impact isi ko kehte hain. Jab team ko final push chahiye tha, tab Tim David ne score ko normal big total se monster total bana diya.",
        ],
        bullets: [
          "Tim David – 70 (25)",
          "Death overs mein maximum damage",
          "RCB innings ko match-winning shape diya",
        ],
      },
      {
        heading: "RCB batting: pure run explosion ka show",
        paragraphs: [
          "RCB batting is match mein start se hi aggressive thi, lekin asli blast end phase mein dekhne ko mila. Virat Kohli ne classy start diya, Rajat Patidar ne tempo maintain rakha, aur phir Tim David ne finishing ko destruction mein badal diya.",
          "Reports ke mutabik last 5 overs mein 90 plus runs bane, jo match ka sabse bada turning point tha. Isi phase ne CSK ko poori tarah backfoot par daal diya.",
        ],
        bullets: [
          "Virat Kohli ne solid base diya",
          "Rajat Patidar ne scoring momentum banaye rakha",
          "Last 5 overs mein explosive finish",
        ],
      },
      {
        heading: "CSK batting: shuruaat mein jhatka, end tak struggle",
        paragraphs: [
          "CSK ki chase ko early blows ne kaafi weak kar diya. Jab powerplay mein top order pressure mein aa jaye, to 250 ke target ko chase karna aur bhi mushkil ho jata hai.",
          "Middle order ne fight karne ki koshish ki, lekin required rate aur wickets dono pressure create karte rahe. Result yeh hua ki team 207 par all out ho gayi.",
        ],
        bullets: [
          "10 runs ke andar 2 wickets",
          "Powerplay mein pressure build hua",
          "Middle order match ko fully recover nahi kar saka",
        ],
      },
      {
        heading: "Bowling game changer aur turning points",
        paragraphs: [
          "RCB ke bowlers ne CSK ko shuruaat se control mein rakhne ki koshish ki. Bhuvneshwar Kumar ka early impact chase ko weak karne mein important factor raha.",
          "Is match ke sabse bade turning points clear the: Tim David ka assault, last overs ka run burst, CSK top-order collapse aur early wickets ka pressure.",
        ],
        bullets: [
          "Bhuvneshwar Kumar – early breakthroughs",
          "Last 5 overs mein 97 runs type finishing burst",
          "CSK top order ka collapse",
          "RCB ka full momentum control",
        ],
      },
      {
        heading: "Final verdict",
        paragraphs: [
          "5 April 2026 ka RCB vs CSK match poori tarah RCB ka show raha. Tim David ki toofani batting, Kohli ki class aur bowling pressure ne milkar CSK ko match se bahar kar diya.",
          "Agar ek line mein bolein to Bengaluru mein sirf 250 runs nahi bane, balki ek full batting storm dekhne ko mila.",
        ],
      },
    ],
    relatedSlugs: [
      "aata-gold-gas-prices-india-april-2026",
      "srh-vs-lsg-match-prediction-2026",
    ],
  },
  {
    slug: "aata-gold-gas-prices-india-april-2026",
    title:
      "आटा, सोना और गैस की कीमतें फिर चर्चा में: April 2026 में आम आदमी क्यों परेशान है?",
    excerpt:
      "April 2026 mein aata, sona aur LPG gas ki badhti keematें aam aadmi ke budget par seedha asar daal rahi hain. Is poore issue ko simple Hindi mein samjhein.",
    category: "Trending",
    publishedAt: "2026-04-06",
    updatedAt: "2026-04-06",
    readTime: "5 min read",
    author: "Rajat Gupta",
    imageSrc: "https://www.bbassets.com/media/uploads/p/l/30006887_9-aashirvaad-atta-whole-wheat.jpg",
    heroAccent: "from-amber-500 via-yellow-400 to-orange-500",
    featuredLabel: "Price Alert",
    imageAlt: "Aata, sona aur gas prices trend article featured image",
    galleryImages: [
      {
        src: "https://www.bbassets.com/media/uploads/p/l/30006887_9-aashirvaad-atta-whole-wheat.jpg",
        alt: "Aata product image",
      },
      {
        src: "https://www.jovafurniture.com/uploadfile/201804/24/0aa47b302b4377be210f6b9ff79a45c9_medium.jpg",
        alt: "Gold bars and jewellery style image",
      },
      {
        src: "https://cdn.supergas.com/-/media/sites/india/for-home/new-connection/image-4.jpg?hash=3C2252F810A585FF59C911E406287160&rev=f90fdb7521b94bc08780f53e22986ba7",
        alt: "LPG gas cylinder image from Supergas",
      },
      {
        src: "https://tiimg.tistatic.com/fp/1/007/731/long-durable-easily-refillable-heavy-duty-red-lpg-gas-cylinder-for-domestic-use--725.jpg",
        alt: "Red LPG gas cylinder image",
      },
      {
        src: "https://bsmedia.business-standard.com/_media/bs/img/article/2020-04/20/full/1587364616-2279.png",
        alt: "Wheat and atta related image",
      },
      {
        src: "https://micromill.in/cdn/shop/files/16inch-daimond-emery-stone-atta-chakki-best-commercial-flour-mill-5hp-atta-chakki-machine-for-small-business01.jpg?v=1689742989",
        alt: "Atta chakki machine image",
      },
      {
        src: "https://www.tradologie.com/docs/images/wheat-price-today-in-india-mandi-rate-msp--export-price-2026.webp",
        alt: "Wheat price chart image",
      },
      {
        src: "https://akm-img-a-in.tosshub.com/lingo/ktak/images/story/202503/67c981ab6ba83-wheat-mandi-price-060613853-16x9.jpg?size=1200:675",
        alt: "Wheat mandi price image",
      },
      {
        src: "https://www.eternz.com/blog/content/images/size/w1200/2026/03/top-online-jewellery-brands-in-india.jpg",
        alt: "Gold jewellery market image",
      },
      {
        src: "https://www.gold.org/sites/default/files/2024-04/india_blog_2304_1_new.png",
        alt: "Gold India chart image",
      },
      {
        src: "https://s7ap1.scene7.com/is/image/noveljewelsprod/PR2?dpr=on&ts=1762852278212",
        alt: "Gold jewellery product image 1",
      },
      {
        src: "https://s7ap1.scene7.com/is/image/noveljewelsprod/PR1?dpr=on&ts=1762852278171",
        alt: "Gold jewellery product image 2",
      },
      {
        src: "https://cdn.supergas.com/-/media/sites/india/for-home/home/image-2.jpg?hash=0F3592820AB8728BF517834A7DD41684&rev=b441978c82a14d518e1de93792fc2d3d",
        alt: "Home LPG gas image",
      },
      {
        src: "https://ichef.bbci.co.uk/news/480/cpsprodpb/5C56/production/_124683632_ujjwala.jpg.webp",
        alt: "Ujjwala LPG related image",
      },
      {
        src: "https://images.indianexpress.com/2026/02/cylinder_ed3c27.jpg?w=1200",
        alt: "Indian Express LPG cylinder image",
      },
      {
        src: "https://th-i.thgim.com/public/incoming/td2wmn/article70576744.ece/alternates/LANDSCAPE_1200/PTI02_01_2024_000178A.jpg",
        alt: "LPG cylinder stack image",
      },
    ],
    keywords: [
      "aata price India 2026",
      "gold price India April 2026",
      "LPG cylinder price India",
      "inflation India today",
      "daily household prices India",
    ],
    faq: [
      {
        question: "Aata, gold aur gas ek saath trend kyun kar rahe hain?",
        answer:
          "Ye teenon directly household budget, savings aur daily life se connected hain, isliye public concern ke time inki searches fast badh jaati hain.",
      },
      {
        question: "Kya exact prices har city mein same hoti hain?",
        answer:
          "Nahi. LPG, gold aur grocery prices city, date, provider aur market ke hisaab se vary kar sakti hain.",
      },
      {
        question: "In teeno mein aam aadmi ko sabse zyada concern kis baat ka hota hai?",
        answer:
          "Sabse bada concern monthly budget aur daily expenses par padne wale direct effect ka hota hai.",
      },
    ],
    sections: [
      {
        heading: "महंगाई का नया दौर: क्या हो रहा है?",
        paragraphs: [
          "April 2026 mein Bharat ki aam janta ek baar phir mahangai ki maar jhel rahi hai. Rasoi se lekar investment tak, har taraf badhti keematें budget ko disturb kar rahi hain.",
          "Khaas taur par aata, sona aur LPG gas cylinder ki badhti prices ne middle aur lower income families ki tension aur badha di hai. Global uncertainty, supply issues aur domestic cost pressure is discussion ko aur strong bana rahe hain.",
        ],
        bullets: [
          "वैश्विक आर्थिक अस्थिरता",
          "कच्चे तेल की कीमतों में उतार-चढ़ाव",
          "सप्लाई चेन में बाधाएं",
          "मौसम और फसल उत्पादन में गिरावट",
        ],
      },
      {
        heading: "आटा (गेहूं) की बढ़ती कीमतें",
        paragraphs: [
          "2025-26 mein garmi aur aniyamit baarish ne gehu ki fasal ko affect kiya, jiska direct impact atta prices par dekhne ko mil raha hai. Supply tight hone aur government stock pressure ne bhi market rates ko support kiya hai.",
          "Jab atta mehenga hota hai, to roti, bread, biscuit aur daily food budget sab par effect padta hai. Gareeb aur middle-class families ko ration quantity aur monthly planning dono adjust karni padti hai.",
        ],
        bullets: [
          "कम उत्पादन और मौसम का असर",
          "सरकारी स्टॉक में कमी",
          "निर्यात दबाव और सप्लाई टाइटनेस",
          "रसोई खर्च में सीधा असर",
        ],
      },
      {
        heading: "सोने की कीमतों में उछाल",
        paragraphs: [
          "Gold rates ka rise India mein hamesha strong public interest create karta hai, kyunki yeh investment aur shaadi dono se directly connected hai. Global uncertainty aur dollar strength jaise factors sone ko aur mehenga bana dete hain.",
          "Jab wedding demand aur safe-investment buying ek saath badh jaye, to small buyers aur families ke liye gold aur bhi inaccessible lagne lagta hai.",
        ],
        bullets: [
          "ग्लोबल अनिश्चितता",
          "डॉलर की मजबूती",
          "शादी के season की demand",
          "निवेश और शादी का बढ़ता खर्च",
        ],
      },
      {
        heading: "LPG गैस सिलेंडर: रसोई पर सीधा असर",
        paragraphs: [
          "LPG ki कीमतों में बदलाव ghar ke monthly budget ko sabse jaldi affect karta hai. Crude oil prices, subsidy changes aur distribution cost jaise factors cylinder rates ko directly impact karte hain.",
          "Jab cylinder mehenga hota hai, to poor families ko wood ya coal jaise alternatives tak dekhna pad sakta hai. Iska burden specially women aur household managers par zyada feel hota hai.",
        ],
        bullets: [
          "क्रूड ऑयल prices का असर",
          "सब्सिडी में कटौती",
          "डिस्ट्रिब्यूशन cost में बढ़ोतरी",
          "रसोई budget पर direct pressure",
        ],
      },
      {
        heading: "तीनों चीजों का संयुक्त प्रभाव",
        paragraphs: [
          "Jab atta, sona aur gas tino categories ek saath mehengi ho jayein, to uska effect sirf market update tak limited nahi rehta. Yeh ghar ke kharch, savings, social events aur mental stress sab par impact daalta hai.",
          "Isi wajah se yeh topic aaj ke strongest non-sports trends mein se ek bana hua hai, kyunki public isse daily life ke angle se feel kar rahi hai.",
        ],
        bullets: [
          "रसोई खर्च में भारी बढ़ोतरी",
          "सेविंग्स पर असर",
          "शादी और सामाजिक कार्यक्रम महंगे",
          "आर्थिक दबाव और मानसिक तनाव",
        ],
      },
      {
        heading: "डेटा और आगे की उम्मीद",
        paragraphs: [
          "Recent market trend ke hisaab se gehu/atta prices mein noticeable rise, gold rates mein strong upward movement aur LPG cylinder prices mein household pressure wala discussion bana hua hai. Exact rate city aur date ke hisaab se vary kar sakta hai, lekin public concern real hai.",
          "Aage relief tab mil sakti hai jab government market intervention kare, subsidy support aaye ya supply side improve ho. Lekin agar global aur domestic pressure continue raha, to prices aur upar bhi ja sakti hain.",
        ],
      },
      {
        heading: "Final verdict",
        paragraphs: [
          "April 2026 mein aata, sona aur gas ki badhti keematें sirf numbers nahi hain, balki aam aadmi ki real life challenge hain. Jab tak economic conditions stable nahi hoti, families ko budget discipline aur smarter planning ke saath hi is phase ko manage karna hoga.",
        ],
      },
    ],
    relatedSlugs: [
      "rcb-vs-csk-result-2026-viral-reason",
      "chatgpt-se-paise-kaise-kamaye-2026",
    ],
  },
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
