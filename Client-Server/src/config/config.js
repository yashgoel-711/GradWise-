// Set VITE_API_URL (e.g. http://localhost:3000) in Client-Server/.env.local to use a local backend
const BackendURL = import.meta.env.VITE_API_URL || "https://gradwise.onrender.com"
export{ BackendURL}
