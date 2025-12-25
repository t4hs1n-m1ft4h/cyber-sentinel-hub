import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff, Video, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { GalleryItemEditor } from './GalleryItemEditor';

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  media_url: string;
  thumbnail_url: string | null;
  media_type: string;
  category_id: string | null;
  is_published: boolean;
  created_at: string;
  gallery_categories?: {
    name: string;
  } | null;
}

export function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .select(`
          *,
          gallery_categories (name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
      toast({
        title: "Error",
        description: "Failed to fetch gallery items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const { error } = await supabase
        .from('gallery_items')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setItems(items.filter(i => i.id !== id));
      toast({
        title: "Deleted",
        description: "Gallery item deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({
        title: "Error",
        description: "Failed to delete gallery item",
        variant: "destructive",
      });
    }
  };

  const handleTogglePublish = async (item: GalleryItem) => {
    try {
      const { error } = await supabase
        .from('gallery_items')
        .update({ is_published: !item.is_published })
        .eq('id', item.id);

      if (error) throw error;

      setItems(items.map(i => 
        i.id === item.id 
          ? { ...i, is_published: !i.is_published }
          : i
      ));

      toast({
        title: item.is_published ? "Hidden" : "Published",
        description: `Item has been ${item.is_published ? 'hidden' : 'published'}`,
      });
    } catch (error) {
      console.error('Error toggling publish:', error);
      toast({
        title: "Error",
        description: "Failed to update item status",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setIsEditorOpen(true);
  };

  const handleEditorClose = () => {
    setIsEditorOpen(false);
    setEditingItem(null);
    fetchItems();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (isEditorOpen) {
    return <GalleryItemEditor item={editingItem} onClose={handleEditorClose} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Gallery</h1>
          <p className="text-muted-foreground font-mono text-sm mt-1">
            &gt; Manage images and videos
          </p>
        </div>
        <Button 
          onClick={() => setIsEditorOpen(true)}
          className="font-mono bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <p className="text-muted-foreground">No gallery items yet. Add your first item!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <div className="relative h-48">
                {item.media_type === 'video' ? (
                  <div className="w-full h-full bg-secondary flex items-center justify-center">
                    <Video className="h-12 w-12 text-muted-foreground" />
                  </div>
                ) : (
                  <img
                    src={item.thumbnail_url || item.media_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-2 left-2 flex gap-2">
                  <span className="px-2 py-1 bg-background/80 text-foreground text-xs rounded font-mono flex items-center gap-1">
                    {item.media_type === 'video' ? <Video className="h-3 w-3" /> : <ImageIcon className="h-3 w-3" />}
                    {item.media_type}
                  </span>
                  {!item.is_published && (
                    <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded font-mono">
                      Hidden
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-foreground truncate mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1 mb-3">
                  {item.description || 'No description'}
                </p>
                {item.gallery_categories?.name && (
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded font-mono">
                    {item.gallery_categories.name}
                  </span>
                )}
                <div className="flex items-center gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTogglePublish(item)}
                    className="flex-1 font-mono"
                  >
                    {item.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item)}
                    className="font-mono"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    className="font-mono text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
