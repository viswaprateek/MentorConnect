import React from 'react';
import AddActivityForm from './AddActivityForm';

import './Nonacademics.css'; // Ensure the correct path and format for CSS import
import Layout from './Layout';
function Nonacademics() {
  return (
    <Layout>
    <div className="container">
      <AddActivityForm />
      <hr />

    </div>
    </Layout>
  );
}

export default Nonacademics;
