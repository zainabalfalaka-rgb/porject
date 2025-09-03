/*
  # إنشاء نظام التعليقات

  1. جداول جديدة
    - `comments`
      - `id` (uuid, primary key)
      - `post_id` (text, معرف المقال/الصفحة)
      - `post_type` (text, نوع المحتوى)
      - `author_name` (text, اسم المعلق)
      - `author_email` (text, بريد المعلق)
      - `comment_text` (text, نص التعليق)
      - `is_approved` (boolean, حالة الموافقة)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. الأمان
    - تفعيل RLS على جدول `comments`
    - سياسة للقراءة (التعليقات المعتمدة فقط)
    - سياسة للإدراج (أي شخص يمكنه إضافة تعليق)
*/

-- إنشاء جدول التعليقات
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id text NOT NULL,
  post_type text NOT NULL CHECK (post_type IN ('warning', 'lawyer', 'guide', 'case')),
  author_name text NOT NULL,
  author_email text NOT NULL,
  comment_text text NOT NULL,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- إنشاء فهرس لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_approved ON comments(is_approved);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

-- تفعيل Row Level Security
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- سياسة للقراءة - يمكن لأي شخص قراءة التعليقات المعتمدة فقط
CREATE POLICY "Anyone can read approved comments"
  ON comments
  FOR SELECT
  USING (is_approved = true);

-- سياسة للإدراج - يمكن لأي شخص إضافة تعليق (سيكون غير معتمد افتراضياً)
CREATE POLICY "Anyone can insert comments"
  ON comments
  FOR INSERT
  WITH CHECK (true);

-- دالة لتحديث updated_at تلقائياً
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- إنشاء trigger لتحديث updated_at
DROP TRIGGER IF EXISTS update_comments_updated_at ON comments;
CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();