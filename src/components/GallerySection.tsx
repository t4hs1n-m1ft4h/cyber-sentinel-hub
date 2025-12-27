import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface GalleryCategory {
  id: string;
  name: string;
  slug: string;
}

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  media_url: string;
  thumbnail_url: string | null;
  media_type: string;
  category_id: string | null;
  gallery_categories: GalleryCategory | null;
}

export function GallerySection() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchItems();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from("gallery_categories")
      .select("*")
      .order("name");
    if (data) setCategories(data);
  };

  const fetchItems = async () => {
    const { data } = await supabase
      .from("gallery_items")
      .select(`
        *,
        gallery_categories (id, name, slug)
      `)
      .eq("is_published", true)
      .order("created_at", { ascending: false });
    if (data) setItems(data as GalleryItem[]);
    setLoading(false);
  };

  const filteredItems = selectedCategory === "all"
    ? items
    : selectedCategory === "images"
    ? items.filter(item => item.media_type === "image")
    : selectedCategory === "videos"
    ? items.filter(item => item.media_type === "video")
    : items.filter(item => item.category_id === selectedCategory);

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const isYouTubeUrl = (url: string) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  return (
    <section id="gallery" className="py-16 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="font-mono text-primary mb-4 text-sm md:text-base">&gt; find /gallery -type f</p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
            <span className="text-primary terminal-text">Gallery</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base px-2">
            Snapshots from conferences, CTF competitions, and behind-the-scenes
            moments from my cybersecurity journey.
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
          <button
            onClick={() => setSelectedCategory("images")}
            className={`px-4 py-2 rounded-full font-mono text-xs md:text-sm transition-all duration-300 ${
              selectedCategory === "images"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
            }`}
          >
            Images
          </button>
          <button
            onClick={() => setSelectedCategory("videos")}
            className={`px-4 py-2 rounded-full font-mono text-xs md:text-sm transition-all duration-300 ${
              selectedCategory === "videos"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
            }`}
          >
            Videos
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
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground font-mono">No items found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedItem(item)}
                className="group relative aspect-square rounded-lg md:rounded-xl overflow-hidden cursor-pointer border border-border hover:border-primary/50 hover:glow-green transition-all duration-300"
              >
                <img
                  src={item.thumbnail_url || item.media_url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Video indicator */}
                {item.media_type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/80 flex items-center justify-center">
                      <Play className="h-5 w-5 md:h-6 md:w-6 text-primary-foreground ml-1" />
                    </div>
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute inset-0 p-3 md:p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] md:text-xs font-mono text-primary mb-1 md:mb-2">
                    {item.gallery_categories?.name || item.media_type}
                  </span>
                  <h3 className="text-sm md:text-lg font-bold text-foreground mb-0.5 md:mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-[10px] md:text-sm line-clamp-2 hidden sm:block">{item.description}</p>
                </div>

                {/* Zoom icon */}
                <div className="absolute top-2 right-2 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <ZoomIn className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-lg"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full bg-card rounded-xl overflow-hidden border border-border glow-green"
              >
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-3 right-3 md:top-4 md:right-4 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <X className="h-4 w-4 md:h-5 md:w-5" />
                </button>

                {selectedItem.media_type === "video" ? (
                  isYouTubeUrl(selectedItem.media_url) ? (
                    <div className="aspect-video">
                      <iframe
                        src={getYouTubeEmbedUrl(selectedItem.media_url)}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <video
                      src={selectedItem.media_url}
                      controls
                      className="w-full h-auto max-h-[60vh]"
                    />
                  )
                ) : (
                  <img
                    src={selectedItem.media_url}
                    alt={selectedItem.title}
                    className="w-full h-auto max-h-[50vh] md:max-h-[60vh] object-cover"
                  />
                )}

                <div className="p-4 md:p-6">
                  <span className="text-[10px] md:text-xs font-mono text-primary mb-1 md:mb-2 block">
                    {selectedItem.gallery_categories?.name || selectedItem.media_type}
                  </span>
                  <h3 className="text-lg md:text-2xl font-bold text-foreground mb-1 md:mb-2">
                    {selectedItem.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base">{selectedItem.description}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
