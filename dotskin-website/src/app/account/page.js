// Accounts page: Layout
"use client";
import dynamic from "next/dynamic";
import "../global.css";
import "./Accounts.css";
import Link from "next/link";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Accordion,
  Card,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Navbar from "@/components/Navbar/Navbar";

// Notes, like in the navbar, use userid to fetch info about the user or use next auth session, if the session is empty or user isnt logged in, it should be redirected back to home

const APordersCard = () => {
  return (
    <div className="APordersBody pr-6 mb-2">
      <div className="flex items-center">
        <div className="APoIcon ml-6 mr-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 20C5.16667 20 4.45833 19.7083 3.875 19.125C3.29167 18.5417 3 17.8333 3 17H1V6C1 5.45 1.19583 4.97917 1.5875 4.5875C1.97917 4.19583 2.45 4 3 4H17V8H20L23 12V17H21C21 17.8333 20.7083 18.5417 20.125 19.125C19.5417 19.7083 18.8333 20 18 20C17.1667 20 16.4583 19.7083 15.875 19.125C15.2917 18.5417 15 17.8333 15 17H9C9 17.8333 8.70833 18.5417 8.125 19.125C7.54167 19.7083 6.83333 20 6 20ZM6 18C6.28333 18 6.52083 17.9042 6.7125 17.7125C6.90417 17.5208 7 17.2833 7 17C7 16.7167 6.90417 16.4792 6.7125 16.2875C6.52083 16.0958 6.28333 16 6 16C5.71667 16 5.47917 16.0958 5.2875 16.2875C5.09583 16.4792 5 16.7167 5 17C5 17.2833 5.09583 17.5208 5.2875 17.7125C5.47917 17.9042 5.71667 18 6 18ZM18 18C18.2833 18 18.5208 17.9042 18.7125 17.7125C18.9042 17.5208 19 17.2833 19 17C19 16.7167 18.9042 16.4792 18.7125 16.2875C18.5208 16.0958 18.2833 16 18 16C17.7167 16 17.4792 16.0958 17.2875 16.2875C17.0958 16.4792 17 16.7167 17 17C17 17.2833 17.0958 17.5208 17.2875 17.7125C17.4792 17.9042 17.7167 18 18 18ZM17 13H21.25L19 10H17V13Z"
              fill="black"
            />
          </svg>
        </div>
        <div className="APoTextGroup">
          <h4 style={{ marginBottom: "1px" }}>CourierGuy #123abc</h4>
          <h5>Status: Delivered</h5>
        </div>
      </div>
      <Button variant="dark">Track</Button>
    </div>
  );
};

