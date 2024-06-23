import React from 'react';
import AddActivityForm from './AddActivityForm';
import './Nonacademics.css'; // Ensure the correct path and format for CSS import
import Layout from './Layout';

const Nonacademics = () => {
  const handleActivityAdded = (newActivity) => {
    console.log('Activity added:', newActivity);
  };

  return (
    <Layout>
      <div className="container">
        <AddActivityForm onActivityAdded={handleActivityAdded} />
        <hr />
      </div>
    </Layout>
  );
};

export default Nonacademics;
