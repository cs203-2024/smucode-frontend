# SMUCode Frontend

SMUCode is a web application for managing coding tournaments and competitions. This repository contains the frontend code built with Next.js.

## Features

- User authentication (login/signup)
- Dashboard for users and administrators
- Tournament creation and management
- Tournament brackets and participant management
- User profiles

## Tech Stack

- Next.js 13+ (React framework)
- TypeScript
- Tailwind CSS for styling
- Axios for API requests
- Context API for state management

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/smucode-frontend.git
   cd smucode-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   NEXT_PUBLIC_API_BASE_URL=your_api_base_url_here
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/app`: Next.js 13+ app directory
- `/components`: Reusable React components
- `/context`: React Context providers
- `/hooks`: Custom React hooks
- `/lib`: Utility functions
- `/public`: Static files
- `/services`: API service functions

## Docker

A Dockerfile is included for containerization. To build and run the Docker image:

```
docker build -t smucode-frontend .
docker run -p 3000:3000 smucode-frontend
```