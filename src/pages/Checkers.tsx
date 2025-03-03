import React from 'react';
import { 
  ShoppingCart, 
  CreditCard, 
  Shield, 
  RefreshCw,
  CheckCircle,
  DollarSign
} from 'lucide-react';
import CheckerCard from '../components/checkers/CheckerCard';
import { useAuth } from '../context/AuthContext';

const Checkers: React.FC = () => {
  const { currentUser } = useAuth();
  const isPremium = currentUser?.role === 'premium' || currentUser?.role === 'admin';
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Checkers</h1>
        <p className="text-gray-400 mt-1">Verify and validate cards with our powerful checkers</p>
      </div>
      
      {!isPremium && (
        <div className="bg-indigo-900/30 border border-indigo-800 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <CreditCard className="h-5 w-5 text-indigo-400 mr-3 mt-0.5" />
            <div>
              <h3 className="text-lg font-medium text-indigo-300">Upgrade to Premium</h3>
              <p className="text-sm text-indigo-200 mt-1">
                Get access to all premium checkers and unlimited checks with our premium plan.
              </p>
              <a 
                href="/plans" 
                className="mt-2 inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-1 px-3 rounded"
              >
                View Plans
              </a>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CheckerCard 
          title="Amazon Checker 1.0" 
          description="Check Amazon gift cards and balance" 
          type="amazon-1.0"
          icon={<ShoppingCart size={24} />}
        />
        
        <CheckerCard 
          title="Amazon Checker 2.0" 
          description="Advanced Amazon checker with improved success rate" 
          type="amazon-2.0"
          icon={<ShoppingCart size={24} />}
          isPremium={true}
        />
        
        <CheckerCard 
          title="VBV Checker 1.0" 
          description="Verify 3D Secure and VBV status" 
          type="vbv-1.0"
          icon={<Shield size={24} />}
        />
        
        <CheckerCard 
          title="VBV Checker 2.0" 
          description="Advanced VBV verification with detailed results" 
          type="vbv-2.0"
          icon={<Shield size={24} />}
          isPremium={true}
        />
        
        <CheckerCard 
          title="Returning & Pre Auth" 
          description="Check for N7, NSF, and GGs status" 
          type="returning"
          icon={<RefreshCw size={24} />}
          isPremium={true}
        />
        
        <CheckerCard 
          title="Full CC Checker" 
          description="Complete credit card verification" 
          type="full-cc"
          icon={<CreditCard size={24} />}
          isPremium={true}
        />
        
        <CheckerCard 
          title="Adyen Checker" 
          description="Verify cards through Adyen payment gateway" 
          type="adyen"
          icon={<DollarSign size={24} />}
          isPremium={true}
        />
      </div>
    </div>
  );
};

export default Checkers;