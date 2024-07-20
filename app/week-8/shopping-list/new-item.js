"use client"

import { useState } from "react";


export default function NewItem({onAddItem}){

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("Produce");

   


    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Generate the random Id and convert to string 
        const id = Math.random().toString(36).substring(2, 11);

        let item = {
            id,
            name,
            quantity,
            category,
        };



        // Call the onAddItem prop, passing the item object
        onAddItem(item);

        //back to the default setting
        setName("");
        setQuantity(1);
        setCategory("Produce");
    }

    const handleName = (event) => {
        setName (event.target.value)
    }
   
    const handleCategory = (event) => {
        setCategory (event.target.value)
    }

    const incrementQuantity = () => {setQuantity(PrevQuatity => Math.min(PrevQuatity + 1, 99));

    }
    const decrementQuantity = () => {setQuantity(PrevQuatity => Math.max(PrevQuatity - 1, 1));
        
    }



    return (
        <div className="flex justify-between items-center p-0 mx-4 my-2  bg-slate-900 max-w-sm">
            <form onSubmit={handleSubmit} className="p-4 m-4 bg-slate-900 text-gray-400 max-w-sm w-full rounded-lg shadow-lg">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Item name"
                        value={name}
                        onChange={handleName}
                        required
                        className="w-full mt-1 border-2 border-gray-300 p-2 rounded-lg bg-white-800 text-black"
                    />
                </div>
                <div className="flex items-center justify-between mb-4 space-x-4">
                    <div className="flex items-center border-3 border-gray-300 rounded-lg bg-white">
                        <span className="p-2 text-black">{quantity}</span>
                        <button
                            type="button"
                            onClick={decrementQuantity}
                            className="w-8 h-8 bg-gray-500 text-white font-semibold shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 rounded-l-lg disabled:bg-gray-400"
                            disabled={quantity <= 1}
                        >
                            -
                        </button>
                        <button
                            type="button"
                            onClick={incrementQuantity}
                            className="w-8 h-8 bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 rounded-r-lg disabled:bg-gray-400"
                            disabled={quantity >= 99}
                        >
                            +
                        </button>
                    </div>
                    <select
                        id ="category"
                        value={category}
                        onChange={handleCategory}
                        required
                        className="border-20 border-gray-300 p-2 rounded-lg bg-white-800 text-black ml-24"
                    >
                        <option value="" disabled>Category</option>
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
                    className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                    +
                </button>
            </form>
        </div>
    );
}