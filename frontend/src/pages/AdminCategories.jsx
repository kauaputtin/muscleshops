import { useState, useEffect } from 'react';
import api from '../services/api';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', parent: '' });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await api.get('/categories');
    setCategories(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await api.put(`/categories/${editing}`, form);
    } else {
      await api.post('/categories', form);
    }
    fetchCategories();
    setForm({ name: '', parent: '' });
    setEditing(null);
  };

  const handleEdit = (category) => {
    setForm({ name: category.name, parent: category.parent || '' });
    setEditing(category._id);
  };

  const handleDelete = async (id) => {
    await api.delete(`/categories/${id}`);
    fetchCategories();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Gerenciar Categorias</h1>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input type="text" placeholder="Nome" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full p-2 border rounded" required />
        <select value={form.parent} onChange={(e) => setForm({...form, parent: e.target.value})} className="w-full p-2 border rounded">
          <option value="">Categoria pai (opcional)</option>
          {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editing ? 'Atualizar' : 'Criar'} Categoria
        </button>
      </form>
      <div className="space-y-4">
        {categories.map(category => (
          <div key={category._id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{category.name}</h3>
              {category.parent && <p className="text-sm text-gray-600">Subcategoria</p>}
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(category)} className="bg-yellow-500 text-white px-3 py-1 rounded">Editar</button>
              <button onClick={() => handleDelete(category._id)} className="bg-red-500 text-white px-3 py-1 rounded">Deletar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategories;