import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { CartContext } from '../context/CartContext';
import useConfig from '../hooks/useConfig';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState('');
  const { addToCart } = useContext(CartContext);
  const { config } = useConfig();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, 1, selectedVariation);
  };

  const handleWhatsApp = () => {
    const message = `${config.whatsappMessage || 'Olá, gostaria de comprar'} ${product.name} ${selectedVariation ? `(${selectedVariation})` : ''} por R$ ${product.price}`;
    const url = config.whatsappNumber ? `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}` : `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url);
  };

  if (!product) return <div>Carregando...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img src={`/api/uploads/${product.image}`} alt={product.name} className="w-full rounded-lg" />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-blue-600 mb-4">R$ {product.price}</p>
          {product.variations && product.variations.length > 0 && (
            <select 
              value={selectedVariation} 
              onChange={(e) => setSelectedVariation(e.target.value)} 
              className="p-2 border rounded mb-4"
            >
              <option value="">Selecione uma variação</option>
              {product.variations.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          )}
          <div className="flex space-x-4">
            <button onClick={handleAddToCart} className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
              Adicionar ao Carrinho
            </button>
            <button onClick={handleWhatsApp} className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
              Pedir no WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;