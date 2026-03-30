import { Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import useConfig from '../hooks/useConfig';

const Header = () => {
  const { cart } = useContext(CartContext);
  const { token, logout } = useContext(AuthContext);
  const { config, loading } = useConfig();

  if (loading) {
    return (
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="animate-pulse h-8 bg-gray-200 rounded w-48"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          {config.logo && (
            <img src={`/api/uploads/${config.logo}`} alt="Logo" className="h-8 w-auto" />
          )}
          <span className="text-2xl font-bold" style={{ color: config.primaryColor }}>
            {config.storeName}
          </span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
                {cart.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;