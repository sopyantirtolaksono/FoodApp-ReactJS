import React, { Component } from "react";
import { Col, ListGroup, Badge, Row, Card } from "react-bootstrap";
import TotalPay from "./TotalPay";
import CartModal from "./CartModal";
import axios from "axios";
import { API_URL } from "../utils/Constants";
import swal from "sweetalert";

export default class ShoppingCart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            cartDetail: false,
            qty: 0,
            description: "",
            totalPay: 0
        }
    }

    handleShowModal = (cartMenu) => {
        this.setState({
            showModal: true,
            cartDetail: cartMenu,
            qty: cartMenu.jumlah,
            description: cartMenu.description,
            totalPay: cartMenu.total_harga
        })
    }

    handleCloseModal = () => {
        this.setState({
            showModal: false
        })
    }

    plusQty = () => {
        this.setState({
            qty: this.state.qty + 1,
            totalPay: this.state.cartDetail.product.harga * (this.state.qty + 1)
        })
    }

    minusQty = () => {
        if(this.state.qty !== 1) {
            this.setState({
                qty: this.state.qty - 1,
                totalPay: this.state.cartDetail.product.harga * (this.state.qty - 1)
            })
        }
    }

    changeHandler = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        const data = {
            jumlah: this.state.qty,
            total_harga: this.state.totalPay,
            product: this.state.cartDetail.product,
            description: this.state.description
        }

        axios
            .put(API_URL + "keranjangs/" + this.state.cartDetail.id, data)
            .then(() => {
                this.props.getCartList();
                swal({
                    title: "Updated",
                    text: "Update " + this.state.cartDetail.product.nama.toLowerCase() + " is success",
                    icon: "success",
                    button: false,
                    timer: 1500
                })
            })
            .catch((err) => {
              console.log(err);
            })
    }

    cartDeleteById = (id) => {
        this.handleCloseModal();

        axios
            .delete(API_URL + "keranjangs/" + id)
            .then(() => {
                this.props.getCartList();
                swal({
                    title: "Deleted",
                    text: this.state.cartDetail.product.nama + " is deleted",
                    icon: "success",
                    button: false,
                    timer: 1500
                })
            })
            .catch((err) => {
                console.log(err);
            })
    } 

    render() {
        const { carts } = this.props;

        return (
            <Col md={3} className="mt-3">
                <h4>Shopping Cart</h4>
                <hr />
                {carts.length !== 0 && (
                    <Card className="overflow-auto shopping-cart">
                        <ListGroup variant="flush">
                            {carts.map((data) => (
                                <ListGroup.Item key={data.id} onClick={() => this.handleShowModal(data)} style={{cursor: "pointer"}}>
                                    <Row>
                                        <Col xs={2}>
                                        <Badge bg="danger" pill style={{marginLeft: "10px"}}>
                                            {data.jumlah}
                                        </Badge>
                                        </Col>
                                        <Col xs={6}>
                                            {data.product.nama}
                                            <br></br>
                                            Rp. {data.product.harga.toLocaleString()}
                                        </Col>
                                        <Col xs={4} className="float-right">
                                            <strong>Rp. {data.total_harga.toLocaleString()}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}

                                <CartModal handleCloseModal={this.handleCloseModal} {...this.state} plusQty={this.plusQty} minusQty={this.minusQty} changeHandler={this.changeHandler} handleSubmit={this.handleSubmit} cartDeleteById={this.cartDeleteById} />

                        </ListGroup>
                    </Card>
                )}
                {carts.length === 0 && (
                    <ListGroup>
                        <ListGroup.Item>Cart is empty!</ListGroup.Item>
                    </ListGroup>
                )}

                <TotalPay carts={carts} {...this.props} />
            </Col>
        )
    }
}