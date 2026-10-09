const { supabase } = require('../config/supabase');
const roadmapService = require('./roadmapService');

class DashboardService {
  async getDashboard(studentId) {
    if (!studentId) throw new Error('studentId is required');

    // 1. Fetch Profile
    const { data: profile } = await supabase
      .from('student_profiles')
      .select('target_date, target_company, preferred_language')
      .eq('id', studentId)
      .single();

    // 2. Fetch Activity (Today & Streak)
    const today = new Date().toISOString().split('T')[0];
    const { data: activities } = await supabase
      .from('study_activity')
      .select('activity_date, active_minutes, questions_completed, streak_state')
      .eq('student_id', studentId)
      .order('activity_date', { ascending: false })
      .limit(7);

    let streak = 0;
    let todayProgress = { questions: 0, time_minutes: 0 };
    if (activities && activities.length > 0) {
      if (activities[0].activity_date === today) {
        streak = activities[0].streak_state || 0;
        todayProgress = {
          questions: activities[0].questions_completed || 0,
          time_minutes: activities[0].active_minutes || 0
        };
      } else {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        if (activities[0].activity_date === yesterday) {
          streak = activities[0].streak_state || 0;
        }
      }
    }

    // 3. Fetch Overall Accuracy from topic_progress
    const { data: topics } = await supabase
      .from('topic_progress')
      .select('topic_id, topics(name), accuracy, attempted_count')
      .eq('student_id', studentId)
      .gt('attempted_count', 0);

    let overallAccuracy = 0;
    let weakAreas = [];
    if (topics && topics.length > 0) {
      const totalAcc = topics.reduce((sum, t) => sum + Number(t.accuracy), 0);
      overallAccuracy = (totalAcc / topics.length).toFixed(1);

      // Sort ascending to get weak areas
      weakAreas = [...topics]
        .sort((a, b) => Number(a.accuracy) - Number(b.accuracy))
        .slice(0, 3)
        .map(t => ({
          topic_id: t.topic_id,
          topic: t.topics?.name || 'Unknown Topic',
          accuracy: Number(t.accuracy)
        }));
    } else {
      // Fallback if no practice history
      overallAccuracy = 0;
      weakAreas = [];
    }

    // 4. Determine Continue Learning from Roadmap
    let continueLearning = {
      topic: 'DSA Foundation',
      subject: 'DSA',
      next_action: 'Start Learning'
    };
    try {
      const { roadmap } = await roadmapService.getRoadmap(studentId);
      if (roadmap && roadmap.items && roadmap.items.length > 0) {
        const nextItem = roadmap.items.find(i => i.status !== 'completed' && i.itemType !== 'FINAL_MIXED_REVIEW') || roadmap.items[0];
        if (nextItem) {
          continueLearning = {
            topic: nextItem.topicName || nextItem.title,
            subject: nextItem.subject,
            next_action: nextItem.category === 'FOCUS' ? 'Strengthen Weakness' : 'Continue Learning'
          };
        }
      }
    } catch (e) {
      console.warn('Could not fetch roadmap for dashboard continue_learning:', e.message);
    }

    // Target date logic
    let daysRemaining = 0;
    if (profile?.target_date) {
      const diff = new Date(profile.target_date).getTime() - new Date().getTime();
      daysRemaining = Math.max(0, Math.ceil(diff / (1000 * 3600 * 24)));
    }

    return {
      target_date: profile?.target_date || 'Not set',
      days_remaining: daysRemaining,
      streak: streak,
      accuracy: Number(overallAccuracy),
      today_progress: todayProgress,
      weak_areas: weakAreas,
      continue_learning: continueLearning,
      daily_thought: 'Consistency beats intensity. Master one concept at a time.'
    };
  }

  async getAnalytics(studentId) {
    if (!studentId) return { weekly_activity: [] };
    const { data: activities } = await supabase
      .from('study_activity')
      .select('activity_date, questions_completed')
      .eq('student_id', studentId)
      .order('activity_date', { ascending: false })
      .limit(7);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekly_activity = [];
    
    // Default 7 days back
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const activity = (activities || []).find(a => a.activity_date === dateStr);
      weekly_activity.push({
        day: days[d.getDay()],
        count: activity ? activity.questions_completed : 0
      });
    }

    return { weekly_activity };
  }

  async getWeakAreas(studentId) {
    if (!studentId) return [];
    const { data: topics } = await supabase
      .from('topic_progress')
      .select('topic_id, topics(name), accuracy, attempted_count')
      .eq('student_id', studentId)
      .gt('attempted_count', 0)
      .order('accuracy', { ascending: true })
      .limit(5);

    if (!topics) return [];
    return topics.map(t => ({
      topic_id: t.topic_id,
      topic_name: t.topics?.name || 'Unknown Topic',
      accuracy: Number(t.accuracy)
    }));
  }
}

module.exports = new DashboardService();
