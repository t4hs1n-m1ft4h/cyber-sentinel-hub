import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const galleryItems = [
  {
    id: 1,
    title: "DEF CON CTF Finals",
    description: "Competing at the DEF CON CTF finals in Las Vegas, 2023",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    category: "Events",
  },
  {
    id: 2,
    title: "Security Lab Setup",
    description: "My home security research lab with custom hardware",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    category: "Lab",
  },
  {
    id: 3,
    title: "Conference Speaker",
    description: "Presenting at BlackHat USA on zero-day research",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
    category: "Speaking",
  },
  {
    id: 4,
    title: "Bug Bounty Hunting",
    description: "Late night bug hunting session capturing critical vulns",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    category: "Research",
  },
  {
    id: 5,
    title: "Team Collaboration",
    description: "Working with the red team on a complex engagement",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    category: "Team",
  },
  {
    id: 6,
    title: "Hardware Hacking",
    description: "Reverse engineering IoT devices in the lab",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    category: "Hardware",
  },
];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

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

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(item)}
              className="group relative aspect-square rounded-lg md:rounded-xl overflow-hidden cursor-pointer border border-border hover:border-primary/50 hover:glow-green transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute inset-0 p-3 md:p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] md:text-xs font-mono text-primary mb-1 md:mb-2">{item.category}</span>
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

        {/* Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
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
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-3 right-3 md:top-4 md:right-4 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <X className="h-4 w-4 md:h-5 md:w-5" />
                </button>

                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[50vh] md:max-h-[60vh] object-cover"
                />

                <div className="p-4 md:p-6">
                  <span className="text-[10px] md:text-xs font-mono text-primary mb-1 md:mb-2 block">
                    {selectedImage.category}
                  </span>
                  <h3 className="text-lg md:text-2xl font-bold text-foreground mb-1 md:mb-2">
                    {selectedImage.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base">{selectedImage.description}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
