// Accounts page: Layout
"use client";
import dynamic from "next/dynamic";
import "../global.css";

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

import Navbar from "@/components/Navbar/Navbar";

export default function Account() {
  return (
    <div className="clientWebsiteContainer">
      <Navbar />
      <div className="clientWebsiteContent AccountsPage">
        <h1>Contact Us</h1>
        <h1>Contact Us</h1>
        <h1>Contact Us</h1>
        <h1>Contact Us</h1>
        <h1>Contact Us</h1>
        <h1>Contact Us</h1>
      </div>
    </div>
  );
}
