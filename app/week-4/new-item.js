"use client"

import { useState } from "react";


export default function NewItem(){

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("Produce");


    const handleSubmit = (event) => {
        event.preventDefault();

        let item = {
            name,
            quantity,
            category,
        };

        //Log the item object to the console.
        console.dir(item);
        alert (`Name: ${name}, Quantity: ${quantity}, Category: ${category}`);

        //back to the default setting
        setName("");
        setQuantity(1);
        setCategory("Produce");
    }

    const handleName = (event) => {
        setName (event.target.value)
    }
    const handleQuantity = (event) => {
        setQuantity (event.target.value)
    }
    const handleCategory = (event) => {
        setCategory (event.target.value)
    }



    return (
        <main className="flex justify-center w-full h-screen bg-slate-900">
          <form onSubmit={handleSubmit} className="p-2 m-4 bg-slate-900 text-black max-w-sm w-full">
            <div className="mb-2">
              <input
                type="text"
                placeholder="Item name"
                value={name}
                onChange={handleName}
                required
                className="w-full mt-1 border-2 border-gray-300 p-2 rounded-lg font-sans"
              />
            </div>
            <div className="flex justify-between">
              <input
                type="number"
                min="1"
                max="99"
                value={quantity}
                onChange={handleQuantity}
                required
                className="w-20 ml-1 border-2 border-gray-300 p-2 rounded-lg font-sans"
              />
              <select
                value={category}
                onChange={handleCategory}
                required
                className="ml-1 border-2 border-gray-300 p-2 rounded-lg font-sans"
              >
                <option value="" disabled>
                  Category
                </option>
                <option value="produce">Produce</option>
                <option value="dairy">Dairy</option>
                <option value="bakery">Bakery</option>
                <option value="meat">Meat</option>
                <option value="frozen foods">Frozen Foods</option>
                <option value="canned goods">Canned Goods</option>
                <option value="dry goods">Dry Goods</option>
                <option value="beverages">Beverages</option>
                <option value="snacks">Snacks</option>
                <option value="household">Household</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              +
            </button>
          </form>
        </main>
      );
    }