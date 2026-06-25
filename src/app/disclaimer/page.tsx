import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "अस्वीकरण",
  description: "पिक्समॉर्फी अस्वीकरण — संपादकीय सामग्री, सहबद्ध लिंक और सूचनात्मक सटीकता।",
  alternates: {
    canonical: "/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8">
        <SectionHeading
          as="h1"
          eyebrow="अस्वीकरण"
          title="सामग्री की सटीकता, सहबद्ध उल्लेख और दायित्व सूचना"
          description="पाठकों के लिए महत्वपूर्ण पारदर्शिता बिंदु।"
        />
        <div className="mt-8 space-y-5 text-sm leading-8 text-[color:var(--text-secondary)] sm:text-base">
          <p>
            पिक्समॉर्फी के लेख सूचनात्मक और शैक्षिक उद्देश्य के लिए हैं। तकनीकी अपडेट, मूल्य,
            ऐप सुविधाएँ और समाचार समय के साथ बदल सकते हैं।
          </p>
          <p>
            ऑनलाइन कमाई, निवेश या उत्पाद सिफ़ारिश मार्गदर्शिकाएँ व्यक्तिगत शोध के बाद ही
            अपनाएँ। पिक्समॉर्फी वित्तीय सलाह प्रदान नहीं करता।
          </p>
          <p>
            कुछ लेखों में सहबद्ध या प्रायोजित स्थान हो सकते हैं। ऐसी सामग्री स्पष्ट रूप से
            चिह्नित रहेगी।
          </p>
          <p>
            सुधार के लिए{" "}
            <Link href="/contact" className="text-[color:var(--accent)]">
              संपर्क करें
            </Link>{" "}
            या{" "}
            <Link href="/editorial-policy" className="text-[color:var(--accent)]">
              संपादकीय नीति
            </Link>{" "}
            देखें।
          </p>
        </div>
      </div>
    </div>
  );
}
