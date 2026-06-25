#!/usr/bin/env python3
"""Generate src/data/bhakti-posts.ts from aarti sangrah content."""
import json
import re
from pathlib import Path

TXT = Path("/home/ubuntu/.cursor/projects/workspace/uploads/aarti_sangrah_3a57.txt")
OUT = Path("/workspace/src/data/bhakti-posts.ts")
HUB = "/aarti-sangrah"


def j(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def extract(txt: str, start: str, end: str) -> str:
    a = txt.index(start)
    b = txt.index(end)
    block = txt[a:b]
    out = []
    for line in block.split("\n"):
        s = line.strip()
        if not s:
            continue
        if s.startswith("="):
            continue
        if re.match(r"^[०-९]+\.", s):
            continue
        if s.startswith("(") and s.endswith(")"):
            continue
        out.append(line.rstrip())
    return "\n".join(out).strip()


def faq_block(items):
    lines = ["    faq: ["]
    for q, a in items:
        lines.append("      {")
        lines.append(f"        question: {j(q)},")
        lines.append(f"        answer: {j(a)},")
        lines.append("      },")
    lines.append("    ],")
    return "\n".join(lines)


def links_block(items):
    lines = ["    internalLinks: ["]
    for label, href in items:
        lines.append(f"      {{ label: {j(label)}, href: {j(href)} }},")
    lines.append("    ],")
    return "\n".join(lines)


def related_block(slugs):
    return "    relatedSlugs: [\n" + "".join(f"      {j(s)},\n" for s in slugs) + "    ],"


def keywords_block(kws):
    return "    keywords: [\n" + "".join(f"      {j(k)},\n" for k in kws) + "    ],"


def sections_block(sections):
    lines = ["    sections: ["]
    for sec in sections:
        lines.append("      {")
        lines.append(f"        heading: {j(sec['heading'])},")
        lines.append("        paragraphs: [")
        for p in sec["paragraphs"]:
            lines.append(f"          {j(p)},")
        lines.append("        ],")
        if sec.get("bullets"):
            lines.append("        bullets: [")
            for b in sec["bullets"]:
                lines.append(f"          {j(b)},")
            lines.append("        ],")
        lines.append("      },")
    lines.append("    ],")
    return "\n".join(lines)


def aarti_post(
    slug,
    title,
    excerpt,
    published,
    read_time,
    image,
    accent,
    alt,
    keywords,
    path,
    intro,
    timing_bullets,
    puja_bullets,
    faq,
    related,
    links,
    extra_sections=None,
):
    sections = [
        {
            "heading": "आरती का महत्व",
            "paragraphs": [intro],
        },
        {
            "heading": "सम्पूर्ण आरती पाठ (शुद्ध हिंदी)",
            "paragraphs": [path],
        },
        {
            "heading": "आरती कब करें?",
            "paragraphs": ["निम्न समयों में इस आरती का विशेष महत्व माना जाता है:"],
            "bullets": timing_bullets,
        },
        {
            "heading": "पूजा विधि (संक्षेप)",
            "paragraphs": ["श्रद्धा और स्वच्छता के साथ निम्न क्रम अपनाएँ:"],
            "bullets": puja_bullets,
        },
    ]
    if extra_sections:
        sections.extend(extra_sections)

    return f"""  {{
    slug: {j(slug)},
    title: {j(title)},
    excerpt: {j(excerpt)},
    category: "Aarti",
    publishedAt: {j(published)},
    updatedAt: "2026-06-22",
    readTime: {j(read_time)},
    author: "Rajat Gupta",
    imageSrc: {j(image)},
    imageObjectPosition: "center",
    heroAccent: {j(accent)},
    featuredLabel: "आरती",
    imageAlt: {j(alt)},
    galleryImages: [
      {{ src: {j(image)}, alt: {j(alt)} }},
    ],
{keywords_block(keywords)}
{faq_block(faq)}
{sections_block(sections)}
{related_block(related)}
{links_block(links)}
  }},"""


def savan_post(txt):
    mahatva = extract(txt, "॥ महत्त्व ॥", "॥ व्रत विधि ॥")
    vidhi = extract(txt, "॥ व्रत विधि ॥", "॥ व्रत में क्या खाएँ ॥")
    khaye = extract(txt, "॥ व्रत में क्या खाएँ ॥", "॥ व्रत में क्या न करें ॥")
    na_kare = extract(txt, "॥ व्रत में क्या न करें ॥", "॥ सावन सोमवार व्रत कथा ॥")
    katha = extract(txt, "॥ सावन सोमवार व्रत कथा ॥", "॥ सावन सोमवार व्रत का फल ॥")
    phal = extract(txt, "॥ सावन सोमवार व्रत का फल ॥", "॥ शिव पञ्चाक्षर मंत्र ॥")
    panch = extract(txt, "॥ शिव पञ्चाक्षर मंत्र ॥", "॥ महामृत्युञ्जय मंत्र ॥")
    maha = extract(txt, "॥ महामृत्युञ्जय मंत्र ॥", "================================================================\n                    ॥ इति सम्पूर्णम् ॥")

    def bullets_from_block(block):
        items = []
        for line in block.split("\n"):
            s = line.strip()
            if s.startswith("•"):
                items.append(s[1:].strip())
            elif re.match(r"^[०-९]+\.", s):
                items.append(s)
        return items

    sections = [
        {"heading": "सावन सोमवार व्रत का महत्त्व", "paragraphs": [mahatva]},
        {
            "heading": "सावन सोमवार व्रत विधि (चरणबद्ध)",
            "paragraphs": ["शास्त्रानुसार सावन सोमवार व्रत इस प्रकार रखें:"],
            "bullets": bullets_from_block(vidhi),
        },
        {
            "heading": "व्रत में क्या खाएँ",
            "paragraphs": ["फलाहार व्रत में निम्न सात्विक भोजन ग्रहण किया जा सकता है:"],
            "bullets": bullets_from_block(khaye),
        },
        {
            "heading": "व्रत में क्या न करें",
            "paragraphs": ["व्रत के दौरान इन बातों का विशेष ध्यान रखें:"],
            "bullets": bullets_from_block(na_kare),
        },
        {"heading": "सावन सोमवार व्रत कथा", "paragraphs": [katha]},
        {
            "heading": "सावन सोमवार व्रत का फल",
            "paragraphs": ["श्रद्धापूर्वक व्रत करने से ये लाभ प्राप्त होते हैं:"],
            "bullets": bullets_from_block(phal),
        },
        {"heading": "शिव पञ्चाक्षर मंत्र", "paragraphs": [panch.strip()]},
        {"heading": "महामृत्युञ्जय मंत्र", "paragraphs": [maha.strip()]},
    ]

    faq = [
        (
            "सावन सोमवार व्रत कब रखें?",
            "श्रावण (सावन) मास के प्रत्येक सोमवार को। कुछ भक्त १६ सोमवार व्रत की परंपरा भी अपनाते हैं।",
        ),
        (
            "सावन सोमवार व्रत में क्या खाया जा सकता है?",
            "फल, दूध, दही, साबूदाना, सिंघाड़े का आटा, कुट्टू की रोटी, शकरकंद और आलू — सेंधा नमक के साथ।",
        ),
        (
            "सावन व्रत में क्या नहीं करना चाहिए?",
            "प्याज, लहसुन, माँस, मदिरा, असत्य बोलना, क्रोध, नाखून-बाल काटना और तामसिक भोजन से बचें।",
        ),
        (
            "सावन सोमवार व्रत की पूजा विधि क्या है?",
            "ब्रह्ममुहूर्त में स्नान, पञ्चामृत अभिषेक, बेलपत्र अर्पण, ॐ नमः शिवाय जाप, शिव चालीसा और शिव आरती — फिर फलाहार या निर्जला व्रत।",
        ),
        (
            "सावन सोमवार व्रत के क्या फल मिलते हैं?",
            "विवाह बाधा दूर, संतान सुख, रोग-दोष से मुक्ति, घर में सुख-शांति, मनोकामना पूर्ण और आयु-आरोग्य की वृद्धि।",
        ),
    ]

    keywords = [
        "savan somvar vrat",
        "सावन सोमवार व्रत",
        "savan somvar vrat vidhi",
        "सावन सोमवार व्रत विधि",
        "savan vrat katha",
        "सावन व्रत कथा",
        "savan 2026",
        "shravan somvar vrat",
        "सावन व्रत नियम",
        "savan somvar vrat kya khaye",
        "श्रावण मास व्रत",
        "sawan somwar vrat",
        "savan somvar puja vidhi hindi",
        "सावन सोमवार व्रत फल",
    ]

    links = [
        ("🪔 सम्पूर्ण आरती संग्रह", HUB),
        ("शिव आरती — ॐ जय शिव ओमकारा", "/blog/shiv-aarti-om-jai-shiv-omkara"),
        ("शिव चालीसा संपूर्ण पाठ", "/blog/shiv-chalisa-hindi-sampoorna"),
        ("सभी व्रत और कथा", "/category/vrat-katha"),
    ]

    return f"""  {{
    slug: "savan-somvar-vrat-vidhi-2026",
    title: "सावन सोमवार व्रत विधि 2026 | पूजा, कथा, नियम — हिंदी में",
    excerpt: "सावन सोमवार व्रत की सम्पूर्ण विधि, कथा, क्या खाएँ, नियम, फल और शिव मंत्र — शुद्ध हिंदी में एक ही पृष्ठ पर।",
    category: "Vrat & Katha",
    publishedAt: "2026-06-24",
    updatedAt: "2026-06-22",
    readTime: "१० मिनट",
    author: "Rajat Gupta",
    imageSrc: "/images/blog/savan-somvar-vrat-cover.svg",
    imageObjectPosition: "center",
    heroAccent: "from-emerald-600 via-teal-600 to-green-500",
    featuredLabel: "व्रत मार्गदर्शिका",
    imageAlt: "सावन सोमवार व्रत विधि २०२६ हिंदी मार्गदर्शिका",
    galleryImages: [
      {{ src: "/images/blog/savan-somvar-vrat-cover.svg", alt: "सावन सोमवार व्रत विधि कवर" }},
    ],
{keywords_block(keywords)}
{faq_block(faq)}
{sections_block(sections)}
{related_block(["shiv-aarti-om-jai-shiv-omkara", "shiv-chalisa-hindi-sampoorna", "hanuman-aarti-hindi-sampoorna", "durga-aarti-jai-ambe-gauri"])}
{links_block(links)}
  }},"""


SHIV_CHALISA = r'''  {
    slug: "shiv-chalisa-hindi-sampoorna",
    title: "शिव चालीसा हिंदी में | संपूर्ण पाठ, लिरिक्स — सोमवार सावन",
    excerpt: "शिव चालीसा का संपूर्ण हिंदी पाठ, सरल अर्थ, सोमवार और सावन सोमवार पर पाठ का समय, नियम और भक्ति के लाभ।",
    category: "Chalisa",
    publishedAt: "2026-06-23",
    updatedAt: "2026-06-22",
    readTime: "१० मिनट",
    author: "Rajat Gupta",
    imageSrc: "/images/blog/shiv-chalisa-cover.svg",
    imageObjectPosition: "center",
    heroAccent: "from-slate-700 via-blue-800 to-indigo-900",
    featuredLabel: "चालीसा",
    imageAlt: "शिव चालीसा हिंदी संपूर्ण पाठ",
    galleryImages: [
      { src: "/images/blog/shiv-chalisa-cover.svg", alt: "शिव चालीसा संपूर्ण पाठ" },
    ],
    keywords: [
      "shiv chalisa",
      "शिव चालीसा",
      "shiv chalisa hindi",
      "शिव चालीसा हिंदी में",
      "shiv chalisa path",
      "शिव चालीसा पाठ",
      "shiv chalisa lyrics",
      "somvar shiv chalisa",
      "savan somvar chalisa",
      "mahashivratri chalisa",
      "शिव चालीसा लाभ",
      "shiv chalisa sampoorna",
      "हर हर महादेव चालीसा",
    ],
    faq: [
      {
        question: "शिव चालीसा कब पढ़नी चाहिए?",
        answer: "सोमवार, महाशिवरात्रि, सावन के सोमवार और प्रदोष काल में विशेष महत्व है। सुबह स्नान के बाद या शाम की पूजा में पाठ करें।",
      },
      {
        question: "क्या शिव चालीसा रोज पढ़ सकते हैं?",
        answer: "हाँ, श्रद्धा के साथ रोजाना शिव चालीसा का पाठ किया जा सकता है। बहुत से भक्त सुबह ॐ नमः शिवाय के साथ चालीसा पढ़ते हैं।",
      },
      {
        question: "शिव चालीसा और शिव आरती में क्या अंतर है?",
        answer: "चालीसा ४० चौपाइयों का विस्तृत पाठ है, जबकि आरती छोटी दीप-स्तुति है। सावन व्रत में दोनों एक साथ पढ़े जाते हैं।",
      },
      {
        question: "सावन सोमवार व्रत में शिव चालीसा पढ़ें?",
        answer: "हाँ — सावन सोमवार व्रत विधि में शिव चालीसा और शिव आरती दोनों का पाठ शास्त्रानुसार किया जाता है।",
      },
      {
        question: "शिव चालीसा पढ़ने के क्या लाभ माने जाते हैं?",
        answer: "मन की शांति, पाप कम होना, महादेव की कृपा और आत्मिक शुद्धि — ये प्रमुख लाभ माने जाते हैं।",
      },
    ],
    sections: [
      {
        heading: "शिव चालीसा का महत्व",
        paragraphs: [
          "शिव चालीसा महादेव की ४० चौपाइयों की स्तुति है। सोमवार, सावन और महाशिवरात्रि पर इसका पाठ विशेष रूप से किया जाता है।",
        ],
      },
      {
        heading: "शिव चालीसा संपूर्ण पाठ (हिंदी)",
        paragraphs: [
          `दोहा:\nजय गणेश गिरिजा सुवन, मंगल मूल सुजान।\nकहत अयोध्यादास तुम, देहु अभय वरदान॥\n\nचौपाई:\nजय गिरिजा पति दीन दयाला।\nसदा करत संत हित भला॥\n\nमाया गर्व मिटे मोह भ्रमा।\nभई रोग दुःख अरु चिंता॥\n\nजय गिरिजा पति जय भवानी।\nजय शिव शंकर जय महेश्वरी॥\n\nजय त्रिनेत्र जय चन्द्रकलाधरी।\nजय गंगा धर जय भुज बल धरी॥\n\nजय शंकर जय शम्भू जय महादेव।\nजय शिव जय शम्भू जय गिरिजा पति॥\n\nनमामि शमीशान निर्वाण रूपम।\nविभुम व्यापकम ब्रह्म वेद स्वरूपम॥\n\nकर्पूर गौरम करुणावतारम।\nसंसार सारम भुजगेन्द्र हरम॥\n\nशिव शिव शिव शिव शिव शिव शिव शम्भो।\nमहादेव शम्भो, महादेव शम्भो॥\n\nदोहा:\nशिव शम्भो महादेव शम्भो।\nहर हर महादेव, हर हर महादेव॥`,
        ],
      },
      {
        heading: "शिव चालीसा कब पढ़ें?",
        paragraphs: ["निम्न समयों में शिव चालीसा का विशेष महत्व है:"],
        bullets: [
          "प्रत्येक सोमवार — सुबह या शाम",
          "सावन के सभी सोमवार",
          "महाशिवरात्रि की रात",
          "प्रदोष काल (सूर्यास्त के बाद)",
        ],
      },
    ],
    relatedSlugs: [
      "shiv-aarti-om-jai-shiv-omkara",
      "savan-somvar-vrat-vidhi-2026",
      "hanuman-aarti-hindi-sampoorna",
      "durga-aarti-jai-ambe-gauri",
    ],
    internalLinks: [
      { label: "🪔 सम्पूर्ण आरती संग्रह", href: "/aarti-sangrah" },
      { label: "शिव आरती — ॐ जय शिव ओमकारा", href: "/blog/shiv-aarti-om-jai-shiv-omkara" },
      { label: "सावन सोमवार व्रत विधि", href: "/blog/savan-somvar-vrat-vidhi-2026" },
      { label: "सभी चालीसा", href: "/category/chalisa" },
    ],
  },'''


def main():
    txt = TXT.read_text()
    hanuman = extract(txt, "१. श्री हनुमान आरती", "२. श्री लक्ष्मी")
    lakshmi = extract(txt, "२. श्री लक्ष्मी आरती", "३. श्री गणेश")
    ganesh = extract(txt, "३. श्री गणेश आरती", "४. श्री शिव")
    shiv = extract(txt, "४. श्री शिव आरती", "५. श्री दुर्गा")
    durga = extract(txt, "५. श्री दुर्गा आरती", "६. सावन सोमवार")

    common_links = [
        ("🪔 सम्पूर्ण आरती संग्रह", HUB),
        ("हनुमान आरती", "/blog/hanuman-aarti-hindi-sampoorna"),
        ("लक्ष्मी आरती", "/blog/lakshmi-aarti-hindi-lyrics"),
        ("गणेश आरती", "/blog/ganesh-aarti-jai-ganesh-deva"),
        ("शिव आरती", "/blog/shiv-aarti-om-jai-shiv-omkara"),
        ("दुर्गा आरती", "/blog/durga-aarti-jai-ambe-gauri"),
        ("सावन सोमवार व्रत", "/blog/savan-somvar-vrat-vidhi-2026"),
    ]

    def links_for(slug):
        return [l for l in common_links if slug not in l[1]]

    puja = [
        "प्रातः स्नान कर स्वच्छ वस्त्र धारण करें।",
        "पूजा-स्थली स्वच्छ कर दीपक और धूप जलाएँ।",
        "फूल, प्रसाद और श्रद्धा से अर्पण करें।",
        "आरती पूर्ण कर अंत में प्रसाद वितरित करें।",
    ]

    parts = [
        aarti_post(
            "hanuman-aarti-hindi-sampoorna",
            "हनुमान आरती हिंदी में | आरती कीजै हनुमान लला की — मंगलवार शनिवार",
            "आरती कीजै हनुमान लला की — शुद्ध हिंदी में सम्पूर्ण हनुमान जी की आरती। मंगलवार, शनिवार पूजा, पूरा पाठ और विधि।",
            "2026-06-18",
            "७ मिनट",
            "/images/blog/hanuman-aarti-cover.svg",
            "from-orange-600 via-red-600 to-amber-500",
            "हनुमान आरती संपूर्ण हिंदी पाठ लिरिक्स",
            [
                "hanuman aarti",
                "hanuman aarti hindi",
                "hanuman aarti lyrics",
                "hanuman aarti hindi mein",
                "hanuman ji ki aarti",
                "hanuman aarti path",
                "आरती कीजै हनुमान लला की",
                "हनुमान आरती",
                "हनुमान जी की आरती",
                "हनुमान आरती हिंदी में",
                "मंगलवार हनुमान आरती",
                "शनिवार हनुमान पूजा",
                "bajrangbali aarti",
                "hanuman aarti sangrah",
            ],
            hanuman,
            "श्री हनुमान जी की आरती मंगलवार और शनिवार को विशेष रूप से की जाती है। यह तुलसीदास जी की कीर्ति सहित शुद्ध देवनागरी पाठ है — भारत में सबसे अधिक खोजी जाने वाली हनुमान आरती।",
            ["प्रत्येक मंगलवार", "प्रत्येक शनिवार", "हनुमान जयंती", "शुभ कार्य से पूर्व", "संकट में श्रद्धापूर्वक"],
            puja
            + [
                "लाल या पीले फूल, सिंदूर, गुड़-चना या लड्डू अर्पित करें।",
                "हनुमान चालीसा पाठ के बाद आरती करें।",
            ],
            [
                (
                    "हनुमान जी की आरती कब करें?",
                    "मंगलवार और शनिवार को विशेष। हनुमान जयंती, सुबह-संध्या पूजा और शुभ कार्य से पूर्व भी।",
                ),
                (
                    "हनुमान आरती hindi mein poora path?",
                    "हाँ — इस पेज पर तुलसीदास की अंतिम पंक्ति सहित शुद्ध पाठ है।",
                ),
                (
                    "आरती कीजै हनुमान लला की lyrics?",
                    "ऊपर सम्पूर्ण देवनागरी पाठ दिया गया है।",
                ),
                (
                    "हनुमान आरती और चालीसा कब पढ़ें?",
                    "पहले हनुमान चालीसा, अंत में आरती — सर्वोत्तम विधि।",
                ),
                (
                    "हनुमान आरती के क्या लाभ हैं?",
                    "साहस, संकट-मोचन, रोग-शत्रु से रक्षा और श्रीराम-भक्ति की प्राप्ति।",
                ),
            ],
            [
                "hanuman-chalisa-in-hindi-sampoorna-path",
                "shiv-aarti-om-jai-shiv-omkara",
                "ganesh-aarti-jai-ganesh-deva",
                "lakshmi-aarti-hindi-lyrics",
            ],
            links_for("hanuman-aarti"),
        ),
        aarti_post(
            "lakshmi-aarti-hindi-lyrics",
            "लक्ष्मी आरती हिंदी में | ॐ जय लक्ष्मी माता — शुक्रवार पूजा",
            "ॐ जय लक्ष्मी माता — शुद्ध हिंदी में सम्पूर्ण लक्ष्मी माता की आरती। शुक्रवार, दीपावली पूजा और धन-समृद्धि की भक्ति।",
            "2026-06-19",
            "६ मिनट",
            "/images/blog/lakshmi-aarti-cover.svg",
            "from-yellow-500 via-amber-400 to-orange-300",
            "लक्ष्मी माता आरती ॐ जय लक्ष्मी माता हिंदी",
            [
                "lakshmi aarti",
                "lakshmi aarti hindi",
                "om jai lakshmi mata",
                "ॐ जय लक्ष्मी माता",
                "लक्ष्मी आरती",
                "लक्ष्मी माता की आरती",
                "लक्ष्मी आरती हिंदी में",
                "शुक्रवार लक्ष्मी पूजा",
                "lakshmi aarti lyrics",
                "दीपावली लक्ष्मी आरती",
                "mahalakshmi aarti",
                "lakshmi aarti path",
            ],
            lakshmi,
            "माता लक्ष्मी की आरती शुक्रवार को विशेष रूप से की जाती है। ॐ जय लक्ष्मी माता भारत की सबसे लोकप्रिय धन-समृद्धि की आरती है।",
            ["प्रत्येक शुक्रवार", "दीपावली और धनतेरस", "नए व्यवसाय के शुभारंभ पर", "घर की दैनिक संध्या पूजा"],
            puja
            + [
                "लाल या गुलाबी फूल, कमल, सिक्के और मिष्ठान चढ़ाएँ।",
                "दीपक, धूप और कपूर की आरती करें।",
            ],
            [
                (
                    "लक्ष्मी आरती किस दिन करनी चाहिए?",
                    "शुक्रवार को विशेष। दीपावली, धनतेरस और शुभ अवसरों पर भी।",
                ),
                (
                    "ॐ जय लक्ष्मी mata poora path?",
                    "हाँ — इस पेज पर शुद्ध हिंदी में सम्पूर्ण पाठ है।",
                ),
                (
                    "लक्ष्मी आरती में कौन से फूल चढ़ाएं?",
                    "लाल या गुलाबी गुलाब, कमल के फूल और माला।",
                ),
                (
                    "क्या लक्ष्मी आरती रोज की जा सकती है?",
                    "हाँ, श्रद्धा के साथ रोजाना की जा सकती है।",
                ),
                (
                    "लक्ष्मी आरती के क्या लाभ हैं?",
                    "धन, समृद्धि, शांति और घर में सकारात्मक ऊर्जा।",
                ),
            ],
            [
                "hanuman-aarti-hindi-sampoorna",
                "durga-aarti-jai-ambe-gauri",
                "ganesh-aarti-jai-ganesh-deva",
                "shiv-aarti-om-jai-shiv-omkara",
            ],
            links_for("lakshmi-aarti"),
        ),
        aarti_post(
            "ganesh-aarti-jai-ganesh-deva",
            "गणेश आरती हिंदी में | जय गणेश देवा — प्रथम पूज्य",
            "जय गणेश जय गणेश देवा — शुद्ध हिंदी में सम्पूर्ण गणेश जी की आरती। हर शुभ कार्य, गणेश चतुर्थी और बुधवार पूजा।",
            "2026-06-21",
            "६ मिनट",
            "/images/blog/ganesh-aarti-cover.svg",
            "from-red-600 via-orange-500 to-yellow-400",
            "गणेश आरती जय गणेश देवा हिंदी",
            [
                "ganesh aarti",
                "ganesh aarti hindi",
                "jai ganesh deva",
                "जय गणेश देवा",
                "गणेश आरती",
                "गणेश जी की आरती",
                "गणेश आरती हिंदी में",
                "ganesh chaturthi aarti",
                "ganesh aarti lyrics",
                "विघ्नहर्ता आरती",
                "ganesh aarti path",
                "ganesh ji ki aarti",
            ],
            ganesh,
            "गणेश जी को प्रथम पूज्य माना जाता है — हर शुभ कार्य की शुरुआत में जय गणेश देवा आरती अनिवार्य है।",
            ["गणेश चतुर्थी — १० दिन", "प्रत्येक बुधवार", "शुभ कार्य से पूर्व", "सुबह की पूजा की शुरुआत में"],
            puja
            + [
                "मोदक, लड्डू, दूर्वा और लाल फूल चढ़ाएँ।",
                "विघ्नहर्ता से नए कार्य की सफलता की प्रार्थना करें।",
            ],
            [
                (
                    "गणेश आरती कब करनी चाहिए?",
                    "गणेश चतुर्थी, बुधवार और किसी भी शुभ कार्य की शुरुआत में।",
                ),
                (
                    "जय ganesh deva poora path?",
                    "हाँ — शुद्ध हिंदी में सम्पूर्ण पाठ ऊपर दिया गया है।",
                ),
                (
                    "गणेश आरती में क्या चढ़ावा दें?",
                    "मोदक, लड्डू, दूर्वा, लाल फूल और जल।",
                ),
                (
                    "क्या गणेश आरती हर दिन की जा सकती है?",
                    "हाँ — दैनिक पूजा की शुरुआत में अत्यंत शुभ।",
                ),
                (
                    "गणेश आरती के क्या लाभ हैं?",
                    "विघ्न दूर, बuddhi वृद्धि और नए कार्य की सफलता।",
                ),
            ],
            [
                "durga-aarti-jai-ambe-gauri",
                "lakshmi-aarti-hindi-lyrics",
                "shiv-aarti-om-jai-shiv-omkara",
                "hanuman-aarti-hindi-sampoorna",
            ],
            links_for("ganesh-aarti"),
        ),
        aarti_post(
            "shiv-aarti-om-jai-shiv-omkara",
            "शिव आरती हिंदी में | ॐ जय शिव ओमकारा — सोमवार सावन",
            "ॐ जय शिव ओमकारा — शुद्ध हिंदी में सम्पूर्ण शिव जी की आरती। सोमवार, महाशिवरात्रि और सावन सोमवार पूजा।",
            "2026-06-20",
            "७ मिनट",
            "/images/blog/shiv-aarti-cover.svg",
            "from-blue-700 via-indigo-700 to-slate-600",
            "शिव आरती ॐ जय शिव ओमकारा हिंदी",
            [
                "shiv aarti",
                "shiv aarti hindi",
                "om jai shiv omkara",
                "ॐ जय शिव ओमकारा",
                "शिव आरती",
                "शिव जी की आरती",
                "शिव आरती हिंदी में",
                "सोमवार शिव आरती",
                "savan somvar shiv aarti",
                "shiv aarti lyrics",
                "महाशिवरात्रि आरती",
                "shiv aarti path",
            ],
            shiv,
            "ॐ जय शिव ओमकारा भगवान शिव की सबसे प्रसिद्ध आरती है। सोमवार, महाशिवरात्रि और सावन के सोमवार को विशेष महत्व।",
            ["प्रत्येक सोमवार", "सावन के सोमवार", "महाशिवरात्रि", "प्रदोष काल (संध्या)"],
            puja
            + [
                "शिवलिंग पर जल, दूध, बेलपत्र और फूल चढ़ाएँ।",
                "ॐ नमः शिवाय जाप और शिव चालीसा के बाद आरती करें।",
            ],
            [
                (
                    "शिव आरती कब गाई जाती है?",
                    "सोमवार, महाशिवरात्रि, प्रदोष काल और सावन के सोमवार को।",
                ),
                (
                    "ॐ jai shiv omkara poora path?",
                    "हाँ — शुद्ध हिंदी में सम्पूर्ण पाठ इस पेज पर है।",
                ),
                (
                    "घर पर शिव आरती कैसे करें?",
                    "दीपक, बेलपत्र, जल चढ़ाकर आरती पढ़ें — हर हर महादेव।",
                ),
                (
                    "शिव आरती और शिव चालीसा?",
                    "दोनों शिव भक्ति के महत्वपूर्ण अंग — सावन व्रत में एक साथ पढ़ें।",
                ),
                (
                    "शिव आरती के क्या लाभ हैं?",
                    "मन की शांति, पाप कम होना और महादेव की कृपा।",
                ),
            ],
            [
                "shiv-chalisa-hindi-sampoorna",
                "savan-somvar-vrat-vidhi-2026",
                "hanuman-aarti-hindi-sampoorna",
                "durga-aarti-jai-ambe-gauri",
            ],
            links_for("shiv-aarti"),
        ),
        aarti_post(
            "durga-aarti-jai-ambe-gauri",
            "दुर्गा आरती हिंदी में | जय अम्बे गौरी — नवरात्रि",
            "जय अम्बे गौरी — शुद्ध हिंदी में सम्पूर्ण माँ दुर्गा की आरती। नवरात्रि, शुक्रवार और शक्ति उपासना।",
            "2026-06-22",
            "८ मिनट",
            "/images/blog/durga-aarti-cover.svg",
            "from-pink-600 via-rose-600 to-red-500",
            "दुर्गा आरती जय अम्बे गौरी हिंदी",
            [
                "durga aarti",
                "durga aarti hindi",
                "jai ambe gauri",
                "जय अम्बे गौरी",
                "दुर्गा आरती",
                "माँ दुर्गा की आरती",
                "दुर्गा आरती हिंदी में",
                "navratri aarti",
                "नवरात्रि आरती",
                "ambe maa aarti",
                "durga aarti lyrics",
                "durga aarti path",
            ],
            durga,
            "जय अम्बे गौरी माँ दुर्गा की सबसे प्रसिद्ध आरती है। नवरात्रि के ९ दिन और शुक्रवार को विशेष रूप से गाई जाती है।",
            ["नवरात्रि — ९ दिन प्रतिदिन", "शुक्रवार और मंगलवार", "विजयदशमी", "कन्या पूजन"],
            puja
            + [
                "माँ की मूर्ति को फूल, चुनरी और श्रृंगार से सजाएँ।",
                "घंटी बजाकर जय माता दी का उच्चारण करें।",
            ],
            [
                (
                    "दुर्गा आरती कब गाई जाती है?",
                    "नवरात्रि के ९ दिन, शुक्रवार और मंगलवार को।",
                ),
                (
                    "jai ambe gauri poora path?",
                    "हाँ — विस्तृत शुद्ध हिंदी पाठ इस पेज पर है।",
                ),
                (
                    "नवरात्रि में आरती कैसे करें?",
                    "घट स्थापना के बाद ९ दिन सुबह-शाम आरती करें।",
                ),
                (
                    "जय अम्बे गौरी किस माँ की आरती है?",
                    "माँ दुर्गा (अंबिका, गौरी, पार्वती) की प्रचलित आरती।",
                ),
                (
                    "दुर्गा आरती के क्या लाभ हैं?",
                    "शक्ति, साहस, रक्षा और मन की शांति।",
                ),
            ],
            [
                "lakshmi-aarti-hindi-lyrics",
                "ganesh-aarti-jai-ganesh-deva",
                "hanuman-aarti-hindi-sampoorna",
                "shiv-aarti-om-jai-shiv-omkara",
            ],
            links_for("durga-aarti"),
        ),
        SHIV_CHALISA,
        savan_post(txt),
    ]

    content = "import type { Post } from \"./types\";\n\nexport const bhaktiPosts: Post[] = [\n" + "\n".join(parts) + "\n];\n"
    OUT.write_text(content, encoding="utf-8")
    print(f"Wrote {OUT} ({len(content)} bytes)")


if __name__ == "__main__":
    main()
