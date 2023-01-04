import React, { Component } from "react";
import { Card, Col } from "react-bootstrap";

export default class Menus extends Component {
    render() {
        const { menu, addToCart} = this.props;

        return (
            <Col md={4} xs={6} className="mb-4 menus">
                <Card className="shadow" onClick={() => addToCart(menu)} style={{cursor: "pointer"}}>
                    <Card.Img variant="top" src={"assets/images/" + menu.category.nama.toLowerCase() + "/" + menu.gambar} />
                    <Card.Body>
                        <Card.Title>{menu.nama} ~ {menu.kode}</Card.Title>
                        <Card.Text>Rp. {menu.harga.toLocaleString()}</Card.Text>
                        {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}