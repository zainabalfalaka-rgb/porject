/*
  # إصلاح نهائي لسياسات الأمان في جدول التعليقات

  1. إعادة تعيين كامل لسياسات الأمان
    - تعطيل RLS مؤقتاً
    - حذف جميع السياسات الموجودة
    - إنشاء سياسات جديدة صحيحة
    - إعادة تفعيل RLS

  2. السياسات الجديدة
    - السماح للجميع (anon + authenticated) بإدراج التعليقات
    - السماح للجميع بقراءة التعليقات المعتمدة فقط
*/

-- تعطيل RLS مؤقتاً
ALTER TABLE comments DISABLE ROW LEVEL SECURITY;

-- حذف جميع السياسات الموجودة
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON comments;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON comments;
DROP POLICY IF EXISTS "Enable read for approved comments" ON comments;
DROP POLICY IF EXISTS "Allow anonymous users to insert comments" ON comments;
DROP POLICY IF EXISTS "Allow authenticated users to insert comments" ON comments;
DROP POLICY IF EXISTS "Allow everyone to read approved comments" ON comments;

-- إعادة تفعيل RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- إنشاء سياسة واحدة شاملة للإدراج (للجميع)
CREATE POLICY "Allow all users to insert comments"
  ON comments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- إنشاء سياسة للقراءة (التعليقات المعتمدة فقط)
CREATE POLICY "Allow reading approved comments"
  ON comments
  FOR SELECT
  TO anon, authenticated
  USING (is_approved = true);