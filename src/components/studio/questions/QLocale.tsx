"use client";

import { motion } from "framer-motion";
import { useStudio } from "@/contexts/StudioContext";
import { LOCALES, type LocaleCode } from "@/types/engine";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const LOCALE_OPTIONS = Object.values(LOCALES);

export function QLocale() {
  const { state, dispatch } = useStudio();

  const select = (code: LocaleCode) => {
    dispatch({ type: "UPDATE_CONFIG", patch: { locale: code } });
    setTimeout(() => dispatch({ type: "SET_STEP", step: 3 }), 300);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-20">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-3xl sm:text-4xl font-bold text-ds-text-primary font-display tracking-tight text-center mb-3"
      >
        Where are your users?
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-base text-ds-text-secondary text-center mb-12 max-w-md"
      >
        Names, currencies, and phone numbers match the locale.
      </motion.p>

      <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
        {LOCALE_OPTIONS.map((locale, i) => {
          const isSelected = state.config.locale === locale.code;
          return (
            <motion.button
              key={locale.code}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 + i * 0.06,
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{ y: -2 }}
              onClick={() => select(locale.code)}
              className={cn(
                "relative flex flex-col items-center gap-3 px-8 py-6 rounded-2xl border transition-all duration-200",
                "bg-ds-bg-secondary/60 hover:bg-ds-bg-tertiary min-w-[120px]",
                isSelected
                  ? "border-ds-border-accent glow-accent"
                  : "border-ds-border hover:border-ds-border-hover"
              )}
            >
              <span className="text-4xl">{locale.flag}</span>
              <span className="text-sm font-medium text-ds-text-primary">
                {locale.label}
              </span>

              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-ds-accent flex items-center justify-center">
                  <Check className="w-3 h-3 text-[#0C0F14]" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
