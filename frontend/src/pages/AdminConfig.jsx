import { useState, useEffect } from 'react';
import api from '../services/api';

const AdminConfig = () => {
  const [config, setConfig] = useState({});
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    const res = await api.get('/config');
    setConfig(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(config).forEach(key => formData.append(key, config[key]));
    if (logo) formData.append('logo', logo);
    if (banner) formData.append('banner', banner);

    await api.put('/config', formData);
    fetchConfig();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Configurações da Loja</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Nome da Loja" value={config.storeName || ''} onChange={(e) => setConfig({...config, storeName: e.target.value})} className="w-full p-2 border rounded" />
        <textarea placeholder="Descrição da Loja" value={config.storeDescription || ''} onChange={(e) => setConfig({...config, storeDescription: e.target.value})} className="w-full p-2 border rounded" />
        <input type="color" placeholder="Cor Principal" value={config.primaryColor || '#3B82F6'} onChange={(e) => setConfig({...config, primaryColor: e.target.value})} className="w-full p-2 border rounded" />
        <input type="color" placeholder="Cor Secundária" value={config.secondaryColor || '#10B981'} onChange={(e) => setConfig({...config, secondaryColor: e.target.value})} className="w-full p-2 border rounded" />
        <div>
          <label>Logo:</label>
          <input type="file" onChange={(e) => setLogo(e.target.files[0])} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label>Banner:</label>
          <input type="file" onChange={(e) => setBanner(e.target.files[0])} className="w-full p-2 border rounded" />
        </div>
        <input type="text" placeholder="Número do WhatsApp" value={config.whatsappNumber || ''} onChange={(e) => setConfig({...config, whatsappNumber: e.target.value})} className="w-full p-2 border rounded" />
        <textarea placeholder="Mensagem Padrão WhatsApp" value={config.whatsappMessage || ''} onChange={(e) => setConfig({...config, whatsappMessage: e.target.value})} className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Salvar Configurações
        </button>
      </form>
    </div>
  );
};

export default AdminConfig;