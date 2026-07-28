import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff, Lock, Mail, User, Sparkles } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-md glass-panel p-8 md:p-10 z-10">
        
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-xl shadow-lg shadow-purple-500/20">
            <Zap size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Negotiate<span className="gradient-text">AI</span></h1>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-white mb-1 text-center">
          {isLogin ? 'Welcome Back' : 'Join the Simulator'}
        </h2>
        <p className="text-sm text-gray-400 mb-8 text-center">
          {isLogin ? 'Access your strategic negotiation dashboard.' : 'Create your secure intelligence environment.'}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {!isLogin && (
            <div className="relative group">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
              <input 
                type="text" name="name" placeholder="Full Name"
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                value={formData.name} onChange={handleChange}
              />
            </div>
          )}

          <div className="relative group">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
            <input 
              type="email" name="email" placeholder="name@company.ai"
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              value={formData.email} onChange={handleChange} required
            />
          </div>

          <div className="relative group">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
            <input 
              type={showPassword ? "text" : "password"} name="password" placeholder="••••••••"
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-12 py-3.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              value={formData.password} onChange={handleChange} required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {!isLogin && (
            <div className="relative group">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
              <input 
                type={showPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password"
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                value={formData.confirmPassword} onChange={handleChange} required={!isLogin}
              />
            </div>
          )}

          <button type="submit" className="w-full glow-btn mt-4 group">
            <span className="flex items-center justify-center gap-2">
              {isLogin ? 'Log In' : 'Create Account'}
              <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
            </span>
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
          <div className="relative flex justify-center text-xs"><span className="px-4 bg-[#1e1e24]/60 text-gray-500">OR</span></div>
        </div>

        {/* Toggle Mode */}
        <div className="text-center text-sm text-gray-400">
          {isLogin ? "New to the simulation?" : "Already an expert?"}{' '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-purple-400 hover:text-purple-300 underline decoration-purple-400/30 underline-offset-4 transition font-medium">
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
