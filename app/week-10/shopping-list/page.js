
'use client'; 


import { useUserAuth } from "../_utils/auth-context";
import NewItem from "./new-item";
import ItemList from "./item-list";
import { useState, useEffect } from "react";
import MealIdeas from "./meal-ideas";
import { useRouter } from "next/navigation";
import { getItems,addItem } from "../_services/shopping-list-service";


export default function Page(){

    const { user,loading } = useUserAuth();
    const router = useRouter();
    const [items, setItems] = useState([]);
    const [selectedItemName, setSelectedItemName] = useState("");
    const [ingredient, setIngredient] = useState("");
  
    useEffect(() => {
      if (!loading) {
        if (!user) {
            router.push("/week-10"); // Redirect to login page if user is not logged in
        } else {
            loadItems();
        }
      }
    }, [user, loading, router]);

    const loadItems = async () => {
      try {
          const userItems = await getItems(user.uid);
          setItems(userItems);
      } catch (error) {
          console.error("Error loading items: ", error);
      }
    };

    const handleAddItem = async (item) => {
      try {
        // Add item to the database
        const itemId = await addItem(user.uid, item); 
        // Update the item with the new ID from the database
        const newItem = { ...item, id: itemId }; 
        // Update the state with the new item
        setItems((prevItems) => [...prevItems, newItem]); 
      } catch (error) {
        console.error("Error adding item: ", error);
      }
    };

  
    if (!user) {
      return <div className="bg-slate-950 text-white p-4">Redirecting to login...</div>;
    }
  
    const handleItemSelect = (item) => {
      if (item && typeof item.name === 'string'){
      // Split the item name by comma and take the first part
      const namePart = item.name.split(',')[0].trim();
      // Remove emojis from the item name using regex
      const cleanedItemName = namePart.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
      setSelectedItemName(cleanedItemName);
      setIngredient(cleanedItemName);
      }else{
        console.error('Invalid item selected:', item);
      }

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
