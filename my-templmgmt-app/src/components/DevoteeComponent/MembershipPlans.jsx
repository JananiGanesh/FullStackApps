import PlanCard from "./PlanCard";

const plans = [
  { title: "Basic", price:500, benefits: ["Newsletter", "Discounted Event Tickets"] },
  { title: "Premium", price:2000, benefits: ["Everything in Basic", "Personalised Poojas", "Priority Booking"] },
];

export default function MembershipPlans({ onSelectPlan }) {
  return (
    <div className="row">
      {plans.map((plan, i) => (
        <div className="col-md-6" key={i}>
          <PlanCard {...plan} onSelect={() => onSelectPlan(plan)} />
        </div>
      ))}
    </div>
  );
}
