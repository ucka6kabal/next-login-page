# Next.js Login App

This is a **Next.js 14 application** that provides a login and forgot password flow.  
It validates user credentials against a local JSON file, displays success/error screens, supports **English and Bulgarian translations**, and manages global state with **Redux Toolkit**.

---

## Features

- **Login Page**
  - Email + Password form
  - Validates credentials against `data/users.json`
  - Shows success screen on valid login
  - Shows inline error on invalid login
  - "Forgot Password" link

- **Forgot Password Page**
  - Email input form
  - Validates email format
  - Simulates reset link sending
  - Success screen after valid request

- **Internationalization**
  - English and Bulgarian translations
  - Language switcher

- **State Management**
  - Global state with Redux Toolkit
  - Manages login state, errors, and success screens

- **Styling**
  - Component-based styles with CSS modules
  - Simple, modern form UI

---

## Getting Started

### 1. Install dependencies

```bash
npm install

2. Run the development server
npm run dev

Deployment
Build for production:

npm run build
npm start