const APDashboard = () => {
  return (
    <div>
      <Container className="ACpageContent">
        <Row>
          <Col xs={12} sm={12} md={12} lg={8}>
            <h2>Orders</h2>
            <div className="APDordersContainer">
              <APordersCard />
              <APordersCard />
              <APordersCard />
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={4}>
            <h3>You</h3>
            <Card className="APDcard">
              <Card.Body>
                <div className="APDashCardHeading">
                  <h4>user.name</h4>
                  <div className="APDCIcon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <path
                        d="M6.6889 17.1C7.54192 16.45 8.4953 15.9375 9.54904 15.5625C10.6028 15.1875 11.7067 15 12.8608 15C14.0149 15 15.1188 15.1875 16.1725 15.5625C17.2263 15.9375 18.1796 16.45 19.0327 17.1C19.6181 16.4167 20.0739 15.6417 20.4 14.775C20.7262 13.9083 20.8893 12.9833 20.8893 12C20.8893 9.78333 20.1073 7.89583 18.5434 6.3375C16.9796 4.77917 15.0853 4 12.8608 4C10.6362 4 8.74201 4.77917 7.17813 6.3375C5.61425 7.89583 4.83231 9.78333 4.83231 12C4.83231 12.9833 4.99539 13.9083 5.32155 14.775C5.6477 15.6417 6.10349 16.4167 6.6889 17.1ZM12.8608 13C11.8739 13 11.0418 12.6625 10.3644 11.9875C9.68703 11.3125 9.34833 10.4833 9.34833 9.5C9.34833 8.51667 9.68703 7.6875 10.3644 7.0125C11.0418 6.3375 11.8739 6 12.8608 6C13.8476 6 14.6797 6.3375 15.3571 7.0125C16.0345 7.6875 16.3732 8.51667 16.3732 9.5C16.3732 10.4833 16.0345 11.3125 15.3571 11.9875C14.6797 12.6625 13.8476 13 12.8608 13ZM12.8608 22C11.4725 22 10.1679 21.7375 8.9469 21.2125C7.72591 20.6875 6.66381 19.975 5.7606 19.075C4.8574 18.175 4.14237 17.1167 3.6155 15.9C3.08863 14.6833 2.8252 13.3833 2.8252 12C2.8252 10.6167 3.08863 9.31667 3.6155 8.1C4.14237 6.88333 4.8574 5.825 5.7606 4.925C6.66381 4.025 7.72591 3.3125 8.9469 2.7875C10.1679 2.2625 11.4725 2 12.8608 2C14.249 2 15.5537 2.2625 16.7747 2.7875C17.9957 3.3125 19.0578 4.025 19.961 4.925C20.8642 5.825 21.5792 6.88333 22.1061 8.1C22.6329 9.31667 22.8964 10.6167 22.8964 12C22.8964 13.3833 22.6329 14.6833 22.1061 15.9C21.5792 17.1167 20.8642 18.175 19.961 19.075C19.0578 19.975 17.9957 20.6875 16.7747 21.2125C15.5537 21.7375 14.249 22 12.8608 22Z"
                        fill="#1F3A09"
                      />
                    </svg>
                  </div>
                </div>
                <div className="APDashCardSplitter"></div>
                <h6>user.email</h6>
                <h6>user.phone_number</h6>
                <Button variant="dark">Profile</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <h2 className="mt-5 mb-3">Quick Links</h2>
          <Col xs={12} sm={12} md={6} lg={4}>
            <Card className="APDcard">
              <Card.Body>
                <div className="APDashCardHeading">
                  <h4>.Skin Analysis</h4>
                  <div className="APDCIcon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M9 14.25C8.65 14.25 8.35417 14.1292 8.1125 13.8875C7.87083 13.6458 7.75 13.35 7.75 13C7.75 12.65 7.87083 12.3542 8.1125 12.1125C8.35417 11.8708 8.65 11.75 9 11.75C9.35 11.75 9.64583 11.8708 9.8875 12.1125C10.1292 12.3542 10.25 12.65 10.25 13C10.25 13.35 10.1292 13.6458 9.8875 13.8875C9.64583 14.1292 9.35 14.25 9 14.25ZM15 14.25C14.65 14.25 14.3542 14.1292 14.1125 13.8875C13.8708 13.6458 13.75 13.35 13.75 13C13.75 12.65 13.8708 12.3542 14.1125 12.1125C14.3542 11.8708 14.65 11.75 15 11.75C15.35 11.75 15.6458 11.8708 15.8875 12.1125C16.1292 12.3542 16.25 12.65 16.25 13C16.25 13.35 16.1292 13.6458 15.8875 13.8875C15.6458 14.1292 15.35 14.25 15 14.25ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 11.6 19.975 11.2125 19.925 10.8375C19.875 10.4625 19.7833 10.1 19.65 9.75C19.3 9.83333 18.95 9.89583 18.6 9.9375C18.25 9.97917 17.8833 10 17.5 10C15.9833 10 14.55 9.675 13.2 9.025C11.85 8.375 10.7 7.46667 9.75 6.3C9.21667 7.6 8.45417 8.72917 7.4625 9.6875C6.47083 10.6458 5.31667 11.3667 4 11.85V12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                </div>
                <div className="APDashCardSplitter"></div>
                <Card.Text>View your skin analysis</Card.Text>
                <Button variant="dark">View</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4}>
            <Card className="APDcard">
              <Card.Body>
                <div className="APDashCardHeading">
                  <h4>User profile</h4>
                  <div className="APDCIcon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                    >
                      <path
                        d="M6.6889 17.1C7.54192 16.45 8.4953 15.9375 9.54904 15.5625C10.6028 15.1875 11.7067 15 12.8608 15C14.0149 15 15.1188 15.1875 16.1725 15.5625C17.2263 15.9375 18.1796 16.45 19.0327 17.1C19.6181 16.4167 20.0739 15.6417 20.4 14.775C20.7262 13.9083 20.8893 12.9833 20.8893 12C20.8893 9.78333 20.1073 7.89583 18.5434 6.3375C16.9796 4.77917 15.0853 4 12.8608 4C10.6362 4 8.74201 4.77917 7.17813 6.3375C5.61425 7.89583 4.83231 9.78333 4.83231 12C4.83231 12.9833 4.99539 13.9083 5.32155 14.775C5.6477 15.6417 6.10349 16.4167 6.6889 17.1ZM12.8608 13C11.8739 13 11.0418 12.6625 10.3644 11.9875C9.68703 11.3125 9.34833 10.4833 9.34833 9.5C9.34833 8.51667 9.68703 7.6875 10.3644 7.0125C11.0418 6.3375 11.8739 6 12.8608 6C13.8476 6 14.6797 6.3375 15.3571 7.0125C16.0345 7.6875 16.3732 8.51667 16.3732 9.5C16.3732 10.4833 16.0345 11.3125 15.3571 11.9875C14.6797 12.6625 13.8476 13 12.8608 13ZM12.8608 22C11.4725 22 10.1679 21.7375 8.9469 21.2125C7.72591 20.6875 6.66381 19.975 5.7606 19.075C4.8574 18.175 4.14237 17.1167 3.6155 15.9C3.08863 14.6833 2.8252 13.3833 2.8252 12C2.8252 10.6167 3.08863 9.31667 3.6155 8.1C4.14237 6.88333 4.8574 5.825 5.7606 4.925C6.66381 4.025 7.72591 3.3125 8.9469 2.7875C10.1679 2.2625 11.4725 2 12.8608 2C14.249 2 15.5537 2.2625 16.7747 2.7875C17.9957 3.3125 19.0578 4.025 19.961 4.925C20.8642 5.825 21.5792 6.88333 22.1061 8.1C22.6329 9.31667 22.8964 10.6167 22.8964 12C22.8964 13.3833 22.6329 14.6833 22.1061 15.9C21.5792 17.1167 20.8642 18.175 19.961 19.075C19.0578 19.975 17.9957 20.6875 16.7747 21.2125C15.5537 21.7375 14.249 22 12.8608 22Z"
                        fill="#1F3A09"
                      />
                    </svg>
                  </div>
                </div>
                <div className="APDashCardSplitter"></div>
                <Card.Text>View or edit your personal info</Card.Text>
                <Button variant="dark">View</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4}>
            <Card className="APDcard">
              <Card.Body>
                <div className="APDashCardHeading">
                  <h4>Addresses</h4>
                  <div className="APDCIcon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12V13.45C22 14.4333 21.6625 15.2708 20.9875 15.9625C20.3125 16.6542 19.4833 17 18.5 17C17.9167 17 17.3667 16.875 16.85 16.625C16.3333 16.375 15.9 16.0167 15.55 15.55C15.0667 16.0333 14.5208 16.3958 13.9125 16.6375C13.3042 16.8792 12.6667 17 12 17C10.6167 17 9.4375 16.5125 8.4625 15.5375C7.4875 14.5625 7 13.3833 7 12C7 10.6167 7.4875 9.4375 8.4625 8.4625C9.4375 7.4875 10.6167 7 12 7C13.3833 7 14.5625 7.4875 15.5375 8.4625C16.5125 9.4375 17 10.6167 17 12V13.45C17 13.8833 17.1417 14.25 17.425 14.55C17.7083 14.85 18.0667 15 18.5 15C18.9333 15 19.2917 14.85 19.575 14.55C19.8583 14.25 20 13.8833 20 13.45V12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20H17V22H12ZM12 15C12.8333 15 13.5417 14.7083 14.125 14.125C14.7083 13.5417 15 12.8333 15 12C15 11.1667 14.7083 10.4583 14.125 9.875C13.5417 9.29167 12.8333 9 12 9C11.1667 9 10.4583 9.29167 9.875 9.875C9.29167 10.4583 9 11.1667 9 12C9 12.8333 9.29167 13.5417 9.875 14.125C10.4583 14.7083 11.1667 15 12 15Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                </div>
                <div className="APDashCardSplitter"></div>
                <Card.Text>View or edit your address</Card.Text>
                <Button variant="dark">View</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const APPersonalInfo = () => {
  const { data: session } = useSession();

  const [addressData, setAddressData] = useState({
    street_address1: "",
    street_address2: "",
    suburb: "",
    city: "",
    province: "",
    postal_code: "",
    building_type: "",
    delivery_instructions: "",
  });

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!session || !session.user.id) return;

      try {
        // Fetch personal information using the user ID from session
        const userRes = await fetch(`/api/users?userId=${session.user.id}`);
        if (userRes.ok) {
          const { user } = await userRes.json();
          setPersonalInfo(user);
        } else {
          console.error("Failed to fetch user data:", await userRes.text());
        }

        // Fetch address data using the user ID from session
        const addressRes = await fetch(
          `/api/addresses?userId=${session.user.id}`
        );
        if (addressRes.ok) {
          const { address } = await addressRes.json();
          setAddressData(address || {});
        } else {
          console.error(
            "Failed to fetch address data:",
            await addressRes.text()
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [session]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field updated: ${name}, New Value: ${value}`); // Debug log
    setAddressData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const handleUserInfoSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a PUT request to update user data
      const userRes = await fetch(`/api/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...personalInfo, userId: session.user.id }),
      });

      if (userRes.ok) {
        alert("Personal information updated successfully!");
      } else {
        const errorText = await userRes.text();
        console.error("Failed to update personal information:", errorText);
      }
    } catch (error) {
      console.error("Error updating personal information:", error);
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();

    // Log the current state of addressData for debugging
    console.log("Address Data:", addressData);

    try {
      // Check if an address already exists for this user
      const checkResponse = await fetch(
        `/api/addresses?userId=${session.user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let method;
      if (checkResponse.ok) {
        const data = await checkResponse.json();
        method = data.address ? "PUT" : "POST"; // If address exists, use PUT; otherwise, use POST
      } else {
        console.error("Failed to check address:", await checkResponse.text());
        return;
      }

      // Send the request to create or update the address
      const saveAddressResponse = await fetch("/api/addresses", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...addressData, userId: session.user.id }),
      });

      if (saveAddressResponse.ok) {
        alert(
          method === "POST"
            ? "Address created successfully!"
            : "Address updated successfully!"
        );
      } else {
        const errorText = await saveAddressResponse.text();
        console.error("Failed to save address:", errorText);
      }
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  return (
    <div>
      <Container className="ACpageContent">
        {/* Personal Information Section */}
        <Row className="ACpersonalInfoGroup mb-3">
          <h4>Personal Information</h4>
          <Col xs={12} sm={12} md={6} lg={4}>
            <div className="ACPITgroup">
              <h6>Full Name</h6>
              <h6 style={{ fontWeight: "bold" }}>
                {personalInfo.name || "..."}
              </h6>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4}>
            <div className="ACPITgroup">
              <h6>Email Address</h6>
              <h6 style={{ fontWeight: "bold" }}>
                {personalInfo.email || "..."}
              </h6>
            </div>
            <div className="ACPITgroup">
              <h6>Cellphone Number</h6>
              <h6 style={{ fontWeight: "bold" }}>
                {personalInfo.phone_number || "..."}
              </h6>
            </div>
          </Col>
        </Row>

        {/* Address Information Section */}
        <Row className="ACpersonalInfoGroup mb-3">
          <h4>Address</h4>
          <Col xs={12} sm={12} md={6} lg={4}>
            <div className="ACPITgroup">
              <h6>Street Address</h6>
              <h6 style={{ fontWeight: "bold" }}>
                {addressData.street_address1 || "..."}
              </h6>
            </div>
            <div className="ACPITgroup">
              <h6>Suburb/Region</h6>
              <h6 style={{ fontWeight: "bold" }}>
                {addressData.suburb || "..."}
              </h6>
            </div>
            <div className="ACPITgroup">
              <h6>City</h6>
              <h6 style={{ fontWeight: "bold" }}>
                {addressData.city || "..."}
              </h6>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4}>
            <div className="ACPITgroup">
              <h6>Province/State</h6>
              <h6 style={{ fontWeight: "bold" }}>
                {addressData.province || "..."}
              </h6>
            </div>
            <div className="ACPITgroup">
              <h6>Postal Code</h6>
              <h6 style={{ fontWeight: "bold" }}>
                {addressData.postal_code || "..."}
              </h6>
            </div>
            <div className="ACPITgroup">
              <h6>Building Type</h6>
              <h6 style={{ fontWeight: "bold" }}>
                {addressData.building_type || "Not set"}
              </h6>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={4}>
            <div className="ACPITgroup">
              <h6>Delivery Instructions</h6>
              <h6 style={{ fontWeight: "bold" }}>
                {addressData.delivery_instructions || "Not set"}
              </h6>
            </div>
          </Col>
        </Row>

        <Row className="ACpersonalInfoGroup mb-3">
          <h4>Update or Change Delivery Information</h4>
          <Form onSubmit={handleAddressSubmit}>
            <Row>
              <Col xs={12} sm={12} md={6} lg={4}>
                <Form.Group controlId="streetAddress1" className="ACPITgroup">
                  <Form.Label>Street Address 1</Form.Label>
                  <Form.Control
                    type="text"
                    name="street_address1"
                    value={addressData.street_address1}
                    onChange={handleAddressChange}
                    placeholder="Enter street address 1"
                  />
                </Form.Group>
                <Form.Group controlId="streetAddress2" className="ACPITgroup">
                  <Form.Label>Street Address 2</Form.Label>
                  <Form.Control
                    type="text"
                    name="street_address2"
                    value={addressData.street_address2 || ""}
                    onChange={handleAddressChange}
                    placeholder="Enter street address 2"
                  />
                </Form.Group>
                <Form.Group controlId="suburb" className="ACPITgroup">
                  <Form.Label>Suburb</Form.Label>
                  <Form.Control
                    type="text"
                    name="suburb"
                    value={addressData.suburb}
                    onChange={handleAddressChange}
                    placeholder="Enter suburb"
                  />
                </Form.Group>
                <Form.Group controlId="city" className="ACPITgroup">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={addressData.city}
                    onChange={handleAddressChange}
                    placeholder="Enter city"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} sm={12} md={6} lg={4}>
                <Form.Group controlId="province" className="ACPITgroup">
                  <Form.Label>Province/State</Form.Label>
                  <Form.Control
                    type="text"
                    name="province"
                    value={addressData.province}
                    onChange={handleAddressChange}
                    placeholder="Enter province or state"
                  />
                </Form.Group>
                <Form.Group controlId="postalCode" className="ACPITgroup">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="postal_code"
                    value={addressData.postal_code}
                    onChange={handleAddressChange}
                    placeholder="Enter postal code"
                  />
                </Form.Group>
                <Form.Group controlId="country" className="ACPITgroup">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={addressData.country || "South Africa"}
                    onChange={handleAddressChange}
                    placeholder="Enter country"
                  />
                </Form.Group>
                <Form.Group controlId="buildingType" className="ACPITgroup">
                  <Form.Label>Building Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="building_type"
                    value={addressData.building_type || ""}
                    onChange={handleAddressChange}
                  >
                    <option value="">Select building type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="House">House</option>
                    <option value="Office">Office</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col xs={12} sm={12} md={6} lg={4}>
                <Form.Group
                  controlId="deliveryInstructions"
                  className="ACPITgroup"
                >
                  <Form.Label>Delivery Instructions</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="delivery_instructions"
                    value={addressData.delivery_instructions || ""}
                    onChange={handleAddressChange}
                    placeholder="Enter delivery instructions"
                  />
                </Form.Group>
              </Col>
            </Row>
            <div>
              <Button variant="dark" type="submit" className="mr-2">
                Submit
              </Button>
              <Button variant="outline-dark" type="reset">
                Reset
              </Button>
            </div>
          </Form>
        </Row>

        <Row className="ACpersonalInfoGroup">
          <h4>Update or change personal information</h4>
          <Form onSubmit={handleUserInfoSubmit}>
            <Row>
              <Col xs={12} sm={12} md={6} lg={4}>
                <Form.Group controlId="name" className="ACPITgroup">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={personalInfo.name}
                    onChange={handlePersonalChange}
                    placeholder="Enter your name"
                  />
                </Form.Group>
                <Form.Group controlId="email" className="ACPITgroup">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={personalInfo.email}
                    placeholder="Email cannot be modified"
                    disabled
                  />
                </Form.Group>
                <Form.Group controlId="phonenumber" className="ACPITgroup">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone_number"
                    value={personalInfo.phone_number}
                    onChange={handlePersonalChange}
                    placeholder="Enter phone number"
                  />
                </Form.Group>
              </Col>
            </Row>
            <div>
              <Button variant="dark" type="submit" className="mr-2">
                Submit
              </Button>
              <Button variant="outline-dark" type="reset">
                Reset
              </Button>
            </div>
          </Form>
        </Row>
      </Container>
    </div>
  );
};

const APOrders = () => {
  const APOorderedItem = () => {
    return (
      <div className="APOorderedItemBody mb-2">
        <div
          className="APOOimage"
          style={{ backgroundImage: "url(/sampleImages/image.png)" }}
        ></div>
        <div className="APOOcontent">
          <h5>Product Name</h5>
          <p>Quantity: 2</p>
          <p>Total: R750.00</p>
        </div>
      </div>
    );
  };
  return (
    <div>
      <Container className="ACpageContent">
        <Accordion defaultActiveKey="0">
          <Accordion.Header className="APOAccordion">
            <div className="APordersABody pr-6 mb-2">
              <div className="flex items-center">
                <div className="APoIcon ml-6 mr-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 20C5.16667 20 4.45833 19.7083 3.875 19.125C3.29167 18.5417 3 17.8333 3 17H1V6C1 5.45 1.19583 4.97917 1.5875 4.5875C1.97917 4.19583 2.45 4 3 4H17V8H20L23 12V17H21C21 17.8333 20.7083 18.5417 20.125 19.125C19.5417 19.7083 18.8333 20 18 20C17.1667 20 16.4583 19.7083 15.875 19.125C15.2917 18.5417 15 17.8333 15 17H9C9 17.8333 8.70833 18.5417 8.125 19.125C7.54167 19.7083 6.83333 20 6 20ZM6 18C6.28333 18 6.52083 17.9042 6.7125 17.7125C6.90417 17.5208 7 17.2833 7 17C7 16.7167 6.90417 16.4792 6.7125 16.2875C6.52083 16.0958 6.28333 16 6 16C5.71667 16 5.47917 16.0958 5.2875 16.2875C5.09583 16.4792 5 16.7167 5 17C5 17.2833 5.09583 17.5208 5.2875 17.7125C5.47917 17.9042 5.71667 18 6 18ZM18 18C18.2833 18 18.5208 17.9042 18.7125 17.7125C18.9042 17.5208 19 17.2833 19 17C19 16.7167 18.9042 16.4792 18.7125 16.2875C18.5208 16.0958 18.2833 16 18 16C17.7167 16 17.4792 16.0958 17.2875 16.2875C17.0958 16.4792 17 16.7167 17 17C17 17.2833 17.0958 17.5208 17.2875 17.7125C17.4792 17.9042 17.7167 18 18 18ZM17 13H21.25L19 10H17V13Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <div className="APoTextGroup">
                  <h4 style={{ marginBottom: "1px" }}>CourierGuy #123abc</h4>
                  <h5>Status: Delivered</h5>
                </div>
              </div>
              <Button variant="dark">Track</Button>
            </div>
          </Accordion.Header>
          <Accordion.Body eventKey="0" className="APOAccordionBody">
            <div>
              <Row>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <h4 className="font-bold">Order Information</h4>
                  <h5>Full name: YOUR_FULLNAME</h5>
                  <h5>Email: YOUR_EMAIL</h5>
                  <h5>Phone: YOUR_CELLPHONE_NUMBER</h5>
                  <br />
                  <h5 className="font-bold">Shipping Address</h5>
                  <h5>Your full street address</h5>
                  <br />
                  <h5 className="font-bold">Delivery Notes</h5>
                  <h5>Not set</h5>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6}>
                  <h4 className="font-bold">Items</h4>
                  <div className="APOorderedItemsContainer">
                    <APOorderedItem />
                    <APOorderedItem />
                    <APOorderedItem />
                    <APOorderedItem />
                  </div>
                </Col>
              </Row>
            </div>
          </Accordion.Body>
        </Accordion>
      </Container>
    </div>
  );
};

export default function Account() {
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const { data: session } = useSession();
  const router = useRouter();

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <APDashboard />;
      case "PersonalInfo":
        return <APPersonalInfo />;
      case "Orders":
        return <APOrders />;
      default:
        return <APDashboard />;
    }
  };

  useEffect(() => {
    if (!session) router.push("/");
  }, [session, router]);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return session ? (
    <div className="clientWebsiteContainer">
      <Navbar />
      <div className="clientWebsiteContent AccountsPage">
        <Container className="flex justify-center items-top">
          {/* SideNav */}
          <div className="APsideNav pb-4">
            <div className="flex items-center flex-col">
              <div className="APuserProfilePic mt-5 mb-5"></div>
              <div className="APsideNavContent">
                <h5 className="APSNusername">UserName</h5>
                <div className="APSNsplitter mb-3"></div>
                <div className="APSNnavgroup">
                  {/* Dashboard must display APDashboard */}
                  <h5
                    className={`nav-item ${
                      activeComponent === "Dashboard" ? "APSNactive" : ""
                    }`}
                    onClick={() => setActiveComponent("Dashboard")}
                  >
                    Dashboard
                  </h5>

                  {/* Personal must display APPersonalInfo */}
                  <h5
                    className={`nav-item ${
                      activeComponent === "PersonalInfo" ? "APSNactive" : ""
                    }`}
                    onClick={() => setActiveComponent("PersonalInfo")}
                  >
                    Personal Information
                  </h5>

                  {/* Orders must display APOrders */}
                  <h5
                    className={`nav-item ${
                      activeComponent === "Orders" ? "APSNactive" : ""
                    }`}
                    onClick={() => setActiveComponent("Orders")}
                  >
                    Orders
                  </h5>

                  {/* Contact Us must navigate to /contactUs */}
                  <h5
                    className="nav-item"
                    onClick={() => router.push("/contactUs")}
                  >
                    Contact Us
                  </h5>
                </div>
              </div>
            </div>
            <Button variant="dark" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
          <Container className="APcontentContainer">
            <div className="APCHeader">
              {/* Do not add functionality for this button */}
              <Button variant="dark" className="APCHeaderButton">
                Close
              </Button>
              <h2>
                {activeComponent === "Dashboard" && "Dashboard"}
                {activeComponent === "PersonalInfo" && "Personal Information"}
                {activeComponent === "Orders" && "Orders"}
              </h2>
            </div>
            {renderActiveComponent()}
          </Container>
        </Container>
      </div>
    </div>
  ) : (
    <div>
      <h1>You do not have access to this page</h1>
      <h1>Please Login or Sign Up</h1>
    </div>
  );
}
