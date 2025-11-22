import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import API from '../services/api';
import Mainlayout from '../components/layout/Mainlayout';
import { Footprints, Flame, Moon, Calendar, ChevronRight, Droplets } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [wellnessData, setWellnessData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Data on Load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get('/wellness');
        if (data.success) {
          setWellnessData(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Mainlayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Mainlayout>
    );
  }

  // Destructure data for easier access
  const { steps, activity, sleep, preventiveReminders, dailyTip } = wellnessData || {};
  
  // Calculate Steps Percentage
  const stepsPercent = Math.min(Math.round((steps?.current / steps?.target) * 100), 100);

  return (
    <Mainlayout>
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name.split(' ')[0]} 👋</h1>
        <p className="text-gray-500 mt-1">Here's your daily health overview.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Main Metrics */}
        <div className="lg:col-span-2 space-y-6">
          
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Wellness Goals</h2>

          {/* 1. Steps Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Footprints size={24} />
                </div>
                <span className="font-semibold text-gray-700">Steps</span>
              </div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-3xl font-bold text-gray-900">{steps?.current}</span>
                <span className="text-sm text-gray-400">/ {steps?.target} steps</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-1000" 
                  style={{ width: `${stepsPercent}%` }}
                ></div>
              </div>
            </div>
            <div className="ml-6 text-right min-w-20">
              <span className="text-xl font-bold text-blue-600">{stepsPercent}%</span>
              <p className="text-xs text-gray-400 mt-1">Daily Goal</p>
            </div>
          </div>

          {/* 2. Active Time Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex-1">
               <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                  <Flame size={24} />
                </div>
                <span className="font-semibold text-gray-700">Active Time</span>
              </div>
              <div className="flex items-baseline gap-1">
                 <span className="text-3xl font-bold text-gray-900">{activity?.minutes}</span>
                 <span className="text-sm text-gray-400">/ {activity?.targetMinutes} mins</span>
              </div>
            </div>
            <div className="text-right space-y-1">
              <div className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">{activity?.caloriesBurned}</span> Kcal
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">{activity?.distanceKm}</span> Km
              </div>
            </div>
          </div>

           {/* 3. Sleep Card */}
           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex-1">
               <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Moon size={24} />
                </div>
                <span className="font-semibold text-gray-700">Sleep</span>
              </div>
              <div className="flex items-baseline gap-1">
                 <span className="text-3xl font-bold text-gray-900">{sleep?.hours}</span>
                 <span className="text-xl font-medium text-gray-900">hr</span>
                 <span className="text-3xl font-bold text-gray-900 ml-2">{sleep?.minutes}</span>
                 <span className="text-xl font-medium text-gray-900">min</span>
              </div>
            </div>
             <div className="text-right">
               <p className="text-sm text-gray-500">{sleep?.bedTime} - {sleep?.wakeTime}</p>
               <p className="text-xs text-emerald-500 font-medium mt-1">Good Quality</p>
            </div>
          </div>

        </div>

        {/* Right Column: Reminders & Tips */}
        <div className="space-y-6">
          
          {/* Preventive Care Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-50 bg-gray-50/50">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Calendar size={18} className="text-primary"/> 
                Preventive Reminders
              </h3>
            </div>
            <div className="p-5">
              {preventiveReminders?.length > 0 ? (
                preventiveReminders.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 mb-4 last:mb-0">
                    <div className="mt-1 w-2 h-2 rounded-full bg-red-500 shrink-0"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-1">Due: {new Date(item.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400">No upcoming reminders.</p>
              )}
            </div>
            <div className="px-5 py-3 bg-gray-50 text-center border-t border-gray-100">
              <button className="text-xs font-semibold text-primary flex items-center justify-center gap-1 hover:gap-2 transition-all">
                View All Schedule <ChevronRight size={14}/>
              </button>
            </div>
          </div>

          {/* Health Tip Widget */}
          <div className="bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-200">
            <div className="flex items-center gap-2 mb-3 opacity-90">
              <Droplets size={20} />
              <span className="font-medium">Tip of the Day</span>
            </div>
            <p className="text-lg font-medium leading-relaxed">
              "{dailyTip}"
            </p>
            <div className="mt-4 flex justify-end">
               <span className="text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">Hydration</span>
            </div>
          </div>

        </div>
      </div>
    </Mainlayout>
  );
};

export default Dashboard;