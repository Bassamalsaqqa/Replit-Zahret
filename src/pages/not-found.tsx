import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[70vh] py-16 px-4 bg-background text-center">
      <AlertCircle className="w-24 h-24 text-muted mb-8" />
      <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
      <p className="text-2xl text-muted-foreground mb-8">
        {t("عذراً، الصفحة غير موجودة.", "Sorry, the page was not found.")}
      </p>
      <Link href="/">
        <Button size="lg" className="rounded-full px-8">
          {t("العودة للرئيسية", "Return Home")}
        </Button>
      </Link>
    </div>
  );
}
