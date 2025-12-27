import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";

// Import fallback blog images
import blog1Image from "@/assets/blog-1.png";
import blog2Image from "@/assets/blog-2.png";
import blog3Image from "@/assets/blog-3.png";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  slug: string;
  featured_image: string | null;
  external_link: string | null;
  published_at: string | null;
  created_at: string;
  category_id: string | null;
  blog_categories: { name: string; slug: string } | null;
}

// Demo posts with local images for when database is empty
const demoPosts: BlogPost[] = [
  {
    id: "demo-1",
    title: "সাইবার সিকিউরিটির রোমাঞ্চকর জগৎ",
    excerpt: "A complete guide exploring the exciting world of cybersecurity, covering essential concepts and practical insights for beginners and enthusiasts.",
    slug: "cyber-security-world",
    featured_image: blog1Image,
    external_link: "https://medium.com/@mdsojibcsr",
    published_at: "2024-01-15",
    created_at: "2024-01-15",
    category_id: null,
    blog_categories: { name: "Cybersecurity", slug: "cybersecurity" },
  },
  {
    id: "demo-2",
    title: "A Complete Web Application Security Syllabus and Resources",
    excerpt: "Comprehensive syllabus and curated resources for learning web application security from beginner to advanced level.",
    slug: "web-app-security-syllabus",
    featured_image: blog2Image,
    external_link: "https://medium.com/@mdsojibcsr",
    published_at: "2024-02-10",
    created_at: "2024-02-10",
    category_id: null,
    blog_categories: { name: "Web Security", slug: "web-security" },
  },
  {
    id: "demo-3",
    title: "What is a Redirect?",
    excerpt: "Understanding URL redirects, their types, security implications, and how they can be exploited in web applications.",
    slug: "what-is-redirect",
    featured_image: blog3Image,
    external_link: "https://medium.com/@mdsojibcsr",
    published_at: "2024-03-05",
    created_at: "2024-03-05",
    category_id: null,
    blog_categories: { name: "Web Security", slug: "web-security" },
  },
];

export function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select(`
        id, title, excerpt, slug, featured_image, external_link, published_at, created_at, category_id,
        blog_categories (name, slug)
      `)
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(3);
    
    if (data && data.length > 0) {
      setPosts(data as BlogPost[]);
    } else {
      // Use demo posts if no database posts
      setPosts(demoPosts);
    }
    setLoading(false);
  };

  const formatYear = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).getFullYear().toString();
  };

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

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:glow-green transition-all duration-300"
              >
                {/* Image with Category Badge */}
                <div className="relative h-48 md:h-56 overflow-hidden bg-secondary">
                  {post.featured_image ? (
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl font-mono text-primary/30">&lt;/&gt;</span>
                    </div>
                  )}
                  
                  {/* Category Badge - Top Left */}
                  {post.blog_categories && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-md">
                      {post.blog_categories.name}
                    </span>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-4 md:p-6">
                  {/* Year */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-3">
                    <Calendar className="h-3 w-3" />
                    {formatYear(post.published_at || post.created_at)}
                  </div>

                  <h3 className="text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2 md:mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt || "Read more about this topic..."}
                  </p>

                  <a
                    href={post.external_link || `#blog-${post.slug}`}
                    target={post.external_link ? "_blank" : undefined}
                    rel={post.external_link ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center font-mono text-primary hover:text-primary hover:underline text-xs md:text-sm transition-colors"
                  >
                    Read More
                    <ExternalLink className="ml-2 h-3 w-3 md:h-4 md:w-4" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8 md:mt-12"
        >
          <Button
            size="lg"
            className="font-mono bg-primary text-primary-foreground hover:bg-primary/90 text-sm md:text-base px-8"
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
