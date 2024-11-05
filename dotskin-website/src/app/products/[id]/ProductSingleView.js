// src/app/products/[id]/ProductSingleView.js

"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import {
  Container,
  Row,
  Col,
  Button,
  Accordion,
  Card,
  Badge,
} from "react-bootstrap";
import "../../global.css";
import "./productSingleView.css";
import { useCart } from "@/hooks/useCart";

import Navbar from "@/components/Navbar/Navbar";

export default function ProductSingleView() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert("Product added to cart!");
  };

  // Extract the product ID from the URL using useParams
  const { id } = useParams();

  useEffect(() => {
    if (!id) return; // If no ID, do nothing

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching product: ${response.statusText}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Rest of your component code remains the same
  // ...

  // Function to calculate average rating
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return null;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    const average = (total / reviews.length).toFixed(1);
    return average;
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="clientWebsiteContainer">
        <Navbar />
        <div className="clientWebsiteContent productSingleView">
          <Container className="PSVcontainer">
            <div>Loading product...</div>
          </Container>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="clientWebsiteContainer">
        <Navbar />
        <div className="clientWebsiteContent productSingleView">
          <Container className="PSVcontainer">
            <div>Error: {error || "Product not found"}</div>
          </Container>
        </div>
      </div>
    );
  }

  // Extract data from the product object
  const {
    name,
    image_url,
    description,
    directions,
    ingredients,
    precautions,
    price,
    reviews,
    categories,
  } = product;

  const priceNumber = parseFloat(price);
  const averageRating = calculateAverageRating(reviews);

  return (
    <div className="clientWebsiteContainer">
      <Navbar />
      <div className="clientWebsiteContent productSingleView">
        <Container className="PSVcontainer">
          <Row>
            <Col xs={12} sm={12} md={5} lg={6} className="PSVimageWrapper">
              <div
                className="PSVproductImage mb-5"
                style={{
                  backgroundImage: `url(${image_url || "/default-image.png"})`,
                }}
              ></div>
            </Col>
            <Col xs={12} sm={12} md={7} lg={6}>
              <div className="PSVcontent">
                {/* Product title */}
                <h1 className="PSVproductTitle">{name}</h1>

                {/* Ratings */}
                <div className="PSVratingsGroup">
                  {averageRating ? (
                    <>
                      <div className="PSVratingsContainer">
                        {/* Display stars based on averageRating */}
                        <span>{averageRating} ⭐</span>
                      </div>
                      <h5>{reviews.length} Ratings</h5>
                    </>
                  ) : (
                    <h5>No ratings yet</h5>
                  )}
                </div>
                <h3>R{priceNumber.toFixed(2)}</h3>
                <div className="PSVsplitter mb-4"></div>

                {/* Categories */}
                {categories && categories.length > 0 && (
                  <div>
                    {categories.map((cat) => (
                      <h5 key={cat.name}>
                        <Badge bg="dark" className="mr-1">
                          {cat.name}
                        </Badge>
                      </h5>
                    ))}
                  </div>
                )}

                {/* Description */}
                {description && (
                  <>
                    <h6 className="font-bold mt-4">Description</h6>
                    <p>{description}</p>
                  </>
                )}

                {/* Quantity and Add To Cart */}
                <div className="PSVorderBtnGroup mt-6">
                  {/* Quantity Button */}
                  <div className="quantityControl">
                    <button
                      className="quantityBtn"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                    >
                      –
                    </button>
                    <span className="quantityDisplay">{quantity}</span>
                    <button className="quantityBtn" onClick={increaseQuantity}>
                      +
                    </button>
                  </div>
                  {/* add to cart button */}
                  <button
                    variant="dark"
                    onClick={handleAddToCart}
                    className="PSVAddToCartBTN"
                  >
                    <div className="PSVatcContent">
                      <h5 className="mb-0">Add to cart</h5>
                      <div className="PSVatcSplitter"></div>
                      <div className="PSVatcIcon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            d="M5.83325 18.3332C5.37492 18.3332 4.98256 18.17 4.65617 17.8436C4.32978 17.5172 4.16659 17.1248 4.16659 16.6665C4.16659 16.2082 4.32978 15.8158 4.65617 15.4894C4.98256 15.163 5.37492 14.9998 5.83325 14.9998C6.29159 14.9998 6.68395 15.163 7.01034 15.4894C7.33672 15.8158 7.49992 16.2082 7.49992 16.6665C7.49992 17.1248 7.33672 17.5172 7.01034 17.8436C6.68395 18.17 6.29159 18.3332 5.83325 18.3332ZM14.1666 18.3332C13.7083 18.3332 13.3159 18.17 12.9895 17.8436C12.6631 17.5172 12.4999 17.1248 12.4999 16.6665C12.4999 16.2082 12.6631 15.8158 12.9895 15.4894C13.3159 15.163 13.7083 14.9998 14.1666 14.9998C14.6249 14.9998 15.0173 15.163 15.3437 15.4894C15.6701 15.8158 15.8333 16.2082 15.8333 16.6665C15.8333 17.1248 15.6701 17.5172 15.3437 17.8436C15.0173 18.17 14.6249 18.3332 14.1666 18.3332ZM4.33325 3.33317H16.6249C16.9444 3.33317 17.1874 3.47553 17.3541 3.76025C17.5208 4.04498 17.5277 4.33317 17.3749 4.62484L14.4166 9.95817C14.2638 10.2359 14.0589 10.4512 13.802 10.604C13.5451 10.7568 13.2638 10.8332 12.9583 10.8332H6.74992L5.83325 12.4998H15.8333V14.1665H5.83325C5.20825 14.1665 4.73603 13.8922 4.41659 13.3436C4.09714 12.795 4.08325 12.2498 4.37492 11.7082L5.49992 9.6665L2.49992 3.33317H0.833252V1.6665H3.54159L4.33325 3.33317Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
                {/* Accordion Sections */}
                <div className="mt-5 mb-5">
                  {directions && (
                    <Accordion defaultActiveKey="0" className="mb-2">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Directions</Accordion.Header>
                        <Accordion.Body>{directions}</Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  )}
                  {ingredients && (
                    <Accordion defaultActiveKey="0" className="mb-2">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Ingredients</Accordion.Header>
                        <Accordion.Body>{ingredients}</Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  )}
                  {precautions && (
                    <Accordion defaultActiveKey="0" className="mb-2">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Precautions</Accordion.Header>
                        <Accordion.Body>{precautions}</Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  )}
                </div>
                <div className="PSVsplitter mb-2"></div>
                <h2>Reviews</h2>
                <div className="PSVcustomerRatingsContainer">
                  {reviews && reviews.length > 0 ? (
                    reviews.map((review) => (
                      <Card key={review.review_id} className="mb-3">
                        <Card.Body>
                          <div className="PSVcardRating">
                            {/* Display stars based on review.rating */}
                            <span>{review.rating} ⭐</span>
                          </div>
                          <Card.Title>
                            {review.user_name || "Anonymous"} -{" "}
                            {new Date(review.created_at).toLocaleDateString()}
                          </Card.Title>
                          <Card.Text>{review.comment}</Card.Text>
                        </Card.Body>
                      </Card>
                    ))
                  ) : (
                    <p>No reviews yet.</p>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
