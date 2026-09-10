import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
//intercepta el puerto 5173 y lo manda al 3001 (proxy)
 server:{
    proxy:{
      "/api":{
        target:"http://localhost:3001",
        changeOrigin:true
      }
    }
  }
})
 