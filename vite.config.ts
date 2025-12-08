import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Notice the extra parentheses required here: (({ mode }) => ({ ... }))
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // You can now use 'mode' here if needed
}));
