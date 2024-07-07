
'use client'  


import NewItem from "./new-item";
import itemsData from "./items.json";
import ItemList from "./item-list";
import { useState } from "react";
import MealIdeas from "./meal-ideas";


export default function Page(){

    const [items, setItems] = useState(itemsData);
    const [selectedItemName, setSelectedItemName] = useState("");
    const [ingredient, setIngredient] = useState("");
  
    const handleAddItem = (newItem) => {
      setItems(currentItems => [...currentItems, newItem]);
    };
  
    const handleItemSelect = (itemName) => {
      // Split the item name by comma and take the first part
      const namePart = itemName.split(',')[0].trim();
      // Remove emojis from the item name using regex
      const cleanedItemName = namePart.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
      setSelectedItemName(cleanedItemName);
      setIngredient(cleanedItemName);

    };




    return (
        <main className="bg-slate-950">
            <div className="container mx-1 p-4 flex justify-between">
                <div className="flex-0">
                    <h1 className="text-3xl font-bold text-white m-2">Shopping List</h1>
                    <NewItem onAddItem={handleAddItem} />
                    <ItemList items={items} onItemSelect={handleItemSelect} />
                </div>
                <div className="flex-auto my-3">
                     <MealIdeas ingredient={ingredient} />
                </div>
            </div>
        </main>
    );
}
