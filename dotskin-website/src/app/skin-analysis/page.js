// Skin Analysis Page
"use client";
import "../global.css";
import "./skinAnalysis.css";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Accordion,
  Card,
} from "react-bootstrap";

import Navbar from "@/components/Navbar/Navbar";

export default function SkinAnalysis() {
  return (
    <div className="clientWebsiteContainer">
      <Navbar />
      <div className="skinAnalysisContent">
        <Container>
          <h1 className="skinAnalysisHeader text-center">Skin Analysis</h1>
          <p className="skinAnalysisLead text-center mb-5">
            Understanding your skin type and condition is the first step to
            finding the perfect skincare products. Our skin analysis helps
            identify unique needs to provide you with personalized
            recommendations, all focused on South African-made products.
          </p>
          <Row
            className="justify-content-center mt-10 p-5"
            style={{ backgroundColor: "#d4e8c3", borderRadius: "20px" }}
          >
            <Col md={6}>
              <Form>
                <Form.Group className="mb-3" controlId="skinType">
                  <Form.Label>What is your skin type?</Form.Label>
                  <Form.Control as="select">
                    <option>Select your skin type</option>
                    <option>Normal</option>
                    <option>Oily</option>
                    <option>Dry</option>
                    <option>Combination</option>
                    <option>Sensitive</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="skinConcerns">
                  <Form.Label>What are your main skin concerns?</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="E.g., acne, dryness, wrinkles"
                  />
                </Form.Group>
                <Form.Group className="mb-4" controlId="ageRange">
                  <Form.Label>Your age range</Form.Label>
                  <Form.Control as="select">
                    <option>Select your age range</option>
                    <option>Under 18</option>
                    <option>18-25</option>
                    <option>26-35</option>
                    <option>36-45</option>
                    <option>46 and above</option>
                  </Form.Control>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="analysisSubmitButton"
                >
                  Get Personalized Recommendations
                </Button>
              </Form>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={8} className="mx-auto">
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0" className="mb-2">
                  <Accordion.Header>Why Skin Analysis Matters</Accordion.Header>
                  <Accordion.Body>
                    Skin analysis provides a deeper understanding of your skin’s
                    unique needs, helping us recommend products that truly work
                    for you. Our focus is on local products, supporting South
                    African brands while offering high-quality, effective
                    skincare solutions.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className="mb-2">
                  <Accordion.Header>How We Use Your Analysis</Accordion.Header>
                  <Accordion.Body>
                    Based on your responses, we’ll match you with products
                    tailored to address your skin concerns. By choosing South
                    African-made products, you’re not only investing in your
                    skin’s health but also supporting local businesses.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Our Commitment to Quality</Accordion.Header>
                  <Accordion.Body>
                    At DotSkin, quality is paramount. We collaborate with
                    reputable local brands to bring you safe, effective skincare
                    options suited for South African climates and diverse skin
                    types.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
