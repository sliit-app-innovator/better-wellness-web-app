import React from "react";
import { Link } from "react-router-dom";

const MenuBar = () => {
  return (

        <nav className="bg-blue-600 p-4 text-white shadow-md rounded-lg">
            <div className="container mx-auto flex justify-between items-center">
           
            <div className="flex space-x-6">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/about" className="hover:text-gray-300">About</Link>
            <Link to="/services" className="hover:text-gray-300">Services</Link>
            <Link to="/products" className="hover:text-gray-300">Products</Link>
            <Link to="/contact" className="hover:text-gray-300">Contact</Link>
            </div>
            
            <div className="space-x-4">
                <Link to="/signin" className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-300">
                    Sign In
                </Link>
                <Link to="/register" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Register
                </Link>
             </div>
             </div>
        </nav>

  );
}
export default MenuBar;
