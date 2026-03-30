import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import useConfig from '../hooks/useConfig';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useContext(CartContext);
  const { config } = useConfig();

  const handleWhatsApp = () => {
    const message = `${config.whatsappMessage || 'Olá, gostaria de fazer o seguinte pedido:'}\n\n${cart.map(item => 
      `${item.product.name} ${item.variation ? `(${item.variation})` : ''} - ${item.quantity}x R$ ${item.product.price} = R$ ${item.product.price * item.quantity}`
    ).join('\n')}\n\nTotal: R$ ${getTotal()}`;
    const url = config.whatsappNumber ? `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}` : `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Carrinho</h1>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                <div className="flex items-center space-x-4">
                  <img src={`/api/uploads/${item.product.image}`} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <h3 className="font-semibold">{item.product.name}</h3>
                    {item.variation && <p className="text-sm text-gray-600">{item.variation}</p>}
                    <p>R$ {item.product.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => updateQuantity(item.product._id, item.variation, item.quantity - 1)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product._id, item.variation, item.quantity + 1)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                  <button onClick={() => removeFromCart(item.product._id, item.variation)} className="text-red-600 hover:text-red-800">Remover</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-between items-center">
            <p className="text-xl font-bold">Total: R$ {getTotal()}</p>
            <div className="space-x-4">
              <button onClick={clearCart} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Limpar Carrinho</button>
              <button onClick={handleWhatsApp} className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
                Finalizar Pedido no WhatsApp
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;