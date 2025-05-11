import { useState } from "react";

export default function SubscriptionForm({ selectedPlan }) {
  const [formData, setFormData] = useState({ name: "", email: "" });

  function handleChange(e) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  /*function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ ...formData, plan: selectedPlan });
  }
*/
  const handleSubmit=async(e)=> {
    e.preventDefault();
  
    const payload = { ...formData, plan: selectedPlan.title };
  try{
    const response = await fetch("http://localhost:8081/api/v1/devotee/subscriptions-post", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: "include", // Include cookies in the request
    });

    if (response.ok) {
      const responseText = await response.text();     
        // Read plain text for success
        alert(responseText); // Show success message
        setFormData({ name: "", email: "" }); // Reset form fields  

      }
    else {
      const errorData = await response.json(); // Try to parse JSON for errors
      alert(errorData.message || 'Failed to subscribe.'); // Show error message
    }}catch (error) { 
      console.error('Error submitting subscription:', error);
      alert('An unexpected error occurred.'); // Show error message
    }
  finally {
      // Optionally, you can reset the form or handle any other cleanup here
    }  
    
  }
  

  return (
    <form onSubmit={handleSubmit}>
      <h4>Subscribe to <strong>{selectedPlan.title}</strong> Plan</h4>
      <div className="mb-3">
        <label className="form-label">Full Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          required
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          name="email"
          required
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-success">Confirm Subscription</button>
    </form>
  );
}
