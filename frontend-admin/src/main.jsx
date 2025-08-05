import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

export default function App() {
  return (
    <div>
      <h1>App React</h1>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
