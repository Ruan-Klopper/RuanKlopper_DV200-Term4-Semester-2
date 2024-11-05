// app/signup/page.js

"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import "../global.css";
import "./signin.css";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    subscribe: false,
  });

  const router = useRouter(); // Initialize router

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/signin"); // Redirect to SignIn page on success
      } else {
        const errorData = await res.json();

        // Different error messages based on status code
        if (res.status === 400) {
          alert("Bad request: Please check the provided data.");
        } else if (res.status === 409) {
          alert("User already exists. Try signing in instead.");
        } else if (res.status === 500) {
          alert("Server error: Please try again later.");
        } else {
          alert(errorData.error || "An unknown error occurred.");
        }

        // Log additional error data for debugging
        console.error("Error data:", errorData);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert(
        "An unexpected error occurred. Please check the console for more details."
      );
    }
  };

  const handleGoogleSignUp = () => {
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
                <h5>Let&apos;s create your account to get started</h5>
              </div>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Form.Group controlId="formName" className="signInFormItem">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter name"
                      required
                    />
                  </Form.Group>

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

                  <Form.Group
                    controlId="formConfirmPassword"
                    className="signInFormItem"
                  >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm password"
                      required
                    />
                  </Form.Group>

                  <Form.Group
                    controlId="formSubscribe"
                    className="signInFormItem"
                  >
                    <Form.Check
                      type="checkbox"
                      name="subscribe"
                      checked={formData.subscribe}
                      onChange={handleChange}
                      label="Subscribe to newsletter"
                    />
                  </Form.Group>

                  <div>
                    <Button variant="dark" type="submit" className="mr-2">
                      Sign Up
                    </Button>
                    <Link href="/signin" passHref legacyBehavior>
                      <Button variant="outline-dark" as="a">
                        Sign In
                      </Button>
                    </Link>
                  </div>
                </Row>
              </Form>
              <div className="SignInBottomGroup">
                <h5>or sign up with</h5>
                <Button variant="outline-dark" onClick={handleGoogleSignUp}>
                  Sign Up with Google
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
