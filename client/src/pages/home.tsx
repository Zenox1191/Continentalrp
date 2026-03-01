import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Gamepad2, MessagesSquare, ChevronRight, Star, Users, Shield } from "lucide-react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const features = [
    {
      title: "Egyedi Rendszerek",
      desc: "Saját fejlesztésű szkriptek és egyedi gazdaság vár a szerveren.",
      icon: Star
    },
    {
      title: "Aktív Közösség",
      desc: "Folyamatosan növekvő, befogadó és segítőkész RP közösség.",
      icon: Users
    },
    {
      title: "Kiváló Védelem",
      desc: "Fejlett anti-cheat és aktív admin csapat biztosítja a fair játékot.",
      icon: Shield
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[75vh]"
    >
      <motion.div variants={itemVariants} className="text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md mb-8">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-sm font-semibold text-primary-foreground tracking-wide uppercase">
            A szerver jelenleg online
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-tight mb-6 drop-shadow-2xl">
          Lépj be a <br />
          <span className="galaxy-text">Continental</span> Galaxisba
        </h1>
        
        <p className="text-lg md:text-xl text-white/70 font-sans max-w-2xl mx-auto mb-10 leading-relaxed">
          Készítsd el saját történeted, csatlakozz egy prémium roleplay élményhez,
          és válj a galaxis legbefolyásosabb polgárává. A határ a csillagos ég.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Button 
            size="lg" 
            className="w-full sm:w-auto text-lg h-14 px-8 glow-effect bg-gradient-to-r from-primary to-accent border-0 hover:scale-105 transition-transform"
            onClick={() => window.open("#", "_blank")}
          >
            <Gamepad2 className="mr-2 w-5 h-5" />
            Játék Indítása
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="w-full sm:w-auto text-lg h-14 px-8 border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white hover:text-white transition-all"
            onClick={() => window.open("#", "_blank")}
          >
            <MessagesSquare className="mr-2 w-5 h-5 text-[#5865F2]" />
            Discord Csatlakozás
          </Button>
        </div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full"
      >
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="glass-card p-8 rounded-3xl group hover:-translate-y-2 cursor-default"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/40 transition-colors">
                <Icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-white/60 leading-relaxed font-sans">
                {feature.desc}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
