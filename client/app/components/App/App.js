import React, { Component } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const App = ({ children }) => (
  <>
   <div className="container">
    <Header />

    <main>
      {children}
    </main>

    <Footer />
    </div>
  </>
);

export default App;
