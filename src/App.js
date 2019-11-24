import React from 'react';
import logo from './logo.svg';
import './App.css';

import SignUp from './component/sign-up/sign-up.component'
import SignIn from './component/sign-in/sign-in.component'
import Header from './component/header/header.component'

function App() {
  return (
    <div className="App">
      <Header/>
      <SignIn/>
    </div>
  );
}

export default App;
