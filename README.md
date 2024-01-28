# Angular Project: Assignment

## Repository for Angular Project

### Alessandro VARTANIAN and Gautier MARTIN

## Project Overview

This Angular project is an advanced application for managing assignments. It incorporates an authentication system, a user interface with a toolbar and navbar, and role-based access control. The application allows users to log in as either an administrator or a regular user, with distinct permissions and functionalities.

## Getting Started

Follow these steps to get started with the project:

### Prerequisites

- Node.js
- Angular CLI

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/alessandrov24/ProjetAngularMARTIN_VARTANIAN.git
   ```
2. Change to the project directory:
   ```sh
   cd ProjetAngularMARTIN_VARTANIAN
   ```
3. Install NPM packages:
   ```sh
   npm install
   ```

### Running the Application

Start the application locally:
```sh
ng serve
```
Visit `http://localhost:4200/`. The application will reload automatically if you change any source files.

## Hosting and Backend

- The frontend of this application is hosted at: [https://projetangular.onrender.com](https://projetangular.onrender.com)
- The backend API, providing the assignment data, is hosted at: [https://apiprojetangular.onrender.com](https://apiprojetangular.onrender.com)
- The repo of the API : [https://github.com/GautierM06/apiProjetAngularMARTIN_VARTANIAN.git](https://github.com/GautierM06/apiProjetAngularMARTIN_VARTANIAN.git)
- The backend interacts with a MongoDB database to retrieve a dataset of 1000 assignments.

## User Accounts

There are two user roles with different access levels:

- **Admin Account**
  - Username: `admin`
  - Password: `adminpass`
  - Can edit and delete assignments.

- **User Account**
  - Username: `user1`
  - Password: `pass1`
  - Can view assignment details.

## Features

- Secure authentication system.
- Role-based access control.
- Capability for viewing, editing, and deleting assignments based on user role.
- Integrated toolbar and navbar.
- Backend integration with MongoDB for managing a large dataset of assignments.