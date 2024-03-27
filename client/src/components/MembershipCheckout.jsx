import React from 'react';

const MembershipCheckout = () => {
  return (
    <div>
      <h2 className="text-2xl">Like our work? Consider donating!</h2>
      <a href="https://buy.stripe.com/test_dR6dS7cI89zmb8AbII" target="_blank" rel="noopener noreferrer">
        <button className='bg-orange-400 text-2xl rounded-lg w-[220px] items-center flex justify-center mt-4 hover:bg-green-400'>Donate Here!</button>
      </a>
    </div>
  );
};

export default MembershipCheckout;
