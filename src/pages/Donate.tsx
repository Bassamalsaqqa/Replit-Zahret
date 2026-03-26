import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { Heart, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Donate() {
  const { t, language } = useLanguage();
  const [, setLocation] = useLocation();
  const [amount, setAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const predefinedAmounts = [20, 50, 100, 500];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setLocation("/thank-you");
    }, 1200);
  };

  return (
    <div className="w-full bg-muted/20 min-h-[80vh] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
            <Heart className="w-8 h-8 fill-current" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t("تبرّع الآن", "Donate Now")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t(
              "ندعو الأفراد والمؤسسات لدعم برامج تخدم المجتمع الفلسطيني بكرامة. يمكنك دعم مبادراتنا المجتمعية من خلال التبرع.",
              "We invite individuals and institutions to support programs serving Palestinian communities with dignity. You can support our community initiatives through donation."
            )}
          </p>
        </div>

        <div className="bg-card border border-border shadow-xl rounded-3xl p-8 lg:p-12">
          
          <div className="bg-secondary/10 border border-secondary/30 rounded-xl p-4 mb-8 flex items-start gap-3">
            <Info className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground/80">
              {t(
                "ملاحظة: بوابة الدفع الإلكتروني قيد الإعداد حالياً. يرجى ملء النموذج أدناه وسيقوم فريقنا بالتواصل معك لتسهيل عملية التبرع من خلال التحويل البنكي.",
                "Note: The online payment gateway is currently being set up. Please fill out the form below and our team will contact you to facilitate the donation via bank transfer."
              )}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            
            {/* Amount Selection */}
            <div>
              <label className="text-lg font-bold text-foreground block mb-4">
                {t("اختر مبلغ التبرع (USD)", "Select Donation Amount (USD)")}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {predefinedAmounts.map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => { setAmount(val); setCustomAmount(""); }}
                    className={`py-4 rounded-xl border-2 text-xl font-bold transition-all ${
                      amount === val 
                        ? "border-primary bg-primary/5 text-primary" 
                        : "border-border bg-background text-foreground hover:border-primary/40"
                    }`}
                  >
                    ${val}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground font-medium">{t("أو مبلغ آخر:", "Or Custom Amount:")}</span>
                <div className="relative flex-grow max-w-xs">
                  <span className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground ${language === 'ar' ? 'right-4' : 'left-4'}`}>$</span>
                  <Input 
                    type="number" 
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setAmount(null);
                    }}
                    placeholder="1000"
                    className={`h-12 text-lg ${language === 'ar' ? 'pr-8' : 'pl-8'}`}
                    dir="ltr"
                  />
                </div>
              </div>
            </div>

            <hr className="border-border" />

            {/* Donor Info */}
            <div>
              <label className="text-lg font-bold text-foreground block mb-4">
                {t("بيانات المتبرع", "Donor Information")}
              </label>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("الاسم الكامل", "Full Name")}</label>
                  <Input required className="h-12" placeholder={t("اسمك", "Your name")} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t("البريد الإلكتروني", "Email Address")}</label>
                  <Input required type="email" className="h-12" placeholder="email@example.com" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">{t("رقم الهاتف (اختياري)", "Phone Number (Optional)")}</label>
                  <Input type="tel" className="h-12" placeholder="+972..." dir="ltr" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">{t("رسالة (اختياري)", "Message (Optional)")}</label>
                  <Textarea className="min-h-[100px] resize-none" placeholder={t("أي ملاحظات تريد إضافتها؟", "Any notes you want to add?")} />
                </div>
              </div>
            </div>

            <Button type="submit" disabled={isSubmitting || (!amount && !customAmount)} className="w-full h-16 text-xl rounded-xl bg-primary hover:bg-primary/90">
              <Heart className="w-5 h-5 me-2 fill-current" />
              {isSubmitting ? t("جاري المعالجة...", "Processing...") : t("إرسال طلب التبرع", "Submit Donation Request")}
            </Button>
            
          </form>
        </div>
      </div>
    </div>
  );
}
