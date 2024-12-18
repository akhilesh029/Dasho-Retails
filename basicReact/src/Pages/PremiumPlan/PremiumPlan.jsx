import React from 'react';
import './PremiumPlan.css'; // Import the CSS file

function PricingTable() {
  const plans = [
    {
      name: 'Free Listing',
      features: [
        { name: 'Add product', value: '10' },
        { name: 'Validity', value: 'two days' },
        { name: 'Visibility', value: 'Lower' },
        { name: 'Business Enquiries', value: 'Limited' },
        { name: 'Price', value: 'free' },
        { buy: 'buy', value: 'go' },
       

        // { name: 'Dedicated Account Manager', value: 'No' },
        // { name: 'Preferred Number Service', value: 'No' },
      ],
    },
    {
      name: 'Monthly Plan',
      offer: '₹500 OFF',
      price: '₹3,000 per month',
      features: [
        { name: 'Add product', value: '50' },
        { name: 'Validity', value: 'One month' },
        { name: 'Visibility', value: 'Higher' },
        { name: 'Business Enquiries', value: '1hr/day' },
        { name: 'Price', value: 'Rs. 3000/month' },
        { buy: 'buy', value: 'go' }
        // { name: 'Dedicated Account Manager', value: 'Yes' },
        // { name: 'Preferred Number Service', value: 'Yes' },
      ],
      price: '3000'
    },
    {
      name: 'Yearly Plan',
      offer: '₹8000 OFF',
      price: '₹2,333 per month (Billed Annually)',
      features: [
        { name: 'Add product', value: 'unlimited' },
        { name: 'Validity', value: 'One year' },
        { name: 'Visibility', value: 'Highest' },
        { name: 'Business Enquiries', value: 'unlimited' },
        { name: 'Price', value: 'Rs. 2349/year' },
        { buy: 'buy', value: 'go' }
        // { name: 'Dedicated Account Manager', value: 'Yes' },
        // { name: 'Preferred Number Service', value: 'Yes' },
      ],
    },
  ];

  return (
    <div className="pricing-table">
      <h2>Benefits of Our Paid Plan</h2>
      <table>
        <thead>
          <tr>
            <th>Features</th>
            {plans.map((plan) => (
              <th key={plan.name}>{plan.name} {plan.offer && <span>({plan.offer})</span>}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {plans[0].features.map((feature, index) => (
            <>
            
            <tr key={index}>
              <td>{feature.name}</td>
              {plans.map((plan) => (
                <td key={plan.name}>{plan.features[index].value}</td>
          
        
            ))}
            </tr>
            </>
          ))}
         
        <button>buy</button>
        </tbody>
          {/* <button key={plan.buy} >{plan.features[index].value}</button> */}
      </table>
    </div>
  );
}

export default PricingTable;