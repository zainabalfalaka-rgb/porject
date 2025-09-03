import { createClient } from '@supabase/supabase-js';

// إعداد عميل Supabase مع التحقق من المتغيرات
const supabaseUrl = import.meta.env.PUBLIC_VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_VITE_SUPABASE_ANON_KEY || '';

// التحقق من وجود متغيرات البيئة
let supabase = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  // تعيين متغير عام للإشارة إلى أن Supabase مُعد
  if (typeof window !== 'undefined') {
    window.supabaseConfigured = true;
  }
} else {
  console.warn('Supabase environment variables not found. Please connect to Supabase.');
  if (typeof window !== 'undefined') {
    window.supabaseConfigured = false;
  }
}

export { supabase };

// واجهة برمجة التطبيقات للتعليقات
export const commentsAPI = {
  // إضافة تعليق جديد (غير معتمد افتراضياً)
  async addComment(commentData) {
    if (!supabase) {
      throw new Error('Supabase not configured. Please connect to Supabase first.');
    }
    
    const { data, error } = await supabase
      .from('comments')
      .insert([{
        post_id: commentData.postId,
        post_type: commentData.postType,
        author_name: commentData.authorName,
        author_email: commentData.authorEmail,
        comment_text: commentData.commentText,
        is_approved: false // سيحتاج موافقة المدير
      }])
      .select();
    
    if (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
    
    return data;
  },

  // جلب التعليقات المعتمدة لمقال معين
  async getApprovedComments(postId) {
    if (!supabase) {
      console.warn('Supabase not configured. Returning empty comments array.');
      return [];
    }
    
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
    
    return data || [];
  },

  // جلب عدد التعليقات المعتمدة
  async getCommentsCount(postId) {
    if (!supabase) {
      return 0;
    }
    
    const { count, error } = await supabase
      .from('comments')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', postId)
      .eq('is_approved', true);
    
    if (error) {
      console.error('Error fetching comments count:', error);
      throw error;
    }
    
    return count || 0;
  },

  // جلب جميع التعليقات (للمدير) - يتطلب صلاحيات خاصة
  async getAllComments() {
    if (!supabase) {
      return [];
    }
    
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching all comments:', error);
      throw error;
    }
    
    return data || [];
  },

  // الموافقة على تعليق (للمدير فقط)
  async approveComment(commentId) {
    if (!supabase) {
      throw new Error('Supabase not configured.');
    }
    
    const { data, error } = await supabase
      .from('comments')
      .update({ is_approved: true })
      .eq('id', commentId)
      .select();
    
    if (error) {
      console.error('Error approving comment:', error);
      throw error;
    }
    
    return data;
  },

  // رفض/حذف تعليق (للمدير فقط)
  async deleteComment(commentId) {
    if (!supabase) {
      throw new Error('Supabase not configured.');
    }
    
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);
    
    if (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
    
    return true;
  }
};