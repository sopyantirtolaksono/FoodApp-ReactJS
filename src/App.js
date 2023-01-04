import React, { Component } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
// import { NavbarComponent } from './components/NavbarComponent';
import NavbarComponent from "./components/NavbarComponent";
import { Home, Success, YourOrders } from "./Pages/Index";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/success" element={<Success />} />
            <Route path="/your-orders" element={<YourOrders />} />
          </Routes>
        </main>
      </BrowserRouter>
    )
  }
}
