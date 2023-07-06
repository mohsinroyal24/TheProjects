"use client"
import Image from 'next/image';
import Header from '@/components/Header';
import { useState, useEffect } from 'react';

export default function Home() {

  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState("")
  const [query, setquery] = useState("")
  const [loading, setloading] = useState(false)
  const [dropdown, setdropdown] = useState([
    {
      "_id": "64a6d2e9717b9b1257bf52cf",
      "slug": "Baa",
      "quantity": "2",
      "price": "200"
    },
    {
      "_id": "64a6d2e9717b9b1257bf52cf",
      "slug": "Baa2",
      "quantity": "2",
      "price": "200"
    },
    {
      "_id": "64a6d2e9717b9b1257bf52cf",
      "slug": "Baa22",
      "quantity": "2",
      "price": "200"
    },
])

  // Sample data for demonstration purposes
  const stockData = [
    { id: 1, name: 'Product A', quantity: 10, price: '$10' },
    { id: 2, name: 'Product B', quantity: 5, price: '$15' },
    { id: 3, name: 'Product C', quantity: 8, price: '$20' },

  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/product')
      let rjson = await response.json()
      setProducts(rjson.products)
    }
    fetchProducts()
  }, [])



  const [productForm, setProductForm] = useState({})

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productForm),
      });

      if (response.ok) {
        // Product added successfully, you can update the stockData state if needed
        console.log('Product added successfully!');
        setAlert("Your product has been added")
        setProductForm({})
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
    setProductForm({ ...productForm, [e.target.name]: e.target.value })
  }

  const onDropdownEdit =async (e) =>{
    setquery(e.target.value)
    if(!loading){
      setloading(true)
      setdropdown([])
    const response = await fetch('/api/search?query='+query)
    let rjson = await response.json()
    setdropdown(rjson.products)
    setloading(false)
  }
}


  return (
    <>
      <Header />

      {/* Search a product section */}
      <div className="container mx-10 mt-2 p-2">
        <div className="text-green-800 text-center">{alert}</div>
        <h1 className="font-semibold text-2xl mx-2">Search a product</h1>
        <div className="search-form py-3 px-2 flex flex-wrap items-center">
          <div className="w-full md:w-10/12"> {/* 10/12 width */}
            {/* <label className="mr-4 font-bold block">Product Name:</label> */}
            <input onChange={onDropdownEdit} type="text" placeholder="Enter the item to search" className="w-full mt-2 px-4 py-2 rounderd border " />
          </div>
          <div className="py-2 px-2 w-full md:w-2/12"> {/* 1/12 width */}
            {/* <label className="mr-4 font-bold block">Category:</label> */}
            <select className="w-full mt-2 px-4 py-2 rounderd border">
              <option value="">All</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              {/* Add more categories as  needed */}
            </select>
          </div>
        </div>
      {loading && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">
  <circle cx="25" cy="25" r="20" fill="none" stroke="#000000" stroke-width="4" stroke-dasharray="31.42" stroke-dashoffset="0">
    <animate attributeName="stroke-dashoffset" dur="1.5s" repeatCount="indefinite" from="0" to="62.84" />
  </circle>
</svg>
}

        {dropdown.map(item => {
          return <div key={item.slug}
          className="contatiner flex justify-between mx-3 bg-purple-200 my-3">
            <span className="slug">{item.slug}</span>
            <span className="price">{item.price}</span>
            <span className="quantity">{item.quantity}</span>
          </div>
        })}
      </div>

      {/* Add a product section */}
      <div className="container mx-10 mt-2 p-2">
        <h1 className="mx-2 font-semibold text-2xl">Add a product</h1>
        <div className="product-form py-3 px-2 mb-6 flex flex-wrap items-center">
          <div className="py-2  w-full md:w-9/12"> {/* 10/12 width */}
            {/* <label className="mr-4 font-bold block">Product Slug:</label> */}
            <input value={productForm?.slug || ""} name='slug' onChange={handleChange} type="text" placeholder="Enter slug name for the product" className="w-full mt-2 px-4 py-2 rounded border" />
          </div>
          <div className="py-2 px-2 w-full md:w-1/12"> {/* 1/12 width */}
            {/* <label className="mr-4 font-bold block">Quantity:</label> */}
            <input value={productForm?.quantity || ""} name='quantity' onChange={handleChange} type="number" placeholder="Qty" className="w-full mt-2 px-4 py-2 rounded border" />
          </div>
          <div className="py-2 px-2 w-full md:w-1/12"> {/* 1/12 width */}
            {/* <label className="mr-4 font-bold block">Price:</label> */}
            <input value={productForm?.price || ""} name='price' onChange={handleChange} type="text" placeholder="Price" className="w-full mt-2 px-4 py-2 rounded border" />
          </div>

          <button onClick={addProduct} className="bg-green-600 text-white rounded mt-3 md:mt-2 py-2 px-2 w-full md:w-1/12">
            Add Product
          </button>

        </div>
      </div>

      {/* Current Stock section */}
      <div className="container mx-10 mt-2 p-2">
        <h1 className="font-semibold text-2xl mb-2">Current Stock</h1>
        <table className="table mt-8 w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Quantity</th>
              <th className="py-2 px-4 border">Price</th>
            </tr>
          </thead>
          <tbody>

            {products.map(product => {
              return <tr key={product.slug} className="text-center">
                <td className="py-2 px-4 border">{product.slug}</td>
                <td className="py-2 px-4 border">{product.quantity}</td>
                <td className="py-2 px-4 border">₹{product.price}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
