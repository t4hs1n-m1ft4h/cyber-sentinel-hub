import { motion } from "framer-motion";
import { Shield, Search, Users, Target } from "lucide-react";

const services = [
  {
    icon: Target,
    title: "Penetration Testing",
    description: "Comprehensive security assessments simulating real-world attacks to identify vulnerabilities in your infrastructure, applications, and networks before malicious actors do.",
    features: ["Web Application Testing", "Network Penetration", "API Security Testing", "Cloud Infrastructure"],
  },
  {
    icon: Search,
    title: "Vulnerability Assessment",
    description: "Systematic identification and analysis of security weaknesses across your digital assets with detailed remediation guidance and risk prioritization.",
    features: ["Automated Scanning", "Manual Verification", "Risk Scoring", "Compliance Mapping"],
  },
  {
    icon: Users,
    title: "Red Team Operations",
    description: "Advanced adversary simulation exercises that test your organization's detection and response capabilities through realistic attack scenarios.",
    features: ["Social Engineering", "Physical Security", "Evasion Techniques", "Purple Team Exercises"],
  },
  {
    icon: Shield,
    title: "Security Consulting",
    description: "Strategic security guidance to strengthen your organization's security posture, including policy development, architecture review, and team training.",
    features: ["Security Architecture", "Policy Development", "Incident Response", "Security Training"],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-mono text-primary mb-4">&gt; ./services --list</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            What I <span className="text-primary terminal-text">Offer</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Specialized cybersecurity services designed to protect your organization
            from evolving threats and strengthen your security posture.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group relative bg-card border border-border rounded-xl p-6 lg:p-8 hover:border-primary/50 transition-all duration-300 overflow-hidden"
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 font-mono text-xs text-muted-foreground/40">
                  [{String(index + 1).padStart(2, '0')}]
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl lg:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 font-mono text-sm text-muted-foreground"
                    >
                      <span className="text-primary">▹</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-primary">$</span> Ready to secure your organization?{" "}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-primary hover:underline cursor-pointer"
            >
              Let's talk →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
