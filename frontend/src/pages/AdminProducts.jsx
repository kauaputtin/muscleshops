import { useState, useEffect } from 'react';
import api from '../services/api';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', shortDescription: '', price: '', category: '', variations: '', featured: false });
  const [editing, setEditing] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await api.get('/products');
    setProducts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));
    if (image) formData.append('image', image);

    if (editing) {
      await api.put(`/products/${editing}`, formData);
    } else {
      await api.post('/products', formData);
    }
    fetchProducts();
    setForm({ name: '', description: '', shortDescription: '', price: '', category: '', variations: '', featured: false });
    setEditing(null);
    setImage(null);
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      shortDescription: product.shortDescription,
      price: product.price,
      category: product.category?._id || '',
      variations: product.variations?.join(',') || '',
      featured: product.featured
    });
    setEditing(product._id);
  };

  const handleDelete = async (id) => {
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Gerenciar Produtos</h1>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input type="text" placeholder="Nome" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full p-2 border rounded" required />
        <textarea placeholder="Descrição" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Descrição curta" value={form.shortDescription} onChange={(e) => setForm({...form, shortDescription: e.target.value})} className="w-full p-2 border rounded" />
        <input type="number" placeholder="Preço" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Categoria ID" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="w-full p-2 border rounded" />
        <input type="text" placeholder="Variações (separadas por vírgula)" value={form.variations} onChange={(e) => setForm({...form, variations: e.target.value})} className="w-full p-2 border rounded" />
        <label className="flex items-center">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({...form, featured: e.target.checked})} />
          <span className="ml-2">Destaque</span>
        </label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editing ? 'Atualizar' : 'Criar'} Produto
        </button>
      </form>
      <div className="space-y-4">
        {products.map(product => (
          <div key={product._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p>R$ {product.price}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white px-3 py-1 rounded">Editar</button>
              <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-3 py-1 rounded">Deletar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;