// import logo from './logo.svg';
// import './App.css';

import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/Constants';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListCategories, ShoppingCart, Menus } from "../components/Index";
import { Col, Container, Row } from 'react-bootstrap';
import swal from 'sweetalert';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      selectedCategories: "Makanan",
      carts: []
    }
  }

  componentDidMount() {
    axios
      .get(API_URL + "products?category.nama=" + this.state.selectedCategories)
      .then((res) => {
        const menus = res.data;
        this.setState({menus});
      })
      .catch((err) => {
        console.log(err);
      })

    this.getCartList();
  }

  // componentDidUpdate(prevState) {
  //   if(this.state.carts !== prevState.carts) {
  //     axios
  //       .get(API_URL + "keranjangs")
  //       .then((res) => {
  //         const carts = res.data;
  //         this.setState({ carts })
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       })
  //   }
  // }

  changeCategories = (value) => {
    this.setState({
      selectedCategories: value,
      menus: []
    })

    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        this.setState({menus: menus});
      })
      .catch((err) => {
        console.log(err);
      })
  }

  addToCart = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if(res.data.length === 0) {
          const cart = {
            jumlah: 1,
            total_harga: value.harga,
            product: value
          }
      
          axios
            .post(API_URL + "keranjangs", cart)
            .then(() => {
              this.getCartList();
              swal({
                title: "Success",
                text: cart.product.nama + " added to cart",
                icon: "success",
                buttons: false,
                timer: 1500
              })
            })
            .catch((err) => {
              console.log(err);
            })
        } else {
          const cart = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value
          }
      
          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, cart)
            .then(() => {
              this.getCartList();
              swal({
                title: "Success",
                text: cart.product.nama + " added to cart",
                icon: "success",
                buttons: false,
                timer: 1500
              })
            })
            .catch((err) => {
              console.log(err);
            })
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getCartList = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const carts = res.data;
        this.setState({ carts })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    const { menus, selectedCategories, carts } = this.state;

    return (
        <div className="mt-3">
            <Container fluid>
            <Row>
                <ListCategories changeCategories={this.changeCategories} selectedCategories={selectedCategories} />
                <Col className="mt-3">
                <h4>List Products</h4>
                <hr />
                <Row className="overflow-auto menus">
                    {menus && menus.map((menu) => (
                    <Menus key={menu.id} menu={menu} addToCart={this.addToCart} />
                    ))}
                </Row>
                </Col>
                <ShoppingCart carts={carts} getCartList={this.getCartList} {...this.props} />
            </Row>
            </Container>
        </div>
    )
  }
}
