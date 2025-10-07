**Project to Quote (P2Q) - Laravel Test Project Documentation**

---

# Project Overview

**Project Name:** Project to Quote (P2Q) - Laravel Test Project

**Description:**
This Laravel-based test project is being developed to experiment with React components and Inertia.js integrations. The goal is to test and refine components before integrating them back into the main Laminas project for Centura.

# Technology Stack

* Laravel Framework
* Inertia.js
* React
* SQL Server (for testing purposes)
* Hosted on IIS (Windows Server, internal)

# Features

* React component testing
* Inertia.js integration for frontend
* Mimics Laminas MVC workflows for opportunities, projects, and quotes
* Backend and database structure compatible with the Laminas project for easy migration

# Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd <project_folder>
   ```

2. Install PHP dependencies:

   ```bash
   composer install
   ```

3. Install Node.js dependencies:

   ```bash
   npm install
   ```

4. Configure the environment:

   * Copy `.env.example` to `.env`
   * Set up database credentials and other environment variables
   * Note: Database is for testing only and cannot access the production Centura database

5. Run migrations and seeders (optional for testing):

   ```bash
   php artisan migrate --seed
   ```

6. Start the development server:

   ```bash
   php artisan serve
   ```

# Project Status

* Development in progress
* Focused on React/Inertia component testing
* Backend setup compatible with the Laminas project

# Contribution Guidelines

* Internal Centura project only
* Test React components thoroughly before migration
* Maintain consistency with Laminas project workflows

# License

* Internal use only (Centura)

# Notes

* This project is for testing purposes and is not yet production-ready.
* Components validated here will be integrated back into the main Laminas project for Centura.
