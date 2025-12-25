import { motion } from "framer-motion";
import { Calendar, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import blog1Image from "@/assets/blog-1.png";
import blog2Image from "@/assets/blog-2.png";
import blog3Image from "@/assets/blog-3.png";

const blogPosts = [
  {
    id: 1,
    title: "সাইবার সিকিউরিটির রোমাঞ্চকর জগৎ",
    summary: "A complete guide exploring the exciting world of cybersecurity, covering essential concepts and practical insights for beginners and enthusiasts.",
    date: "2024",
    category: "Cybersecurity",
    image: blog1Image,
    link: "#",
  },
  {
    id: 2,
    title: "A Complete Web Application Security Syllabus and Resources",
    summary: "Comprehensive syllabus and curated resources for learning web application security from beginner to advanced level.",
    date: "2024",
    category: "Web Security",
    image: blog2Image,
    link: "#",
  },
  {
    id: 3,
    title: "What is a Redirect?",
    summary: "Understanding URL redirects, their types, security implications, and how they can be exploited in web applications.",
    date: "2024",
    category: "Web Security",
    image: blog3Image,
    link: "#",
  },
];

export function BlogSection() {
  return (
    <section id="blog" className="py-16 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="font-mono text-primary mb-4 text-sm md:text-base">&gt; tail -f blog.log</p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
            Latest <span className="text-primary terminal-text">Blog Posts</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-2">
            Technical writeups, security research, and insights from the field
            of offensive security and ethical hacking.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:glow-green transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-40 md:h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <span className="absolute top-3 left-3 md:top-4 md:left-4 px-2 md:px-3 py-0.5 md:py-1 bg-primary/90 text-primary-foreground text-[10px] md:text-xs font-mono rounded">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 md:p-6">
                <div className="flex items-center gap-4 text-[10px] md:text-xs text-muted-foreground font-mono mb-3 md:mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                </div>

                <h3 className="text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2 md:mb-3 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-3">
                  {post.summary}
                </p>

                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center font-mono text-primary hover:text-primary hover:bg-primary/10 p-0 h-auto group/btn text-xs md:text-sm transition-colors"
                >
                  Read More
                  <ExternalLink className="ml-2 h-3 w-3 md:h-4 md:w-4 transition-transform group-hover/btn:translate-x-1" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8 md:mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="font-mono border-primary text-primary hover:bg-primary hover:text-primary-foreground text-sm md:text-base"
            onClick={() => window.open("https://medium.com/@mdsojibcsr", "_blank")}
          >
            View All Posts
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
