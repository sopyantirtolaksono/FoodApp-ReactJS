import React from 'react';
import { Modal, Button, Form } from "react-bootstrap";

const CartModal = ({
  showModal,
  handleCloseModal,
  cartDetail,
  qty,
  description,
  plusQty,
  minusQty,
  changeHandler,
  handleSubmit,
  totalPay,
  cartDeleteById
}) => {
  if(cartDetail) {
    return (
      <Modal show={showModal} onHide={handleCloseModal} className="cart-modal">
          <Modal.Header closeButton>
              <Modal.Title>
                {cartDetail.product.nama} {" "}
                <em>
                 (Rp. {cartDetail.product.harga.toLocaleString()})
                </em>
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Total Price :</Form.Label>
                  <p><strong>Rp. {totalPay.toLocaleString()}</strong></p>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Qty :</Form.Label>
                  <br />
                  <Button variant="primary" size="sm" className="btn-qty" style={{marginRight: "10px"}} onClick={() => minusQty()}><strong>-</strong></Button>
                  <strong>{qty}</strong>
                  <Button variant="primary" size="sm" className="btn-qty" style={{marginLeft: "10px"}} onClick={() => plusQty()}><strong>+</strong></Button>
                </Form.Group>

                <Form.Group>
                  <Form.Label style={{marginTop: "20px"}}>Description :</Form.Label>
                  <Form.Control as="textarea" row="3" name="description" placeholder="Type your description" value={description} onChange={(event) => changeHandler(event)} />
                </Form.Group>

                <Button type="submit" variant="primary" className="btn-edit mt-3" onClick={handleCloseModal}>Save</Button>
              </Form>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="danger" onClick={() => cartDeleteById(cartDetail.id)}>Delete Order</Button>
          </Modal.Footer>
      </Modal>
    )
  } else {
    return (
      <Modal show={showModal} onHide={handleCloseModal} className="cart-modal">
          <Modal.Header closeButton>
              <Modal.Title>
                Empty!
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              The body is empty.
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
              <Button variant="primary" onClick={handleCloseModal}>Save</Button>
          </Modal.Footer>
      </Modal>
    )
  }
}

export default CartModal;