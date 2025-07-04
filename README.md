# TANSA

Welcome to the Tansa repository! 🚀

Follow the steps below to get up and running quickly!

## Tech Stack

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js**: [Download here](https://nodejs.org/en/download)
- **pnpm**: [Installation guide](https://pnpm.io/installation)

> **Tip:** Install `pnpm` using `npm` with the following command:
>
> ```sh
> npm install -g pnpm@latest-10
> ```

- **Git**: Ensure you have Git installed to manage version control.

### Installing Git

To check if Git is installed, run:

```bash
git --version
```

If Git is not installed, follow these steps:

1. **Download Git** from [git-scm.com](https://git-scm.com/downloads)
2. **Install Git** following the setup instructions for your OS
3. **Verify the installation** by running:
   ```bash
   git --version
   ```

### Clone the Repository

Run the following command in your terminal at your desired directory:

```bash
git clone https://github.com/UoaWDCC/tansa.git
```

### Install Dependencies

Navigate to the project root and install the required dependencies:

```bash
pnpm install
```

### Setup Environment Variables

Create a `.env` file in the root directory and configure the following settings:

```
# Database Configuration
DATABASE_URI=
PAYLOAD_SECRET=

# AWS S3 Storage
S3_BUCKET=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_REGION=
```

### Start the Project

To launch the development environment, run:

```bash
pnpm dev
```

Once the server is running, the application will be available at:

- **Frontend**: `http://localhost:3000`
- **Admin Page**: `http://localhost:3000/admin`

## Branching Strategy & Git Commit Standards

### Creating a New Branch

Before starting any new work, create a new branch using the following convention:

```bash
git checkout main  # Switch to the main branch
git status # checking if your up to date
git checkout -b feature/your-feature-name # checkout and create a new branch called your feature
```

### Writing Commit Messages

Follow this format for commit messages:

```
[type]: [Short description]

[Optional: Additional details about the change]
```

#### Examples:

- `feat: add user authentication`
- `fix: resolve crash on login page`
- `docs: update README with setup instructions`
- `refactor: optimize database query`

### Pushing and Merging

Once your changes are complete, push your branch and create a pull request:

```bash
git add .
git commit -m "feat: implement new dashboard UI"
git push origin feature/your-feature-name
```

After creating a pull request, request a review before merging.

Enjoy coding with Tansa! 💻✨

# Contributors ✨

Thank you to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<table>
   <tbody>
      <tr>
         <td align="center" valign="top" width="16.66%"><a href="https://github.com/Kot6603"><img src="https://avatars.githubusercontent.com/u/89110272?v=4?s=100" width="100px;" alt="Koutaro Yumiba"/><br /><sub><b>Koutaro Yumiba</b></sub></a><br /><a href="https://github.com/UoaWDCC/VPS/commits?author=Kot6603" title="Code">💻</a></td>
      </tr>
   </tbody>
</table>

