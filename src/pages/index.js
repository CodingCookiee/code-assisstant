import React from 'react';
import Hero from '../src/components/Layout/Hero';

function HomePage() {
  return (
    <div className="container mx-auto">
      <Hero />
    </div>
  );
}

// Add getInitialProps to handle server-side data fetching
HomePage.getInitialProps = async (ctx) => {
  return { props: {} };
};

export default HomePage;
