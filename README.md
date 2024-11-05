Read me should contain the following:
{header image}
Comprehensive readme file
Contents {
Project Overview
Project type: waterfall
Project tech stack
Codebase
Database
Website guide
}
Link to Open Brief Proposal
Open Brief Proposal:
{
DOT SKIN PROPOSAL 
BY RUAN KLOPPER - 231280

Overview:
DotSkin is an e-commerce platform designed to showcase and sell South African-made beauty and cosmetic products. With a focus on supporting local brands, DotSkin provides consumers with high-quality, homegrown alternatives to imported products. The platform offers a smooth shopping experience with a robust delivery system integrated with CourierGuy. This solution aims to boost local businesses, provide reliable delivery services, and optimize the platform for search engines to ensure visibility and growth.

Problem Statement:
The South African beauty and cosmetics market is saturated with imported products, particularly from countries like China, leaving little room for local products to thrive. This reliance on imports limits the availability of homegrown options for consumers, as well as market opportunities for South African beauty brands. The lack of platforms exclusively dedicated to South African-made beauty products also hampers the growth of local manufacturers and brands.

Solution:
DotSkin addresses this problem by creating an e-commerce platform dedicated to promoting and selling only South African-made beauty and cosmetic products. The platform will ensure a seamless user experience, featuring integrated delivery via CourierGuy for efficient, local shipping. Additionally, DotSkin will implement strong SEO strategies to improve visibility, ensuring South African products can compete more effectively with imported goods. This platform will empower local brands and provide consumers with a reliable and enjoyable online shopping experience.

Phase 1: Semester Project (MVP)
The initial phase of the project will focus on building the core e-commerce platform and simulating key features, such as payments and delivery, using CourierGuy's API structure to streamline the future implementation. This phase will exclude live payment and delivery integrations but will showcase the functional flow of the system.
Key Deliverables:
•	E-commerce Website: A fully functional online platform where users can browse and purchase products.
•	Admin Panel: Full control over products, orders, and users through a backend panel.
•	PostgreSQL Database: A secure and scalable relational database for storing product catalogs, orders, and customer data.
•	Role-Based Access Control (RBAC): Secure user authentication and role management (admin, customer).
•	Simulated Payment Process: Demonstration of how payments will be processed using services like Ozow.
•	CourierGuy Delivery Simulation: A mock-up of how the delivery process will work, based on CourierGuy’s API for future integration.
Tech Stack for Semester:
•	Next.js (Server-Side Rendering - SSR): For improved SEO and faster loading times.
•	Material UI: Responsive, modern design framework for the front end.
•	Express.js: Backend framework for API development and data handling.
•	PostgreSQL: Relational database for managing user accounts, products, and orders.
•	WebSockets: For real-time notifications and order updates.

Phase 2: Post-Semester Features
Once the foundation is laid, the project will move into the post-semester phase, focusing on implementing real-time integrations and expanding the platform’s capabilities.
Key Features:
•	CourierGuy Integration: Automated delivery management and tracking using CourierGuy’s API to ensure seamless logistics.
•	Payment Gateway Integration: Secure payment processing with Ozow, PayFlex, and EFT, using TLS encryption for security.
•	AES Encryption: Advanced encryption standards for sensitive data such as payment information and passwords.
•	Google Reviews Integration: Allows customers to leave reviews directly on the site, building credibility and improving SEO.
•	RBAC (Role-Based Access Control): Expanding role-based access to include more user types and permissions.
•	Email Verification and Order Confirmation: Ensure authenticity and transaction security with automated emails.
Tech Stack for Post-Semester:
•	Ozow Payment Integration: Enable secure, PCI DSS-compliant online transactions.
•	CourierGuy API: Live integration for managing delivery and tracking.
•	Encryption: AES encryption for sensitive data and HTTPS with TLS for secure data transmission.

Backend Structure and Security
Tech Stack:
•	Express.js: The backend framework for building APIs and managing business logic.
•	PostgreSQL: A relational database for ensuring data integrity, scalability, and secure data storage.
•	WebSockets: For real-time updates and notifications on orders.
•	TLS Encryption: Secure all communications with HTTPS to protect data in transit.
•	AES Encryption: Secure sensitive data like passwords and payment details in the database.
•	.env Files: Environment variables will protect sensitive API keys and credentials.

Frontend Development
Frameworks:
•	Next.js (SSR): For faster load times and better SEO optimization.
•	Material UI or Bootstrap: To create a responsive, user-friendly design.
•	JavaScript Obfuscation: Ensure security by obfuscating frontend JavaScript code.
Key Pages:
1	Home Page: Features top products and promotions, fully optimized for SEO.
2	Product Pages: Display product details with filtering and sorting options.
3	Search Page: Allows users to search for products by keyword, category, or brand.
4	Account Management: Users can manage their profiles, orders, and settings.
5	Cart & Checkout: Secure, intuitive checkout integrated with CourierGuy for reliable deliveries.
6	Admin Console: Full control for product management and SEO optimization through keyword tagging.

SEO Optimization (Post-Semester Focus)
Product-Level SEO:
•	Product Titles: Use keyword-rich titles to improve search visibility (e.g., “Long-Lasting Red Lipstick”).
•	Product Descriptions: Unique, keyword-optimized product descriptions that highlight product features like “organic” or “cruelty-free.”
•	Image Alt Text: Descriptive alt text for images to enhance visibility in search results.
•	Schema Markup: Use structured data for rich snippets (e.g., price, availability) in search engines.
General SEO Optimization:
•	Keyword Research: Identify high-value keywords to implement across pages.
•	Meta Titles & Descriptions: Use concise, action-oriented meta titles and descriptions for each page.
•	Mobile Optimization: Ensure responsive design for mobile devices.
•	Internal Linking: Create a strong internal linking strategy to boost navigation and SEO.
•	Sitemap & Robots.txt: Submit an XML sitemap to search engines and guide indexing with robots.txt.
}
Code Base
Next.js, Prisma ORM, Cloudinary CDN, NextAuth, React, Express.js
Link to Demonstration Video
Link to Milestone Check Document
