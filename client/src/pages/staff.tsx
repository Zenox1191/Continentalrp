import { motion } from "framer-motion";
import { useStaff } from "@/hooks/use-staff";
import { Shield, Crown, Code, Users as UsersIcon, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Map roles to specific glowing colors and icons
const getRoleDetails = (role: string) => {
  const r = role.toLowerCase();
  if (r.includes("owner")) return { 
    color: "from-amber-400 to-orange-600", 
    border: "border-amber-500/50",
    shadow: "shadow-[0_0_20px_rgba(245,158,11,0.2)]",
    icon: Crown 
  };
  if (r.includes("manager")) return { 
    color: "from-rose-400 to-red-600", 
    border: "border-rose-500/50",
    shadow: "shadow-[0_0_20px_rgba(225,29,72,0.2)]",
    icon: Shield 
  };
  if (r.includes("developer") || r.includes("dev")) return { 
    color: "from-cyan-400 to-blue-600", 
    border: "border-cyan-500/50",
    shadow: "shadow-[0_0_20px_rgba(6,182,212,0.2)]",
    icon: Code 
  };
  if (r.includes("admin")) return { 
    color: "from-emerald-400 to-green-600", 
    border: "border-emerald-500/50",
    shadow: "shadow-[0_0_20px_rgba(16,185,129,0.2)]",
    icon: Wrench 
  };
  
  return { 
    color: "from-primary to-accent", 
    border: "border-primary/50",
    shadow: "shadow-[0_0_20px_rgba(126,34,206,0.2)]",
    icon: UsersIcon 
  };
};

export default function Staff() {
  const { data: staffList, isLoading, error } = useStaff();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-white">
          A <span className="galaxy-text">Vezetőség</span>
        </h1>
        <p className="text-white/60 font-sans text-lg max-w-2xl mx-auto">
          Ők azok, akik nap mint nap dolgoznak a Continental Roleplay sikeréért és a közösség kényelméért.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-48 w-full bg-white/5 rounded-3xl" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12 glass-panel rounded-3xl">
          <p className="text-destructive font-bold text-xl">Hiba történt az adatok lekérésekor.</p>
        </div>
      ) : staffList && staffList.length > 0 ? (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {staffList
            .sort((a, b) => a.order - b.order)
            .map((member) => {
              const details = getRoleDetails(member.role);
              const RoleIcon = details.icon;
              
              return (
                <motion.div key={member.id} variants={cardVariants}>
                  <Card className={`glass-card overflow-hidden h-full rounded-3xl ${details.border} ${details.shadow} hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]`}>
                    <CardContent className="p-0 flex flex-col items-center">
                      <div className={`w-full h-24 bg-gradient-to-r ${details.color} opacity-20`} />
                      
                      <div className="-mt-12 mb-4 relative">
                        <div className={`absolute inset-0 bg-gradient-to-r ${details.color} rounded-full blur-md opacity-50`} />
                        <Avatar className="w-24 h-24 border-4 border-background bg-background relative z-10">
                          <AvatarFallback className="text-2xl font-display font-bold bg-background text-white">
                            {member.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      <div className="text-center px-6 pb-8">
                        <h3 className="text-2xl font-display font-bold text-white mb-2">
                          {member.name}
                        </h3>
                        <Badge 
                          variant="outline" 
                          className={`bg-background/50 backdrop-blur-sm border-white/10 text-white/80 py-1.5 px-4 rounded-full text-sm flex items-center gap-2`}
                        >
                          <RoleIcon className="w-4 h-4" />
                          {member.role}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
        </motion.div>
      ) : (
        <div className="text-center py-20 glass-panel rounded-3xl">
          <UsersIcon className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/60 font-medium text-lg">Nincsenek megjeleníthető csapattagok.</p>
        </div>
      )}
    </motion.div>
  );
}
