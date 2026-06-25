import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "हमारे बारे में",
  description:
    "पिक्समॉर्फी भक्ति के बारे में — हिंदी आरती, चालीसा, व्रत और त्योहार सामग्री का उद्देश्य और संपादकीय ध्यान।",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8">
        <SectionHeading
          as="h1"
          eyebrow="पिक्समॉर्फी भक्ति"
          title="हिंदी भक्तों के लिए साफ़ आरती, चालीसा और त्योहार मार्गदर्शिकाएँ"
          description="पिक्समॉर्फी भक्ति भारत के परिवार और युवा भक्तों के लिए मोबाइल के अनुकूल भक्ति सामग्री बनाता है।"
        />
        <div className="mt-8 grid gap-5 text-sm leading-8 text-[color:var(--text-secondary)] sm:text-base">
          <p>
            हम संपूर्ण आरती और चालीसा पाठ देवनागरी में देते हैं, साथ में सरल अर्थ, पूजा नियम और
            अक्सर पूछे जाने वाले प्रश्न — ताकि घर की पूजा और फ़ोन दोनों पर पढ़ना आसान हो।
          </p>
          <p>
            हर लेख में प्रकाशन तिथि, लेखक का नाम और संरचित प्रश्न-उत्तर होता है ताकि पाठकों को
            विश्वसनीय और पढ़ने योग्य सामग्री मिले।
          </p>
          <p>
            हमारा लक्ष्य है कि हर भारतीय भक्त को एक जगह पर सारी ज़रूरी भक्ति जानकारी मिले — बिना
            भ्रम और बिना भ्रामक शीर्षकों के।
          </p>
        </div>
      </div>
    </div>
  );
}
