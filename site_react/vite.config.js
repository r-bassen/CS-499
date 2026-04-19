// Reference: https://reactrouter.com/how-to/react-server-components
// https://www.npmjs.com/package/react-pdf
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// React RC
export default defineConfig({
    plugins: [react()],
    resolve: {
        extensions: ['.jsx', '.js', '.mjs', '.ts', '.tsx']
    },
    server: {
        proxy: {
            //point to Express backend server
            '/routes': {
                target: 'http://localhost:8080',  
                changeOrigin: true,
            }
        }
    }
})

