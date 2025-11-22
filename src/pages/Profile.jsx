import { useState, useEffect } from 'react';
import Mainlayout from '../components/layout/Mainlayout';
import API from '../services/api';
import { toast } from 'react-toastify';
import { User, Calendar, Droplet, Ruler, Weight, CheckCircle } from 'lucide-react';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get('/users/profile');
        if (data.success) {
          setProfile(data.data);
        }
      } catch (error) {
        console.error("Profile load error:", error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Mainlayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      </Mainlayout>
    );
  }

  return (
    <Mainlayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <span className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200">
            <CheckCircle size={14}/> Verified Account
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50/50 border-b border-gray-100 px-8 py-6">
            <h2 className="text-lg font-semibold text-gray-800">Personal Health Record</h2>
            <p className="text-sm text-gray-500 mt-1">These details are read-only to ensure medical accuracy.</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Helper Component for Fields */}
              <ProfileField icon={User} label="Full Name" value={profile?.name || "N/A"} />
              <ProfileField icon={User} label="Email" value={profile?.email || "N/A"} />
              <ProfileField icon={Calendar} label="Age" value={profile?.age ? `${profile.age} Years` : "N/A"} />
              <ProfileField icon={User} label="Gender" value={profile?.gender || "N/A"} />
              
              {/* Highlighted Blood Group */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Droplet size={14} /> Blood Group
                </label>
                <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl font-bold">
                  {profile?.bloodGroup || "N/A"}
                </div>
              </div>

              <ProfileField icon={Ruler} label="Height" value={profile?.height ? `${profile.height} cm` : "N/A"} />
              <ProfileField icon={Weight} label="Weight" value={profile?.weight ? `${profile.weight} kg` : "N/A"} />

            </div>
          </div>
        </div>
      </div>
    </Mainlayout>
  );
};

// Simple Sub-component to reduce code repetition
const ProfileField = ({ icon: Icon, label, value }) => (
  <div className="space-y-1">
    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
      <Icon size={14} /> {label}
    </label>
    <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-medium">
      {value}
    </div>
  </div>
);

export default Profile;