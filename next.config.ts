import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No Next 16, a chave saiu de dentro de 'experimental' 
  // e foi para a raiz ou para o bloco 'dev' em algumas versões
  devIndicators: {
    appIsrStatus: false,
  },
  // Tente colocar diretamente na raiz do objeto:
  allowedDevOrigins: ['192.168.1.17', 'localhost:3000'],
};

export default nextConfig;