import axios from "axios";
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import swal from "sweetalert";
import { API_URL } from '../utils/Constants';

export default class YourOrders extends Component {
    deleteAllOrder = () => {
        axios
            .get(API_URL + "pesanans")
            .then((res) => {
                const totalOrders = res.data.length;

                if(totalOrders < 1) {
                    swal({
                        title: "Oops..!",
                        text: "Sorry, you not order",
                        icon: "warning",
                        button: false,
                        timer: 1500
                    })
                } else {
                    const orders = res.data;

                    orders.map((item) => (
                        axios
                            .delete(API_URL + "pesanans/" + item.id)
                            .then(() => {
                                swal({
                                    title: "Deleted",
                                    text: "All order is deleted",
                                    icon: "success",
                                    button: false,
                                    timer: 1500
                                })
                            })
                            .catch((err) => console.log(err))
                    ))   
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <div className="text-center">
                <Button variant="danger" className="btn-lg mt-5 shadow" onClick={() => this.deleteAllOrder()}>Delete All Order</Button>
            </div>
        )
    }
}