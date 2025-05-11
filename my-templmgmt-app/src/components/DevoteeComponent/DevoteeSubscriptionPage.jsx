import { useState } from "react";
import MembershipPlans from "../DevoteeComponent/MembershipPlans";
import SubscriptionForm from "../DevoteeComponent/SubscriptionForm";

export default function DevoteeSubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  function handleSubscribe(data) {
    console.log("Subscription Submitted:", data);
    alert(`🙏 Thanks, ${data.name}! You've subscribed to the ${data.plan.title} plan.`);
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-Dark"> Devotee Membership</h1>
        <p className="lead text-muted">Choose your spiritual journey plan and join our community.</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-lg border-0 rounded-4 p-4">
            {!selectedPlan ? (
              <div className="fade-in">
                <MembershipPlans onSelectPlan={setSelectedPlan} />
              </div>
            ) : (
              <div className="fade-in">
                <SubscriptionForm selectedPlan={selectedPlan} onSubmit={handleSubscribe} />
                <div className="text-end mt-3">
                  <button className="btn btn-outline-secondary btn-sm" onClick={() => setSelectedPlan(null)}>
                    🔙 Back to Plans
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
