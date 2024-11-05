// /src/app/signin/page.js

"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { signIn } from "next-auth/react"; // Import NextAuth's signIn function
import "../global.css";
import "../signup/signin.css";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (res.ok) {
      window.location.href = "/"; // Redirect to homepage after successful login
    } else {
      alert("Invalid email or password");
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="clientWebsiteContainer">
      <div className="SIlogoTopContainer">
        <div className="SIlogoTop"></div>
        <div className="SIlogoTopOverlay"></div>
      </div>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
          <div className="signInFormContainer">
            <div className="signInFormContainerWrapper">
              <div className="signInTopGroup">
                <h3>Welcome!</h3>
                <h5>Let&apos;s sign you in</h5>
              </div>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Form.Group controlId="formEmail" className="signInFormItem">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    controlId="formPassword"
                    className="signInFormItem"
                  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      required
                    />
                  </Form.Group>

                  <div>
                    <Button variant="dark" type="submit" className="mr-2">
                      Sign In
                    </Button>
                    <Link href="/signup" passHref legacyBehavior>
                      <Button variant="outline-dark" as="a">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                </Row>
              </Form>
              <div className="SignInBottomGroup">
                <h5>or sign in with</h5>
                <Button
                  variant="outline-dark"
                  onClick={handleGoogleSignIn} // Trigger Google sign-in
                >
                  Sign In with Google
                </Button>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6}>
          <div className="signInImageContainer">
            <div className="signInImage"></div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
