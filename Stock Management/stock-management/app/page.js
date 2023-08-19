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
  const [selectedCategory, setSelectedCategory] = useState(""); // Track the selected category

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

  const [productForm, setProductForm] = useState({
    category: '',
    slug: '',
    quantity: '',
    price: '',
  });

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
        setProductForm({
          category: '',
          slug: '',
          quantity: '',
          price: '',
        });
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

  const handleChangeCategory = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
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

  const refillStock = (slug) => {
    const quantity = prompt("Enter the quantity:");
    if (quantity !== null) {
      const newProducts = products.map((product) => {
        if (product.slug === slug) {
          return { ...product, quantity: parseInt(quantity) };
        }
        return product;
      });
      setProducts(newProducts);
    }
  };


  return (
    <>
      <Header
        products={products}
        setProducts={setProducts}
        setLoadingAction={setLoadingAction}
      />

            {/* Add a product section */}
            <div className="container mx-10 mt-2 p-2">
        <h1 className="mx-2 font-semibold text-2xl">Add a product</h1>
        <div className="product-form py-3 px-2 mb-2 flex flex-wrap items-center">
          <div className="py-2 w-full md:w-6/12">
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
            <select
              value={productForm?.category || ''}
              name="category"
              onChange={handleChange}
              className="w-full mt-2 px-4 py-2 rounded border"
            >
              <option value="">All</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Bakery">Bakery</option>
              <option value="Snacks">Snacks</option>
              <option value="Clothes">Clothes</option>
              <option value="Toys">Toys</option>
              <option value="Furniture">Furniture</option>
              <option value="Electronics">Electronics</option>
            </select>
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
<div id="current-stock" className="container mx-10 mt-2 p-2">
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center">
      <h2 className="font-semibold text-2xl mr-2">Current Stock</h2>
      {/* Other elements */}
    </div>
    <div className="py-2 px-2 w-full md:w-2/12">
      <select
        className="w-full mt-2 px-4 py-2 rounded border"
        value={selectedCategory}
        onChange={handleChangeCategory}
      >
        <option value="">All</option>
        <option value="Fruits">Fruits</option>
        <option value="Vegetables">Vegetables</option>
        <option value="Bakery">Bakery</option>
        <option value="Snacks">Snacks</option>
        <option value="Clothes">Clothes</option>
        <option value="Toys">Toys</option>
        <option value="Furniture">Furniture</option>
        <option value="Electronics">Electronics</option>
      </select>
    </div>
  </div>
  <table className="table mt-8 w-full">
    <thead>
      <tr>
        <th className="py-2 px-4 border">Name</th>
        <th className="py-2 px-4 border">Category</th>
        <th className="py-2 px-4 border">Price</th>
        <th className="py-2 px-4 border">Quantity</th>
      </tr>
    </thead>
    <tbody>
      {products
        .filter((product) => product.quantity > 0) // Filter out products with quantity 0
        .filter((product) => !selectedCategory || product.category === selectedCategory) // Apply category filter
        .map((product) => (
          <tr
            key={product.id}
            className={`text-center ${
              product.quantity < 6 ? 'low-stock-row' : '' // Apply low-stock-row class if quantity is less than 6
            }`}
          >
            <td className="py-2 px-4 border">{product.slug}</td>
            <td className="py-2 px-4 border">{product.category}</td>
            <td className="py-2 px-4 border">₹{product.price}</td>
            <td className="py-2 px-4 border">
              <div className="flex justify-center items-center">
                <button
                  onClick={() => buttonAction('minus', product.slug, product.quantity)}
                  disabled={loadingAction}
                  className="subtract cursor-pointer px-3 py-1 bg-purple-500 text-white font-semibold rounded-lg shadow-md disabled:bg-purple-200"
                  style={{ marginRight: '0.5rem' }}
                >
                  -
                </button>
                <span
                  className="quantity"
                  style={{ minWidth: '1.5rem', textAlign: 'center' }}
                >
                  {product.quantity}
                </span>
                <button
                  onClick={() => buttonAction('plus', product.slug, product.quantity)}
                  disabled={loadingAction}
                  className="add cursor-pointer px-3 py-1 bg-purple-500 text-white font-semibold rounded-lg shadow-md disabled:bg-purple-200"
                  style={{ marginLeft: '0.5rem' }}
                >
                  +
                </button>
              </div>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
</div>

      <br></br>

{/* Out of Stock section */}
<div id="out-of-stock" className="container mx-10 mt-2 p-2">
  <h2 className="font-semibold text-2xl mb-2">Out of Stock Items</h2>
  <table className="table mt-8 w-full">
    <thead>
      <tr>
        <th className="py-2 px-4 border">Name</th>
        <th className="py-2 px-4 border">Category</th>
        <th className="py-2 px-4 border">Price</th>
        <th className="py-2 px-4 border">Refill stocks</th>
        <th className="py-2 px-4 border">Remove Product</th>
      </tr>
    </thead>
    <tbody>
      {products.map((product) => {
        if (product.quantity === 0) {
          return (
            <tr key={product.id} className="text-center">
              <td className="py-2 px-4 border">{product.slug}</td>
              <td className="py-2 px-4 border">{product.category}</td>
              <td className="py-2 px-4 border">₹{product.price}</td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => refillStock(product.slug)}
                  disabled={loadingAction}
                  className="refill cursor-pointer px-3 py-1 bg-green-500 text-white font-semibold rounded-lg shadow-md disabled:bg-green-200"
                >
                  Refill
                </button>
              </td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => buttonAction('delete', product.slug)}
                  disabled={loadingAction}
                  className="delete cursor-pointer px-3 py-1 bg-red-500 text-white font-semibold rounded-lg shadow-md disabled:bg-red-200"
                >
                  Delete
                </button>
              </td>
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
