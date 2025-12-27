import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

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
  blog_categories: BlogCategory | null;
}

export function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from("blog_categories")
      .select("*")
      .order("name");
    if (data) setCategories(data);
  };

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select(`
        *,
        blog_categories (id, name, slug)
      `)
      .eq("is_published", true)
      .order("published_at", { ascending: false });
    if (data) setPosts(data as BlogPost[]);
    setLoading(false);
  };

  const filteredPosts = selectedCategory === "all" 
    ? posts 
    : posts.filter(post => post.category_id === selectedCategory);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
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

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12"
        >
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full font-mono text-xs md:text-sm transition-all duration-300 ${
              selectedCategory === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full font-mono text-xs md:text-sm transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground font-mono">No posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredPosts.map((post, index) => (
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
                <div className="relative h-40 md:h-48 overflow-hidden bg-secondary">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  {post.blog_categories && (
                    <span className="absolute top-3 left-3 md:top-4 md:left-4 px-2 md:px-3 py-0.5 md:py-1 bg-primary/90 text-primary-foreground text-[10px] md:text-xs font-mono rounded">
                      {post.blog_categories.name}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 md:p-6">
                  <div className="flex items-center gap-4 text-[10px] md:text-xs text-muted-foreground font-mono mb-3 md:mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(post.published_at || post.created_at)}
                    </span>
                  </div>

                  <h3 className="text-base md:text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-2 md:mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-3">
                    {post.excerpt || "Read more about this topic..."}
                  </p>

                  <a
                    href={post.external_link || `#blog-${post.slug}`}
                    target={post.external_link ? "_blank" : undefined}
                    rel={post.external_link ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center font-mono text-primary hover:text-primary hover:bg-primary/10 p-0 h-auto group/btn text-xs md:text-sm transition-colors"
                  >
                    Read More
                    <ExternalLink className="ml-2 h-3 w-3 md:h-4 md:w-4 transition-transform group-hover/btn:translate-x-1" />
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
