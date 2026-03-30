#!/bin/bash

echo "=== Iniciando MuscleShops ==="

# Verificar se MongoDB está rodando
if ! pgrep -x "mongod" > /dev/null; then
    echo "Iniciando MongoDB..."
    sudo systemctl start mongod 2>/dev/null || echo "MongoDB não pôde ser iniciado automaticamente. Inicie manualmente."
fi

# Função para verificar e instalar dependências
check_and_install() {
    local dir=$1
    local name=$2
    echo "Verificando dependências do $name..."
    cd "$dir"
    if [ ! -d "node_modules" ]; then
        echo "Instalando dependências do $name..."
        npm install
    else
        echo "Dependências do $name já instaladas."
    fi
}

# Backend
check_and_install "backend" "backend"

echo "Inicializando banco de dados..."
npm run init

echo "Iniciando backend..."
npm run dev &
BACKEND_PID=$!

# Frontend (catálogo)
check_and_install "../frontend" "catálogo"

echo "Iniciando catálogo..."
npm run dev &
FRONTEND_PID=$!

# Admin
check_and_install "../admin" "admin"

echo "Iniciando admin..."
npm run dev &
ADMIN_PID=$!

echo "=== Sistema iniciado ==="
echo "Backend PID: $BACKEND_PID"
echo "Catálogo PID: $FRONTEND_PID"
echo "Admin PID: $ADMIN_PID"
echo ""
echo "📱 Catálogo (público): http://localhost:5173"
echo "🛠️  Admin: http://localhost:5174"
echo ""
echo "Para parar todos os serviços: kill $BACKEND_PID $FRONTEND_PID $ADMIN_PID"

# Aguardar todos os processos
wait $BACKEND_PID $FRONTEND_PID $ADMIN_PID

# Aguardar
wait $BACKEND_PID $FRONTEND_PID $ADMIN_PID