"use client";
import React, { useState } from "react";
import "../global.css";
import "./admin.css";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import AdminLoginForm from "./login";
import AdminDashboard from "./dashboard";
import AdminProductCatalog from "./products";
import AdminUsers from "./adminUsers";
import AdminOrders from "./adminOrders";
import AdminEmails from "./adminEmails";

export default function Admin() {
  // State to manage the login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State to manage the active component after login
  const [activeComponent, setActiveComponent] = useState("dashboard");

  // Function to handle login (this would be extended with real authentication)
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to render the appropriate component based on active state
  const renderComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <AdminDashboard />;
      case "products":
        return <AdminProductCatalog />;
      case "users":
        return <AdminUsers />;
      case "orders":
        return <AdminOrders />;
      case "coupons":
        return <div>Coupons Component</div>;
      case "emails":
        return <AdminEmails />;
      default:
        return <AdminDashboard />;
    }
  };

  // If the user is not logged in, render the login form
  if (!isLoggedIn) {
    return <AdminLoginForm onLogin={handleLogin} />;
  }

  // If logged in, render the main admin interface
  return (
    <div>
      {/* Bootstrap Navbar */}
      <Navbar fixed="top" expand="lg" className="navbar-custom">
        <Container>
          <Navbar.Brand href="#">.DotSkin Admin</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => setActiveComponent("dashboard")}>
                Dashboard
              </Nav.Link>
              <Nav.Link onClick={() => setActiveComponent("products")}>
                Products
              </Nav.Link>
              <Nav.Link onClick={() => setActiveComponent("users")}>
                Users
              </Nav.Link>
              <Nav.Link onClick={() => setActiveComponent("orders")}>
                Orders
              </Nav.Link>
              <Nav.Link onClick={() => setActiveComponent("coupons")}>
                Coupons
              </Nav.Link>
              <Nav.Link onClick={() => setActiveComponent("emails")}>
                Emails
              </Nav.Link>
            </Nav>

            {/* User info and buttons */}
            <div className="navbar-user-info mt-3 mt-lg-0">
              <span className="me-3">Hi, username</span>
              {/* Return to Client Side Button */}
              <Button
                variant="outline-primary"
                className="me-2 w-100 w-lg-auto"
                onClick={() => (window.location.href = "/")}
              >
                Return to Client Side
              </Button>
              {/* Logout Button */}
              <Button
                variant="outline-dark"
                className="w-100 w-lg-auto"
                onClick={() => setIsLoggedIn(false)}
              >
                Logout
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Admin Content */}
      <div className="adminWebContainer">
        <div className="adminContent">{renderComponent()}</div>
      </div>
    </div>
  );
}
