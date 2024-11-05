// Admin dashboard page
"use client";
import React from "react";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import "../global.css";
import "./adminscreens.css";

export default function AdminDashboard() {
  // Example reviews data
  const recentReviews = [
    {
      product: "Hydrating Face Cream",
      reviewer: "John Doe",
      rating: 4,
      content: "Great product! My skin feels so much smoother after using it.",
      date: "20th October 2024",
    },
    {
      product: "Vitamin C Serum",
      reviewer: "Jane Smith",
      rating: 5,
      content: "Absolutely love this serum! My skin is glowing.",
      date: "19th October 2024",
    },
    {
      product: "Brightening Toner",
      reviewer: "Alice Johnson",
      rating: 3,
      content: "Good product, but I expected better results.",
      date: "18th October 2024",
    },
    {
      product: "Brightening Toner",
      reviewer: "Alice Johnson",
      rating: 3,
      content: "Good product, but I expected better results.",
      date: "18th October 2024",
    },
    {
      product: "Brightening Toner",
      reviewer: "Alice Johnson",
      rating: 3,
      content: "Good product, but I expected better results.",
      date: "18th October 2024",
    },
  ];

  return (
    <div className="admin-dashboard">
      <Container fluid className="mt-4">
        <h1 className="mb-4">Dashboard</h1>

        {/* Overview Cards */}
        <Row className="mb-4">
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card className="text-center mb-4">
              <Card.Body>
                <Card.Title>Total Products</Card.Title>
                <Card.Text className="display-4">120</Card.Text>
                <Button variant="primary">Manage Products</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card className="text-center mb-4">
              <Card.Body>
                <Card.Title>Active Users</Card.Title>
                <Card.Text className="display-4">450</Card.Text>
                <Button variant="success">View Users</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card className="text-center mb-4">
              <Card.Body>
                <Card.Title>Orders Today</Card.Title>
                <Card.Text className="display-4">30</Card.Text>
                <Button variant="info">View Orders</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3}>
            <Card className="text-center mb-4">
              <Card.Body>
                <Card.Title>Pending Reviews</Card.Title>
                <Card.Text className="display-4">15</Card.Text>
                <Button variant="warning">Manage Reviews</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Activity Section */}
        <Row className="mb-4">
          <Col xs={12}>
            <Card>
              <Card.Header>Recent Activity</Card.Header>
              <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Action</th>
                      <th>Item</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>New Product Added</td>
                      <td>Hydrating Face Cream</td>
                      <td>20th October 2024</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Order Placed</td>
                      <td>Order #12456</td>
                      <td>20th October 2024</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>User Registered</td>
                      <td>Jane Doe</td>
                      <td>19th October 2024</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Review Submitted</td>
                      <td>Brightening Toner</td>
                      <td>19th October 2024</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Quick Links/Shortcuts */}
        <Row>
          <Col xs={12} sm={6} lg={4} className="mb-4">
            <Button variant="dark" className="w-100">
              Manage Products
            </Button>
          </Col>
          <Col xs={12} sm={6} lg={4} className="mb-4">
            <Button variant="dark" className="w-100">
              View Orders
            </Button>
          </Col>
          <Col xs={12} sm={6} lg={4} className="mb-4">
            <Button variant="dark" className="w-100">
              Manage Coupons
            </Button>
          </Col>
        </Row>

        {/* Recent Reviews Section */}
        <Row className="mb-4">
          <Col xs={12}>
            <h2>Recent Reviews</h2>
            <Row>
              {recentReviews.map((review, index) => (
                <Col xs={12} md={6} lg={4} key={index} className="mb-3">
                  <Card>
                    <Card.Body>
                      <Card.Title>{review.product}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Reviewed by {review.reviewer} - {review.rating}★
                      </Card.Subtitle>
                      <Card.Text>{review.content}</Card.Text>
                      <Card.Footer className="text-muted">
                        {review.date}
                      </Card.Footer>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
