import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Github, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

export function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-16 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="font-mono text-primary mb-4 text-sm md:text-base">&gt; ./contact --init</p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
            Get In <span className="text-primary terminal-text">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-2">
            Have a project in mind or want to discuss security services?
            Feel free to reach out through the form or social links below.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block font-mono text-xs md:text-sm text-muted-foreground mb-2">
                    &gt; name
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="bg-card border-border focus:border-primary focus:ring-primary/20 text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs md:text-sm text-muted-foreground mb-2">
                    &gt; email
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="bg-card border-border focus:border-primary focus:ring-primary/20 text-sm md:text-base"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs md:text-sm text-muted-foreground mb-2">
                  &gt; subject
                </label>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Security Assessment Inquiry"
                  required
                  className="bg-card border-border focus:border-primary focus:ring-primary/20 text-sm md:text-base"
                />
              </div>

              <div>
                <label className="block font-mono text-xs md:text-sm text-muted-foreground mb-2">
                  &gt; message
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                  rows={6}
                  className="bg-card border-border focus:border-primary focus:ring-primary/20 resize-none text-sm md:text-base"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full font-mono bg-primary text-primary-foreground hover:bg-primary/90 glow-green text-sm md:text-base"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-pulse">Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8"
          >
            {/* Info Cards */}
            <div className="space-y-3 md:space-y-4">
              <div className="bg-card border border-border rounded-lg p-4 md:p-6 hover:border-primary/50 transition-colors group">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-mono text-xs md:text-sm text-muted-foreground">Email</p>
                    <a
                      href="mailto:mail@mdsojib.qzz.io"
                      className="text-foreground hover:text-primary transition-colors text-sm md:text-base"
                    >
                      mail@mdsojib.qzz.io
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4 md:p-6 hover:border-primary/50 transition-colors group">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-mono text-xs md:text-sm text-muted-foreground">Location</p>
                    <p className="text-foreground text-sm md:text-base">Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Social Links */}
            <div>
              <p className="font-mono text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                &gt; connect --social
              </p>
              <div className="flex flex-wrap gap-3 md:gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:glow-green transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4 md:h-5 md:w-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Terminal-style availability */}
            <div className="bg-terminal-bg border border-border rounded-lg p-3 md:p-4 font-mono text-xs md:text-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-muted-foreground">
                <p>
                  <span className="text-primary">user@portfolio</span>:~$ status
                </p>
                <p className="text-green-500">● Available for new projects</p>
                <p className="text-muted-foreground/60">
                  Response time: ~24 hours
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
