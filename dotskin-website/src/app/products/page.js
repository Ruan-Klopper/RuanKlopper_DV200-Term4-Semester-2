// app/products/page.js

"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "../global.css";
import "./productsCatalog.css";
import Link from "next/link";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Accordion,
  Offcanvas,
} from "react-bootstrap";
import ProductCard from "@/components/ProductCard/ProductCard";

import Navbar from "@/components/Navbar/Navbar";

const ProductCardWrapper = ({ product }) => {
  return (
    <div className="mb-4">
      <ProductCard
        id={product.product_id}
        title={product.name}
        rating={calculateAverageRating(product.reviews)}
        price={`R${parseFloat(product.price).toFixed(2)}`}
        image={product.image_url || "/default-image.png"}
        cardType="desktop"
      />
    </div>
  );
};

function calculateAverageRating(reviews) {
  if (!reviews || reviews.length === 0) return "No reviews";
  const total = reviews.reduce((acc, review) => acc + review.rating, 0);
  const average = (total / reviews.length).toFixed(1);
  return `${average} (${reviews.length})`;
}

export default function ProductsCatalog() {
  const [products, setProducts] = useState([]); // State for products
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling
  const [showFilters, setShowFilters] = useState(false); // For Offcanvas

  const toggleSideNav = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error(`Error fetching products: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="clientWebsiteContainer">
      <Navbar />
      <div className="clientWebsiteContent">
        <Container fluid className="pt-4">
          <Row>
            {/* Side Navigation (Filters) */}
            <Col xs={12} md={4} lg={2}>
              <div className="PCVfiltersTG">
                <h5 className="mb-2">Search or Filter</h5>
                <Button
                  variant="dark"
                  className="PCVfiltersBtn"
                  onClick={toggleSideNav}
                >
                  Filters
                </Button>
                <div className="PCVsplitter mt-4 mb-4"></div>
              </div>
              <Offcanvas
                show={showFilters}
                onHide={toggleSideNav}
                responsive="sm"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Filters</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <PCPSideNav />
                </Offcanvas.Body>
              </Offcanvas>
            </Col>
            <Col>
              <div className="PCLproductsContainer">
                <Container className="justify-content-center">
                  <Row>
                    {loading ? (
                      <div>Loading products...</div>
                    ) : error ? (
                      <div>Error: {error}</div>
                    ) : (
                      products.map((product, index) => (
                        <Col
                          xs={12}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={3}
                          key={product.product_id}
                          className="d-flex justify-content-center"
                        >
                          <ProductCardWrapper product={product} />
                        </Col>
                      ))
                    )}
                  </Row>
                </Container>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

const PCPSideNav = () => {
  return (
    <div className="sideBarContent">
      {/* Search Bar */}
      <h5>Search</h5>
      <Form className="mb-3">
        <Form.Control type="text" placeholder="Search products..." />
      </Form>

      {/* Reset and Search Buttons */}
      <div className="d-flex mb-3">
        <Button variant="dark mr-2">Search</Button>
        <Button variant="outline-dark">Reset</Button>
      </div>

      <h5 className="mt-5">Filters</h5>
      {/* Accordion 1: Skin Type */}
      <Accordion defaultActiveKey="0" alwaysOpen>
        <Accordion.Item eventKey="0" className="mb-2">
          <Accordion.Header>Product type</Accordion.Header>
          <Accordion.Body>
            <Form>
              {[
                "Cleaners",
                "Serums",
                "Exfoliators",
                "Moisturisors",
                "Serums",
                "Sunscreen",
              ].map((type, index) => (
                <Form.Check
                  key={index}
                  type="checkbox"
                  name="skinType"
                  label={type}
                  id={`skinType-${index}`}
                />
              ))}
            </Form>
          </Accordion.Body>
        </Accordion.Item>

        {/* Accordion 2: Free Form */}
        <Accordion.Item eventKey="1" className="mb-2">
          <Accordion.Header>Free Form</Accordion.Header>
          <Accordion.Body>
            <Form>
              {[
                "Paraben-free",
                "Cruelty-free",
                "Sulfate-free",
                "Vegan",
                "Fragrance-free",
              ].map((type, index) => (
                <Form.Check
                  key={index}
                  type="checkbox"
                  name="freeForm"
                  label={type}
                  id={`freeForm-${index}`}
                />
              ))}
            </Form>
          </Accordion.Body>
        </Accordion.Item>

        {/* Accordion 3: Skin Condition */}
        <Accordion.Item eventKey="2" className="mb-2">
          <Accordion.Header>Skin Condition</Accordion.Header>
          <Accordion.Body>
            <Form>
              {["Acne", "Wrinkles", "Dark spots", "Dry patches", "Redness"].map(
                (condition, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    name="skinCondition"
                    label={condition}
                    id={`skinCondition-${index}`}
                  />
                )
              )}
            </Form>
          </Accordion.Body>
        </Accordion.Item>

        {/* Accordion 4: Customer Ratings */}
        <Accordion.Item eventKey="3" className="mb-2">
          <Accordion.Header>Customer Ratings</Accordion.Header>
          <Accordion.Body>
            <Form>
              {[
                "1 star & up",
                "2 stars & up",
                "3 stars & up",
                "4 stars & up",
                "5 stars",
              ].map((rating, index) => (
                <Form.Check
                  key={index}
                  type="radio"
                  name="ratings"
                  label={rating}
                  id={`ratings-${index}`}
                />
              ))}
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
