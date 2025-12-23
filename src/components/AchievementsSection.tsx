import { motion } from "framer-motion";
import { Trophy, Target, Flag, Shield, Bug, Award } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "HackTheBox Pro Hacker",
    description: "Achieved Pro Hacker rank by compromising 100+ machines on the HackTheBox platform.",
    date: "2023",
    platform: "HackTheBox",
  },
  {
    icon: Flag,
    title: "CTF Champion - DEF CON 31",
    description: "Led team to first place in the DEF CON CTF qualifiers, competing against 500+ teams globally.",
    date: "2023",
    platform: "DEF CON",
  },
  {
    icon: Bug,
    title: "Bug Bounty Hall of Fame",
    description: "Recognized in Google's Security Hall of Fame for discovering critical RCE vulnerability.",
    date: "2022",
    platform: "Google VRP",
  },
  {
    icon: Shield,
    title: "Published 5 CVEs",
    description: "Discovered and responsibly disclosed 5 critical vulnerabilities in enterprise software.",
    date: "2021-2023",
    platform: "MITRE CVE",
  },
  {
    icon: Target,
    title: "Top 1% TryHackMe",
    description: "Ranked in the top 1% of users globally on the TryHackMe learning platform.",
    date: "2023",
    platform: "TryHackMe",
  },
  {
    icon: Award,
    title: "Security+ Outstanding Achiever",
    description: "Scored in the 99th percentile on the CompTIA Security+ certification exam.",
    date: "2020",
    platform: "CompTIA",
  },
];

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-mono text-primary mb-4">&gt; ls achievements/</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            My <span className="text-primary terminal-text">Achievements</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of milestones and recognitions earned through dedication,
            continuous learning, and hands-on security research.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 hover:glow-green transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <achievement.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded">
                      {achievement.platform}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {achievement.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2 truncate">
                    {achievement.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
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
