// AdminEmails.js
"use client";
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import "../global.css";
import "./adminscreens.css";
import Image from "next/image"; // Added import for Next.js Image component

// Simulated products for the email builders
const productsDB = [
  {
    id: 1,
    name: "Hydrating Face Cream",
    price: "R299.99",
    image: "/images/product1.png",
  },
  {
    id: 2,
    name: "Vitamin C Serum",
    price: "R399.99",
    image: "/images/product2.png",
  },
  {
    id: 3,
    name: "Anti-Aging Eye Cream",
    price: "R499.99",
    image: "/images/product3.png",
  },
  {
    id: 4,
    name: "Moisturizing Lotion",
    price: "R349.99",
    image: "/images/product4.png",
  },
];

export default function AdminEmailManager() {
  // States for managing modals and email builders
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [newsletterSections, setNewsletterSections] = useState([]);
  const [promoSections, setPromoSections] = useState([]);

  // Mock current and past email services
  const [currentServices, setCurrentServices] = useState([
    {
      id: 1,
      title: "Newsletter - October 2024",
      type: "Newsletter",
      status: "Active",
      sent: "350 emails",
    },
    {
      id: 2,
      title: "Promo Email - Save 10%",
      type: "Promo",
      status: "Active",
      sent: "120 emails",
    },
  ]);

  const [pastServices, setPastServices] = useState([
    {
      id: 3,
      title: "Newsletter - September 2024",
      type: "Newsletter",
      status: "Completed",
      sent: "500 emails",
    },
    {
      id: 4,
      title: "Promo Email - September 2024 - 15% OFF",
      type: "Promo",
      status: "Completed",
      sent: "180 emails",
    },
  ]);

  // Section types for both builders
  const sectionTypes = [
    "Header",
    "Description",
    "Featured Products",
    "Image with Text",
  ];

  // Common functions for adding/removing sections
  const handleAddSection = (type, setSections) => {
    setSections((prevSections) => [...prevSections, { type, content: "" }]);
  };

  const handleRemoveSection = (index, setSections) => {
    setSections((prevSections) =>
      prevSections.filter((_, sectionIndex) => sectionIndex !== index)
    );
  };

  const handleUpdateSection = (index, content, setSections) => {
    setSections((prevSections) =>
      prevSections.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, content } : section
      )
    );
  };

  // Function to stop an active service
  const handleStopService = (id) => {
    setCurrentServices((prevServices) =>
      prevServices.filter((service) => service.id !== id)
    );
    const stoppedService = currentServices.find((service) => service.id === id);
    setPastServices((prevServices) => [
      ...prevServices,
      { ...stoppedService, status: "Stopped" },
    ]);
  };

  // Product selection in Featured Products section for newsletter
  const handleProductSelection = (index, productId, setSections, sections) => {
    const selectedProduct = productsDB.find(
      (product) => product.id === productId
    );
    handleUpdateSection(index, { ...selectedProduct, text: "" }, setSections);
  };

  const handleProductTextUpdate = (index, text, setSections, sections) => {
    handleUpdateSection(
      index,
      { ...sections[index].content, text },
      setSections
    );
  };

  // Render the featured product section
  const renderFeaturedProductsSection = (
    index,
    content,
    setSections,
    sections
  ) => (
    <div>
      <Form.Group controlId={`productSelect-${index}`} className="mb-3">
        <Form.Label>Select Product</Form.Label>
        <Form.Control
          as="select"
          value={content.id || ""}
          onChange={(e) =>
            handleProductSelection(
              index,
              parseInt(e.target.value),
              setSections,
              sections
            )
          }
        >
          <option value="" disabled>
            Select a product
          </option>
          {productsDB.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} - {product.price}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      {content.name && (
        <Card className="mb-3">
          <Card.Body>
            <Image
              src={content.image}
              alt={content.name}
              width={500}
              height={200}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "200px",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
            <h5>{content.name}</h5>
            <p>Price: {content.price}</p>
            <Form.Group controlId={`productText-${index}`} className="mb-3">
              <Form.Label>Add Text Description for the Product</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={content.text || ""}
                onChange={(e) =>
                  handleProductTextUpdate(
                    index,
                    e.target.value,
                    setSections,
                    sections
                  )
                }
              />
            </Form.Group>
          </Card.Body>
        </Card>
      )}
    </div>
  );

  // Render newsletter or promo email preview
  const renderEmailPreview = (sections, setSections) =>
    sections.map((section, index) => (
      <Card key={index} className="mb-3">
        <Card.Header>
          <strong>{section.type}</strong>
          <Button
            variant="danger"
            className="float-end"
            size="sm"
            onClick={() => handleRemoveSection(index, setSections)}
          >
            Remove
          </Button>
        </Card.Header>
        <Card.Body>
          {section.type === "Header" && (
            <Form.Group controlId={`header-${index}`}>
              <Form.Control
                type="text"
                placeholder="Enter Header Text"
                value={section.content}
                onChange={(e) =>
                  handleUpdateSection(index, e.target.value, setSections)
                }
              />
            </Form.Group>
          )}
          {section.type === "Description" && (
            <Form.Group controlId={`description-${index}`}>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Description"
                value={section.content}
                onChange={(e) =>
                  handleUpdateSection(index, e.target.value, setSections)
                }
              />
            </Form.Group>
          )}
          {section.type === "Featured Products" &&
            renderFeaturedProductsSection(
              index,
              section.content,
              setSections,
              sections
            )}
          {section.type === "Image with Text" && (
            <Form.Group controlId={`imageWithText-${index}`}>
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleUpdateSection(
                    index,
                    {
                      image: URL.createObjectURL(e.target.files[0]),
                      text: section.content.text || "",
                    },
                    setSections
                  )
                }
              />
              {section.content.image && (
                <>
                  <Image
                    src={section.content.image}
                    alt="Uploaded"
                    width={500}
                    height={300}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "300px",
                      objectFit: "cover",
                      marginTop: "10px",
                    }}
                  />
                  <Form.Group controlId={`imageText-${index}`} className="mt-3">
                    <Form.Label>Add Text Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={section.content.text || ""}
                      onChange={(e) =>
                        handleUpdateSection(
                          index,
                          { ...section.content, text: e.target.value },
                          setSections
                        )
                      }
                    />
                  </Form.Group>
                </>
              )}
            </Form.Group>
          )}
        </Card.Body>
      </Card>
    ));

  return (
    <Container className="my-4">
      <h1>Email Management Dashboard</h1>
      <Row className="mb-4">
        <Col xs={12} sm={6} md={4} lg={3}>
          <Card className="text-center mb-4">
            <Card.Body>
              <Card.Title>Total Email Services Running</Card.Title>
              <Card.Text className="display-4">
                {currentServices.length}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} lg={3}>
          <Card className="text-center mb-4">
            <Card.Body>
              <Card.Title>Total Emails Sent</Card.Title>
              <Card.Text className="display-4">770</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Buttons to trigger the email builders */}
      <Row className="mb-4">
        <Col>
          <Button
            variant="primary"
            onClick={() => setShowNewsletterModal(true)}
          >
            Create Newsletter
          </Button>
          <Button
            variant="secondary"
            className="ms-3"
            onClick={() => setShowPromoModal(true)}
          >
            Create Promo Email
          </Button>
        </Col>
      </Row>

      {/* Active Email Services */}
      <h3>Active Email Services</h3>
      <Row>
        {currentServices.map((service) => (
          <Col xs={12} sm={6} lg={4} key={service.id}>
            <Card className="mb-3">
              <Card.Header>
                {service.title} ({service.type})
              </Card.Header>
              <Card.Body>
                <p>Status: {service.status}</p>
                <p>Emails Sent: {service.sent}</p>
                <Button
                  variant="danger"
                  onClick={() => handleStopService(service.id)}
                >
                  Stop Service
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Past Email Services */}
      <h3 className="mt-4">Past Email Services</h3>
      <Row>
        {pastServices.map((service) => (
          <Col xs={12} sm={6} lg={4} key={service.id}>
            <Card className="mb-3">
              <Card.Header>
                {service.title} ({service.type})
              </Card.Header>
              <Card.Body>
                <p>Status: {service.status}</p>
                <p>Emails Sent: {service.sent}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Newsletter Builder Modal */}
      <Modal
        show={showNewsletterModal}
        onHide={() => setShowNewsletterModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Newsletter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Section for adding new blocks */}
          <Row className="mb-4">
            <Col>
              <h5>Add Section to Email</h5>
              {sectionTypes.map((type) => (
                <Button
                  key={type}
                  variant="outline-primary"
                  className="me-2 mb-2"
                  onClick={() => handleAddSection(type, setNewsletterSections)}
                >
                  Add {type}
                </Button>
              ))}
            </Col>
          </Row>

          {/* Render email preview */}
          {newsletterSections.length > 0 ? (
            renderEmailPreview(newsletterSections, setNewsletterSections)
          ) : (
            <Card>
              <Card.Body>
                <p>
                  No sections added yet. Please add sections to start building
                  your newsletter.
                </p>
              </Card.Body>
            </Card>
          )}

          {/* Finalize & Send Section */}
          <Row className="mt-5">
            <Col xs={12}>
              <Card>
                <Card.Header>Finalize & Send</Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group controlId="newsletterSubject" className="mb-3">
                      <Form.Label>Email Subject</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter the newsletter email subject"
                      />
                    </Form.Group>
                    <Button variant="success" type="submit">
                      Send Newsletter
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      {/* Promo Email Builder Modal */}
      <Modal
        show={showPromoModal}
        onHide={() => setShowPromoModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Promo Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Section for adding new blocks */}
          <Row className="mb-4">
            <Col>
              <h5>Add Section to Email</h5>
              {sectionTypes.map((type) => (
                <Button
                  key={type}
                  variant="outline-primary"
                  className="me-2 mb-2"
                  onClick={() => handleAddSection(type, setPromoSections)}
                >
                  Add {type}
                </Button>
              ))}
            </Col>
          </Row>

          {/* Render email preview */}
          {promoSections.length > 0 ? (
            renderEmailPreview(promoSections, setPromoSections)
          ) : (
            <Card>
              <Card.Body>
                <p>
                  No sections added yet. Please add sections to start building
                  your promo email.
                </p>
              </Card.Body>
            </Card>
          )}

          {/* Finalize & Send Section */}
          <Row className="mt-5">
            <Col xs={12}>
              <Card>
                <Card.Header>Finalize & Send</Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group controlId="promoEmailSubject" className="mb-3">
                      <Form.Label>Email Subject</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter the promo email subject"
                      />
                    </Form.Group>
                    <Button variant="success" type="submit">
                      Create Promo Email Automation
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
