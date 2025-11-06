'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Users, DollarSign, Target, Zap, Award, Brain, Rocket } from 'lucide-react';

interface GameStats {
  campaigns: number;
  conversions: number;
  revenue: number;
  roi: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

export default function MarketingGameDashboard() {
  const [stats, setStats] = useState<GameStats>({
    campaigns: 0,
    conversions: 0,
    revenue: 0,
    roi: 0
  });

  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [xpToNext, setXpToNext] = useState(100);
  const [isGenerating, setIsGenerating] = useState(false);

  const [achievements] = useState<Achievement[]>([
    { id: '1', title: 'First Campaign', description: 'Launch your first AI campaign', unlocked: true, icon: '🎯' },
    { id: '2', title: 'Viral Hit', description: 'Reach 1000 conversions', unlocked: false, icon: '🚀' },
    { id: '3', title: 'Revenue Master', description: 'Generate $10,000 in revenue', unlocked: false, icon: '💰' },
    { id: '4', title: 'ROI King', description: 'Achieve 500% ROI', unlocked: false, icon: '👑' },
  ]);

  const runAICampaign = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const newCampaigns = stats.campaigns + 1;
      const newConversions = stats.conversions + Math.floor(Math.random() * 150) + 50;
      const newRevenue = stats.revenue + Math.floor(Math.random() * 3000) + 1000;
      const newROI = ((newRevenue / (newCampaigns * 100)) * 100);

      setStats({
        campaigns: newCampaigns,
        conversions: newConversions,
        revenue: newRevenue,
        roi: newROI
      });

      const xpGain = Math.floor(Math.random() * 30) + 20;
      const newXP = xp + xpGain;

      if (newXP >= xpToNext) {
        setLevel(level + 1);
        setXp(newXP - xpToNext);
        setXpToNext(Math.floor(xpToNext * 1.5));
      } else {
        setXp(newXP);
      }

      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              AI Marketing Game
            </h1>
            <p className="text-gray-300 mt-2">Master the art of AI-powered marketing campaigns</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-cyan-400">Level {level}</div>
            <div className="text-sm text-gray-400">Marketing Strategist</div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="bg-gray-800/50 rounded-lg p-4 mb-6 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">Experience</span>
            <span className="text-sm text-gray-300">{xp} / {xpToNext} XP</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${(xp / xpToNext) * 100}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600/30 to-blue-800/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-1">Active Campaigns</p>
                <p className="text-3xl font-bold text-blue-300">{stats.campaigns}</p>
              </div>
              <Target className="w-12 h-12 text-blue-400 opacity-70" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600/30 to-green-800/30 backdrop-blur-sm rounded-xl p-6 border border-green-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-1">Total Conversions</p>
                <p className="text-3xl font-bold text-green-300">{stats.conversions.toLocaleString()}</p>
              </div>
              <Users className="w-12 h-12 text-green-400 opacity-70" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-600/30 to-yellow-800/30 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-1">Revenue Generated</p>
                <p className="text-3xl font-bold text-yellow-300">${stats.revenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-12 h-12 text-yellow-400 opacity-70" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600/30 to-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm mb-1">ROI</p>
                <p className="text-3xl font-bold text-purple-300">{stats.roi.toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-400 opacity-70" />
            </div>
          </div>
        </div>

        {/* Main Action Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold">AI Campaign Generator</h2>
            </div>
            <p className="text-gray-400 mb-6">
              Leverage cutting-edge AI to create, optimize, and launch marketing campaigns that convert.
              Each campaign uses machine learning to target the right audience at the right time.
            </p>
            <button
              onClick={runAICampaign}
              disabled={isGenerating}
              className={`w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Generating Campaign...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Launch AI Campaign
                </>
              )}
            </button>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6 text-yellow-400" />
              <h2 className="text-xl font-bold">Achievements</h2>
            </div>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-3 rounded-lg border ${
                    achievement.unlocked
                      ? 'bg-yellow-500/20 border-yellow-500/30'
                      : 'bg-gray-700/30 border-gray-600/30 opacity-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <h3 className="font-semibold text-sm">{achievement.title}</h3>
                      <p className="text-xs text-gray-400">{achievement.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Campaign Strategy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-pink-600/20 to-pink-800/20 backdrop-blur-sm rounded-xl p-6 border border-pink-500/20">
            <Rocket className="w-10 h-10 text-pink-400 mb-3" />
            <h3 className="text-lg font-bold mb-2">Content Marketing</h3>
            <p className="text-sm text-gray-400">AI-generated blog posts, social media content, and email campaigns optimized for engagement.</p>
          </div>

          <div className="bg-gradient-to-br from-cyan-600/20 to-cyan-800/20 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
            <Target className="w-10 h-10 text-cyan-400 mb-3" />
            <h3 className="text-lg font-bold mb-2">Paid Advertising</h3>
            <p className="text-sm text-gray-400">Smart ad placement with AI-powered bidding strategies and audience targeting.</p>
          </div>

          <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-sm rounded-xl p-6 border border-green-500/20">
            <Users className="w-10 h-10 text-green-400 mb-3" />
            <h3 className="text-lg font-bold mb-2">Social Engagement</h3>
            <p className="text-sm text-gray-400">Automated social media management with sentiment analysis and influencer identification.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
