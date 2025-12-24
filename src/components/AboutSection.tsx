import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Award, Calendar, MapPin, ExternalLink, FlaskConical, FolderKanban, Presentation } from "lucide-react";
import { Button } from "./ui/button";

const tabs = [
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "research", label: "Research", icon: FlaskConical },
  { id: "workshops", label: "Workshops", icon: Presentation },
];

const education = [
  {
    degree: "Bachelor of Computer Science",
    institution: "University of the People",
    period: "Jul 2024 – Present",
    location: "Online Campus",
    description: "Currently pursuing a Bachelor's degree in Computer Science with focus on cybersecurity.",
    link: "https://www.uopeople.edu",
  },
  {
    degree: "Higher Secondary Certificate (Science)",
    institution: "Varendra College, Rajshahi",
    period: "Jul 2019 – Nov 2021",
    location: "Bangladesh",
    description: "Completed higher secondary education with a focus on science.",
    link: "https://www.vcr.edu.bd",
  },
];

const experience = [
  {
    role: "Founder and Penetration Tester",
    company: "VulneraScan",
    period: "Jan 2023 – Present",
    location: "Remote",
    description: "Leading security assessments and penetration testing services for clients worldwide.",
    tools: ["OWASP", "Web Security", "Penetration Testing", "Bug Tracking", "Threat Management"],
    link: "https://vulnerascan.tech",
  },
  {
    role: "Cybersecurity Intern",
    company: "CodeAlpha",
    period: "Jun 2025",
    location: "Remote",
    description: "Performed static code analysis and vulnerability identification using Python & Flask.",
    tools: ["Web Security", "Static Code Analysis", "OWASP Top 10", "Python", "Flask"],
    link: "https://codealpha.tech",
  },
  {
    role: "Co-Founder",
    company: "Bortoni",
    period: "Jan 2024 – Jul 2024",
    location: "Rajshahi, Bangladesh",
    description: "Led startup ventures and early-stage business development initiatives.",
    tools: ["Start-up Leadership", "Co-creation", "Venture Capital"],
    link: "https://bortonibd.com",
  },
  {
    role: "IT Manager",
    company: "Bonolota Food",
    period: "Oct 2022 – Mar 2023",
    location: "Rajshahi, Bangladesh",
    description: "Managed IT infrastructure, incident response, and social media communications.",
    tools: ["Incident Response", "Communication", "Social Media"],
  },
];

const certifications = [
  { name: "ISO/IEC 27001:2022 Lead Auditor", issuer: "Mastermind" },
  { name: "Cisco Certified Network Associate (CCNA)", issuer: "Orhan Ergun" },
  { name: "Ethical Hacking Essentials (EHE)", issuer: "EC-Council" },
  { name: "Google Cybersecurity Professional Certificate", issuer: "Google" },
  { name: "Google IT Support Professional Certificate", issuer: "Google" },
  { name: "Google Cloud Cybersecurity Certificate", issuer: "Google Cloud Security" },
  { name: "Advanced Network Security", issuer: "LearnQuest" },
  { name: "Malware Analysis", issuer: "Udemy" },
  { name: "Certified Network Security Practitioner (CNSP)", issuer: "The SecOps Group" },
  { name: "IBM Cybersecurity Analyst Professional Certificate", issuer: "IBM" },
  { name: "Microsoft Cybersecurity Analyst Professional Certificate", issuer: "Microsoft" },
];

const projects = [
  {
    title: "Password Strength Checker",
    date: "Apr 2025",
    description: "Developed a real-time web app to evaluate password strength using length, character variety, and estimated crack time. Features include instant feedback, dark/light mode toggle, security tips, and humorous warnings.",
    link: "https://mdsojib.me/password-checker",
  },
];

const research = [
  {
    title: "Phishing and Social Engineering in Bangladesh: A Study on Awareness, Impact, and Mitigation Strategies",
    period: "Apr 2025 – Present",
    organization: "Independent Research",
    description: "Assessing public awareness and the impact of phishing attacks in Bangladesh; currently analyzing survey data to develop mitigation strategies.",
  },
];

