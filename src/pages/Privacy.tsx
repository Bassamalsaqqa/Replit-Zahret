import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Privacy() {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 prose dark:prose-invert">
      <h1 className="text-4xl font-bold text-foreground mb-8">
        {t("سياسة الخصوصية", "Privacy Policy")}
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        {t(
          "تلتزم جمعية زهرة المدائن لتنمية وتطوير المجتمع الفلسطيني باحترام وحماية خصوصية مستخدمي موقعها الإلكتروني وشركائها والمستفيدين من خدماتها.",
          "Zahrat Al-Madain Association for the Development of Palestinian Society is committed to respecting and protecting the privacy of its website users, partners, and beneficiaries."
        )}
      </p>
      
      <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
        {t("جمع المعلومات واستخدامها", "Information Collection and Use")}
      </h2>
      <p className="text-muted-foreground mb-4">
        {t(
          "نحن لا نجمع أي معلومات شخصية عنك عندما تزور موقعنا إلا إذا اخترت تقديم هذه المعلومات لنا طوعًا (على سبيل المثال من خلال نماذج التطوع أو التبرع أو الاتصال).",
          "We do not collect any personal information about you when you visit our website unless you choose to provide that information to us voluntarily (for example, through volunteering, donation, or contact forms)."
        )}
      </p>
      
      <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
        {t("حماية البيانات", "Data Protection")}
      </h2>
      <p className="text-muted-foreground mb-4">
        {t(
          "نتخذ إجراءات أمنية مناسبة لحماية بياناتك الشخصية من الوصول غير المصرح به أو التعديل أو الإفصاح. لا نقوم ببيع أو تأجير أو مشاركة معلوماتك مع جهات خارجية دون موافقتك الصريحة.",
          "We take appropriate security measures to protect your personal data against unauthorized access, alteration, or disclosure. We do not sell, rent, or share your information with third parties without your explicit consent."
        )}
      </p>

      <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">
        {t("تحديثات السياسة", "Policy Updates")}
      </h2>
      <p className="text-muted-foreground mb-4">
        {t(
          "قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سيتم نشر أي تغييرات على هذه الصفحة.",
          "We may update this privacy policy from time to time. Any changes will be posted on this page."
        )}
      </p>
    </div>
  );
}
