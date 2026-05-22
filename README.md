# Quick Notes

A simple, fast, and responsive note-taking web app. Create, edit, and delete notes with a clean interface and dark mode support.

## Features

- Add, edit, and delete notes
- Notes are saved in your browser (localStorage)
- Responsive design for desktop and mobile
- Light and dark theme toggle

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with CSS variables and Grid/Flexbox

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/note-taking-react.git
   cd note-taking-app
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```

### Build for Production

```sh
npm run build
npm run preview  # Preview production build
```

## File Structure

### React Components

- [`main.jsx`](main.jsx) – React entry point
- [`App.jsx`](App.jsx) – Root app component
- [`NoteApp.jsx`](NoteApp.jsx) – Main note-taking component with all features
