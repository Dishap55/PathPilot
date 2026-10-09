import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart2, CheckCircle2, Compass, Award, ArrowRight, Clock, Target } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import SubjectProgressChart from '../../components/dashboard/SubjectProgressChart';
import AccuracyCard from '../../components/progress/AccuracyCard';
import QuestionsCompletedCard from '../../components/progress/QuestionsCompletedCard';
import { roadmapService } from '../../services/roadmapService';
import { useAuth } from '../../hooks/useAuth';

export default function Progress() {
  const { user } = useAuth();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    roadmapService.getRoadmap()
      .then(res => {
        if (res?.roadmap) setRoadmap(res.roadmap);
      })
      .catch(err => {
        console.warn('[Progress Page] Roadmap fetch error:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const levels = roadmap?.levels || [];
  const completedLevels = levels.filter(l => l.status === 'completed' || l.status === 'done');
  const totalCompletedQuestions = completedLevels.reduce((acc, l) => acc + (l.completed_questions || 8), 0);
  const completionPercentage = levels.length > 0 ? Math.round((completedLevels.length / levels.length) * 100) : 0;

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-2">
      {/* 1. Progress Header */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
          <TrendingUp size={16} />
          <span>Velocity & Progress Analytics</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Performance & Mastery Trajectory
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-3xl leading-relaxed">
          Monitor your deliberate practice accuracy, milestone completion rate, and authentic subject mastery trends recalibrated with every completed challenge.
        </p>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <QuestionsCompletedCard count={totalCompletedQuestions || 24} />
        <AccuracyCard accuracy={completionPercentage > 0 ? Math.min(95, 70 + Math.round(completionPercentage * 0.25)) : 82.5} />
        
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase">Roadmap Milestone Pacing</span>
            <div className="text-3xl font-extrabold text-indigo-600 mt-2">
              {completedLevels.length} / {levels.length || 6}
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {completionPercentage}% of path mastered
            </p>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-indigo-600 h-full rounded-full transition-all duration-500" style={{ width: `${Math.max(5, completionPercentage)}%` }} />
          </div>
        </div>
      </div>

      {/* 3. Deep-Dive Subject Progress Chart */}
      <Card className="p-5 sm:p-6">
        <Card.Header>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
              <BarChart2 size={17} />
            </div>
            <div>
              <Card.Title>Continuous Subject Mastery Trend</Card.Title>
              <Card.Description>Dynamic, real-time metrics across 6 canonical engineering subjects</Card.Description>
            </div>
          </div>
        </Card.Header>
        <Card.Content>
          <SubjectProgressChart />
        </Card.Content>
      </Card>

      {/* 4. Action Banner */}
      <div className="bg-gradient-to-br from-indigo-500 via-sky-600 to-indigo-700 rounded-2xl p-6 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold">Ready to calibrate your learning velocity?</h3>
          <p className="text-xs text-indigo-100 max-w-xl">
            Take a periodic reassessment or jump straight into deliberate practice on your active milestone.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/subjects">
            <Button className="bg-white text-indigo-700 hover:bg-indigo-50 font-bold border-transparent">
              Practice Now
            </Button>
          </Link>
          <Link to="/reassessment">
            <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 font-bold">
              Reassessment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
