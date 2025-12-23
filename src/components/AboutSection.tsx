import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Award, Calendar, MapPin } from "lucide-react";

const tabs = [
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "certifications", label: "Certifications", icon: Award },
];

const education = [
  {
    degree: "Master of Science in Cybersecurity",
    institution: "MIT",
    period: "2020 - 2022",
    location: "Cambridge, MA",
    description: "Specialized in network security and cryptography. Research focus on zero-day vulnerability detection.",
  },
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "Stanford University",
    period: "2016 - 2020",
    location: "Stanford, CA",
    description: "Dean's List. Focus on systems programming and security fundamentals.",
  },
];

const experience = [
  {
    role: "Senior Penetration Tester",
    company: "CyberDefense Corp",
    period: "2022 - Present",
    location: "Remote",
    description: "Lead red team engagements for Fortune 500 clients. Discovered 50+ critical vulnerabilities. Developed custom exploitation frameworks.",
    tools: ["Burp Suite", "Metasploit", "Cobalt Strike", "Python"],
  },
  {
    role: "Security Researcher",
    company: "SecureLabs",
    period: "2020 - 2022",
    location: "San Francisco, CA",
    description: "Conducted vulnerability research on web applications and IoT devices. Published 3 CVEs. Contributed to open-source security tools.",
    tools: ["IDA Pro", "Ghidra", "Wireshark", "C/C++"],
  },
  {
    role: "Junior Security Analyst",
    company: "TechStart Inc",
    period: "2018 - 2020",
    location: "New York, NY",
    description: "Monitored security events and responded to incidents. Performed security assessments and compliance audits.",
    tools: ["Splunk", "Nessus", "OSSEC", "PowerShell"],
  },
];

const certifications = [
  {
    name: "Offensive Security Certified Professional (OSCP)",
    issuer: "Offensive Security",
    date: "2023",
    credentialId: "OS-12345",
  },
  {
    name: "Certified Ethical Hacker (CEH)",
    issuer: "EC-Council",
    date: "2022",
    credentialId: "ECC-67890",
  },
  {
    name: "GIAC Penetration Tester (GPEN)",
    issuer: "SANS Institute",
    date: "2021",
    credentialId: "GPEN-11111",
  },
  {
    name: "CompTIA Security+",
    issuer: "CompTIA",
    date: "2020",
    credentialId: "COMP-22222",
  },
];

export function AboutSection() {
  const [activeTab, setActiveTab] = useState("education");

  return (
    <section id="about" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-mono text-primary mb-4">&gt; cat about.txt</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            About <span className="text-primary terminal-text">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A dedicated cybersecurity professional with a passion for uncovering vulnerabilities
            and strengthening digital defenses through ethical hacking and continuous learning.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground glow-green"
                  : "bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === "education" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {item.degree}
                      </h3>
                      <p className="text-primary font-mono">{item.institution}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-2 md:mt-0 text-muted-foreground text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {item.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {item.location}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "experience" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {experience.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {item.role}
                      </h3>
                      <p className="text-primary font-mono">{item.company}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-2 md:mt-0 text-muted-foreground text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {item.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {item.location}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs font-mono rounded-full border border-primary/20"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "certifications" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid sm:grid-cols-2 gap-6"
            >
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 hover:glow-green transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                        {cert.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">{cert.issuer}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground font-mono">
                        <span>{cert.date}</span>
                        <span>ID: {cert.credentialId}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