const workshops = [
  {
    name: "Aspire Leaders Program",
    organization: "Aspire Institute (Harvard University-affiliated)",
    period: "Aug 2024 – Nov 2024",
    location: "Online",
    description: "Focused on leadership, critical thinking, and communication.",
  },
  {
    name: "Future Co-Founder Program",
    organization: "Student to Startup Ventures",
    period: "Nov 2023 – May 2024",
    location: "Bangabandhu Sheikh Mujib Hi-Tech Park, Rajshahi",
    description: "Training in startup incubation and business model development.",
  },
  {
    name: "Cyber Security Training Program",
    organization: "Byte Capsule",
    period: "Apr 2023 – Oct 2023",
    location: "Online",
    description: "Covered ethical hacking and digital forensics; recognized as batch topper.",
  },
];

export function AboutSection() {
  const [activeTab, setActiveTab] = useState("experience");

  return (
    <section id="about" className="py-16 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="font-mono text-primary mb-4 text-sm md:text-base">&gt; cat about.txt</p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
            About <span className="text-primary terminal-text">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-2">
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
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 lg:mb-12"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-lg font-mono text-xs md:text-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground glow-green"
                  : "bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              <tab.icon className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.slice(0, 4)}</span>
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
              className="space-y-4 md:space-y-6"
            >
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-4 md:p-6 hover:border-primary/50 transition-colors group"
                >
                  <div className="flex flex-col gap-2 mb-3 md:mb-4">
                    <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {item.degree}
                    </h3>
                    <p className="text-primary font-mono text-sm md:text-base">{item.institution}</p>
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 text-muted-foreground text-xs md:text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                        {item.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                        {item.location}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base mb-3">{item.description}</p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary text-xs md:text-sm font-mono hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Visit
                    </a>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "experience" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4 md:space-y-6"
            >
              {experience.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-4 md:p-6 hover:border-primary/50 transition-colors group"
                >
                  <div className="flex flex-col gap-2 mb-3 md:mb-4">
                    <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {item.role}
                    </h3>
                    <p className="text-primary font-mono text-sm md:text-base">{item.company}</p>
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 text-muted-foreground text-xs md:text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                        {item.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                        {item.location}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base mb-3 md:mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3">
                    {item.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 md:px-3 py-0.5 md:py-1 bg-primary/10 text-primary text-[10px] md:text-xs font-mono rounded-full border border-primary/20"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary text-xs md:text-sm font-mono hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Visit
                    </a>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "certifications" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6"
            >
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card border border-border rounded-lg p-4 md:p-6 hover:border-primary/50 hover:glow-green transition-all group"
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Award className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-sm md:text-base leading-tight">
                        {cert.name}
                      </h3>
                      <p className="text-muted-foreground text-xs md:text-sm mt-1">{cert.issuer}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "projects" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4 md:space-y-6"
            >
              {projects.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-4 md:p-6 hover:border-primary/50 transition-colors group"
                >
                  <div className="flex flex-col gap-2 mb-3">
                    <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <span className="flex items-center gap-1 text-muted-foreground text-xs md:text-sm">
                      <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                      {item.date}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base mb-3">{item.description}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary text-xs md:text-sm font-mono hover:underline"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Visit Project
                  </a>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "research" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4 md:space-y-6"
            >
              {research.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-4 md:p-6 hover:border-primary/50 transition-colors group"
                >
                  <div className="flex flex-col gap-2 mb-3">
                    <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-primary font-mono text-sm md:text-base">{item.organization}</p>
                    <span className="flex items-center gap-1 text-muted-foreground text-xs md:text-sm">
                      <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                      {item.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "workshops" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4 md:space-y-6"
            >
              {workshops.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-4 md:p-6 hover:border-primary/50 transition-colors group"
                >
                  <div className="flex flex-col gap-2 mb-3">
                    <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-primary font-mono text-sm md:text-base">{item.organization}</p>
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 text-muted-foreground text-xs md:text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                        {item.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                        {item.location}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
