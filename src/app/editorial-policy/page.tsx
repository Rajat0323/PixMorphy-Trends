import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "संपादकीय नीति",
  description: "पिक्समॉर्फी संपादकीय मानक, तथ्य-जाँच दृष्टिकोण और सुधार नीति।",
  alternates: {
    canonical: "/editorial-policy",
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8">
        <SectionHeading
          as="h1"
          eyebrow="संपादकीय नीति"
          title="तथ्य-जाँच, श्रेय और सुधार कार्यप्रणाली"
          description="पिक्समॉर्फी के विश्वास सिद्धांत जो हर प्रकाशित लेख पर लागू होते हैं।"
        />
        <div className="mt-8 space-y-5 text-sm leading-8 text-[color:var(--text-secondary)] sm:text-base">
          <p>
            हर लेख में लेखक का नाम, प्रकाशन तिथि और अद्यतन तिथि स्पष्ट रूप से दी जाती है।
            जहाँ प्रासंगिक हों, स्रोतों का स्पष्ट उल्लेख किया जाता है।
          </p>
          <p>
            हम भ्रामक शीर्षकों से बचते हैं और पाठकों के लिए व्यावहारिक मूल्य को प्राथमिकता
            देते हैं। प्रायोजित या सहबद्ध सामग्री अलग से पहचानी जाती है।
          </p>
          <p>
            यदि किसी तथ्य में त्रुटि मिले, तो हम २४–४८ घंटे के भीतर समीक्षा करके सुधार
            अपडेट करते हैं।{" "}
            <Link href="/contact" className="text-[color:var(--accent)]">
              संपर्क पृष्ठ
            </Link>{" "}
            के माध्यम से सूचित करें।
          </p>
        </div>
      </div>
    </div>
  );
}
