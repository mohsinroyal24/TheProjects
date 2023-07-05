"use client"
import Image from 'next/image';
import Header from '@/components/Header';
import { useState, useEffect } from 'react';

export default function Home() {
  // Sample data for demonstration purposes
  const stockData = [
    { id: 1, name: 'Product A', quantity: 10, price: '$10' },
    { id: 2, name: 'Product B', quantity: 5, price: '$15' },
    { id: 3, name: 'Product C', quantity: 8, price: '$20' },
  ];


  const [ProductForm, setProductForm] = useState({})

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ProductForm),
      });

      if (response.ok) {
        // Product added successfully, you can update the stockData state if needed
        console.log('Product added successfully!');
         // Clear the product form fields after successful addition
      } else {
        // Handle error if the server responds with an error status
        console.error('Error adding product:');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

   const handleChange = (e) => {
    setProductForm({...ProductForm, [e.target.name]: e.target.value})
   }


  return (
    <>
      <Header />

      {/* Search a product section */}
      <div className="container mx-auto mt-4 p-3">
        <h1 className="font-bold text-2xl">Search a product</h1>
        <div className="search-form py-3 px-2 flex flex-wrap items-center">
          <div className="w-full md:w-10/12"> {/* 10/12 width */}
            {/* <label className="mr-4 font-bold block">Product Name:</label> */}
            <input type="text" placeholder="Enter the item to search" className="w-full mt-2 px-4 py-2 rounderd border " />
          </div>
          <div className="py-2 px-2 w-full md:w-2/12"> {/* 1/12 width */}
            {/* <label className="mr-4 font-bold block">Category:</label> */}
            <select className="w-full mt-2 px-4 py-2 rounderd border">
              <option value="">All</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              {/* Add more categories as needed */}
            </select>
          </div>
        </div>
      </div>

      {/* Add a product section */}
      <div className="container mx-auto">
        <h1 className="py-2 px-2 font-bold text-2xl">Add a product</h1>
        <div className="product-form py-3 px-2 mb-6 flex flex-wrap items-center">
          <div className="py-2 px-2 w-full md:w-9/12"> {/* 10/12 width */}
            {/* <label className="mr-4 font-bold block">Product Slug:</label> */}
            <input name = "slug" onChange={handleChange} type="text" placeholder="Enter slug name for the product" className="w-full mt-2 px-4 py-2 rounded border" />
          </div>
          <div className="py-2 px-2 w-full md:w-1/12"> {/* 1/12 width */}
            {/* <label className="mr-4 font-bold block">Quantity:</label> */}
            <input name= "quantiy" onChange={handleChange}  type="number" placeholder="Qty" className="w-full mt-2 px-4 py-2 rounded border" />
          </div>
          <div className="py-2 px-2 w-full md:w-1/12"> {/* 1/12 width */}
            {/* <label className="mr-4 font-bold block">Price:</label> */}
            <input name="price" onChange={handleChange} type="text" placeholder="Price" className="w-full mt-2 px-4 py-2 rounded border" />
          </div>

            <button onClick={addProduct} className="bg-green-600 text-white rounded mt-3 md:mt-2 py-2 px-2 w-full md:w-1/12">
              Add Product
            </button>
   
        </div>
      </div>

      {/* Current Stock section */}
      <div className="container mx-auto mt-4 p-4">
        <h1 className="font-bold text-2xl">Current Stock</h1>
        <table className="table w-full">
          <thead>
            <tr>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Quantity</th>
              <th className="py-2 px-4">Price</th>
            </tr>
          </thead>
          <tbody>
            {stockData.map((product) => (
              <tr key={product.id}>
                <td className="py-2 px-4">{product.id}</td>
                <td className="py-2 px-4">{product.name}</td>
                <td className="py-2 px-4">{product.quantity}</td>
                <td className="py-2 px-4">{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
