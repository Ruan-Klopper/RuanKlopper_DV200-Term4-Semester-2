// AdminOrders page with enhanced modal design using card elements
"use client";
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
  Modal,
} from "react-bootstrap";
import "../global.css";
import "./adminscreens.css";

export default function AdminOrders() {
  // Sample order data (replace with real CourierGuy API data later)
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "John Doe",
      orderNumber: "ORD12345",
      status: "Pending",
      items: ["Hydrating Face Cream", "Vitamin C Serum"],
      total: "R799.98",
      courier: "CourierGuy",
      tracking: "CG12345678",
      date: "2024-10-20",
    },
    {
      id: 2,
      customer: "Jane Smith",
      orderNumber: "ORD12346",
      status: "Shipped",
      items: ["Anti-Aging Eye Cream"],
      total: "R499.99",
      courier: "CourierGuy",
      tracking: "CG87654321",
      date: "2024-10-19",
    },
    // Add more orders here...
  ]);

  // State for managing modals and selected order
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Function to open modal for order details
  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  // Handle order status update (placeholder function)
  const handleUpdateStatus = (status) => {
    if (selectedOrder) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === selectedOrder.id ? { ...order, status: status } : order
        )
      );
      handleCloseModal();
    }
  };

  return (
    <div>
      <Container className="my-4">
        <h1>Manage Orders</h1>

        {/* Overview Blocky Elements */}
        <Row className="mb-4 mt-5">
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card className="text-center mb-4">
              <Card.Body>
                <Card.Title>Total Orders</Card.Title>
                <Card.Text className="display-4">{orders.length}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card className="text-center mb-4">
              <Card.Body>
                <Card.Title>Orders Pending</Card.Title>
                <Card.Text className="display-4">
                  {orders.filter((order) => order.status === "Pending").length}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card className="text-center mb-4">
              <Card.Body>
                <Card.Title>Orders Shipped</Card.Title>
                <Card.Text className="display-4">
                  {orders.filter((order) => order.status === "Shipped").length}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Orders Table */}
        <Row>
          <Col xs={12}>
            <Card>
              <Card.Header>All Orders</Card.Header>
              <Card.Body>
                <div style={{ maxWidth: "100%", overflowX: "auto" }}>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Order #</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Courier</th>
                        <th>Tracking</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td>{order.orderNumber}</td>
                          <td>{order.customer}</td>
                          <td>{order.date}</td>
                          <td>{order.total}</td>
                          <td>{order.status}</td>
                          <td>{order.courier}</td>
                          <td>{order.tracking}</td>
                          <td>
                            <Button
                              variant="info"
                              size="sm"
                              onClick={() => handleOpenModal(order)}
                            >
                              View/Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal for viewing and updating order details */}
      {selectedOrder && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton className="sticky-modal-header">
            <Modal.Title>{`Order #${selectedOrder.orderNumber}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              {/* Left side with customer and order info */}
              <Col xs={12} sm={12} md={6}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Customer Details</Card.Title>
                    <Card.Text>
                      <strong>Name: </strong> {selectedOrder.customer}
                    </Card.Text>
                    <Card.Text>
                      <strong>Total: </strong> {selectedOrder.total}
                    </Card.Text>
                    <Card.Text>
                      <strong>Date: </strong> {selectedOrder.date}
                    </Card.Text>
                  </Card.Body>
                </Card>

                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Order Status</Card.Title>
                    <Form.Group controlId="orderStatus" className="mb-3">
                      <Form.Label>Update Order Status</Form.Label>
                      <Form.Control
                        as="select"
                        defaultValue={selectedOrder.status}
                        onChange={(e) => handleUpdateStatus(e.target.value)}
                      >
                        <option>Pending</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </Form.Control>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>

              {/* Right side with items and shipping info */}
              <Col xs={12} sm={12} md={6}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Items Ordered</Card.Title>
                    {selectedOrder.items.map((item, index) => (
                      <Card key={index} className="mb-2">
                        <Card.Body>{item}</Card.Body>
                      </Card>
                    ))}
                  </Card.Body>
                </Card>

                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Shipping Info</Card.Title>
                    <Card.Text>
                      <strong>Courier: </strong> {selectedOrder.courier}
                    </Card.Text>
                    <Card.Text>
                      <strong>Tracking Number: </strong>{" "}
                      {selectedOrder.tracking}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
