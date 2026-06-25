import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "गोपनीयता नीति",
  description: "पिक्समॉर्फी गोपनीयता नीति — डेटा संग्रह, कुकीज़, विश्लेषण और उपयोगकर्ता अधिकार।",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8">
        <SectionHeading
          as="h1"
          eyebrow="गोपनीयता नीति"
          title="आपकी गोपनीयता और डेटा प्रबंधन का सरल अवलोकन"
          description="पिक्समॉर्फी पाठकों के लिए पारदर्शी गोपनीयता प्रथाएँ।"
        />
        <div className="mt-8 space-y-5 text-sm leading-8 text-[color:var(--text-secondary)] sm:text-base">
          <p>
            पिक्समॉर्फी बुनियादी विश्लेषण (Google Analytics) का उपयोग करता है ताकि हम साइट
            प्रदर्शन और सामग्री की सहभागिता समझ सकें। विश्लेषण डेटा गुमनाम संग्रहित रूप में
            संसाधित होता है।
          </p>
          <p>
            जब आप संपर्क पृष्ठ पर ईमेल करते हैं, तो वह जानकारी केवल संपादकीय उत्तर के लिए
            उपयोग होती है। हम व्यक्तिगत डेटा नहीं बेचते।
          </p>
          <p>
            तृतीय-पक्ष विज्ञापन प्रदाता जुड़ने पर उनकी कुकीज़ लागू हो सकती हैं। आप ब्राउज़र
            सेटिंग से कुकीज़ नियंत्रित कर सकते हैं।
          </p>
          <p>
            प्रश्नों के लिए{" "}
            <Link href="/contact" className="text-[color:var(--accent)]">
              संपर्क पृष्ठ
            </Link>{" "}
            उपयोग करें या{" "}
            <Link href="/disclaimer" className="text-[color:var(--accent)]">
              अस्वीकरण
            </Link>{" "}
            पढ़ें।
          </p>
        </div>
      </div>
    </div>
  );
}
