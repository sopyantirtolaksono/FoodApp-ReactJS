import React, {Component} from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class NavbarComponent extends Component {

    render() {
        return (
            <Navbar variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/"><strong>REACTFood</strong></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/your-orders">Your Orders</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}