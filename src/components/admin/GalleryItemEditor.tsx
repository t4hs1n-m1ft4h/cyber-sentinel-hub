import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Upload, X, Video, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  media_url: string;
  thumbnail_url: string | null;
  media_type: string;
  category_id: string | null;
  is_published: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Props {
  item: GalleryItem | null;
  onClose: () => void;
}

export function GalleryItemEditor({ item, onClose }: Props) {
  const [title, setTitle] = useState(item?.title || '');
  const [description, setDescription] = useState(item?.description || '');
  const [mediaUrl, setMediaUrl] = useState(item?.media_url || '');
  const [thumbnailUrl, setThumbnailUrl] = useState(item?.thumbnail_url || '');
  const [mediaType, setMediaType] = useState<'image' | 'video'>(
    (item?.media_type as 'image' | 'video') || 'image'
  );
  const [categoryId, setCategoryId] = useState(item?.category_id || '');
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('gallery_categories')
      .select('*')
      .order('name');
    setCategories(data || []);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isThumbnail = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const folder = isThumbnail ? 'thumbnails' : 'gallery';
      const filePath = `${folder}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      if (isThumbnail) {
        setThumbnailUrl(publicUrl);
      } else {
        setMediaUrl(publicUrl);
        // Auto-detect media type
        if (file.type.startsWith('video/')) {
          setMediaType('video');
        } else {
          setMediaType('image');
        }
      }

      toast({
        title: "Uploaded",
        description: "File uploaded successfully",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !mediaUrl.trim()) {
      toast({
        title: "Validation Error",
        description: "Title and media URL are required",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      const itemData = {
        title: title.trim(),
        description: description.trim() || null,
        media_url: mediaUrl.trim(),
        thumbnail_url: thumbnailUrl.trim() || null,
        media_type: mediaType,
        category_id: categoryId || null,
      };

      if (item?.id) {
        const { error } = await supabase
          .from('gallery_items')
          .update(itemData)
          .eq('id', item.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('gallery_items')
          .insert(itemData);

        if (error) throw error;
      }

      toast({
        title: "Saved",
        description: `Gallery item ${item ? 'updated' : 'created'} successfully`,
      });
      onClose();
    } catch (error: any) {
      console.error('Save error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save gallery item",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {item ? 'Edit Item' : 'Add Item'}
          </h1>
          <p className="text-sm text-muted-foreground font-mono">
            &gt; {item ? 'Update gallery item' : 'Add new gallery item'}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter item title"
              className="bg-secondary/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description"
              className="bg-secondary/50 min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="media_type">Media Type</Label>
            <Select value={mediaType} onValueChange={(v) => setMediaType(v as 'image' | 'video')}>
              <SelectTrigger className="bg-secondary/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">
                  <span className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" /> Image
                  </span>
                </SelectItem>
                <SelectItem value="video">
                  <span className="flex items-center gap-2">
                    <Video className="h-4 w-4" /> Video
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger className="bg-secondary/50">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h3 className="font-bold text-foreground">Media *</h3>

            {mediaUrl ? (
              <div className="relative">
                {mediaType === 'video' ? (
                  <video
                    src={mediaUrl}
                    controls
                    className="w-full h-48 object-cover rounded-lg bg-secondary"
                  />
                ) : (
                  <img
                    src={mediaUrl}
                    alt="Media preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
                <button
                  onClick={() => setMediaUrl('')}
                  className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => handleFileUpload(e)}
                  className="hidden"
                  disabled={uploading}
                />
                {uploading ? (
                  <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Upload image or video</span>
                  </>
                )}
              </label>
            )}

            <div className="space-y-2">
              <Label htmlFor="media_url">Or paste URL</Label>
              <Input
                id="media_url"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder="https://youtube.com/... or image URL"
                className="bg-secondary/50"
              />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h3 className="font-bold text-foreground">Thumbnail (for videos)</h3>

            {thumbnailUrl ? (
              <div className="relative">
                <img
                  src={thumbnailUrl}
                  alt="Thumbnail"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => setThumbnailUrl('')}
                  className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, true)}
                  className="hidden"
                />
                <Upload className="h-6 w-6 text-muted-foreground mb-1" />
                <span className="text-xs text-muted-foreground">Upload thumbnail</span>
              </label>
            )}
          </div>

          <Button 
            onClick={handleSave} 
            className="w-full font-mono"
            disabled={saving}
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Saving...
              </span>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Item
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
