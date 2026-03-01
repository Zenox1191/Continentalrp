import { motion } from "framer-motion";
import { useRules } from "@/hooks/use-rules";
import { ShieldAlert, BookOpen, AlertTriangle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";

export default function Rules() {
  const { data: rules, isLoading, error } = useRules();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-primary/20 backdrop-blur-md mb-6 shadow-[0_0_30px_rgba(126,34,206,0.3)]">
          <BookOpen className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
          Szerver <span className="galaxy-text">Szabályzat</span>
        </h1>
        <p className="text-white/60 font-sans text-lg">
          A szabályok nem ismerete nem mentesít a felelősségre vonás alól.
          Kérjük olvasd el figyelmesen!
        </p>
      </div>

      <div className="glass-panel rounded-3xl p-6 md:p-10">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-16 w-full bg-white/5 rounded-xl" />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Hiba történt</h3>
            <p className="text-white/60">Nem sikerült betölteni a szabályzatot. Próbáld újra később.</p>
          </div>
        ) : rules && rules.length > 0 ? (
          <Accordion type="multiple" className="space-y-4">
            {rules
              .sort((a, b) => a.order - b.order)
              .map((rule, index) => (
                <AccordionItem
                  key={rule.id}
                  value={`rule-${rule.id}`}
                  className="glass-card border-none rounded-xl overflow-hidden px-2"
                >
                  <AccordionTrigger className="hover:no-underline px-4 py-5 text-left font-display text-lg font-semibold text-white/90 hover:text-primary transition-colors data-[state=open]:text-accent">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 text-sm text-white/70">
                        {index + 1}.
                      </span>
                      {rule.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-5 pt-2 text-white/70 leading-relaxed font-sans text-base">
                    <div className="pl-12 border-l-2 border-primary/20 ml-4 whitespace-pre-wrap">
                      {rule.content}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShieldAlert className="w-12 h-12 text-primary/50 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Nincs szabályzat</h3>
            <p className="text-white/60">Jelenleg nincsenek feltöltve szerver szabályok.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
