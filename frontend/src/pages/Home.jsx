import { useState, useEffect } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import useConfig from '../hooks/useConfig';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');
  const { config } = useConfig();

  useEffect(() => {
    const fetchData = async () => {
      const [productsRes, categoriesRes] = await Promise.all([
        api.get('/products'),
        api.get('/categories')
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    (selectedCategory === '' || product.category?._id === selectedCategory)
  );

  return (
    <div>
      {/* Banner */}
      {config.banner && (
        <div className="mb-8">
          <img src={`/api/uploads/${config.banner}`} alt="Banner da loja" className="w-full h-64 object-cover rounded-lg shadow-md" />
        </div>
      )}

      {/* Descrição da loja */}
      {config.storeDescription && (
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4" style={{ color: config.primaryColor }}>
            {config.storeName}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{config.storeDescription}</p>
        </div>
      )}

      <div className="mb-8">
        <input 
          type="text" 
          placeholder="Buscar produtos..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
        />
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)} 
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Todas as categorias</option>
          {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;