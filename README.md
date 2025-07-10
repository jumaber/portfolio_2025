# Portfolio

A professional portfolio site built with **React** (Vite), **Tailwind CSS**, and a **MongoDB-powered** backend. It features both static pages (Home, Impressum) and dynamic content (projects, custom pages), managed via a visual dashboard with drag-and-drop blocks.

---

## Overview

This repository contains:

- **Client**: A Vite-powered React app using Tailwind CSS for styling, React Router for navigation, Firebase Auth for admin login, DnD-Kit for drag-and-drop, Editor.js for rich-text blocks, and Cloudinary for image uploads.  
- **Server**: A Node.js/Express API connected to MongoDB, exposing REST endpoints to manage pages and projects.

The admin **Dashboard** lets you visually assemble pages and projects from reorderable “blocks” (Intro, Hero, Card Info, Process, Wireframes, Custom HTML, etc.), then publishes them to the public site.

---

## Tech Stack

- **Frontend**
  - [React](https://reactjs.org/) (with Vite)  
  - [Tailwind CSS](https://tailwindcss.com/)  
  - [React Router v6](https://reactrouter.com/)  
  - [Firebase Authentication](https://firebase.google.com/docs/auth)  
  - [@dnd-kit](https://github.com/clauderic/dnd-kit) (drag & drop)  
  - [Editor.js](https://editorjs.io/) (rich text blocks)  
  - [Cloudinary](https://cloudinary.com/) (image hosting)  

- **Backend**
  - [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)  
  - [MongoDB](https://www.mongodb.com/) (via Mongoose)  
  - [dotenv](https://github.com/motdotla/dotenv) for config  
  - CORS, body-parser, and standard middleware  

---

## Features

- **Public Site**
  - Static pages: Home, Impressum (Legal)  
  - Dynamic pages: any slug under `/api/pages/:slug`  
  - Project detail pages under `/projects/:slug`  
  - Scroll-spy navigation for deep links  
  
- **Admin Dashboard**
  - Email/password login (only the site owner)  
  - List, create, edit, delete pages & projects  
  - Drag-and-drop reorder of projects on dashboard  
  - Block-based editor with live preview  
  - Custom HTML injection for advanced layouts  
