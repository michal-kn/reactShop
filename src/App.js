import React, {Component} from 'react';
//importing all of the site components
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Checkout from './components/ShoppingCart/Checkout/Checkout';
import Footer from './components/Footer/Footer';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Redirect } from 'react-router'

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <div className="wrapper">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/Products' component={Products} />
          <Route path='/ShoppingCart' component={ShoppingCart} />
          <Route path='/Checkout' component={Checkout} />
          <Redirect to="/" />
        </Switch>
        <Footer />
        </div>
      </Router>
    );
  }
}

export default App;