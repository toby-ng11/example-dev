**Project to Quote (P2Q) - Laminas Project Documentation**

---

# Project Overview

**Project Name:** Project to Quote (P2Q)

**Description:**
P2Q is an internal tool designed for architect representatives to manage opportunity records. Opportunities can be converted to projects once awarded to a contractor. Additionally, the system allows conversion to quotes and enables reps to submit quotes for manager approval.

# Technology Stack

* Laminas MVC
* Laminas\Db
* Inertia.js
* React
* SQL Server
* Hosted on IIS (Windows Server)

# Features

* Manage opportunities and projects
* Convert opportunities to projects
* Convert projects to quotes
* Quote submission and manager approval workflow
* Partial migration of controllers to Inertia.js/React for modernized frontend

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

3. Install Node.js dependencies (for Inertia.js/React parts):

   ```bash
   npm install
   ```

4. Configure the project:

   * Edit `config/autoload/global.php` or `config/autoload/local.php` to set up database connection and other environment variables.
   * Note: Database access is restricted as this project is for internal use by Centura.

5. Host the application on the company IIS server.

# Project Status

* Core Laminas MVC functionality fully implemented
* Gradual migration of controllers to Inertia.js/React
* Database models and Laminas\Db fully functional

# Contribution Guidelines

* This is a company internal project. Contributions are restricted to Centura developers.
* Follow Laminas MVC best practices when adding new controllers or modules.
* Use Inertia.js/React for frontend components wherever possible.

# License

* Internal use only (Centura)

# Notes

* Ensure that any frontend migration does not disrupt the existing Laminas MVC routes.
* The project is hosted on a Windows IIS server, so deployment scripts should be compatible with this environment.
