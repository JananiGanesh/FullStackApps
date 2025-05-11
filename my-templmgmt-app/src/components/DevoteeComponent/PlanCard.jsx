export default function PlanCard({ title, price, benefits, onSelect }) {

    
    return (
      <div className="card shadow-sm mb-3">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Rs.{price}/year</h6>
          <ul className="list-group list-group-flush mb-3">
            {benefits.map((b, i) => (
              <li key={i} className="list-group-item">
                ✅ {b}
              </li>
            ))}
          </ul>
          <button className="btn btn-warning" onClick={onSelect}>Choose</button>
        </div>
      </div>
    );
  }
  