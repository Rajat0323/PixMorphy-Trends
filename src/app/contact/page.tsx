import type { Metadata } from "next";
import { ContactPageUi } from "@/components/contact-page-ui";

export const metadata: Metadata = {
  title: "संपर्क",
  description: "PixMorphy को सुझाव या सुधार भेजने के लिए संपर्क करें।",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <ContactPageUi />
    </div>
  );
}
