import React, { lazy, Suspense } from 'react';
import Cocktail from './Cocktails';

const LoginAppLazy = lazy(() => import('./LoginApp'));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.isLoggedIn()
    }

    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  render() {
    return <div className="content">
      {
        !this.state.loggedIn && 
        <Suspense fallback={<div>Loading...</div>}>
          {/* <h1>This is a host application</h1> */}
          <LoginAppLazy />
        </Suspense>
      }

      {this.state.loggedIn && <Cocktail />}
    </div>
  }
}

export default App;