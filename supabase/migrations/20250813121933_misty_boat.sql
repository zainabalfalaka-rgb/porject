/*
  # إصلاح سياسات الأمان لجدول التعليقات

  1. تحديث السياسات
    - السماح للمستخدمين المجهولين بإدراج تعليقات جديدة
    - السماح للجميع بقراءة التعليقات المعتمدة فقط
  
  2. الأمان
    - تفعيل RLS على جدول التعليقات
    - إضافة سياسات محددة للقراءة والكتابة
*/

-- حذف السياسات الموجودة إن وجدت
DROP POLICY IF EXISTS "Anyone can insert comments" ON comments;
DROP POLICY IF EXISTS "Anyone can read approved comments" ON comments;

-- إنشاء سياسة جديدة للسماح بإدراج التعليقات للمستخدمين المجهولين
CREATE POLICY "Allow anonymous users to insert comments"
  ON comments
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- إنشاء سياسة للسماح للمستخدمين المسجلين بإدراج التعليقات أيضاً
CREATE POLICY "Allow authenticated users to insert comments"
  ON comments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- إنشاء سياسة لقراءة التعليقات المعتمدة للجميع
CREATE POLICY "Allow everyone to read approved comments"
  ON comments
  FOR SELECT
  TO anon, authenticated
  USING (is_approved = true);

-- التأكد من تفعيل RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;