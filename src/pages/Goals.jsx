import { useState, useEffect } from 'react';
import Mainlayout from '../components/layout/Mainlayout';
import API from '../services/api';
import { toast } from 'react-toastify';
import { Target, Footprints, Flame, Moon, Edit2, Plus, Trash2, CheckCircle, Circle } from 'lucide-react';

const Goals = () => {
  const [goals, setGoals] = useState({
    steps: { target: 6000 },
    activity: { targetMinutes: 60 },
    sleep: { hours: 8 }
  });
  const [customGoals, setCustomGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  // Fetch All Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get('/wellness');
        if (data.success) {
          setGoals({
            steps: data.data.steps,
            activity: data.data.activity,
            sleep: data.data.sleep
          });
          setCustomGoals(data.data.customGoals || []);
        }
      } catch (error) {
        console.error("Fetch failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Update Numeric Targets
  const handleUpdateTarget = async (metric, payload) => {
    try {
      // Note: Route updated to /metric/:metric in backend
      const { data } = await API.patch(`/wellness/metric/${metric}`, payload);
      if (data.success) {
        toast.success(`${metric} target updated!`);
        setGoals(prev => ({ ...prev, [metric]: { ...prev[metric], ...payload } }));
        setEditing(null);
      }
    } catch (error) {
      toast.error('Failed to update target');
    }
  };

  // Add Custom Goal
  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!newGoal.trim()) return;
    try {
      const { data } = await API.post('/wellness/goals', { title: newGoal });
      if (data.success) {
        setCustomGoals(data.data.customGoals);
        setNewGoal('');
        toast.success('Goal added');
      }
    } catch (error) {
      toast.error('Failed to add goal');
    }
  };

  // Toggle Custom Goal
  const handleToggleGoal = async (id) => {
    try {
      const { data } = await API.patch(`/wellness/goals/${id}`);
      if (data.success) {
        setCustomGoals(data.data.customGoals);
      }
    } catch (error) {
      toast.error('Failed to update goal');
    }
  };

  // Delete Custom Goal
  const handleDeleteGoal = async (id) => {
    try {
      const { data } = await API.delete(`/wellness/goals/${id}`);
      if (data.success) {
        setCustomGoals(data.data.customGoals);
        toast.info('Goal removed');
      }
    } catch (error) {
      toast.error('Failed to remove goal');
    }
  };

  if (loading) return <MainLayout><div className="p-10 text-center">Loading Goals...</div></MainLayout>;

  return (
    <Mainlayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Target className="text-primary"/> Wellness Targets
        </h1>

        {/* Numeric Targets Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Step Goal */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Footprints size={24} /></div>
                    <h3 className="font-semibold text-gray-800">Steps</h3>
                </div>
                {editing === 'steps' ? (
                     <div className="space-y-2">
                        <input type="number" defaultValue={goals.steps.target} id="stepInput" className="w-full p-2 border rounded-lg"/>
                        <div className="flex gap-2">
                            <button onClick={() => handleUpdateTarget('steps', { target: document.getElementById('stepInput').value })} className="flex-1 bg-blue-600 text-white py-1 rounded-lg text-xs">Save</button>
                            <button onClick={() => setEditing(null)} className="flex-1 bg-gray-100 py-1 rounded-lg text-xs">Cancel</button>
                        </div>
                     </div>
                ) : (
                    <div>
                        <p className="text-3xl font-bold text-gray-900">{goals.steps.target}</p>
                        <button onClick={() => setEditing('steps')} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full"><Edit2 size={16} /></button>
                    </div>
                )}
            </div>

            {/* Activity Goal */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Flame size={24} /></div>
                    <h3 className="font-semibold text-gray-800">Active Mins</h3>
                </div>
                {editing === 'activity' ? (
                     <div className="space-y-2">
                        <input type="number" defaultValue={goals.activity.targetMinutes} id="activityInput" className="w-full p-2 border rounded-lg"/>
                        <div className="flex gap-2">
                            <button onClick={() => handleUpdateTarget('activity', { targetMinutes: document.getElementById('activityInput').value })} className="flex-1 bg-orange-600 text-white py-1 rounded-lg text-xs">Save</button>
                            <button onClick={() => setEditing(null)} className="flex-1 bg-gray-100 py-1 rounded-lg text-xs">Cancel</button>
                        </div>
                     </div>
                ) : (
                    <div>
                        <p className="text-3xl font-bold text-gray-900">{goals.activity.targetMinutes}</p>
                        <button onClick={() => setEditing('activity')} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-full"><Edit2 size={16} /></button>
                    </div>
                )}
            </div>

            {/* Sleep Goal */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Moon size={24} /></div>
                    <h3 className="font-semibold text-gray-800">Sleep Hours</h3>
                </div>
                <p className="text-3xl font-bold text-gray-900">{goals.sleep.hours}</p>
                <p className="text-xs text-gray-400 mt-1">Target per night</p>
            </div>
        </div>

        {/* Custom Checklist Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">My Daily Habits</h2>
                    <p className="text-sm text-gray-500">Build consistency with small actions</p>
                </div>
                <div className="text-sm font-medium text-primary bg-indigo-50 px-3 py-1 rounded-full">
                    {customGoals.filter(g => g.isCompleted).length}/{customGoals.length} Completed
                </div>
            </div>
            
            <div className="p-6 space-y-4">
                {/* Add New Goal Input */}
                <form onSubmit={handleAddGoal} className="flex gap-3">
                    <input 
                        type="text" 
                        value={newGoal}
                        onChange={(e) => setNewGoal(e.target.value)}
                        placeholder="Add a new habit (e.g. Drink 2L Water)..." 
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                    <button type="submit" className="bg-primary text-white px-4 py-3 rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 font-medium">
                        <Plus size={20} /> <span className="hidden sm:inline">Add</span>
                    </button>
                </form>

                {/* Goals List */}
                <div className="space-y-3 mt-6">
                    {customGoals.length === 0 ? (
                        <div className="text-center py-10 text-gray-400 italic">No habits added yet. Start by adding one above!</div>
                    ) : (
                        customGoals.map((goal) => (
                            <div 
                                key={goal._id} 
                                className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                                    goal.isCompleted ? 'bg-green-50 border-green-100' : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'
                                }`}
                            >
                                <div className="flex items-center gap-4 cursor-pointer flex-1" onClick={() => handleToggleGoal(goal._id)}>
                                    {goal.isCompleted ? (
                                        <CheckCircle className="text-green-500 fill-current" size={24} />
                                    ) : (
                                        <Circle className="text-gray-300" size={24} />
                                    )}
                                    <span className={`font-medium ${goal.isCompleted ? 'text-green-700 line-through opacity-70' : 'text-gray-700'}`}>
                                        {goal.title}
                                    </span>
                                </div>
                                <button 
                                    onClick={() => handleDeleteGoal(goal._id)}
                                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>

      </div>
    </Mainlayout>
  );
};

export default Goals;