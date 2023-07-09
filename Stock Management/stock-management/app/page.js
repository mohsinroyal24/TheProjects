"use client"
import Image from 'next/image';
import Header from '@/components/Header';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const [dropdown, setDropdown] = useState([]);
  const [deletedProduct, setDeletedProduct] = useState(null);
  

  // Sample data for demonstration purposes
  const stockData = [
    { id: 1, name: 'Product A', quantity: 10, price: '$10' },
    { id: 2, name: 'Product B', quantity: 5, price: '$15' },
    { id: 3, name: 'Product C', quantity: 8, price: '$20' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/product');
      let rjson = await response.json();
      setProducts(rjson.products);
    };
    fetchProducts();

    // Check if a product has been deleted
    if (deletedProduct) {
      const updatedProducts = products.filter(
        (product) => product.slug !== deletedProduct
      );
      setProducts(updatedProducts);
      setDeletedProduct(null);
    }
  }, [deletedProduct]);

  const buttonAction = async (action, slug, initialQuantity) => {
    if (action === 'delete') {
      const confirmation = window.confirm(
        'Are you sure you want to delete this product?'
      );
      if (confirmation) {
        setLoadingAction(true);
        const response = await fetch('/api/product', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug }),
        });
        const data = await response.json();
        console.log(data);
        setLoadingAction(false);
        // Handle the response and update the products state
        if (data.success) {
          // Product deleted successfully
          console.log('Product deleted successfully');
          setDeletedProduct(data.slug);
          toast.success('Product deleted successfully');
        } else {
          // Product not found or other error occurred
          console.error(data.message);
          toast.error('Failed to delete product');
        }
      }
    } else {
      // Code for plus and minus actions
      let index = products.findIndex((item) => item.slug == slug);
      console.log(index);
      let newProducts = JSON.parse(JSON.stringify(products));
      if (action == 'plus') {
        newProducts[index].quantity = parseInt(initialQuantity) + 1;
      } else {
        newProducts[index].quantity = parseInt(initialQuantity) - 1;
      }
      setProducts(newProducts);

      let indexdrop = dropdown.findIndex((item) => item.slug == slug);
      console.log(indexdrop, 'parse');
      let newDropdown = JSON.parse(JSON.stringify(dropdown));
      if (action == 'plus') {
        newDropdown[indexdrop].quantity = parseInt(initialQuantity) + 1;
      } else {
        newDropdown[indexdrop].quantity = parseInt(initialQuantity) - 1;
      }
      setDropdown(newDropdown);
      console.log(action, slug);
      setLoadingAction(true);
      const response = await fetch('/api/action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action, slug, initialQuantity }),
      });
      let r = await response.json();
      console.log(r);
      setLoadingAction(false);
    }
  };

  const [productForm, setProductForm] = useState({});

  const addProduct = async (e) => {
    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productForm),
      });

      if (response.ok) {
        // Product added successfully
        console.log('Product added successfully!');
        setProductForm({});
        toast.success('Product added successfully');
      } else {
        // Handle error if the server responds with an error status
        console.error('Error adding product:');
        toast.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred');
    }

    // fetch all the products again to sync back
    const response = await fetch('/api/product');
    let rjson = await response.json();
    setProducts(rjson.products);
    e.preventDefault();
  };

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };
  const onDropdownEdit = async (e) => {
    let value = e.target.value;
    setQuery(value);
    if (value.length > 3) {
      setLoading(true);
      setDropdown([]);
      const response = await fetch('/api/search?query=' + value);
      let rjson = await response.json();
      setDropdown(rjson.products);
      setLoading(false);
    } else {
      setDropdown([]);
    }
  };
  

  return (
    <>
      <Header products={products}
        setProducts={setProducts}
        setLoadingAction={setLoadingAction} />


      {/* Search a product section */}
      <div className="container mx-10 mt-2 p-2">
        <div className="text-green-800 text-center">{alert}</div>
        <h2 className="font-semibold text-2xl mx-2">Search a product</h2>
        <div className="search-form py-3 px-2 flex flex-wrap items-center">
          <div className="w-full md:w-10/12">
            <input
              onChange={onDropdownEdit}
              type="text"
              placeholder="Enter the item to search"
              className="w-full mt-2 px-4 py-2 rounderd border"
            />
          </div>
          <div className="py-2 px-2 w-full md:w-2/12">
            <select className="w-full mt-2 px-4 py-2 rounderd border">
              <option value="">All</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
            </select>
          </div>
        </div>
        {loading && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="50px"
            height="50px"
          >
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="#000000"
              strokeWidth="4"
              strokeDasharray="31.42"
              strokeDashoffset="0"
            >
              <animate
                attributeName="strokeDashoffset"
                dur="1.5s"
                repeatCount="indefinite"
                from="0"
                to="62.84"
              />
            </circle>
          </svg>
        )}

        <div className="dropContainer mx-2 absolute w-[78.5vw] border-1 rounded-md bg-purple-100 ">
          {dropdown.map((item) => (
            <div
              key={item.slug}
              className="contatiner flex justify-between mx-3 p-1 my-1 border-b-2 border-purple-200"
            >
              <span className="slug">
                {item.slug} ({item.quantity} available for ₹{item.price})
              </span>
              <div className="mx-5">
                <button
                  onClick={() => {
                    buttonAction('minus', item.slug, item.quantity);
                  }}
                  disabled={loadingAction}
                  className="subtract cursor-pointer inline-block px-3 py-1 mr-2 bg-purple-500 text-white font-semibold rounded-lg shadow-md disabled:bg-purple-200"
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  onClick={() => {
                    buttonAction('plus', item.slug, item.quantity);
                  }}
                  disabled={loadingAction}
                  className="add  cursor-pointer inline-block px-3 py-1 ml-2 bg-purple-500 text-white font-semibold rounded-lg shadow-md disabled:bg-purple-200"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      

      {/* Add a product section */}
      <div className="container mx-10 mt-2 p-2">
        <h1 className="mx-2 font-semibold text-2xl">Add a product</h1>
        <div className="product-form py-3 px-2 mb-6 flex flex-wrap items-center">
          <div className="py-2 w-full md:w-8/12">
            <input
              value={productForm?.slug || ''}
              name="slug"
              onChange={handleChange}
              type="text"
              placeholder="Enter slug name for the product"
              className="w-full mt-2 px-4 py-2 rounded border"
            />
          </div>
          <div className="py-2 px-2 w-full md:w-1/12">
            <input
              value={productForm?.quantity || ''}
              name="quantity"
              onChange={handleChange}
              type="number"
              placeholder="Qty"
              className="w-full mt-2 px-4 py-2 rounded border"
            />
          </div>
          <div className="py-2 px-2 w-full md:w-1/12">
            <input
              value={productForm?.price || ''}
              name="price"
              onChange={handleChange}
              type="text"
              placeholder="Price"
              className="w-full mt-2 px-4 py-2 rounded border"
            />
          </div>
          <div className="py-2 px-2 w-full md:w-2/12">
            <button
              onClick={addProduct}
              className="bg-purple-500 hover:bg-purple-600 text-white rounded mt-2 px-2 inline-block transition-colors duration-300 ease-in-out"
              style={{ height: '2.5rem' }}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Current Stock section */}
      <div id="current-stock"className="container mx-10 mt-2 p-2">
        <h2 className="font-semibold text-2xl mb-2">Current Stock</h2>
        <table className="table mt-8 w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Quantity</th>
              <th className="py-2 px-4 border">Price</th>
              <th className="py-2 px-4 border">Remove Product</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter((product) => product.quantity > 0) // Filter out products with quantity 0
              .map((product) => (
                <tr key={product.id} className="text-center">
                  <td className="py-2 px-4 border">{product.slug}</td>
                  <td className="py-2 px-4 border">{product.quantity}</td>
                  <td className="py-2 px-4 border">₹{product.price}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => buttonAction('delete', product.slug)}
                      disabled={loadingAction}
                      className="delete cursor-pointer inline-block px-3 py-1 bg-red-500 text-white font-semibold rounded-lg shadow-md disabled:bg-red-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <br></br>
      <br></br>
      {/* Out of Stock section */}
      <div  id="out-of-stock" className="container mx-10 mt-2 p-2">
        <h2 className="font-semibold text-2xl mb-2">Out of Stock Items</h2>
        <table className="table mt-8 w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              if (product.quantity === 0) {
                return (
                  <tr key={product.id} className="text-center">
                    <td className="py-2 px-4 border">{product.slug}</td>
                    <td className="py-2 px-4 border">₹{product.price}</td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </>
  );
}
