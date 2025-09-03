/*
  # إصلاح سياسات الأمان لجدول التعليقات

  1. حذف السياسات الحالية
  2. إنشاء سياسات جديدة تسمح للمستخدمين المجهولين بإضافة التعليقات
  3. السماح للجميع بقراءة التعليقات المعتمدة
*/

-- حذف جميع السياسات الحالية
DROP POLICY IF EXISTS "Allow anonymous users to insert comments" ON comments;
DROP POLICY IF EXISTS "Allow authenticated users to insert comments" ON comments;
DROP POLICY IF EXISTS "Allow everyone to read approved comments" ON comments;

-- إنشاء سياسة جديدة للسماح للمستخدمين المجهولين بإدراج التعليقات
CREATE POLICY "Enable insert for anonymous users" ON comments
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- إنشاء سياسة للسماح للمستخدمين المسجلين بإدراج التعليقات
CREATE POLICY "Enable insert for authenticated users" ON comments
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- إنشاء سياسة للسماح للجميع بقراءة التعليقات المعتمدة
CREATE POLICY "Enable read for approved comments" ON comments
  FOR SELECT 
  TO anon, authenticated
  USING (is_approved = true);

-- التأكد من تفعيل RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;