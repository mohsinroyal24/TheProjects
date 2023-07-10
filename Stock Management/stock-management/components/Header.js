import React, { useState } from 'react';
import Link from 'next/link';

const Header = ({ products, setProducts, setLoadingAction }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [dropdown, setDropdown] = useState([]);

  const scrollToSection = (id) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 3) {
      setLoading(true);
      setDropdown([]);
      const response = await fetch('/api/search?query=' + value);
      const data = await response.json();
      setDropdown(data.products);
      setLoading(false);
    } else {
      setDropdown([]);
    }
  };

  const buttonAction = async (action, slug, initialQuantity) => {
    let index = products.findIndex((item) => item.slug === slug);
    let newProducts = [...products];
    if (action === 'plus') {
      newProducts[index].quantity = parseInt(initialQuantity) + 1;
    } else if (action === 'minus') {
      newProducts[index].quantity = parseInt(initialQuantity) - 1;
    }
    setProducts(newProducts);

    let indexdrop = dropdown.findIndex((item) => item.slug === slug);
    let newDropdown = [...dropdown];
    if (action === 'plus') {
      newDropdown[indexdrop].quantity = parseInt(initialQuantity) + 1;
    } else if (action === 'minus') {
      newDropdown[indexdrop].quantity = parseInt(initialQuantity) - 1;
    }
    setDropdown(newDropdown);

    setLoadingAction(true);
    const response = await fetch('/api/action', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, slug, initialQuantity }),
    });
    const data = await response.json();
    setLoadingAction(false);
    console.log(data);
  };

  return (
<header className="text-gray-600 body-font sticky top-0 z-10 bg-white shadow">
  <div className="container mx-auto flex flex-wrap p-5 flex-row items-center">
    <Link href="/" passHref className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
        viewBox="0 0 24 24"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
      <span className="ml-3 text-xl">Stock Management System</span>
    </Link>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center w-1/2">
      <Link href="/" passHref className="mr-5 hover:text-gray-900" onClick={() => scrollToSection('top')}>
        Home
      </Link>
      <Link href="#current-stock" passHref className="mr-5 hover:text-gray-900">
        Current stock
      </Link>
      <Link href="#out-of-stock" passHref className="mr-5 hover:text-gray-900">
        Out of stock
      </Link>
      <div className="relative flex-grow w-1/4">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Enter the item to search"
          className="w-full mt-2 px-4 py-2 border rounded"
        />
        {loading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="animate-spin h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
        {dropdown.length > 0 && (
          <div className="absolute left-0 right-0 mt-1 bg-white border rounded-b shadow-md w-full">
            {dropdown.map((item) => (
              <div
                key={item.slug}
                className="p-2 flex items-center justify-between hover:bg-gray-100 cursor-pointer"
                onClick={() => scrollToSection(item.slug)}
              >
                <div>{item.slug}</div>
                <div>
                  <button
                    onClick={() => buttonAction('minus', item.slug, item.quantity)}
                    disabled={loading}
                    className="subtract cursor-pointer inline-block px-3 py-1 mr-2 bg-purple-500 text-white font-semibold rounded-lg shadow-md disabled:bg-purple-200"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => buttonAction('plus', item.slug, item.quantity)}
                    disabled={loading}
                    className="add cursor-pointer inline-block px-3 py-1 ml-2 bg-purple-500 text-white font-semibold rounded-lg shadow-md disabled:bg-purple-200"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
           <select className="w-6/25 md:w-34 mt-2 ml-2 px-4 py-2 rounded border">
        <option value="">All</option>
        <option value="category1">Category 1</option>
        <option value="category2">Category 2</option>
      </select>
    </nav>
  </div>
</header>

  );
};

export default Header;
