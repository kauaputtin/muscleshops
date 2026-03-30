import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard Administrativo</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/admin/products" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Produtos</h2>
          <p>Gerenciar produtos da loja</p>
        </Link>
        <Link to="/admin/categories" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Categorias</h2>
          <p>Gerenciar categorias</p>
        </Link>
        <Link to="/admin/config" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Configurações</h2>
          <p>Personalizar a loja</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;