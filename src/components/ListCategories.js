import axios from "axios";
import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { API_URL } from "../utils/Constants";

export default class NavbarComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        axios
            .get(API_URL + "categories")
            .then((res) => {
                const categories = res.data;
                this.setState({ categories })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        const { categories } = this.state;
        const { selectedCategories, changeCategories } = this.props;
        return (
            <Col md={2} className="mt-3">
                <h4>List Categories</h4>
                <hr />
                <ListGroup>
                    {categories && categories.map((category) => (
                        <ListGroup.Item key={category.id} onClick={() => changeCategories(category.nama)} className={selectedCategories === category.nama && "active-categories"} style={{cursor: "pointer"}}>
                            {category.nama}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
        )
    }
}