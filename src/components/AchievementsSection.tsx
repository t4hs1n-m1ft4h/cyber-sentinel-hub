import { motion } from "framer-motion";
import { Trophy, Flag, Award, Bot } from "lucide-react";

const achievements = [
  {
    icon: Flag,
    title: "16th Place - Cyber Raid 2025",
    description: "Led a team of four in a national CTF competition, securing 16th place by solving complex challenges in web exploitation, cryptography, and digital forensics.",
    date: "Feb 2025",
    platform: "CTF Competition",
  },
  {
    icon: Flag,
    title: "15th Place - 1st Agile Cyber Drill 2025",
    description: "Individually competed in a national CTF competition, achieving 15th place by solving challenges in web exploitation, cryptography, and digital forensics.",
    date: "Apr 2025",
    platform: "CTF Competition",
  },
  {
    icon: Award,
    title: "19th Place - Hackathon 2025 (Cyber Drill)",
    description: "Led a team of three to achieve 19th place in a national CTF competition by solving challenges in web exploitation, cryptography, and digital forensics.",
    date: "May 2025",
    platform: "Hackathon",
  },
  {
    icon: Trophy,
    title: "Champion - Varendra University Tech Carnival",
    description: "Led a team of three in a national robotics competition. Designed and built a Smart Bomb Detector Robot using sensors and microcontrollers, earning the championship title.",
    date: "Mar 2024",
    platform: "Robotics",
  },
];

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-16 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="font-mono text-primary mb-4 text-sm md:text-base">&gt; ls achievements/</p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
            My <span className="text-primary terminal-text">Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-2">
            A collection of milestones and recognitions earned through dedication,
            continuous learning, and hands-on security research.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group bg-card border border-border rounded-xl p-4 md:p-6 hover:border-primary/50 hover:glow-green transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <achievement.icon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] md:text-xs font-mono text-accent bg-accent/10 px-2 py-0.5 md:py-1 rounded">
                      {achievement.platform}
                    </span>
                    <span className="text-[10px] md:text-xs font-mono text-muted-foreground">
                      {achievement.date}
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute -top-8 -right-8 w-16 h-16 bg-primary/10 rotate-45" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
