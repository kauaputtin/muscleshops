import { useState, useEffect } from 'react';
import api from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories')
        ]);
        setStats({
          products: productsRes.data.length,
          categories: categoriesRes.data.length,
          orders: 0 // Por enquanto, sem pedidos salvos
        });
      } catch (err) {
        console.error('Erro ao buscar estatísticas:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Produtos</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.products}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Categorias</h3>
          <p className="text-3xl font-bold text-green-600">{stats.categories}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Pedidos</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.orders}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Bem-vindo ao MuscleShops Admin</h2>
        <p className="text-gray-600">
          Use o menu lateral para gerenciar produtos, categorias e configurações da loja.
          Todas as alterações serão refletidas automaticamente no catálogo público.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;