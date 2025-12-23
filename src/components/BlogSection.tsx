import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const blogPosts = [
  {
    id: 1,
    title: "Advanced Active Directory Exploitation Techniques",
    summary: "Deep dive into modern AD attack paths including Kerberoasting, DCSync, and lateral movement strategies in enterprise environments.",
    date: "Dec 15, 2023",
    readTime: "12 min read",
    category: "Red Team",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
  },
  {
    id: 2,
    title: "Bypassing Modern WAF Solutions",
    summary: "Exploring techniques to evade Web Application Firewalls using encoding tricks, HTTP smuggling, and novel injection methods.",
    date: "Dec 8, 2023",
    readTime: "8 min read",
    category: "Web Security",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
  },
  {
    id: 3,
    title: "Building Your Own C2 Framework",
    summary: "Step-by-step guide to creating a custom Command and Control infrastructure for red team operations with evasion in mind.",
    date: "Nov 28, 2023",
    readTime: "15 min read",
    category: "Malware Dev",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  },
];

export function BlogSection() {
  return (
    <section id="blog" className="py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-mono text-primary mb-4">&gt; tail -f blog.log</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Latest <span className="text-primary terminal-text">Blog Posts</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technical writeups, security research, and insights from the field
            of offensive security and ethical hacking.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-mono rounded">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-3 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.summary}
                </p>

                <Button
                  variant="ghost"
                  className="font-mono text-primary hover:text-primary hover:bg-primary/10 p-0 h-auto group/btn"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="font-mono border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            View All Posts
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
