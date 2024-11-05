// src/app/cart/page.js
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react"; // Import useSession
import "../global.css";
import "./cart.css";

import Navbar from "@/components/Navbar/Navbar";

const CartProductItem = ({ item, onQuantityChange }) => {
  const { id, quantity, name, image_url } = item;
  const price = parseFloat(item.price) || 0; // Ensure price is a number, default to 0
  const [totalPrice, setTotalPrice] = useState(quantity * price);

  useEffect(() => {
    setTotalPrice(quantity * price);
  }, [quantity, price]);

  const handleQuantityChange = (newQuantity) => {
    onQuantityChange(id, newQuantity);
  };

  return (
    <div className="CPIbody">
      <div className="flex">
        <div
          className="PCIimage mr-3"
          style={{
            backgroundImage: `url(${image_url || "/default-image.png"})`,
          }}
        ></div>
        <div className="PCIproductDetails">
          <p className="mb-1">Product:</p>
          <h5 className="mb-0 font-bold">{name}</h5>
          <h6>R{price.toFixed(2)}</h6>
        </div>
      </div>
      <div className="mr-2">
        <p className="mb-1">Quantity: {quantity}</p>
        <div className="cartPrimarySplitter mb-1"></div>
        <p className="mb-0">Total</p>
        <h5 className="font-bold">R{totalPrice.toFixed(2)}</h5>
      </div>
    </div>
  );
};

export default function CartPage() {
  const { cart, clearCart, updateCartQuantity } = useCart();
  const [subtotal, setSubtotal] = useState(0);
  const [addressData, setAddressData] = useState(null); // State for address data
  const [shipping] = useState(100); // Fixed shipping cost
  const [discount] = useState(0); // Fixed discount for now

  const { data: session } = useSession(); // Get session data

  useEffect(() => {
    // Fetch address data if user is logged in
    if (session?.user?.id) {
      const fetchAddressData = async () => {
        try {
          const addressRes = await fetch(
            `/api/addresses?userId=${session.user.id}`
          );
          if (addressRes.ok) {
            const { address } = await addressRes.json();
            setAddressData(address || null);
          } else {
            console.error(
              "Failed to fetch address data:",
              await addressRes.text()
            );
          }
        } catch (error) {
          console.error("Error fetching address data:", error);
        }
      };

      fetchAddressData();
    }
  }, [session]);

  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + (parseFloat(item.price) || 0) * item.quantity,
      0
    );
    setSubtotal(total);
  }, [cart]);

  const handleClearCart = () => {
    clearCart();
    alert("Cart cleared!");
  };

  const handleQuantityChange = (id, quantity) => {
    updateCartQuantity(id, quantity);
  };

  return (
    <div
      className="clientWebsiteContainer"
      style={{ backgroundColor: "#f3f3f3" }}
    >
      <Navbar />
      <div className="clientWebsiteContent cartPage">
        <Container>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6} className="mb-5">
              <div className="cartItemGroup mb-3">
                <div className="cartItemHeader mb-3">
                  <h1 className="cartItemHeaderTitle">Your Cart</h1>
                  <div className="cartPrimarySplitter"></div>
                </div>
                <div>
                  {cart.length === 0 ? (
                    <h5>Your cart is empty</h5>
                  ) : (
                    cart.map((item) => (
                      <CartProductItem
                        key={item.uniqueId}
                        item={item}
                        onQuantityChange={handleQuantityChange}
                      />
                    ))
                  )}
                </div>
                <Button
                  variant="dark"
                  className="cartFinalButton"
                  onClick={handleClearCart}
                >
                  Clear cart
                </Button>
              </div>
              <div className="cartItemGroup">
                <Form.Group controlId="formCoupon" className="signInFormItem">
                  <Form.Label>Got a coupon</Form.Label>
                  <div className="flex">
                    <Form.Control
                      type="text"
                      name="coupon"
                      placeholder="Coupon Code"
                      required
                      className="mr-3"
                    />
                    <Button variant="dark">Submit</Button>
                  </div>
                </Form.Group>
              </div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <div className="cartItemGroup mb-5">
                <div className="cartItemHeader">
                  <h1 className="cartItemHeaderTitle">Cart Total</h1>
                  <div className="cartPrimarySplitter mb-3"></div>
                  <div className="cartTotalTableContainer">
                    <table className="cartTotalTable">
                      <tbody>
                        <tr className="cartTabletread">
                          <td className="cartTableItemLeft">Subtotal:</td>
                          <td style={{ fontWeight: "Bold" }}>
                            R{subtotal.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="cartTableItemLeft">Discount:</td>
                          <td style={{ fontWeight: "Bold" }}>
                            R{discount.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="cartTableItemLeft">Shipping:</td>
                          <td style={{ fontWeight: "Bold" }}>
                            R{shipping.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="cartTableItemLeft"></td>
                          <td style={{ fontWeight: "Bold" }}>
                            <p className="font-light mb-0 mt-1 text-sm">
                              Shipping to
                            </p>
                            {addressData ? (
                              <>
                                <p className="text-sm mb-0">
                                  {addressData.street_address1}{" "}
                                  {addressData.street_address2},{" "}
                                  {addressData.suburb}, {addressData.city}
                                </p>
                                <p className="text-sm mb-0">
                                  {addressData.province}, {addressData.country}{" "}
                                  {addressData.postal_code}
                                </p>
                              </>
                            ) : (
                              <p className="text-sm mb-0">
                                No address specified. Please go to your account
                                to set your address or add it at checkout.
                              </p>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="cartPrimarySplitter mt-3 mb-3"></div>
                  <table className="cartTotalTable">
                    <tbody>
                      <tr>
                        <td className="cartTableItemLeft">Total:</td>
                        <td style={{ fontWeight: "Bold" }}>
                          R{(subtotal + shipping - discount).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="cartBottomButtonGroup mt-4">
                    <Button variant="dark" className="cartFinalButton">
                      Proceed to checkout
                    </Button>
                    <Button
                      variant="outline-dark"
                      className="cartFinalButton"
                      href="/products"
                    >
                      Continue shopping
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
