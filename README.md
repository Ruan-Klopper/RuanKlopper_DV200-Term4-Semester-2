<p align="center" style="width: 90%; padding: 40px; background-color: #D4E8C3; border-radius: 30px">
  <img src="./dotskin-website/public/assets/logo.png" alt="DotSkin Header Image" width="200">
</p>
<div align="center" style="width: 99%; padding: 10px; background-color: #D4E8C3; border-radius: 30px; color: #2B4912;">
  <h2 style="font-size: 36px; margin-bottom: -20px;">.DotSkin</h2>
  <h5>Empowering Local Beauty Brands with a Seamless Shopping Experience</h5>
</div>

## Table of Contents

- [Links](#links)
- [Project Overview](#project-overview)
- [Project Type](#project-type)
- [Tech Stack](#tech-stack)
- [Codebase](#codebase)
- [Database](#database)
- [Website Guide](#website-guide)
- [Open Brief Proposal](#open-brief-proposal)
- [Installation & Setup](#installation--setup)
- [Deployment](#deployment)
- [Conclusion](#conclusion)

## Links

- [Heroku deployed](#open-brief-proposal)
- [2nd deployed link](#open-brief-proposal)
- [Open Brief Proposal](#https://docs.google.com/document/d/16o_eS07VHDec6fv7lfoIV01yaAwjUCk_HsKyzW5Sex4/edit?usp=sharing)
- [Demonstration Video](https://drive.google.com/drive/folders/1B24YX5O7FDFCRvzQCZyzTL4M1kra34Yr?usp=sharing)
- [Milestone Check Document](https://docs.google.com/document/d/12JlTmOh-4in_n_fYWj604rlMmup_pLxJphQPmto9dkE/edit?usp=sharing)

## Project Overview

DotSkin is an e-commerce platform dedicated to showcasing and selling South African-made beauty and cosmetic products. By supporting local brands, DotSkin offers consumers high-quality, homegrown alternatives to imported products, ensuring a smooth shopping experience with reliable delivery through CourierGuy.

## Project Type

**Waterfall**  
DotSkin follows the Waterfall project management methodology, progressing through distinct phases with clear milestones and deliverables.

## Tech Stack

- **Frontend:** React.js, Next.js
- **Backend:** Express.js
- **Database:** PostgreSQL, Prisma ORM
- **Storage:** Cloudinary CDN
- **Authentication:** NextAuth.js, OAuth (Google)
- **Other Tools:** React Swiper

## Codebase

The DotSkin repository is organized with a clear separation between frontend and backend code, utilizing modern frameworks and best practices for scalability and maintainability.

- **Frontend:** Built with Next.js for server-side rendering and improved SEO.
- **Backend:** Powered by Express.js, handling API requests and business logic.
- **State Management:** Managed using React hooks and Context API.

## Database

DotSkin uses PostgreSQL for relational data management, interfaced through Prisma ORM for efficient and type-safe database interactions. The database schema includes models for Users, Products, Categories, Orders, Reviews, and Addresses.

## Website Guide

### Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/dotskin.git
   cd dotskin
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the necessary environment variables as specified in the [Environment Setup](#environment-setup) section.

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) to view the app.

### Features

- **User Authentication:** Sign in with Google or email/password.
- **Product Browsing:** Explore a wide range of South African beauty products.
- **Shopping Cart:** Add, update, and manage items in your cart.
- **Admin Panel:** Manage products, categories, and users.
- **Responsive Design:** Optimized for mobile, tablet, and desktop devices.

## Open Brief Proposal

### DOT SKIN PROPOSAL

**BY RUAN KLOPPER - 231280**

#### Overview

DotSkin is an e-commerce platform designed to showcase and sell South African-made beauty and cosmetic products. With a focus on supporting local brands, DotSkin provides consumers with high-quality, homegrown alternatives to imported products. The platform offers a smooth shopping experience with a robust delivery system integrated with CourierGuy. This solution aims to boost local businesses, provide reliable delivery services, and optimize the platform for search engines to ensure visibility and growth.

#### Problem Statement

The South African beauty and cosmetics market is saturated with imported products, particularly from countries like China, leaving little room for local products to thrive. This reliance on imports limits the availability of homegrown options for consumers, as well as market opportunities for South African beauty brands. The lack of platforms exclusively dedicated to South African-made beauty products also hampers the growth of local manufacturers and brands.

#### Solution

DotSkin addresses this problem by creating an e-commerce platform dedicated to promoting and selling only South African-made beauty and cosmetic products. The platform will ensure a seamless user experience, featuring integrated delivery via CourierGuy for efficient, local shipping. Additionally, DotSkin will implement strong SEO strategies to improve visibility, ensuring South African products can compete more effectively with imported goods. This platform will empower local brands and provide consumers with a reliable and enjoyable online shopping experience.

#### Phase 1: Semester Project (MVP)

The initial phase of the project will focus on building the core e-commerce platform and simulating key features, such as payments and delivery, using CourierGuy's API structure to streamline future implementation. This phase will exclude live payment and delivery integrations but will showcase the functional flow of the system.

**Key Deliverables:**

- **E-commerce Website:** A fully functional online platform where users can browse and purchase products.
- **Admin Panel:** Full control over products through a backend panel.
- **PostgreSQL Database:** A secure and scalable relational database for storing product catalogs, orders, and customer data.
- **Simulated Payment Process:** Demonstration of how payments will be processed using services like Ozow.

**Tech Stack for Semester:**

- Next.js (Server-Side Rendering - SSR): For improved SEO and faster loading times.
- Material UI: Responsive, modern design framework for the front end.
- Express.js: Backend framework for API development and data handling.
- PostgreSQL: Relational database for managing user accounts, products, and orders.

---

## Installation & Setup

### Environment Setup

Create a `.env` file in the root directory and add the following keys with your respective credentials:

```env
# Database Configuration
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=your_api_key_here"
PULSE_API_KEY="your_pulse_api_key_here"

# Cloudinary Configuration
CLOUDINARY_CLOUDNAME="your_cloudinary_cloudname"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_SECRET="your_cloudinary_secret"

# Development URLs
NEXT_PUBLIC_SITE_URL="https://your-site.herokuapp.com/"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth Credentials
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# NextAuth Secret
NEXTAUTH_SECRET="your_nextauth_secret"
```

## Installation Guide

## Install Dependencies

Run the following command to install all necessary packages:

```bash
npm install
```

Set Up Prisma ORM
Initialize Prisma with your PostgreSQL database and run migrations to set up the database schema:

```bash
npx prisma migrate dev
```

Configure Cloudinary
Ensure your Cloudinary credentials are correctly set in the .env file.

Google API Setup
Ensure your Google OAuth credentials (GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET) are correctly set and that the OAuth consent screen is properly configured in the Google Cloud Console.

Start the Development Server
Run the following command to start the app in development mode:

```bash
npm run dev
```

Visit http://localhost:3000 to see the app in action.

Deployment
Prepare for Deployment
Ensure all environment variables are set correctly in your hosting platform (e.g., Heroku, Vercel). Verify that NEXT_PUBLIC_SITE_URL and NEXTAUTH_URL point to your production URLs.

Deploy to Hosting Provider
Heroku Example
Commit your changes to Git:

```bash
git add .
git commit -m "Prepare for deployment"
git push heroku main
```

Ensure all environment variables are added in Heroku's dashboard.

Vercel Example
Connect your Git repository to Vercel.
Set up environment variables in the Vercel dashboard.
Deploy directly through the Vercel interface.
Run Migrations in Production
After deployment, apply Prisma migrations to your production database:

```bash
npx prisma migrate deploy
```

## Verify Deployment

Visit your production URL (e.g., https://your-site.herokuapp.com/) to ensure the app is running smoothly. Test all major functionalities like user authentication, product browsing, and CRUD operations.

## Conclusion

With all key features implemented and most functionalities completed, DotSkin is poised to revolutionize the South African beauty market by empowering local brands and providing consumers with a superior shopping experience. The robust architecture, combined with seamless integration of essential services like Prisma and Cloudinary, ensures scalability and reliability for future growth.
