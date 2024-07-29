import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query } from "firebase/firestore";

export async function getItems(userId){
    const items = [];
    try{
        const itemsCollectionReference = collection(db,`users/${userId}/items`);

        const itemsQuery = query(itemsCollectionReference);

        const querySnapshot = await getDocs(itemsQuery);

        querySnapshot.forEach((doc)=> {items.push({id:doc.id,...doc.data()});
    });
    }catch(error){
        console.error("Error fetching items: ",error);
    }
    return items;
}


export async function addItem(userId, item){
    try{
        const itemsCollectionReference = collection(db,`users/${userId}/items`);
        const docRef = await addDoc(itemsCollectionReference, item);
        return docRef.id;
    }catch(error){
        console.error("Error fetching items: ",error);
        throw error;
    }

}
