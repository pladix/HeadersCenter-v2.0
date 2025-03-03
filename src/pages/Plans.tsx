import React from 'react';
import PlanCard from '../components/plans/PlanCard';
import { useAuth } from '../context/AuthContext';

const Plans: React.FC = () => {
  const { currentUser } = useAuth();
  
  const handleSelectPlan = (planName: string) => {
    // In a real app, this would redirect to a payment page or show a payment modal
    console.log(`Selected plan: ${planName}`);
    alert(`You selected the ${planName} plan. In a real app, this would redirect to payment.`);
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Plans & Pricing</h1>
        <p className="text-gray-400 mt-1">Choose the plan that fits your needs</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PlanCard 
          name="Free Trial"
          price={0}
          duration="limited"
          features={[
            "Basic access to checkers",
            "Limited to 5 checks per day",
            "Amazon Checker 1.0",
            "VBV Checker 1.0",
            "No API access"
          ]}
          onSelect={() => handleSelectPlan('free')}
          buttonText={currentUser?.plan.name === 'free' ? 'Current Plan' : 'Select Plan'}
        />
        
        <PlanCard 
          name="Test Plan"
          price={20}
          duration="hour"
          features={[
            "Full access to all checkers",
            "Unlimited checks",
            "API access",
            "Basic support",
            "Hourly rental"
          ]}
          onSelect={() => handleSelectPlan('test')}
          buttonText={currentUser?.plan.name === 'test' ? 'Current Plan' : 'Select Plan'}
        />
        
        <PlanCard 
          name="Complete Plan"
          price={105}
          duration="month"
          features={[
            "Full access to all checkers",
            "Unlimited checks",
            "API access with higher rate limits",
            "Priority support",
            "Early access to new checkers",
            "Detailed analytics"
          ]}
          isPopular={true}
          onSelect={() => handleSelectPlan('complete')}
          buttonText={currentUser?.plan.name === 'complete' ? 'Current Plan' : 'Select Plan'}
        />
      </div>
      
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-400">
              We accept credit cards, cryptocurrency, and PIX payments for Brazilian customers.
            </p>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Can I upgrade my plan later?</h3>
            <p className="text-gray-400">
              Yes, you can upgrade your plan at any time. The remaining balance from your current plan will be applied to the new plan.
            </p>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Is there a refund policy?</h3>
            <p className="text-gray-400">
              We offer a 24-hour money-back guarantee if you're not satisfied with our service. After that period, refunds are handled on a case-by-case basis.
            </p>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">How often are new checkers added?</h3>
            <p className="text-gray-400">
              We regularly update our checkers and add new ones. Complete Plan members get early access to new checkers before they're available to other users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;