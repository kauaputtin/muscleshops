import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import useConfig from '../hooks/useConfig';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { config } = useConfig();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleWhatsApp = () => {
    const message = `${config.whatsappMessage || 'Olá, gostaria de comprar'} ${product.name} por R$ ${product.price}`;
    const url = config.whatsappNumber ? `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}` : `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img src={`/api/uploads/${product.image}`} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{product.shortDescription}</p>
        <p className="text-xl font-bold mb-4" style={{ color: config.primaryColor }}>
          R$ {product.price}
        </p>
        <div className="flex space-x-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 text-white px-4 py-2 rounded hover:opacity-90 transition-opacity text-sm font-medium"
            style={{ backgroundColor: config.primaryColor }}
          >
            Adicionar ao Carrinho
          </button>
          <button
            onClick={handleWhatsApp}
            className="px-4 py-2 rounded border-2 hover:bg-gray-50 transition-colors text-sm font-medium"
            style={{ borderColor: config.secondaryColor, color: config.secondaryColor }}
          >
            WhatsApp
          </button>
        </div>
        <Link
          to={`/product/${product._id}`}
          className="block text-center mt-3 text-sm hover:underline"
          style={{ color: config.primaryColor }}
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;