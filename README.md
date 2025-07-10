# Knowledge Management System (KMS)

This website was designed and developed to organize the various programs offered by UP NISMED. As of July, a group of interns successfully implemented the Professional Development (Trainings) section of the platform. The project was built using [SvelteKit](https://kit.svelte.dev/) for the frontend, [Prisma](https://www.prisma.io/) for database management.

---

## Table of Contents
- [Project Structure Overview](#project-structure-overview)
- [For Users](#for-users)
  - [System Installation](#system-installation)
- [For Developers](#for-developers)
  - [1. Local Development Setup](#1-local-development-setup)
  - [2. Environment Setup (MySQL)](#2-environment-setup-mysql)
  - [3. Database (Prisma)](#3-database-prisma)
  - [4. Project Scripts](#4-project-scripts)
- [Code Formatting](#code-formatting)
- [System Documentation](#system-documentation)

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

### System Installation

> **Note:** The following setup is different from the local development connection. This is only intended for manually accessing the GitHub repository or codebase of the Knowledge Management System. Go to the following [Local Development Setup](#1-development-setup) section to follow the instructions for accessing the main local development environment.

1. **Install Dependencies**

   Open your `Windows Powershell` or `Command Prompt` and type in the following

   ```bash
   npm install
   ```

2. **Launch the App**

   Start the local server:

   ```bash
   npm run dev
   ```

   Visit: [http://localhost:5173](http://localhost:5173)

3. **Modules to Explore**
   - `/manage`: Superuser interface for uploading and organizing modules.
   - `/professional-development`: View and download training materials.
   - `/auth`: Login/logout (if authentication is enabled).

---

## For Developers

### 1. Local Development Setup

#### Clone the Project
```bash
git clone https://github.com/gbpursuit/KMS.git
cd KMS
```
#### Install Dependencies
```
npm install
```
#### Build the Project
```
npm run build
```
> Generates the `.svelte-kit` folder, which contains the client/server-optimized output
```
npm run preview
```
> **This will show**:
> - Local Access [http://localhost:5173](http://localhost:5173)
> - Network Access (e.g., [http://192.168.x.x:4173](http://192.168.x.x:4173)) to test on other devices connected to the same Wi-Fi

#### Optional: Custom Domain Mapping (Windows Only)
> To preview the site using a custom domain (e.g., `kms.local`):
> - Open `C:\Windows\System32\drivers\etc\hosts` in Notepad as Administrator
> - Add this line at the bottom:
```
192.168.x.x   kms.local
```
> Save and visit: [http://localhost:4173](http://localhost:4173)

---

### 2. Environment Setup (MySQL)

To configure the environment and connect to the database, follow these steps:

#### Step 1: Install MySQL

If MySQL is not yet installed on your machine, download and install it from the official site:

👉 [Download MySQL Community Server](https://dev.mysql.com/downloads/mysql/)

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

```bash
npx prisma migrate dev     # Run and apply migrations
npx prisma studio          # Opens Prisma visual database editor
```

Schema is located in `/prisma/schema.prisma`.

---

### 4. Project Scripts

| Command              | Description                                |
|----------------------|--------------------------------------------|
| `npm run dev`        | Start dev server                           |
| `npm run build`      | Build for production                       |
| `npm run preview`    | Preview the production build locally       |
| `npx prisma ...`     | Run Prisma DB tools                        |

---

## Code Formatting
#### General Rules
- Follow the component structure in `/lib/svelte` for reusable elements.
- Pages use SvelteKit routing (file-based).
- Forms and modals should follow accessible standards.
- Use TailwindCSS conventions (see `app.css` for base styles).
#### Component Structure
- All reusable components (e.g., modals, inputs, dropdowns) should be placed in `/src/lib/svelte/`.
- Static files (PDFs, logos) should go into `/static/`.

---

## System Documentation
The drive contains notes for future developers, which includes the files
- [Use Testing Guide](https://docs.google.com/document/d/1VloF-rOJdO7rOtoSL0kSPsUfCJsUgHuEo5Py41jiqpw/edit?usp=sharing)
- [Hosting Recommendations](https://docs.google.com/document/d/1N7fU2h90BoAdvVCj2UImusdpQUR7XyVJNUeuquwUC68/edit?usp=sharing)
- [System Database](https://docs.google.com/document/d/1o9Lm8PC0MO2EzU67zN0sGB9MdoIXEIePkpDzDZWEPXE/edit?usp=sharing)
- [Future Developments Recommendations](https://docs.google.com/document/d/1o9Lm8PC0MO2EzU67zN0sGB9MdoIXEIePkpDzDZWEPXE/edit?usp=sharing)

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
