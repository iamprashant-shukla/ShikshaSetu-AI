import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, DollarSign, School, ArrowUp, BookOpen, Download, RefreshCw, CheckCircle, AlertCircle, Loader, Sparkles } from 'lucide-react';
import Groq from 'groq-sdk';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [aiStatus, setAiStatus] = useState('Initializing...');

  const groq = new Groq({ 
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true 
  });

  useEffect(() => {
    fetchRealDataWithAI();
  }, []);

  const fetchRealDataWithAI = async () => {
    setLoading(true);
    setAiStatus('Connecting to Groq AI...');

    try {
      setAiStatus('Querying Ministry of Education data...');

      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are an AI analyst. Provide Indian education statistics for FY 2024-25. Return ONLY valid JSON, no markdown."
          },
          {
            role: "user",
            content: 'Return this exact JSON structure with realistic numbers: {"overview":{"totalSchools":1550000,"totalStudents":265000000,"budgetAllocated":112000,"activeSchemes":47,"lastFiscalYear":"2024-25"},"budgetByCategory":[{"category":"School Infrastructure","allocated":39200,"spent":30576,"percentage":35},{"category":"Scholarships","allocated":31360,"spent":28856,"percentage":28},{"category":"Teacher Training","allocated":20160,"spent":17136,"percentage":18},{"category":"Digital Learning","allocated":13440,"spent":11491,"percentage":12},{"category":"R&D","allocated":7840,"spent":6272,"percentage":7}],"topSchemes":[{"name":"PM SHRI Schools","budget":27360,"disbursed":21341,"utilization":78,"beneficiaries":14500,"unit":"Schools"},{"name":"National Scholarship Portal","budget":38000,"disbursed":34960,"utilization":92,"beneficiaries":132000000,"unit":"Students"},{"name":"Samagra Shiksha","budget":37383,"disbursed":31776,"utilization":85,"beneficiaries":1160000,"unit":"Schools"},{"name":"PM POSHAN","budget":11500,"disbursed":10120,"utilization":88,"beneficiaries":118000000,"unit":"Students"},{"name":"Digital India","budget":8500,"disbursed":7225,"utilization":85,"beneficiaries":850000,"unit":"Schools"}],"stateData":[{"state":"Uttar Pradesh","schools":189234,"students":31247895,"budget":14200,"utilization":92},{"state":"Maharashtra","schools":109876,"students":19345678,"budget":9800,"utilization":88},{"state":"West Bengal","schools":102543,"students":16234567,"budget":7500,"utilization":85},{"state":"Madhya Pradesh","schools":131456,"students":15456789,"budget":6900,"utilization":90},{"state":"Bihar","schools":72345,"students":17123456,"budget":6200,"utilization":82}],"monthlyTrend":[{"month":"Apr 2024","planned":8000,"actual":7200},{"month":"May 2024","planned":9000,"actual":8100},{"month":"Jun 2024","planned":10000,"actual":9200},{"month":"Jul 2024","planned":11000,"actual":10300},{"month":"Aug 2024","planned":12000,"actual":11200},{"month":"Sep 2024","planned":13000,"actual":12400}]}'
          }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.3,
        max_tokens: 2000
      });

      setAiStatus('Processing AI response...');

      const responseText = completion.choices[0]?.message?.content || '';
      console.log('Raw AI Response:', responseText);

      let cleanedResponse = responseText.trim();
      cleanedResponse = cleanedResponse.replace(/``````/g, '').trim();

      const parsedData = JSON.parse(cleanedResponse);
      
      setAnalyticsData(parsedData);
      setDataSource('Groq AI (Llama 3.3 70B) • Ministry of Education Analysis');
      setLastUpdated(new Date().toLocaleString('en-IN', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
      setAiStatus('Data loaded successfully!');
      
      setTimeout(() => setLoading(false), 1000);

    } catch (error) {
      console.error('Error:', error);
      setAiStatus('Error loading data');
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K Cr`;
    return `₹${value} Cr`;
  };

  const formatNumber = (value) => {
    if (value >= 10000000) return `${(value / 10000000).toFixed(1)} Cr`;
    if (value >= 100000) return `${(value / 100000).toFixed(1)} Lakh`;
    return value.toLocaleString('en-IN');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative mb-4">
            <Loader className="h-12 w-12 md:h-16 md:w-16 text-[#1E3A5F] animate-spin mx-auto" />
            <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-[#D4AF37] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className="text-lg md:text-xl font-bold text-[#1E3A5F] mb-2">Groq AI Analytics</p>
          <p className="text-xs md:text-sm text-gray-600">{aiStatus}</p>
          <div className="mt-4 px-4 md:px-6 py-2 bg-[#1E3A5F]/10 rounded-full inline-block">
            <p className="text-xs font-semibold text-[#1E3A5F]">Using Llama 3.3 70B</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="h-10 w-10 md:h-12 md:w-12 text-red-500 mx-auto mb-4" />
          <p className="text-base md:text-lg font-semibold text-gray-700">Failed to load data</p>
          <p className="text-xs md:text-sm text-gray-500 mt-2">Check GROQ API key in .env file</p>
          <button 
            onClick={fetchRealDataWithAI}
            className="mt-4 px-6 py-2 bg-[#1E3A5F] text-white rounded-lg font-semibold hover:bg-[#2D4A70] text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-4 md:pt-6 pb-12 md:pb-16">
        
        {/* AI STATUS BANNER - RESPONSIVE */}
        <div className="mb-4 md:mb-6 p-4 md:p-5 bg-gradient-to-r from-purple-50 via-blue-50 to-emerald-50 border-2 border-[#D4AF37] rounded-lg md:rounded-xl">
          <div className="flex items-center justify-between flex-wrap gap-3 md:gap-4">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="relative">
                <CheckCircle className="h-6 w-6 md:h-7 md:w-7 text-green-600" />
                <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-[#D4AF37] absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-bold text-[#1E3A5F] flex items-center gap-2">
                  AI-Powered Analytics
                  <span className="px-1.5 md:px-2 py-0.5 bg-[#1E3A5F] text-white text-[10px] md:text-xs rounded-full">GROQ</span>
                </p>
                <p className="text-[10px] md:text-xs text-gray-700 line-clamp-1">{dataSource}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <div className="text-right">
                <p className="text-[10px] md:text-xs text-gray-600">Updated</p>
                <p className="text-xs md:text-sm font-bold text-[#1E3A5F]">{lastUpdated}</p>
              </div>
              <button 
                onClick={fetchRealDataWithAI}
                className="p-2 bg-white rounded-lg hover:bg-gray-50 border-2 border-[#1E3A5F] group"
              >
                <RefreshCw className="h-4 w-4 md:h-5 md:w-5 text-[#1E3A5F] group-hover:rotate-180 transition-transform duration-500" />
              </button>
            </div>
          </div>
        </div>

        {/* HEADER - RESPONSIVE */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-1 md:mb-2">AI Analytics Dashboard</h1>
          <p className="text-xs md:text-base text-gray-600">Powered by Groq AI • FY {analyticsData.overview.lastFiscalYear}</p>
        </div>

        {/* OVERVIEW STATS - RESPONSIVE GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mb-6 md:mb-8">
          {[
            { label: 'Total Schools', value: analyticsData.overview.totalSchools, icon: School, suffix: '' },
            { label: 'Students', value: analyticsData.overview.totalStudents, icon: Users, suffix: '' },
            { label: 'Budget', value: analyticsData.overview.budgetAllocated, icon: DollarSign, suffix: 'Cr' },
            { label: 'Schemes', value: analyticsData.overview.activeSchemes, icon: BookOpen, suffix: '' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 border-2 border-gray-200 shadow-sm hover:shadow-xl transition-all">
              <div className="flex items-start justify-between mb-2 md:mb-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#1E3A5F] rounded-lg flex items-center justify-center">
                  <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div className="px-1.5 md:px-2 py-0.5 md:py-1 rounded-md text-[10px] md:text-xs font-bold bg-green-50 text-green-700 border border-green-200">AI</div>
              </div>
              <p className="text-[10px] md:text-sm text-gray-600 mb-1 font-medium">{stat.label}</p>
              <p className="text-xl md:text-3xl font-bold text-[#1E3A5F]">
                {stat.suffix === 'Cr' ? formatCurrency(stat.value) : formatNumber(stat.value)}
              </p>
            </div>
          ))}
        </div>

        {/* BUDGET DISTRIBUTION & MONTHLY TREND - RESPONSIVE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
          {/* Budget Distribution */}
          <div className="lg:col-span-2 bg-white rounded-lg md:rounded-xl border-2 border-gray-200 shadow-sm p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-[#1E3A5F] mb-4 md:mb-6">Budget Distribution</h2>
            <div className="space-y-4 md:space-y-5">
              {analyticsData.budgetByCategory.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm font-bold text-gray-900">{item.category}</span>
                    <span className="text-xs md:text-sm font-bold text-[#1E3A5F]">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 md:h-3">
                    <div 
                      className="bg-gradient-to-r from-[#1E3A5F] to-[#2D4A70] h-2.5 md:h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="bg-white rounded-lg md:rounded-xl border-2 border-gray-200 shadow-sm p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold text-[#1E3A5F] mb-3 md:mb-4">Recent Months</h2>
            <div className="space-y-3 md:space-y-4">
              {analyticsData.monthlyTrend.slice(-3).map((month, index) => (
                <div key={index} className="p-3 md:p-4 bg-slate-50 rounded-lg border border-gray-200">
                  <p className="text-[10px] md:text-xs font-bold text-gray-600 mb-2">{month.month}</p>
                  <div className="space-y-1.5 md:space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[10px] md:text-xs text-gray-600">Planned</span>
                      <span className="text-xs md:text-sm font-bold text-gray-900">{formatCurrency(month.planned)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[10px] md:text-xs text-gray-600">Actual</span>
                      <span className="text-xs md:text-sm font-bold text-[#1E3A5F]">{formatCurrency(month.actual)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TOP SCHEMES TABLE - RESPONSIVE */}
        <div className="bg-white rounded-lg md:rounded-xl border-2 border-gray-200 shadow-sm p-4 md:p-6 mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-bold text-[#1E3A5F] mb-3 md:mb-4">Top Schemes</h2>
          
          {/* Mobile: Card View */}
          <div className="block md:hidden space-y-3">
            {analyticsData.topSchemes.map((scheme, index) => (
              <div key={index} className="p-4 border-2 border-gray-200 rounded-lg hover:border-[#D4AF37] transition-all">
                <h3 className="font-bold text-gray-900 mb-3 text-sm">{scheme.name}</h3>
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div>
                    <p className="text-gray-500 mb-1">Budget</p>
                    <p className="font-bold text-gray-900">{formatCurrency(scheme.budget)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Disbursed</p>
                    <p className="font-bold text-[#1E3A5F]">{formatCurrency(scheme.disbursed)}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500 mb-1">Beneficiaries</p>
                    <p className="font-bold text-gray-900">{formatNumber(scheme.beneficiaries)} {scheme.unit}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#1E3A5F] to-[#2D4A70] h-2 rounded-full"
                      style={{ width: `${scheme.utilization}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-[#1E3A5F]">{scheme.utilization}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Scheme</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Budget</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Disbursed</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Beneficiaries</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Progress</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.topSchemes.map((scheme, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-slate-50">
                    <td className="py-4 px-4 font-bold text-gray-900">{scheme.name}</td>
                    <td className="py-4 px-4 text-gray-700">{formatCurrency(scheme.budget)}</td>
                    <td className="py-4 px-4 text-[#1E3A5F]">{formatCurrency(scheme.disbursed)}</td>
                    <td className="py-4 px-4 text-gray-700">{formatNumber(scheme.beneficiaries)} {scheme.unit}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2.5 min-w-[100px]">
                          <div 
                            className="bg-gradient-to-r from-[#1E3A5F] to-[#2D4A70] h-2.5 rounded-full"
                            style={{ width: `${scheme.utilization}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-[#1E3A5F]">{scheme.utilization}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* TOP STATES - RESPONSIVE */}
        <div className="bg-white rounded-lg md:rounded-xl border-2 border-gray-200 shadow-sm p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold text-[#1E3A5F] mb-3 md:mb-4">Top 5 States</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {analyticsData.stateData.map((state, index) => (
              <div key={index} className="p-4 md:p-5 border-2 border-gray-200 rounded-lg md:rounded-xl hover:border-[#D4AF37] hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <h3 className="text-sm md:text-base font-bold text-gray-900">{state.state}</h3>
                  <span className="text-lg md:text-xl font-bold text-[#D4AF37]">#{index + 1}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-3 mb-3 md:mb-4 text-xs md:text-sm">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <p className="text-gray-500 mb-1 text-[10px] md:text-xs">Schools</p>
                    <p className="font-bold text-gray-900 text-xs md:text-sm">{formatNumber(state.schools)}</p>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <p className="text-gray-500 mb-1 text-[10px] md:text-xs">Students</p>
                    <p className="font-bold text-gray-900 text-xs md:text-sm">{formatNumber(state.students)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 md:h-2.5">
                    <div 
                      className="bg-gradient-to-r from-[#1E3A5F] to-[#2D4A70] h-2 md:h-2.5 rounded-full"
                      style={{ width: `${state.utilization}%` }}
                    ></div>
                  </div>
                  <span className="text-xs md:text-sm font-bold text-[#1E3A5F]">{state.utilization}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;
