// AdminLoginForm component
"use client";
import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "../global.css";
import "./adminscreens.css";
import Image from "next/image";

export default function AdminLoginForm({ onLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login success, you can replace this with real authentication logic
    onLogin();
  };

  return (
    <div className="login-page">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <Card className="login-card shadow">
              <Card.Body>
                <div className="text-center mb-4">
                  <Image
                    src="/assets/logo.png" // Replace with your logo image
                    alt="DotSkin Logo"
                    width={100}
                    height={100}
                    className="mt-4 mb-5"
                  />
                </div>
                <h3 className="text-center mb-4">Admin Login</h3>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    Login
                  </Button>

                  <div className="text-center mt-3">
                    <a href="#" className="forgot-password-link">
                      Forgot password?
                    </a>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
