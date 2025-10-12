# 🍽️ WaiterApp

Sistema completo de gerenciamento de restaurante com aplicativo mobile para garçons, painel web para administração e API backend.

## 📋 Sobre o Projeto

O **WaiterApp** é uma solução completa para restaurantes que permite gerenciar pedidos, produtos e categorias de forma fácil e descomplicada. O sistema é composto por três aplicações principais:

- **📱 Mobile App** - Aplicativo para garçons realizarem pedidos
- **💻 Web App** - Painel administrativo para gerenciar produtos e categorias
- **🔧 API Backend** - Servidor com banco de dados e comunicação em tempo real

## ✨ Funcionalidades

### 📱 Aplicativo Mobile (Garçom)
- Visualização de categorias e produtos
- Criação de pedidos por mesa
- Interface intuitiva e responsiva
- Comunicação em tempo real com a cozinha

### 💻 Painel Web (Administração)
- Gerenciamento de categorias de produtos
- Cadastro e edição de produtos com imagens
- Visualização de pedidos em tempo real
- Controle de status dos pedidos (Aguardando, Em Produção, Pronto)

### 🔧 API Backend
- RESTful API com Express.js
- Banco de dados MongoDB
- Upload de imagens com Multer
- WebSocket para comunicação em tempo real
- Docker para containerização

## 🛠️ Tecnologias Utilizadas

### Backend (API)
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **Socket.io** - Comunicação em tempo real
- **Multer** - Upload de arquivos
- **Docker** - Containerização

### Frontend Web
- **React** - Biblioteca JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Build tool e dev server
- **Styled Components** - CSS-in-JS
- **Axios** - Cliente HTTP
- **React Toastify** - Notificações

### Mobile
- **React Native** - Framework mobile
- **Expo** - Plataforma de desenvolvimento
- **TypeScript** - Tipagem estática
- **Styled Components** - Estilização
- **React Navigation** - Navegação
- **Expo Router** - Roteamento

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- Docker e Docker Compose
- Git

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd WAITERAPP
```

### 2. Execute o Backend (API)
```bash
cd api
docker-compose up -d
```

### 3. Execute o Frontend Web
```bash
cd web
npm install
npm run dev
```

### 4. Execute o App Mobile
```bash
cd mobile
npm install
npm start
```

## 📁 Estrutura do Projeto

```
WAITERAPP/
├── api/                    # Backend API
│   ├── src/
│   │   ├── models/         # Modelos do banco de dados
│   │   ├── routes.ts       # Rotas da API
│   │   └── server.ts       # Servidor principal
│   ├── uploads/            # Imagens enviadas
│   ├── Dockerfile
│   └── docker-compose.yml
├── web/                    # Frontend Web
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── styles/         # Estilos globais
│   │   └── utils/          # Utilitários
│   └── package.json
├── mobile/                 # App Mobile
│   ├── src/
│   │   └── app/           # Telas do app
│   └── package.json
└── README.md
```

## 🔌 Endpoints da API

### Categorias
- `GET /categories` - Listar categorias
- `POST /categories` - Criar categoria

### Produtos
- `GET /products` - Listar produtos
- `POST /products` - Criar produto
- `GET /categories/:categoryId/products` - Produtos por categoria

### Pedidos
- `GET /orders` - Listar pedidos
- `POST /orders` - Criar pedido
- `PATCH /orders/:orderId` - Atualizar status do pedido
- `DELETE /orders/:orderId` - Deletar pedido

## 🐳 Docker

O projeto utiliza Docker para facilitar o desenvolvimento e deploy:

```bash
# Subir os serviços
docker-compose up -d

# Parar os serviços
docker-compose down

# Ver logs
docker-compose logs -f
```

## 📱 Status dos Pedidos

- **WAITING** - Aguardando confirmação
- **IN_PRODUCTION** - Em produção na cozinha
- **DONE** - Pronto para entrega

## 🔄 Comunicação em Tempo Real

O sistema utiliza WebSocket (Socket.io) para comunicação em tempo real entre:
- Aplicativo mobile do garçom
- Painel web da administração
- Atualizações automáticas de pedidos

## 👨‍💻 Autor

**ErildoJS** - Desenvolvedor Full Stack

## 📄 Licença

Este projeto está sob a licença ISC.

---

Desenvolvido com ❤️ para facilitar o gerenciamento de restaurantes