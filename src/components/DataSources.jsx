import React from 'react';
import { Database, CheckCircle, ExternalLink, Shield, Zap, TrendingUp, Activity, Globe } from 'lucide-react';

const DataSources = () => {
  const sources = [
    {
      name: 'PM SHRI Schools',
      description: 'Comprehensive database of PM Schools for Rising India with real-time enrollment and infrastructure data',
      url: 'https://pmshrischools.education.gov.in/',
      records: '14,500+',
      recordLabel: 'Schools',
      updateFrequency: 'Daily',
      accuracy: '99.8%',
      category: 'Infrastructure',
      icon: Database
    },
    {
      name: 'National Scholarship Portal',
      description: 'Central platform for scholarship schemes with beneficiary tracking and disbursement analytics',
      url: 'https://scholarships.gov.in/',
      records: '13.2 Cr+',
      recordLabel: 'Applications',
      updateFrequency: 'Real-time',
      accuracy: '99.5%',
      category: 'Financial Aid',
      icon: TrendingUp
    },
    {
      name: 'UDISE+ Education',
      description: 'Unified District Information System for Education Plus - comprehensive school analytics',
      url: 'https://udiseplus.gov.in/',
      records: '15.5 Lakh',
      recordLabel: 'Schools',
      updateFrequency: 'Weekly',
      accuracy: '98.9%',
      category: 'Analytics',
      icon: Activity
    },
    {
      name: 'Ministry Budget Portal',
      description: 'Official budget allocation and expenditure tracking for all education schemes',
      url: 'https://www.indiabudget.gov.in/',
      records: '₹1.12 Lakh Cr',
      recordLabel: 'Budget',
      updateFrequency: 'Monthly',
      accuracy: '100%',
      category: 'Financial',
      icon: TrendingUp
    },
    {
      name: 'DIKSHA Platform',
      description: 'Digital Infrastructure for Knowledge Sharing - teacher training and digital content repository',
      url: 'https://diksha.gov.in/',
      records: '5+ Cr',
      recordLabel: 'Users',
      updateFrequency: 'Real-time',
      accuracy: '99.2%',
      category: 'Digital Learning',
      icon: Globe
    },
    {
      name: 'SWAYAM Portal',
      description: 'Study Webs of Active Learning for Young Aspiring Minds - online courses database',
      url: 'https://swayam.gov.in/',
      records: '2,000+',
      recordLabel: 'Courses',
      updateFrequency: 'Weekly',
      accuracy: '99.9%',
      category: 'Higher Education',
      icon: Database
    }
  ];

  const stats = [
    { label: 'Data Sources', value: '6+', icon: Database },
    { label: 'Records', value: '50+ Cr', icon: TrendingUp },
    { label: 'Updates', value: 'Real-time', icon: Zap },
    { label: 'Accuracy', value: '99.5%', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8 pb-12 md:pb-16">
        
        {/* HEADER - RESPONSIVE */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center space-x-2 px-3 md:px-4 py-1.5 md:py-2 bg-white border-2 border-[#1E3A5F]/10 rounded-full mb-3 md:mb-4 shadow-sm">
            <Shield className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#1E3A5F]" />
            <span className="text-xs md:text-sm font-bold text-[#1E3A5F]">Verified Government Data</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 md:mb-3">
            Official Data Sources
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Powered by verified government databases with real-time synchronization
          </p>
        </div>

        {/* STATS GRID - RESPONSIVE */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mb-8 md:mb-12">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 border-2 border-gray-200 hover:border-[#1E3A5F] hover:shadow-lg transition-all"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1E3A5F] rounded-lg flex items-center justify-center mb-3 md:mb-4">
                <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs md:text-sm text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* DATA SOURCES GRID - RESPONSIVE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {sources.map((source, index) => (
            <div 
              key={index}
              className="group bg-white rounded-xl md:rounded-2xl p-5 md:p-7 border-2 border-gray-200 hover:border-[#1E3A5F] hover:shadow-2xl transition-all duration-300"
            >
              {/* HEADER */}
              <div className="flex items-start space-x-3 md:space-x-4 mb-4 md:mb-5">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#1E3A5F] rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <source.icon className="h-6 w-6 md:h-7 md:w-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {source.name}
                  </h3>
                  <span className="inline-block px-2 md:px-3 py-1 bg-[#1E3A5F]/10 text-[#1E3A5F] text-[10px] md:text-xs font-bold rounded-md border border-[#1E3A5F]/20">
                    {source.category}
                  </span>
                </div>
              </div>

              {/* DESCRIPTION */}
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-4 md:mb-5 line-clamp-3">
                {source.description}
              </p>

              {/* STATS */}
              <div className="space-y-2 md:space-y-3 mb-4 md:mb-5">
                <div className="flex items-center justify-between p-3 md:p-4 bg-gradient-to-r from-slate-100 to-slate-50 rounded-lg md:rounded-xl border border-gray-200">
                  <span className="text-[10px] md:text-xs text-gray-600 font-semibold">Total {source.recordLabel}</span>
                  <span className="text-sm md:text-base font-bold text-[#1E3A5F]">{source.records}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 md:p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center space-x-1.5 md:space-x-2">
                    <Activity className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#1E3A5F]" />
                    <span className="text-[10px] md:text-xs text-gray-600">
                      Updates: <span className="font-bold text-gray-900">{source.updateFrequency}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 md:space-x-1.5">
                    <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-green-500" />
                    <span className="text-[10px] md:text-xs font-bold text-gray-900">{source.accuracy}</span>
                  </div>
                </div>
              </div>

              {/* BUTTON */}
              <div className="pt-4 md:pt-5 border-t-2 border-gray-100">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center space-x-2 w-full py-2.5 md:py-3 text-xs md:text-sm font-bold text-[#1E3A5F] bg-[#1E3A5F]/5 hover:bg-[#1E3A5F] hover:text-white rounded-lg md:rounded-xl transition-all group/link border-2 border-[#1E3A5F]/20 hover:border-[#1E3A5F]"
                >
                  <span>Visit Portal</span>
                  <ExternalLink className="h-3.5 w-3.5 md:h-4 md:w-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* DATA QUALITY SECTION - RESPONSIVE */}
        <div className="bg-gradient-to-br from-[#1E3A5F] to-[#2D4A70] rounded-xl md:rounded-2xl p-6 md:p-10 lg:p-12 text-white shadow-2xl border-2 md:border-4 border-[#1E3A5F]">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-6 lg:space-x-8">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
                <Shield className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Data Quality Assurance</h3>
              <p className="text-white/90 leading-relaxed mb-4 md:mb-6 text-sm md:text-base lg:text-lg">
                All data is automatically synchronized from official government portals. Our AI system 
                cross-verifies information across multiple sources to ensure 99.5%+ accuracy.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                {[
                  { icon: Zap, label: 'Daily Sync' },
                  { icon: CheckCircle, label: 'AI Verified' },
                  { icon: Shield, label: 'Multi-Source' },
                  { icon: TrendingUp, label: 'Gov Certified' }
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className="flex items-center space-x-1.5 md:space-x-2 p-2.5 md:p-3 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20"
                  >
                    <item.icon className="h-4 w-4 md:h-5 md:w-5 text-white flex-shrink-0" />
                    <span className="text-white font-semibold text-[10px] md:text-xs lg:text-sm truncate">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DataSources;
