# Knowledge Management System (KMS)

This website was designed and developed to organize the various programs offered by UP NISMED. As of July, a group of interns successfully implemented the Professional Development (Trainings) section of the platform. The project was built using [SvelteKit](https://kit.svelte.dev/) for the frontend, [Prisma](https://www.prisma.io/) for database management.

---


## Table of Contents

- [Project Structure Overview](#project-structure-overview)

- [For Users](#for-users)
  - [Host Server Installation](#host-server-installation)
  - [Regular User Accessing](#regular-user-accessing)

- [For Developers](#for-developers)
  - [1. Local Development Setup](#1-local-development-setup)
  - [2. Environment Setup (MySQL)](#2-environment-setup-mysql)
  - [3. Database (Prisma)](#3-database-prisma)
  - [4. Initial Database Content](#4-initial-database-content)
  - [5. Project Scripts](#5-project-scripts)

- [Code Formatting](#code-formatting)
- [System Documentation](#system-documentation)
- [Contact the Developers](#contact-the-developers)


---


## Project Structure Overview


```
.
├── prisma/                             # Prisma schema and migrations for database
│   └── schema.prisma
├── src/
│   ├── lib/                            # Shared utilities (functions, stores, components)
│   ├── routes/                         # Route handlers (API + frontend pages)
│   │   ├── api/                        # API endpoints
│   │   ├── auth/                       # Authentication pages
│   │   ├── manage/                     # Superuser and role management routes
│   │   ├── professional-development/   # Training module interfaces
│   │   ├── +layout.svelte              # Root layout
│   │   ├── +page.svelte                # Root homepage
│   │   └── +error.svelte               # Custom error UI
│   ├── app.css                         # Global styles
│   ├── app.html                        # HTML entry point
│   └── hooks.server.ts                 # Hook logic (auth/session handling)
├── static/                             # Public static assets (e.g. logos, files, images)
├── e2e/                                # Playwright end-to-end tests
├── .env                                # Environment variables (DB URL, secrets)
├── package.json                        # Project config and scripts
└── README.md
```

---

## For Users

### Host Server Installation

#### 1. Local Development Setup

Clone the project:

```bash
git clone https://github.com/gbpursuit/KMS.git
cd KMS
```

Install dependencies:

```bash
npm install
```

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

> This will show:
> - Local Access: [http://localhost:5173](http://localhost:5173)
> - Network Access (e.g., [http://192.168.x.x:4173](http://192.168.x.x:4173)) for testing on other devices

Modules to Explore:
- `/manage`: Superuser interface for uploading and organizing modules
- `/professional-development`: View and download training materials
- `/auth`: Login/logout (if authentication is enabled)

### Regular User Accessing

Access the URL provided by the host server (e.g., [http://192.168.x.x:4173](http://192.168.x.x:4173))

> **Note:** The user must be connected to the same Wi-Fi network as the host server.

### Optional: Custom Domain Mapping (Windows Only)

To preview the site using a custom domain (e.g., `kms.local`):

- Open `C:\Windows\System32\drivers\etc\hosts` in Notepad as Administrator
- Add the following line:

```
192.168.x.x   kms.local
```

Visit: [http://kms.local:4173](http://kms.local:4173)

---

## For Developers

### 1. Local Development Setup

Clone the project:

```bash
git clone https://github.com/gbpursuit/KMS.git
cd KMS
```

Install dependencies:

```bash
npm install
```

Build the project:

```bash
npm run build
```

Preview the build:

```bash
npm run preview
```

> **This will show**:
> - Local Access [http://localhost:5173](http://localhost:5173)
> - Network Access (e.g., [http://192.168.x.x:4173](http://192.168.x.x:4173)) to test on other devices connected to the same Wi-Fi

---

### 2. Environment Setup (MySQL)

To configure the environment and connect to the database, follow these steps:

#### Step 1: Install MySQL

If MySQL is not yet installed on your machine, download and install it from the official site:

[Download MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

#### Step 2: Create a `.env` File

At the root of the project directory, create a `.env` file and add the following:

```env
DATABASE_URL="mysql://user:password@localhost:3306/kms"
```

> **Note:**  
> - Replace `user` and `password` with your MySQL credentials.  
> - Ensure `3306` matches the port your MySQL server is running on.  

#### Step 3: Verify MySQL is Running

Ensure your MySQL server is running and the `kms` database exists. Create it with:

```sql
CREATE DATABASE kms;
```

---

### 3. Database (Prisma)

Run Prisma migrations:

```bash
npx prisma migrate dev     # Run and apply migrations
```

> Prisma schema is located at `/prisma/schema.prisma`.

---

### 4. Initial Database Content

Navigate to the seeding script directory:

```bash
cd path/to/functions
npx tsx index.ts
```

> This seeds the database with initial content.

---

### 5. Project Scripts

| Command              | Description                                |
|----------------------|--------------------------------------------|
| `npm run dev`        | Start dev server                           |
| `npm run build`      | Build for production                       |
| `npm run preview`    | Preview the production build locally       |
| `npx prisma ...`     | Run Prisma DB tools                        |

---

## Code Formatting

### General Rules

- Follow the component structure in `/lib/svelte` for reusable elements.
- Pages follow SvelteKit’s file-based routing.
- Use accessible forms and modal practices.
- TailwindCSS is used for styling (see `app.css` for base styles).

### Component Structure

- Place all reusable components in `/src/lib/svelte/`.
- Place static assets like PDFs and logos in `/static/`.

---

## System Documentation

The shared drive contains helpful files for ongoing development:

- [Use Testing Guide](https://docs.google.com/document/d/1VloF-rOJdO7rOtoSL0kSPsUfCJsUgHuEo5Py41jiqpw/edit?usp=sharing)
- [Hosting Recommendations](https://docs.google.com/document/d/1N7fU2h90BoAdvVCj2UImusdpQUR7XyVJNUeuquwUC68/edit?usp=sharing)
- [System Database](https://docs.google.com/document/d/1o9Lm8PC0MO2EzU67zN0sGB9MdoIXEIePkpDzDZWEPXE/edit?usp=sharing)
- [Future Developments Recommendations](https://docs.google.com/document/d/1tXkw-koFvxvg6SrjHSzPCQbnXtDYNp6tqNFYVDv4Tn0/edit?usp=sharing)

---

## Contact the Developers

- [Lorraine Gwen Castrillon](mailto:lmcastrillon@up.edu.ph) : [Facebook](https://www.facebook.com/lorrainegwen.castrillon/)  
- [Gavril Benedict Coronel](mailto:glcoronel@up.edu.ph) : [Facebook](https://www.facebook.com/gavrilcoronel)  
- [Jacky John Abucay](mailto:jdabucay@up.edu.ph) : [Facebook](https://www.facebook.com/jacky.johnD)
<!-- # sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment. -->
