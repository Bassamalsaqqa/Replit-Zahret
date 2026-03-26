import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FileText, ShieldCheck, Scale, Globe } from "lucide-react";

export default function Transparency() {
  const { t } = useLanguage();
  const transparencyHeroImage = `${import.meta.env.BASE_URL}images/transparency/hero/transparency-hero.jpg`;

  const sections = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      titleAr: "الوضع القانوني",
      titleEn: "Legal Status",
      bodyAr: "جمعية مسجلة رسميًا وفق الأطر المعتمدة. ويتم إدراج بيانات التسجيل القانونية الدقيقة بعد مراجعتها واعتمادها للنشر.",
      bodyEn: "An officially registered association operating within the relevant legal framework. Exact registration details should be published once reviewed and approved for release."
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      titleAr: "بيانات التسجيل",
      titleEn: "Registration Information",
      bodyAr: "رقم التسجيل: [يُضاف بعد التحقق]\nجهة التسجيل: [يُضاف بعد التحقق]\nتاريخ التسجيل: [يُضاف بعد التحقق]",
      bodyEn: "Registration Number: [to be added after verification]\nRegistering Authority: [to be added after verification]\nDate of Registration: [to be added after verification]"
    },
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      titleAr: "النطاق الجغرافي",
      titleEn: "Geographic Scope",
      bodyAr: "يرتكز العمل الأساسي للجمعية في القدس والضفة الغربية، مع إمكانية الإشارة إلى علاقات أو شراكات إقليمية وفق ما هو موثق ومعتمد للنشر.",
      bodyEn: "The association’s core work is centered in Jerusalem and the West Bank, with any regional relationships or partnerships described only in line with what is documented and approved for publication."
    },
    {
      icon: <Scale className="w-8 h-8 text-primary" />,
      titleAr: "كيف يوجَّه الدعم",
      titleEn: "How Support Is Directed",
      bodyAr: "يتم توجيه التبرعات والدعم إلى البرامج والاحتياجات ذات الأولوية بما يحقق أثرًا يخدم المستفيدين ويحترم الكرامة والاحتياج الفعلي.",
      bodyEn: "Donations and support are directed to priority programs and needs in a way that maximizes impact, serves beneficiaries, and respects dignity and actual needs."
    }
  ];

  return (
    <div className="w-full flex flex-col">
      <div className="bg-primary text-primary-foreground py-16 lg:py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={transparencyHeroImage} alt="" aria-hidden="true" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-primary/70" />
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img src={`${import.meta.env.BASE_URL}images/pattern-mesh.png`} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            {t("الشفافية والمسؤولية", "Transparency & Accountability")}
          </h1>
          <p className="text-xl text-primary-foreground/90 leading-relaxed">
            {t(
              "نؤمن أن العمل المجتمعي المسؤول يحتاج إلى وضوح ومصداقية ومساءلة. لذلك نسعى إلى تقديم معلومات واضحة حول هوية الجمعية ونطاق عملها وآليات توجيه الدعم بما يخدم أولويات المستفيدين.",
              "We believe responsible community work requires clarity, credibility, and accountability. For that reason, we aim to provide clear information about the association, its scope of work, and how support is directed toward beneficiary priorities."
            )}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid md:grid-cols-2 gap-8">
          {sections.map((sec, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-8 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                {sec.icon}
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{t(sec.titleAr, sec.titleEn)}</h3>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {t(sec.bodyAr, sec.bodyEn)}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-muted/40 border border-border p-8 rounded-2xl text-center">
          <p className="text-muted-foreground">
            {t(
              "نعمل باستمرار على نشر تقاريرنا السنوية والمالية عبر هذه الصفحة لضمان أعلى معايير الشفافية مع مجتمعنا وشركائنا.",
              "We are continuously working to publish our annual and financial reports on this page to ensure the highest standards of transparency with our community and partners."
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
