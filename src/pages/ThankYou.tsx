import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThankYou() {
  const { t } = useLanguage();

  return (
    <div className="w-full flex-grow flex items-center justify-center py-24 px-4 bg-muted/20">
      <div className="max-w-md w-full bg-card border border-border rounded-3xl p-10 text-center shadow-xl">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">
          {t("شكراً لك!", "Thank You!")}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          {t(
            "تم استلام طلبك بنجاح. سيقوم فريقنا بمراجعة التفاصيل والتواصل معك قريباً.",
            "Your request has been received successfully. Our team will review the details and contact you soon."
          )}
        </p>
        <Link href="/">
          <Button className="w-full h-14 text-lg rounded-xl">
            {t("العودة للرئيسية", "Return Home")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
