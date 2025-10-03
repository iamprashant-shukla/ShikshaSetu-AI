import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Calendar } from 'lucide-react';

const PolicyCard = ({ policy }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/policy/${policy.id}`);
  };

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg md:rounded-xl p-4 md:p-5 cursor-pointer hover:border-[#1E3A5F] hover:shadow-xl transition-all"
      onClick={handleClick}
    >
      {/* Header */}
      <div className="mb-3 md:mb-4">
        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-[#1E3A5F] transition-colors">
          {policy.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="inline-block px-2 md:px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-[10px] md:text-xs font-semibold">
            {policy.category}
          </span>
          <span className="text-base md:text-lg font-bold text-green-600">
            ₹{(policy.budget/1000).toFixed(1)}K Cr
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 line-clamp-3 leading-relaxed">
        {policy.description}
      </p>

      {/* Stats */}
      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4 text-xs">
        <div className="flex items-center gap-1 md:gap-1.5 text-gray-600">
          <Users className="h-3.5 w-3.5 md:h-4 md:w-4" />
          <span className="text-[10px] md:text-xs">{policy.beneficiaries}</span>
        </div>
        <div className="flex items-center gap-1 md:gap-1.5 text-gray-600">
          <Calendar className="h-3.5 w-3.5 md:h-4 md:w-4" />
          <span className="text-[10px] md:text-xs">{policy.status}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-[10px] md:text-xs text-gray-500 line-clamp-1">
          {policy.implementingAgency.split(',')[0]}
        </span>
        <div className="flex items-center gap-1 text-[#1E3A5F] text-xs md:text-sm font-semibold">
          <span>View</span>
          <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
        </div>
      </div>
    </div>
  );
};

export default PolicyCard;
