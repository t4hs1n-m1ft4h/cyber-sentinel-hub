import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export function CategoryManager() {
  const [blogCategories, setBlogCategories] = useState<Category[]>([]);
  const [galleryCategories, setGalleryCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [newBlogCategory, setNewBlogCategory] = useState('');
  const [newGalleryCategory, setNewGalleryCategory] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const [blogResult, galleryResult] = await Promise.all([
        supabase.from('blog_categories').select('*').order('name'),
        supabase.from('gallery_categories').select('*').order('name'),
      ]);

      setBlogCategories(blogResult.data || []);
      setGalleryCategories(galleryResult.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleAddBlogCategory = async () => {
    if (!newBlogCategory.trim()) return;

    try {
      const { data, error } = await supabase
        .from('blog_categories')
        .insert({
          name: newBlogCategory.trim(),
          slug: generateSlug(newBlogCategory),
        })
        .select()
        .single();

      if (error) throw error;

      setBlogCategories([...blogCategories, data]);
      setNewBlogCategory('');
      toast({ title: "Added", description: "Blog category added" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add category",
        variant: "destructive",
      });
    }
  };

  const handleAddGalleryCategory = async () => {
    if (!newGalleryCategory.trim()) return;

    try {
      const { data, error } = await supabase
        .from('gallery_categories')
        .insert({
          name: newGalleryCategory.trim(),
          slug: generateSlug(newGalleryCategory),
        })
        .select()
        .single();

      if (error) throw error;

      setGalleryCategories([...galleryCategories, data]);
      setNewGalleryCategory('');
      toast({ title: "Added", description: "Gallery category added" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add category",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setEditName(category.name);
  };

  const handleSaveEdit = async (table: 'blog_categories' | 'gallery_categories') => {
    if (!editName.trim() || !editingId) return;

    try {
      const { error } = await supabase
        .from(table)
        .update({
          name: editName.trim(),
          slug: generateSlug(editName),
        })
        .eq('id', editingId);

      if (error) throw error;

      if (table === 'blog_categories') {
        setBlogCategories(blogCategories.map(c =>
          c.id === editingId ? { ...c, name: editName.trim(), slug: generateSlug(editName) } : c
        ));
      } else {
        setGalleryCategories(galleryCategories.map(c =>
          c.id === editingId ? { ...c, name: editName.trim(), slug: generateSlug(editName) } : c
        ));
      }

      setEditingId(null);
      setEditName('');
      toast({ title: "Updated", description: "Category updated" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update category",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string, table: 'blog_categories' | 'gallery_categories') => {
    if (!confirm('Delete this category? Items using it will be uncategorized.')) return;

    try {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;

      if (table === 'blog_categories') {
        setBlogCategories(blogCategories.filter(c => c.id !== id));
      } else {
        setGalleryCategories(galleryCategories.filter(c => c.id !== id));
      }

      toast({ title: "Deleted", description: "Category deleted" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete category",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const CategoryList = ({
    categories,
    table,
    newValue,
    setNewValue,
    onAdd,
  }: {
    categories: Category[];
    table: 'blog_categories' | 'gallery_categories';
    newValue: string;
    setNewValue: (v: string) => void;
    onAdd: () => void;
  }) => (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Input
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="New category name"
          className="bg-secondary/50"
          onKeyDown={(e) => e.key === 'Enter' && onAdd()}
        />
        <Button onClick={onAdd} size="icon" className="shrink-0">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
          >
            {editingId === category.id ? (
              <div className="flex items-center gap-2 flex-1">
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="bg-secondary/50 h-8"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(table)}
                />
                <Button size="icon" variant="ghost" onClick={() => handleSaveEdit(table)} className="h-8 w-8">
                  <Save className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => setEditingId(null)} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <div>
                  <span className="font-medium text-foreground">{category.name}</span>
                  <span className="text-xs text-muted-foreground ml-2 font-mono">/{category.slug}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button size="icon" variant="ghost" onClick={() => handleEdit(category)} className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(category.id, table)}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        ))}
        {categories.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No categories yet</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Categories</h1>
        <p className="text-muted-foreground font-mono text-sm mt-1">
          &gt; Manage blog and gallery categories
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">Blog Categories</h2>
          <CategoryList
            categories={blogCategories}
            table="blog_categories"
            newValue={newBlogCategory}
            setNewValue={setNewBlogCategory}
            onAdd={handleAddBlogCategory}
          />
        </div>

        <div>
          <h2 className="text-lg font-bold text-foreground mb-4">Gallery Categories</h2>
          <CategoryList
            categories={galleryCategories}
            table="gallery_categories"
            newValue={newGalleryCategory}
            setNewValue={setNewGalleryCategory}
            onAdd={handleAddGalleryCategory}
          />
        </div>
      </div>
    </div>
  );
}
