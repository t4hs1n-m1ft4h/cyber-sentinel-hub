import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Image, Eye, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Stats {
  totalPosts: number;
  publishedPosts: number;
  totalGalleryItems: number;
  publishedGalleryItems: number;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalPosts: 0,
    publishedPosts: 0,
    totalGalleryItems: 0,
    publishedGalleryItems: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [postsResult, galleryResult] = await Promise.all([
        supabase.from('blog_posts').select('id, is_published'),
        supabase.from('gallery_items').select('id, is_published'),
      ]);

      const posts = postsResult.data || [];
      const gallery = galleryResult.data || [];

      setStats({
        totalPosts: posts.length,
        publishedPosts: posts.filter(p => p.is_published).length,
        totalGalleryItems: gallery.length,
        publishedGalleryItems: gallery.filter(g => g.is_published).length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Blog Posts',
      value: stats.totalPosts,
      icon: FileText,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      title: 'Published Posts',
      value: stats.publishedPosts,
      icon: Eye,
      color: 'text-cyber-green',
      bgColor: 'bg-cyber-green/10',
    },
    {
      title: 'Gallery Items',
      value: stats.totalGalleryItems,
      icon: Image,
      color: 'text-cyber-cyan',
      bgColor: 'bg-cyber-cyan/10',
    },
    {
      title: 'Published Gallery',
      value: stats.publishedGalleryItems,
      icon: TrendingUp,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground font-mono text-sm mt-1">
          &gt; Overview of your content
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                <card.icon className={`h-6 w-6 ${card.color}`} />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground">{card.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{card.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Quick Tips</h2>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Use the Blog Posts section to create, edit, and publish your articles.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Upload images and videos to the Gallery section for your portfolio.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Manage categories to organize your content effectively.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Draft posts are hidden from public view until published.
          </li>
        </ul>
      </div>
    </div>
  );
}
