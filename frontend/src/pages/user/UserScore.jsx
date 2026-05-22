


import React, { useState } from 'react';
import { Search, Calendar, Plus, Minus, DollarSign, Award, Trophy, Activity } from 'lucide-react';

const UserScore = () => {
  // Local state for hole scores (18 holes initialized to 0)
  const [scores, setScores] = useState(Array(18).fill(0));
  
  // Calculate total Stableford score
  const totalScore = scores.reduce((sum, score) => sum + score, 0);
  
  // Handlers to increment/decrement hole scores
  const handleIncrement = (index) => {
    const newScores = [...scores];
    newScores[index] += 1;
    setScores(newScores);
  };

  const handleDecrement = (index) => {
    const newScores = [...scores];
    if (newScores[index] > 0) {
      newScores[index] -= 1;
      setScores(newScores);
    }
  };

  // Mock data for recent history
  const recentHistory = [
    { course: 'Pebble Beach', date: 'Oct 12, 2024', impact: '$12.50', score: 38, status: 'VERIFIED' },
    { course: 'TPC Sawgrass', date: 'Oct 08, 2024', impact: '$8.00', score: 32, status: 'PENDING' },
    { course: 'St Andrews Old', date: 'Sep 29, 2024', impact: '$18.25', score: 42, status: 'VERIFIED' },
    { course: 'Muirfield Village', date: 'Sep 15, 2024', impact: '$5.00', score: 29, status: 'VERIFIED' },
    { course: 'Pinehurst No. 2', date: 'Sep 04, 2024', impact: '$10.50', score: 35, status: 'VERIFIED' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0F0D] text-white p-6 md:p-10 font-sans">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-100 tracking-tight">Stableford Score Entry</h1>
        <p className="text-gray-400 mt-2 text-sm md:text-base">Log your round and convert your precision into charitable impact.</p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left & Center Column: Entry Form */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Course & Date Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#131916] p-6 rounded-2xl border border-gray-800/40">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Course Name</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="e.g. Augusta National" 
                  className="w-full bg-[#1A221E] text-gray-200 pl-4 pr-10 py-3 rounded-xl border border-transparent focus:border-[#2BB673] focus:outline-none placeholder-gray-600 transition"
                />
                <Search className="absolute right-3 top-3.5 text-gray-500 w-5 h-5" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Round Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="dd-mm-yyyy" 
                  className="w-full bg-[#1A221E] text-gray-200 pl-4 pr-10 py-3 rounded-xl border border-transparent focus:border-[#2BB673] focus:outline-none placeholder-gray-600 transition"
                />
                <Calendar className="absolute right-3 top-3.5 text-gray-500 w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Hole by Hole Scoring Card */}
          <div className="bg-[#131916] p-6 rounded-3xl border border-gray-800/40 relative">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-xl font-bold text-[#2BB673]">Hole by Hole</h2>
                <p className="text-xs text-gray-400 mt-1">Enter Stableford points for each hole</p>
              </div>
              <div className="text-right">
                <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Running Total</span>
                <span className="text-4xl font-black text-[#2BB673]">{totalScore}</span>
              </div>
            </div>

            {/* Grid for 18 Holes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
              {scores.map((score, index) => (
                <div key={index} className="bg-[#1A221E] p-3 rounded-xl flex flex-col items-center justify-between border border-gray-800/30">
                  <span className="text-xs text-gray-500 font-medium mb-2">Hole {index + 1}</span>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => handleDecrement(index)}
                      className="p-1 rounded-md bg-[#232D28] text-gray-400 hover:text-white transition"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-lg font-bold text-gray-200 w-4 text-center">{score}</span>
                    <button 
                      onClick={() => handleIncrement(index)}
                      className="p-1 rounded-md bg-[#232D28] text-gray-400 hover:text-white transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Form Action Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-800/60 gap-4">
              <div className="flex items-center space-x-3 self-start sm:self-center">
                <div className="p-3 rounded-xl bg-[#1A221E] text-[#2BB673]">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-300">Projected Donation</h4>
                  <p className="text-xs text-gray-500">${(totalScore * 0.5).toFixed(2)} to Water.org</p>
                </div>
              </div>
              <button className="w-full sm:w-auto px-8 py-3.5 bg-[#2BB673] text-[#0A0F0D] font-bold rounded-xl hover:bg-[#249e62] transition shadow-lg shadow-[#2BB673]/10 tracking-wide">
                Submit Score
              </button>
            </div>

          </div>
        </div>

        {/* Right Column: Profile Summary & History */}
        <div className="space-y-6">
          
          {/* User Status Profile Card */}
          <div className="bg-[#131916] p-6 rounded-2xl border border-gray-800/40">
            <div className="flex items-center space-x-4 mb-6">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120" 
                alt="Alex Thompson" 
                className="w-12 h-12 rounded-full object-cover border border-[#2BB673]"
              />
              <div>
                <h3 className="font-bold text-gray-100">Welcome</h3>
                <span className="text-[10px] font-bold bg-[#1A221E] text-[#2BB673] px-2 py-0.5 rounded-full tracking-wider uppercase">Pro Member</span>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-800/30">
                <span className="text-gray-400">Current Handicap</span>
                <span className="font-bold text-gray-200">4.2</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-800/30">
                <span className="text-gray-400">Avg Stableford</span>
                <span className="font-bold text-gray-200">34.8</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-gray-400">Lifetime Impact</span>
                <span className="font-bold text-[#2BB673]">$1,240.00</span>
              </div>
            </div>
          </div>

          {/* Recent History List */}
          <div className="bg-[#131916] p-6 rounded-2xl border border-gray-800/40">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Recent History</h3>
            
            <div className="space-y-4">
              {recentHistory.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-800/20 last:border-none">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-200 text-sm">{item.course}</h4>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide ${
                        item.status === 'VERIFIED' ? 'bg-[#1A221E] text-[#2BB673]' : 'bg-amber-950/40 text-amber-500'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{item.date}</p>
                    <p className="text-xs text-[#2BB673] font-medium mt-0.5">+{item.impact} Impact</p>
                  </div>
                  <div className="text-2xl font-black text-gray-300">{item.score}</div>
                </div>
              ))}
            </div>

            <button className="w-full text-center text-xs text-gray-500 hover:text-gray-300 font-semibold mt-4 transition">
              View Full History
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default UserScore;