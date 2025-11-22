import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, HeartPulse, Calendar, Droplet, Ruler, Weight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  // ✅ FIX: Use a single state object for all fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: 'Male',
    bloodGroup: '',
    height: '',
    weight: ''
  });
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // ✅ FIX: Pass the entire formData object, not individual strings
    // This matches the updated AuthContext signature: register(formData)
    const res = await register(formData);
    
    if (res.success) {
      navigate('/dashboard');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white order-1 lg:order-2 overflow-y-auto">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Health Profile</h2>
            <p className="text-gray-500">Enter your details to personalize your care.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Account Login</h3>
              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input 
                    required 
                    type="text" 
                    name="name" 
                    placeholder="Full Name" 
                    onChange={handleChange} 
                    className="w-full pl-10 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary outline-none" 
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input 
                    required 
                    type="email" 
                    name="email" 
                    placeholder="Email Address" 
                    onChange={handleChange} 
                    className="w-full pl-10 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary outline-none" 
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input 
                    required 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    onChange={handleChange} 
                    className="w-full pl-10 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary outline-none" 
                  />
                </div>
              </div>
            </div>

            {/* Health Info */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Health Metrics (For Profile)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input 
                    required 
                    type="number" 
                    name="age" 
                    placeholder="Age" 
                    onChange={handleChange} 
                    className="w-full pl-10 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary outline-none" 
                  />
                </div>
                <div className="relative">
                  <select 
                    required 
                    name="gender" 
                    onChange={handleChange} 
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary outline-none bg-white text-gray-600"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="relative">
                  <Droplet className="absolute left-3 top-3 text-gray-400" size={18} />
                  <select 
                    required 
                    name="bloodGroup" 
                    onChange={handleChange} 
                    className="w-full pl-10 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary outline-none bg-white text-gray-600"
                  >
                    <option value="">Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
                <div className="relative">
                  <Ruler className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input 
                    required 
                    type="number" 
                    name="height" 
                    placeholder="Height (cm)" 
                    onChange={handleChange} 
                    className="w-full pl-10 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary outline-none" 
                  />
                </div>
                <div className="relative col-span-2">
                  <Weight className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input 
                    required 
                    type="number" 
                    name="weight" 
                    placeholder="Weight (kg)" 
                    onChange={handleChange} 
                    className="w-full pl-10 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary outline-none" 
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-black hover:text-white bg-secondary hover:bg-emerald-600 transition-all"
            >
              {isSubmitting ? 'Creating Profile...' : 'Complete Registration'}
              {!isSubmitting && <ArrowRight size={18} className="ml-2" />}
            </button>

            <div className="text-center">
              <Link to="/login" className="font-medium text-secondary hover:text-emerald-600">Log in instead</Link>
            </div>
          </form>
        </div>
      </div>

      {/* Visual Side */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-secondary to-teal-600 items-center justify-center p-12 relative order-2 lg:order-1">
        <div className="text-white z-10 max-w-md">
          <div className="mb-6 flex items-center gap-3">
             <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm"><HeartPulse size={32} /></div>
            <h1 className="text-3xl font-bold">Profile Setup</h1>
          </div>
          <h2 className="text-4xl font-extrabold mb-4">One time setup for lifetime care.</h2>
          <p className="text-emerald-50 text-lg">We need your metrics to calculate accurate health goals and preventive schedules.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;