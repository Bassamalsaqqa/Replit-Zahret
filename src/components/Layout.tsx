import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, Heart } from "lucide-react";
import { BackToTop } from "@/components/BackToTop";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const { language, setLanguage, t } = useLanguage();
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const brandIcon = `${import.meta.env.BASE_URL}icons/site-icon.png`;

  const orgNameAr = "جمعية زهرة المدائن";
  const orgNameEn = "Zahrat Al-Madain";

  const navLinks = [
    { path: "/", ar: "الرئيسية", en: "Home" },
    { path: "/about", ar: "من نحن", en: "About Us" },
    { path: "/programs", ar: "برامجنا", en: "Programs" },
    { path: "/get-involved", ar: "شارك معنا", en: "Get Involved" },
    { path: "/news", ar: "الأخبار والقصص", en: "News & Stories" },
    { path: "/transparency", ar: "الشفافية", en: "Transparency" },
    { path: "/contact", ar: "تواصل معنا", en: "Contact Us" },
  ];

  const handleNavClick = (path: string) => {
    setLocation(path);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Header — fixed so page content sits behind it, enabling backdrop-filter */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex flex-col"
        style={{
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          backgroundColor: "rgba(250, 246, 237, 0.60)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.40)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.10), inset 0 -1px 0 rgba(255,255,255,0.30)",
        }}
      >
        {/* Decorative top bar — now inside the fixed header */}
        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-secondary to-primary flex-shrink-0" />
        <div className="site-shell">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-primary/20 bg-background/80 shadow-md transition-transform duration-300 group-hover:scale-105">
                <img
                  src={brandIcon}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight text-foreground">
                  {t(orgNameAr, orgNameEn)}
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  {t("القدس الشريف", "Jerusalem")}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    location === link.path
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted hover:text-primary"
                  }`}
                >
                  {t(link.ar, link.en)}
                </button>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center bg-muted rounded-full p-1 border border-border">
                <button
                  onClick={() => setLanguage("ar")}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    language === "ar" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
                  }`}
                  dir="rtl"
                >
                  عربي
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    language === "en" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
                  }`}
                  dir="ltr"
                >
                  EN
                </button>
              </div>
              
              <Button 
                onClick={() => handleNavClick("/donate")}
                className="rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 bg-gradient-to-r from-primary to-primary/90"
              >
                <Heart className="w-4 h-4 me-2 fill-current" />
                {t("تبرّع الآن", "Donate Now")}
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-border bg-background shadow-lg overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-start px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    location === link.path
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {t(link.ar, link.en)}
                </button>
              ))}
              <div className="h-px w-full bg-border my-2" />
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => { setLanguage("ar"); setIsMobileMenuOpen(false); }}
                  className={`flex-1 py-2 rounded-lg border ${language === 'ar' ? 'bg-primary/10 border-primary text-primary' : 'border-border'}`}
                >
                  العربية
                </button>
                <button
                  onClick={() => { setLanguage("en"); setIsMobileMenuOpen(false); }}
                  className={`flex-1 py-2 rounded-lg border ${language === 'en' ? 'bg-primary/10 border-primary text-primary' : 'border-border'}`}
                >
                  English
                </button>
              </div>
              <Button 
                onClick={() => handleNavClick("/donate")}
                className="w-full rounded-xl py-6 mt-2 text-lg bg-primary"
              >
                {t("تبرّع الآن", "Donate Now")}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content — pt compensates for the fixed header (6px bar + 80px nav) */}
      <main className="flex-grow flex flex-col relative z-10 pt-[86px]">
        {children}
      </main>

      <BackToTop />

      {/* Footer */}
      <footer className="bg-foreground text-background pt-16 pb-8 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

        <div className="site-shell relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
            
            {/* Column 1: Brand */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-background/15 bg-background shadow-md">
                  <img
                    src={brandIcon}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="font-bold text-xl">
                  {t(orgNameAr, orgNameEn)}
                </span>
              </div>
              <p className="text-background/70 text-sm leading-relaxed">
                {t(
                  "جمعية أهلية فلسطينية تعمل من أجل التنمية المجتمعية والدعم الإنساني بكرامة ومسؤولية.",
                  "A Palestinian civil society organization advancing community development and humanitarian support with dignity and responsibility."
                )}
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-lg text-secondary">
                {t("روابط سريعة", "Quick Links")}
              </h4>
              <nav className="flex flex-col gap-3">
                {navLinks.slice(0, 4).map((link) => (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className="text-start text-background/80 hover:text-secondary hover:translate-x-1 transition-all w-fit"
                  >
                    {t(link.ar, link.en)}
                  </button>
                ))}
              </nav>
            </div>

            {/* Column 3: Contact */}
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-lg text-secondary">
                {t("تواصل معنا", "Contact Us")}
              </h4>
              <ul className="flex flex-col gap-3 text-background/80 text-sm">
                <li>{t("هاتف: +972-2-XXXXXXX", "Phone: +972-2-XXXXXXX")}</li>
                <li>{t("البريد الإلكتروني: info@zahrat-almadain.org", "Email: info@zahrat-almadain.org")}</li>
                <li>{t("العنوان: القدس الشريف، فلسطين", "Address: Jerusalem, Palestine")}</li>
              </ul>
            </div>

            {/* Column 4: Newsletter / Donate */}
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-lg text-secondary">
                {t("ساهم معنا", "Support Us")}
              </h4>
              <p className="text-background/70 text-sm mb-2">
                {t(
                  "دعمك يصنع أثراً حقيقياً في حياة الأسر والشباب والأطفال.",
                  "Your support makes a real impact in the lives of families, youth, and children."
                )}
              </p>
              <Button 
                onClick={() => handleNavClick("/donate")}
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 border-0 rounded-xl"
              >
                {t("تبرّع الآن", "Donate Now")}
              </Button>
            </div>
          </div>

          <div className="h-px w-full bg-background/10 mb-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/50">
            <p>
              © {new Date().getFullYear()} {t(orgNameAr, orgNameEn)}. {t("جميع الحقوق محفوظة.", "All rights reserved.")}
            </p>
            <div className="flex items-center gap-6">
              <button onClick={() => handleNavClick("/privacy")} className="hover:text-background transition-colors">
                {t("سياسة الخصوصية", "Privacy Policy")}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
