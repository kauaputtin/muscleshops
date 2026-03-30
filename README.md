# MuscleShops - Sistema de Catálogo Digital

Um sistema web completo de catálogo digital com arquitetura separada para catálogo público e dashboard administrativo.

## Arquitetura

### 🏗️ Estrutura do Sistema
```
/workspaces/muscleshops
├── backend/          # API central (porta 5000)
│   ├── controllers/  # Lógica de negócio
│   ├── models/       # Schemas MongoDB
│   ├── routes/       # Endpoints da API
│   └── uploads/      # Arquivos enviados
├── frontend/         # Catálogo público (porta 5173)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── context/
└── admin/           # Dashboard admin (porta 5174)
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── context/
```

### 🔄 Funcionamento
- **Backend**: API única que serve ambos os frontends
- **Frontend**: Catálogo público que consome configurações dinâmicas
- **Admin**: Dashboard administrativo para gerenciar tudo
- **Alterações**: Tudo que muda no admin reflete automaticamente no catálogo

## Funcionalidades

### 🌐 Catálogo Público
- ✅ Listagem dinâmica de produtos
- ✅ Filtros por categoria e busca
- ✅ Detalhes do produto com variações
- ✅ Carrinho persistente (localStorage)
- ✅ Cores e branding dinâmicos
- ✅ WhatsApp integrado

### 🛠️ Dashboard Admin
- ✅ Autenticação JWT
- ✅ CRUD completo de produtos
- ✅ Gerenciamento de categorias
- ✅ Configuração visual da loja
- ✅ Upload de logo e banner
- ✅ Configuração do WhatsApp

### 🔧 API Backend
- ✅ Produtos (GET, POST, PUT, DELETE)
- ✅ Categorias (GET, POST, PUT, DELETE)
- ✅ Configurações (GET, PUT)
- ✅ Autenticação (login)
- ✅ Upload de imagens

## Instalação e Inicialização

### Opção 1: Script Automático (Recomendado)
```bash
chmod +x start.sh
./start.sh
```

### Opção 2: Passo a Passo Manual

#### 1. Instalar MongoDB
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install mongodb
sudo systemctl start mongod
```

#### 2. Backend
```bash
cd backend
npm install
npm run init  # Cria usuário admin
npm run dev   # Porta 5000
```

#### 3. Catálogo (Frontend)
```bash
cd frontend
npm install
npm run dev   # Porta 5173
```

#### 4. Admin (Dashboard)
```bash
cd admin
npm install
npm run dev   # Porta 5174
```

## Acesso

- **📱 Catálogo Público**: http://localhost:5173
- **🛠️ Dashboard Admin**: http://localhost:5174

## Configurações Dinâmicas

O catálogo carrega automaticamente:
- Nome da loja
- Descrição
- Cores primária/secundária
- Logo e banner
- Número do WhatsApp
- Mensagem padrão

## Tecnologias

- **Backend**: Node.js + Express + MongoDB + JWT
- **Frontend**: React + Vite + Tailwind CSS
- **Admin**: React + Vite + Tailwind CSS
- **Comunicação**: REST API com Axios

## Desenvolvimento

### Adicionando Novos Recursos
1. Modifique a API no `backend/`
2. Atualize o admin em `admin/src/`
3. O catálogo em `frontend/src/` refletirá automaticamente

### Personalização
- Cores e branding via dashboard
- Logo e banner via upload
- Configurações salvas no banco de dados

## Resolução de Problemas

### MongoDB não conecta
```bash
sudo systemctl status mongod
sudo systemctl start mongod
```

### Portas ocupadas
- Backend: alterar PORT no `.env`
- Frontend: alterar port no `vite.config.js`
- Admin: alterar port no `vite.config.js`

### Dependências
```bash
# Em cada pasta
rm -rf node_modules package-lock.json
npm install
```

## Estrutura do Projeto

```
/workspaces/muscleshops
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── uploads/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── context/
└── README.md
```

## Uso

1. Inicie o backend e frontend
2. Acesse http://localhost:5173 para o catálogo
3. Para admin, acesse /admin e faça login com admin/admin123
4. Configure produtos, categorias e personalização

## Licença

Este projeto é para fins educacionais.