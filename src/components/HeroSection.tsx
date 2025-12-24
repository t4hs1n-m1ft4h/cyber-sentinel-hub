import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Download, Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import profileImage from "@/assets/profile.jpg";

const roles = ["Web Security Analyst", "Penetration Tester", "CTF Player", "Bug Hunter"];

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-mono text-primary mb-4"
            >
              &gt; Hello, World! I am
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              <span className="text-foreground">MD</span>{" "}
              <span className="text-primary terminal-text">SOJIB</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="font-mono text-xl md:text-2xl lg:text-3xl mb-8 h-12"
            >
              <span className="text-muted-foreground">&gt; </span>
              <span className="text-primary">{displayText}</span>
              <span className="text-primary animate-blink border-r-2 border-primary ml-1">
                &nbsp;
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-muted-foreground text-lg mb-10 max-w-lg mx-auto lg:mx-0"
            >
              Passionate Web Security Analyst with experience in web penetration testing, 
              IT support, bug hunting, and CTF competitions. Skilled in identifying and 
              fixing vulnerabilities, conducting research, and developing security tools.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="font-mono group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Briefcase className="mr-2 h-5 w-5" />
                View Services
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-mono border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </Button>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Glowing rings */}
              <div className="absolute inset-0 rounded-full animate-glow-pulse" />
              <div className="absolute -inset-4 rounded-full border-2 border-primary/30 animate-spin-slow" style={{ animationDuration: "20s" }} />
              <div className="absolute -inset-8 rounded-full border border-accent/20 animate-spin-slow" style={{ animationDuration: "25s", animationDirection: "reverse" }} />
              
              {/* Profile container */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden glow-border"
              >
                {/* Profile Image */}
                <img 
                  src={profileImage} 
                  alt="MD SOJIB - Web Security Analyst"
                  className="w-full h-full object-cover"
                />

                {/* Scanline overlay */}
                <div className="absolute inset-0 scanlines opacity-20" />
              </motion.div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-card border border-primary/50 rounded-lg px-3 py-2 font-mono text-sm text-primary"
              >
                root@kali:~#
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-card border border-accent/50 rounded-lg px-3 py-2 font-mono text-sm text-accent"
              >
                0x1337
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          >
            <span className="font-mono text-xs text-muted-foreground">Scroll Down</span>
            <ChevronDown className="h-5 w-5 text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
