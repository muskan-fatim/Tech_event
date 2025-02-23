# One-Page Next.js Website with CSV Data Handling

## Overview
This is a single-page web application built with **Next.js**, where all the logic depends on API calls. The application retrieves data from a **CSV file**, displays events, and allows users to add new events to the same CSV file.

## Features
- **API-Based Data Fetching**: Uses an API to retrieve and update event data.
- **CSV Data Management**: Reads and writes data from/to a CSV file.
- **Client-Side Filtering**: Allows searching events by event name.
- **Real-Time Updates**: Newly added events reflect instantly without a full-page refresh.
- **Optimized Performance**: Uses efficient state management and caching.

## Technologies Used
- **Next.js** (React Framework)
- **Tailwind CSS** (for styling)
- **Papaparse** (for CSV parsing)
- **File System (fs module)** (for reading/writing CSV files in a Node.js environment)

## Installation
### Prerequisites
- Node.js (>= 16.x)
- npm or yarn

### Steps to Run the Project
1. **Clone the repository**
   ```bash
   git clone  https://github.com/muskan-fatim/Tech_event.git
   
   cd your-repo
   ```
2. **Install dependencies**
   ```bash
   npm install  # or yarn install
   ```
3. **Run the development server**
   ```bash
   npm run dev  # or yarn dev
   ```
4. Open your browser and visit `http://localhost:3000`


