// Cart page
"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import Link from "next/link";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../global.css";
import "./checkout.css";

import Navbar from "@/components/Navbar/Navbar";

const CartProductItem = () => {
  return (
    <div className="CPIbody">
      <div className="flex">
        <div
          className="PCIimage mr-3"
          style={{ backgroundImage: "url(/sampleImages/image.png)" }}
        ></div>
        <div className="PCIproductDetails">
          <p className="mb-1">Product:</p>
          <h5 className="mb-0 font-bold">Body Neroli</h5>
          <h6>R320.00</h6>
        </div>
      </div>
      <div className="mr-2">
        <p className="mb-1">Quantity: 2</p>
        <div className="cartPrimarySplitter mb-1"></div>
        <p className="mb-0">Total</p>
        <h5 className="font-bold">R480.00</h5>
      </div>
    </div>
  );
};

export default function ProductsCatalog() {
  return (
    <div
      className="clientWebsiteContainer"
      style={{ backgroundColor: "#f3f3f3" }}
    >
      <Navbar />
      <div className="clientWebsiteContent cartPage">
        <Container>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
              <div className="cartItemGroup mb-3">
                <div className="cartItemHeader checkoutOrderSummary">
                  <h1 className="cartItemHeaderTitle">Order Summary</h1>
                  <div className="cartPrimarySplitter mb-3"></div>
                  <div className="cartTotalTableContainer">
                    <table className="cartTotalTable">
                      <tbody>
                        <tr className="cartTabletread">
                          <td className="cartTableItemLeft">Subtotal:</td>
                          <td style={{ fontWeight: "Bold" }}>R1010.00</td>
                        </tr>
                        <tr>
                          <td className="cartTableItemLeft">Discount:</td>
                          <td style={{ fontWeight: "Bold" }}>R0.00</td>
                        </tr>
                        <tr>
                          <td className="cartTableItemLeft">Shipping:</td>
                          <td style={{ fontWeight: "Bold" }}>R100.00</td>
                        </tr>
                        <tr>
                          <td className="cartTableItemLeft"></td>
                          <td style={{ fontWeight: "Bold" }}>
                            <p className="font-light mb-0 mt-1 text-sm">
                              Shipping to
                            </p>
                            <p className="text-sm mb-0">
                              1446 Cunningham Avenue Waverley Pretoria
                            </p>
                            <p className="text-sm mb-0">
                              Gauteng, South Africa 0135
                            </p>
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
                        <td style={{ fontWeight: "Bold" }}>R100.00</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="checkoutBottomButtonGroup"></div>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} className="mb-5">
              <div className="cartItemGroup mb-3 checkoutDeliveryCard">
                {/* Future development: Make a custom accordion */}
                <h1 className="cartItemHeaderTitle">Delivery Info</h1>
                <div className="cartPrimarySplitter mb-3"></div>
                <div className="cartTotalTable">
                  <div className="tableRow mb-1">
                    <div className="tableCol label">Full name:</div>
                    <div className="tableCol value">Ruan Klopper</div>
                  </div>
                  <div className="tableRow mb-1">
                    <div className="tableCol label">Phone number:</div>
                    <div className="tableCol value">+27 66 207 2937</div>
                  </div>
                  <div className="tableRow mb-1">
                    <div className="tableCol label">Email Address:</div>
                    <div className="tableCol value">ruank83@gmail.com</div>
                  </div>
                  <div className="tableRow mb-1">
                    <div className="tableCol label">Delivery Address:</div>
                    <div className="tableCol value">
                      1446 Cunningham Avenue Waverley Pretoria
                      <br />
                      Gauteng, South Africa, 0135
                    </div>
                  </div>
                  <div className="tableRow mb-1">
                    <div className="tableCol label">Building type:</div>
                    <div className="tableCol value">Town House</div>
                  </div>
                  <div className="tableRow mb-1">
                    <div className="tableCol label">Delivery Notes:</div>
                    <div className="tableCol value">Not specified</div>
                  </div>
                </div>
              </div>
              <div className="cartItemGroup mb-3">
                <h1 className="cartItemHeaderTitle">Billing Details</h1>
                <div className="cartPrimarySplitter mb-3"></div>
                <Form>
                  {/* Future server development notes: Values of all inputs must be extracted from the server and displayed on the value of each input field */}
                  <Form.Group
                    controlId="firstName"
                    className="checkoutFormGroup"
                  >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="given-name"
                      autoComplete="given-name"
                      placeholder="Enter first name"
                    />
                  </Form.Group>

                  <Form.Group
                    controlId="lastName"
                    className="checkoutFormGroup"
                  >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="family-name"
                      autoComplete="family-name"
                      placeholder="Enter last name"
                    />
                  </Form.Group>

                  <Form.Group controlId="email" className="checkoutFormGroup">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="Enter email"
                    />
                  </Form.Group>

                  <Form.Group
                    controlId="phoneNumber"
                    className="checkoutFormGroup"
                  >
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="tel"
                      autoComplete="tel"
                      placeholder="Enter phone number"
                    />
                  </Form.Group>

                  <Form.Group
                    controlId="streetAddress"
                    className="checkoutFormGroup"
                  >
                    <Form.Label>Street Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="street-address"
                      autoComplete="street-address"
                      placeholder="Enter street address"
                    />
                  </Form.Group>

                  <Form.Group controlId="suburb" className="checkoutFormGroup">
                    <Form.Label>Suburb/Region</Form.Label>
                    <Form.Control
                      type="text"
                      name="address-line2"
                      autoComplete="address-line2"
                      placeholder="Enter suburb or region"
                    />
                  </Form.Group>

                  <Form.Group controlId="city" className="checkoutFormGroup">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="address-level2"
                      autoComplete="address-level2"
                      placeholder="Enter city"
                    />
                  </Form.Group>

                  <Form.Group
                    controlId="province"
                    className="checkoutFormGroup"
                  >
                    <Form.Label>Province</Form.Label>
                    <Form.Control
                      as="select"
                      name="address-level1"
                      autoComplete="address-level1"
                    >
                      <option value="">Select province</option>
                      <option value="Eastern Cape">Eastern Cape</option>
                      <option value="Free State">Free State</option>
                      <option value="Gauteng">Gauteng</option>
                      <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                      <option value="Limpopo">Limpopo</option>
                      <option value="Mpumalanga">Mpumalanga</option>
                      <option value="Northern Cape">Northern Cape</option>
                      <option value="North West">North West</option>
                      <option value="Western Cape">Western Cape</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group
                    controlId="postalCode"
                    className="checkoutFormGroup"
                  >
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="postal-code"
                      autoComplete="postal-code"
                      placeholder="Enter postal code"
                    />
                  </Form.Group>

                  <Form.Group
                    controlId="buildingType"
                    className="checkoutFormGroup"
                  >
                    <Form.Label>Building Type</Form.Label>
                    <Form.Control as="select" name="building_type">
                      <option value="">Select building type</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Townhouse">Townhouse</option>
                      <option value="House">House</option>
                      <option value="Office">Office</option>
                      {/* Add more options as needed */}
                    </Form.Control>
                  </Form.Group>

                  <Form.Group
                    controlId="deliveryInstructions"
                    className="checkoutFormGroup"
                  >
                    <Form.Label>Delivery Instructions</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="delivery_instructions"
                      placeholder="Enter delivery instructions"
                    />
                  </Form.Group>

                  <div>
                    <Button variant="dark" type="submit" className="mr-2">
                      Submit
                    </Button>
                    <Button variant="outline-dark" type="reset">
                      Reset
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
