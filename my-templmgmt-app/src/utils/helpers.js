// src/utils/helpers.js
export const formatDate = (date) => {
    // Your date formatting logic here
    if (!date) return "";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  
  export const formatCurrency = (amount) => {
    // Your currency formatting logic here
    if (typeof amount !== 'number') return "";
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR' // Assuming Indian Rupees
    }).format(amount);
  };