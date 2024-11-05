// About Us Page
"use client";
import "../global.css";
import "./about.css";
import Navbar from "@/components/Navbar/Navbar";
import { Container, Row, Col, Image, Card } from "react-bootstrap";

export default function About() {
  return (
    <div className="clientWebsiteContainer">
      <Navbar />
      <div className="aboutContent">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <h1 className="aboutHeader text-center">About Us</h1>
              <p className="aboutLead text-center">
                DotSkin is more than just a beauty platform – it’s a movement
                towards supporting South African-made products in a market
                flooded with imports. We are dedicated to offering locally
                crafted beauty solutions that celebrate our unique culture,
                empower local brands, and give South African consumers the
                chance to choose homegrown options.
              </p>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col md={4}>
              <Card className="aboutCard">
                <Card.Body>
                  <Card.Title className="aboutCardTitle">
                    Our Mission
                  </Card.Title>
                  <Card.Text className="aboutCardText">
                    To provide a platform exclusively for South African beauty
                    products, fostering the growth of local brands and creating
                    more choices for consumers who wish to support South
                    African-made goods.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="aboutCard">
                <Card.Body>
                  <Card.Title className="aboutCardTitle">Our Values</Card.Title>
                  <Card.Text className="aboutCardText">
                    Integrity, sustainability, and community support. We believe
                    in empowering South African brands, promoting fair trade,
                    and prioritizing quality over quantity.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="aboutCard">
                <Card.Body>
                  <Card.Title className="aboutCardTitle">
                    Our Promise
                  </Card.Title>
                  <Card.Text className="aboutCardText">
                    To be the go-to platform for locally made beauty products,
                    helping consumers connect with brands that are as passionate
                    about South Africa as they are about quality skincare.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
