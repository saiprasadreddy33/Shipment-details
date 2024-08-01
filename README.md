# Shipment Management System

## Overview

The Shipment Management System is a web application designed for managing shipments efficiently. Built using Next.js 14, Supabase, and Tailwind CSS, this application provides a user-friendly interface for handling various aspects of shipment management, including shipment creation, viewing, and detailed tracking.

## Features

### 1. **Authentication**
- **Email Signup/Login:** Users can sign up and log in using their email address.
- **Magic Link:** Secure login using a one-time PIN sent to the user's email.
- **Profile Management:** Users can view and update their profile information, including their email and profile picture.

### 2. **Dashboard**
- **Sidebar Navigation:** A collapsible sidebar that provides easy navigation through the application.
  - **Shipments:** View a list of shipments with tracking numbers.
  - **Profile:** Access profile settings and log out.

### 3. **Shipment Management**
- **Create New Shipment:** Users can add new shipments with details such as tracking number, customer name, and invoice number.
- **Shipment List:** View a list of all shipments with filtering options.
- **Shipment Details:** Click on a shipment to view detailed information including tracking history and status.

### 4. **User Interface**
- **Responsive Design:** The application is fully responsive and provides an optimal viewing experience on various devices.
- **Dynamic Sidebar:** Sidebar dynamically adjusts to show or hide additional details based on user interactions.
- **Styled Components:** Modern UI components styled with Tailwind CSS for a clean and professional appearance.
- **Loading Spinner:** A spinner is displayed while fetching data from the API to enhance user experience.

### 5. **Data Handling**
- **Real-Time Updates:** The application automatically fetches and displays data changes without requiring a page reload.
- **Data Filtering:** Advanced filtering options in the shipment table to easily search and sort shipments.

## Setup and Installation

### Prerequisites

- **Node.js:** Ensure you have Node.js installed (version 18.15.0 or higher).
- **Supabase Account:** Create an account on Supabase and set up a project.
### Usage
- **Sign Up/Log In:** Use the provided email signup/login functionality to access the application.
- **Navigate:** Use the sidebar to navigate through different sections of the app.
- **Manage Shipments:** Create new shipments, view the list, and access detailed information.
```
*Create a .env.local file in the root directory of the project and add the following variables:*


NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```
