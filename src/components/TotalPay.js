import axios from "axios";
import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { API_URL } from "../utils/Constants";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
// import { useNavigate } from "react-router-dom";

// const TotalPay = (carts) => {
//     const navigate = useNavigate();
//     const addToOrder = (totalPay) => {
//         const orders = {
//             total_bayar: totalPay,
//             menus: carts
//         }

//         axios
//             .post(API_URL + "pesanans", orders)
//             .then((res) => {
//                 // this.props.history.push("/success");
//                 // window.history.pushState({}, undefined, "/success");
//                 // this.props.history.pushState("/success");
//                 navigate("/success");
//             })
//     }

//     const totalPay = carts.reduce(function(result, item) {
//         return result + item.total_harga;
//     }, 0)

//     return (
//         <div className="fixed-bottom">
//             <Row>
//                 <Col md={{span: 3, offset: 9}} className="px-4">
//                     <h4>Total Pay: <strong>Rp. {totalPay.toLocaleString()}</strong>
//                     </h4>
//                     <div className="d-grid gap-2">
//                         <Button onClick={() => addToOrder(totalPay)} variant="success" className="mt-4 mr-2 mb-2 btn-pay" size="lg">
//                             <strong>PAY</strong>
//                         </Button>
//                     </div>
//                 </Col>
//             </Row>
//         </div>
//     )
// }

// export default TotalPay;



export default class TotalPay extends Component {
    addToOrder = (totalPay) => {
        if(totalPay === 0 || totalPay < 0) {
            console.log("Sorry, you must order before paying!");
            swal({
                title: "Oops..!",
                text: "Sorry, you must order before paying!",
                icon: "warning",
                buttons: true
            })
        } else {
            const orders = {
                total_bayar: totalPay,
                menus: this.props.carts
            }
    
            axios
                .post(API_URL + "pesanans", orders)
                .then((res) => {
                    // this.props.history.push("/success");
                    // window.history.pushState({}, undefined, "/success");
                    // this.props.history.pushState("/success");
                })
        }
    }

    render() {
        const totalPay = this.props.carts.reduce(function(result, item) {
            return result + item.total_harga;
        }, 0)

        return (
            <>
                {/* Desktop View */}
                <div className="fixed-bottom d-none d-md-block">
                    <Row>
                        <Col md={{span: 3, offset: 9}} className="px-4">
                            <h4>Total Pay: <strong>Rp. {totalPay.toLocaleString()}</strong>
                            </h4>
                            <div className="d-grid gap-2">
                                <Button onClick={() => this.addToOrder(totalPay)} variant="success" className="mt-4 mr-2 mb-2 btn-pay" size="lg" as={Link} to="/success" >
                                    <strong>PAY</strong>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>

                {/* Mobile View */}
                <div className="d-sm-block d-md-none">
                    <Row>
                        <Col md={{span: 3, offset: 9}} className="px-4">
                            <h4 className="mt-3">Total Pay: <strong>Rp. {totalPay.toLocaleString()}</strong>
                            </h4>
                            <div className="d-grid gap-2">
                                <Button onClick={() => this.addToOrder(totalPay)} variant="success" className="mt-4 mr-2 mb-2 btn-pay" size="lg" as={Link} to="/success" >
                                    <strong>PAY</strong>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}