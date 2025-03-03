import React from 'react';

interface PlanCardProps {
  name: string;
  price: number;
  duration: string;
  features: string[];
  isPopular?: boolean;
  onSelect: () => void;
  buttonText?: string;
}

const PlanCard: React.FC<PlanCardProps> = ({ 
  name, 
  price, 
  duration, 
  features, 
  isPopular = false,
  onSelect,
  buttonText = 'Select Plan'
}) => {
  return (
    <div className={`bg-gray-800 border ${
      isPopular ? 'border-indigo-500' : 'border-gray-700'
    } rounded-lg overflow-hidden relative`}>
      {isPopular && (
        <div className="absolute top-0 right-0">
          <div className="bg-indigo-500 text-white text-xs px-3 py-1 rounded-bl-lg">
            Popular
          </div>
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold">{name}</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-3xl font-extrabold">R${price}</span>
          <span className="ml-1 text-gray-400">/{duration}</span>
        </div>
        
        <ul className="mt-6 space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg className="h-5 w-5 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-sm text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
        
        <button
          className={`mt-8 w-full py-2 px-4 rounded-md text-sm font-medium ${
            isPopular 
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
              : 'bg-gray-700 hover:bg-gray-600 text-white'
          }`}
          onClick={onSelect}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default PlanCard;