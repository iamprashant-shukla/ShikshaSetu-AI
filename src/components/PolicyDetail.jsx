import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, DollarSign, Users, Calendar, MapPin, TrendingUp } from 'lucide-react';

const PolicyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - replace with actual data fetching
  const policy = {
    id: id,
    name: "PM SHRI Schools",
    description: "Development of 14,500 schools as PM SHRI schools to showcase salient features of National Education Policy 2020",
    summary_ai: "This comprehensive initiative aims to transform 14,500 schools into model institutions showcasing NEP 2020 implementation, focusing on holistic education, infrastructure development, and teacher capacity building.",
    budget: 27360,
    beneficiaries: "50 lakh students",
    status: "Active",
    year: "2022-2027",
    implementingAgency: "Department of School Education & Literacy, Ministry of Education",
    category: "Infrastructure",
    keyFeatures: [
      "Modern infrastructure and smart classrooms",
      "Teacher training and capacity building programs",
      "Integration of technology in education",
      "Focus on holistic development",
      "Model for NEP 2020 implementation"
    ],
    achievements: [
      "5,000 schools identified across states",
      "Teacher training programs initiated",
      "Smart classroom pilots successful",
      "Infrastructure upgrades in progress",
      "Community engagement programs launched"
    ],
    key_insights: [
      "Significant focus on rural and underserved areas",
      "Holistic education approach aligns with NEP 2020 goals",
      "Strong emphasis on teacher professional development",
      "Technology integration for modern learning"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-[#1E3A5F] hover:text-[#2D4A70] mb-4 md:mb-6 font-semibold transition-colors"
        >
          <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
          <span className="text-sm md:text-base">Back</span>
        </button>
        
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg border border-gray-200 p-4 md:p-6 lg:p-8">
          
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">{policy.name}</h1>
            <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6 leading-relaxed">{policy.description}</p>
            
            {/* AI Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg md:rounded-xl p-4 md:p-5 border border-blue-200">
              <p className="text-xs md:text-sm font-semibold text-blue-900 mb-2 flex items-center">
                <span className="w-5 h-5 md:w-6 md:h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white text-xs font-bold">AI</span>
                </span>
                AI Summary
              </p>
              <p className="text-xs md:text-sm text-blue-800 leading-relaxed">{policy.summary_ai}</p>
            </div>
          </div>

          {/* Key Metrics - Responsive Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="text-center p-3 md:p-4 bg-green-50 rounded-lg md:rounded-xl">
              <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-green-600 mx-auto mb-2" />
              <p className="text-lg md:text-xl font-bold text-gray-900">₹{policy.budget.toLocaleString()} Cr</p>
              <p className="text-[10px] md:text-xs text-gray-600">Total Budget</p>
            </div>
            <div className="text-center p-3 md:p-4 bg-blue-50 rounded-lg md:rounded-xl">
              <Users className="h-5 w-5 md:h-6 md:w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-lg md:text-xl font-bold text-gray-900">{policy.beneficiaries}</p>
              <p className="text-[10px] md:text-xs text-gray-600">Beneficiaries</p>
            </div>
            <div className="text-center p-3 md:p-4 bg-purple-50 rounded-lg md:rounded-xl">
              <Calendar className="h-5 w-5 md:h-6 md:w-6 text-purple-600 mx-auto mb-2" />
              <p className="text-lg md:text-xl font-bold text-gray-900">{policy.year}</p>
              <p className="text-[10px] md:text-xs text-gray-600">Duration</p>
            </div>
            <div className="text-center p-3 md:p-4 bg-orange-50 rounded-lg md:rounded-xl">
              <MapPin className="h-5 w-5 md:h-6 md:w-6 text-orange-600 mx-auto mb-2" />
              <p className="text-lg md:text-xl font-bold text-gray-900">{policy.status}</p>
              <p className="text-[10px] md:text-xs text-gray-600">Status</p>
            </div>
          </div>

          {/* Details Grid - Responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            
            {/* Key Features */}
            <div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">Key Features</h3>
              <div className="space-y-2 md:space-y-3">
                {policy.keyFeatures?.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-2 p-2 md:p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span className="text-xs md:text-sm text-gray-700 leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">Major Achievements</h3>
              <div className="space-y-2 md:space-y-3">
                {policy.achievements?.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-2 p-2 md:p-3 bg-green-50 rounded-lg">
                    <TrendingUp className="h-3.5 w-3.5 md:h-4 md:w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs md:text-sm text-gray-700 leading-relaxed">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights */}
          {policy.key_insights && (
            <div className="mt-6 md:mt-8">
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">AI-Generated Insights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {policy.key_insights.map((insight, index) => (
                  <div key={index} className="p-3 md:p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-xs md:text-sm text-purple-900 leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 md:mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs md:text-sm text-gray-600">
              <strong>Implementing Agency:</strong> {policy.implementingAgency}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetail;
