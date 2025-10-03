import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  MessageCircle,
  Shield,
  Sparkles,
  FileSearch,
  Zap,
  CheckCircle,
  TrendingUp,
  Lock,
  Users,
  BarChart3,
  Globe,
  Award,
  Rocket,
  ChevronRight,
} from 'lucide-react';

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* PROFESSIONAL NAVBAR */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/98 backdrop-blur-lg shadow-md border-b border-[#D4AF37]/20' : 'bg-white/95'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-lg md:rounded-xl blur"></div>
                <div className="relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#1E3A5F] to-[#2D4A70] rounded-lg md:rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-[#D4AF37]" />
                </div>
              </div>
              <div>
                <h1 className="text-base md:text-xl font-bold text-[#1E3A5F]">ShikshaSetu AI</h1>
                <p className="text-[8px] md:text-[9px] text-gray-500 font-medium hidden sm:block">
                  Ministry of Education • Govt. of India
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a href="#features" className="text-sm text-gray-600 hover:text-[#D4AF37] transition-colors font-semibold">
                Features
              </a>
              <a href="#benefits" className="text-sm text-gray-600 hover:text-[#D4AF37] transition-colors font-semibold">
                Benefits
              </a>
              <a href="#stats" className="text-sm text-gray-600 hover:text-[#D4AF37] transition-colors font-semibold">
                Impact
              </a>
            </div>

            <button
              onClick={handleGetStarted}
              className="group px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-[#1E3A5F] to-[#2D4A70] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all text-xs md:text-sm"
            >
              <span className="flex items-center space-x-1 md:space-x-2">
                <span>Launch</span>
                <ArrowRight className="h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-20 md:pt-28 lg:pt-32 pb-16 md:pb-20 lg:pb-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center">
            {/* LEFT COLUMN */}
            <div className="space-y-6 md:space-y-8 lg:space-y-10 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3 md:px-5 py-2 md:py-2.5 bg-white border-2 border-[#D4AF37]/30 rounded-full shadow-md">
                <Shield className="h-4 w-4 md:h-5 md:w-5 text-[#1E3A5F]" />
                <span className="text-xs md:text-sm font-bold text-gray-700">🇮🇳 Official Government AI Platform</span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#1E3A5F] leading-tight mb-4 md:mb-6">
                  Intelligent Policy
                  <br />
                  Search with{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-[#D4AF37] to-[#C9A557] bg-clip-text text-transparent">
                      AI
                    </span>
                    <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-2 md:h-4 bg-[#D4AF37]/20 -rotate-1"></span>
                  </span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                  Transform government policy research with{' '}
                  <strong className="text-[#1E3A5F]">AI-powered search</strong>, instant document analysis, and{' '}
                  <strong className="text-[#D4AF37]">real-time insights</strong>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
                <button
                  onClick={handleGetStarted}
                  className="group px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 bg-gradient-to-r from-[#1E3A5F] to-[#2D4A70] text-white rounded-lg md:rounded-xl font-bold text-sm md:text-base lg:text-lg hover:shadow-2xl hover:shadow-[#D4AF37]/40 transition-all flex items-center justify-center space-x-2 md:space-x-3"
                >
                  <Rocket className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
                  <span>Start AI Chat</span>
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 group-hover:translate-x-1 transition-transform" />
                </button>

                <button className="group px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 bg-white text-[#1E3A5F] rounded-lg md:rounded-xl font-bold text-sm md:text-base lg:text-lg border-2 border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all">
                  <span className="flex items-center justify-center space-x-2">
                    <span>Watch Demo</span>
                    <ChevronRight className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 md:gap-6 lg:gap-8 pt-4 md:pt-6">
                <div className="flex items-center space-x-1.5 md:space-x-2">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                  <span className="text-xs md:text-sm font-bold text-gray-700">Verified & Secure</span>
                </div>
                <div className="flex items-center space-x-1.5 md:space-x-2">
                  <Lock className="h-4 w-4 md:h-5 md:w-5 text-[#1E3A5F]" />
                  <span className="text-xs md:text-sm font-bold text-gray-700">Government Grade</span>
                </div>
                <div className="flex items-center space-x-1.5 md:space-x-2">
                  <Zap className="h-4 w-4 md:h-5 md:w-5 text-[#D4AF37]" />
                  <span className="text-xs md:text-sm font-bold text-gray-700">Real-time Access</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - CHAT PREVIEW */}
            <div className="hidden lg:block relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#1E3A5F]/10 to-[#D4AF37]/10 rounded-3xl blur-2xl"></div>

              <div className="relative bg-white rounded-2xl shadow-2xl border-2 border-[#D4AF37]/20 overflow-hidden">
                <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2D4A70] p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center border-2 border-[#D4AF37]/30">
                      <MessageCircle className="h-7 w-7 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">AI Policy Assistant</h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-white/90 text-sm font-medium">Active • Ready to Help</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-5 bg-gradient-to-b from-slate-50 to-white h-96 overflow-auto">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#1E3A5F] to-[#2D4A70] rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                      <Sparkles className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                    <div className="bg-white rounded-xl px-5 py-4 shadow-lg border-2 border-gray-100 max-w-sm">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Hello! I can help you search policies, analyze documents, and provide insights. What would you like to know?
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2D4A70] text-white rounded-xl px-5 py-4 shadow-lg max-w-sm">
                      <p className="text-sm font-medium">What's the budget for PM SHRI Schools?</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#1E3A5F] to-[#2D4A70] rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                      <Sparkles className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                    <div className="bg-white rounded-xl px-5 py-4 shadow-lg border-2 border-gray-100 max-w-sm">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        <strong className="text-[#1E3A5F]">PM SHRI Schools</strong> has allocated{' '}
                        <strong className="text-[#D4AF37]">₹27,360 crores</strong> for infrastructure covering{' '}
                        <strong>14,500+ schools</strong> nationwide.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-white border-t-2 border-[#D4AF37]/20">
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-[#D4AF37] transition-all">
                    <MessageCircle className="h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Ask anything about policies..."
                      className="flex-1 bg-transparent text-sm outline-none"
                      disabled
                    />
                    <button className="p-2 bg-gradient-to-r from-[#1E3A5F] to-[#2D4A70] rounded-lg">
                      <ArrowRight className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 -right-5 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#C9A557] text-white rounded-xl shadow-2xl font-bold text-sm flex items-center space-x-2 border-4 border-white">
                <Sparkles className="h-5 w-5" />
                <span>AI Powered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM STATEMENT - COMPACT */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 to-white" id="features">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
              Challenges for <span className="text-[#1E3A5F]">Policy Makers</span>
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Traditional research methods create barriers to efficient decision-making
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {[
              { icon: FileSearch, title: 'Fragmented Data', desc: 'Information scattered across multiple systems' },
              { icon: TrendingUp, title: 'Time Constraints', desc: 'Urgent decisions require quick access' },
              { icon: Lock, title: 'Manual Verification', desc: 'Complex verification processes' },
              { icon: Users, title: 'Poor Coordination', desc: 'Departmental silos persist' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start space-x-4 p-5 bg-white rounded-xl border border-gray-200 hover:border-[#1E3A5F] hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-[#1E3A5F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-6 w-6 text-[#1E3A5F]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES - COMPACT */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
              Our <span className="text-[#1E3A5F]">Intelligent Solution</span>
            </h2>
            <p className="text-base text-gray-600">Complete platform for modern governance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'Lightning Search',
                desc: 'Natural language queries with sub-2-second results across all policies and schemes.',
                features: ['6+ Official Sources', 'Smart AI Filters', 'Verified Results'],
              },
              {
                icon: FileSearch,
                title: 'Document Intelligence',
                desc: 'Upload PDFs for instant AI summaries and interactive Q&A on actual content.',
                features: ['PDF Upload', 'Text Extraction', 'Content Q&A'],
              },
              {
                icon: BarChart3,
                title: 'Real-time Analytics',
                desc: 'Live dashboards tracking budgets, beneficiaries, and implementation trends.',
                features: ['Live Dashboards', 'Budget Tracking', 'Trend Analysis'],
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#1E3A5F] hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#1E3A5F] to-[#2D4A70] rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="h-7 w-7 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{feature.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {feature.features.map((f, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS - COMPACT */}
      <section className="py-16 bg-gradient-to-r from-[#1E3A5F] to-[#2D4A70]" id="stats">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Globe, value: '6+', label: 'Data Sources' },
              { icon: TrendingUp, value: '₹88K Cr', label: 'Budget Tracked' },
              { icon: Zap, value: '<2 sec', label: 'Response Time' },
              { icon: Award, value: '99.5%', label: 'AI Accuracy' },
            ].map((stat, i) => (
              <div key={i} className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <stat.icon className="h-8 w-8 text-[#D4AF37] mx-auto mb-3" />
                <div className="text-4xl font-bold mb-1 text-white">{stat.value}</div>
                <div className="text-sm text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS - COMPACT */}
      <section className="py-16 md:py-20 bg-gray-50" id="benefits">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
              Why <span className="text-[#1E3A5F]">Leaders Trust</span> Us
            </h2>
            <p className="text-base text-gray-600">Empowering data-driven decisions across government</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Policy search in seconds across all databases',
              'AI-powered document analysis with Q&A',
              'Real-time budget and beneficiary tracking',
              'Only verified government data sources',
              '24/7 instant access and insights',
              'Secure, role-based access control',
              'Mobile-friendly responsive design',
              'Trusted by officials and departments nationwide',
            ].map((benefit, i) => (
              <div
                key={i}
                className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-[#1E3A5F] transition-all"
              >
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA - COMPACT */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-r from-[#1E3A5F] to-[#2D4A70] rounded-2xl p-12 text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform <span className="text-[#D4AF37]">Policy Access?</span>
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Join government leaders using AI for faster, smarter decisions
              </p>

              <button
                onClick={handleGetStarted}
                className="group inline-flex items-center space-x-3 px-10 py-4 bg-[#D4AF37] text-white rounded-xl font-bold text-lg hover:bg-[#C9A557] transition-all"
              >
                <Rocket className="h-6 w-6" />
                <span>Launch ShikshaSetu AI</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Lock, title: 'Secure by Design', desc: 'Built for government with end-to-end encryption' },
                  { icon: CheckCircle, title: 'Verified Data', desc: 'Information sourced from official databases only' },
                  { icon: Zap, title: 'Instant Access', desc: 'Get answers and insights in real-time, 24/7' },
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <item.icon className="h-10 w-10 text-[#D4AF37] mx-auto mb-3" />
                    <h4 className="font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-sm text-white/80">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-to-r from-[#1E3A5F] to-[#2D4A70] text-white py-10 md:py-12 lg:py-16 border-t-4 border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
            <div>
              <h4 className="font-bold text-xl md:text-2xl mb-3 md:mb-4 text-[#D4AF37]">ShikshaSetu AI</h4>
              <p className="text-xs md:text-sm text-white/80 leading-relaxed font-medium">
                AI-powered policy search and analysis platform for the Ministry of Education, Government of India.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-base md:text-lg mb-3 md:mb-4 text-[#D4AF37]">Quick Links</h4>
              <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-white/80 font-medium">
                <li>
                  <a href="#features" className="hover:text-[#D4AF37] transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#benefits" className="hover:text-[#D4AF37] transition-colors">
                    Benefits
                  </a>
                </li>
                <li>
                  <a href="#stats" className="hover:text-[#D4AF37] transition-colors">
                    Impact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base md:text-lg mb-3 md:mb-4 text-[#D4AF37]">Contact</h4>
              <p className="text-xs md:text-sm text-white/80 font-medium">
                Ministry of Education
                <br />
                Department of Higher Education
                <br />
                New Delhi, India
              </p>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6 md:pt-8 text-center">
            <p className="text-xs md:text-sm text-white/80 font-semibold">
              © 2025 ShikshaSetu AI • Ministry of Education • Government of India
            </p>
            <p className="text-[10px] md:text-xs text-white/60 mt-2">Smart India Hackathon 2025 • Designed with UX4G principles</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
  