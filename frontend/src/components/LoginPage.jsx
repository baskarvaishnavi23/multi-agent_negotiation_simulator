import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Create Account
  const [showPassword, setShowPassword] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this is where you would call your FastAPI auth endpoint
    // e.g., POST /auth/login or POST /auth/register
    console.log("Form Submitted:", formData);
    
    // Redirect to home page after successful login/signup
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Decor Dots (Optional styling effect) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl -z-10"></div>

      <div className="w-full max-w-md bg-[#11161F] border border-[#2A2D36] rounded-xl shadow-2xl p-8">
        
        {/* Header / Logo */}
        <div className="flex items-center justify-center gap-2 mb-6 text-white font-bold text-2xl">
          <div className="bg-purple-600 p-1.5 rounded-lg">
            <Zap size={20} className="text-white fill-current" />
          </div>
          NegotiateAI
          <span className="text-[10px] font-medium text-gray-500 mt-2 ml-1">TECHNICAL INTELLIGENCE</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-white mb-1">
          {isLogin ? 'Welcome back' : 'Create account'}
        </h2>
        <p className="text-sm text-gray-400 mb-8">
          {isLogin 
            ? 'Sign in to access your negotiation simulation history.' 
            : 'Initialize your secure simulation environment.'}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name Field (Only for Create Account mode) */}
          {!isLogin && (
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="text" 
                  name="name"
                  placeholder="John Doe"
                  className="w-full bg-[#0B0E14] border border-[#2A2D36] rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="email" 
                name="email"
                placeholder="name@company.ai"
                className="w-full bg-[#0B0E14] border border-[#2A2D36] rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="w-full bg-[#0B0E14] border border-[#2A2D36] rounded-lg pl-10 pr-10 py-3 text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field (Only for Create Account mode) */}
          {!isLogin && (
            <div>
              <label className="block text-sm text-gray-400 mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  className="w-full bg-[#0B0E14] border border-[#2A2D36] rounded-lg pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition duration-200 mt-2"
          >
            {isLogin ? 'Log In' : 'Create account'}
          </button>

        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#2A2D36]"></div>
          </div>
        </div>

        {/* Toggle Mode (Login vs Create Account) */}
        <div className="text-center text-sm text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-purple-400 hover:text-purple-300 underline decoration-purple-400/30 underline-offset-4 transition"
          >
            {isLogin ? 'Create one' : 'Log in'}
          </button>
        </div>

        {/* Footer Links */}
        <div className="flex justify-center gap-6 mt-6 text-[10px] text-gray-600">
          <span className="cursor-pointer hover:text-gray-400 transition">Privacy Policy</span>
          <span className="text-gray-700">•</span>
          <span className="cursor-pointer hover:text-gray-400 transition">Terms of Service</span>
        </div>

        {/* System Status Badge (Matches screenshot bottom left) */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-gray-600 border-t border-[#2A2D36] pt-4">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            SYSTEM: READY
          </div>
          <span className="text-gray-700">•</span>
          <span>v1.0.42-STABLE</span>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
