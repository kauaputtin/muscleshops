import { useState, useEffect } from 'react';
import api from '../services/api';

const useConfig = () => {
  const [config, setConfig] = useState({
    storeName: 'MuscleShops',
    storeDescription: '',
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    logo: '',
    banner: '',
    whatsappNumber: '',
    whatsappMessage: 'Olá, gostaria de fazer um pedido!'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await api.get('/config');
        setConfig(res.data);
      } catch (err) {
        console.log('Erro ao buscar config, usando padrão');
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  return { config, loading };
};

export default useConfig;