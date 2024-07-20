
'use client'

import { useState, useEffect } from "react";


export default function MealIdeas({ingredient}){


    const[meals, setMeals] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [mealDetails, setMealDetails] = useState(null);


    async function fetchMealIdeas(ingredient) {
        try {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
          const data = await response.json();
          return data.meals || [];
        } catch (error) {
          console.error("Error fetching meal ideas:", error);
          return [];
        }
      }


    async function fetchMealDetails(idMeal) {
        try {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
          const data = await response.json();
          return data.meals ? data.meals[0] : null;
        } catch (error) {
          console.error("Error fetching meal details:", error);
          return null;
        }
      }

      // Load Meal Ideas Function
  async function loadMealIdeas() {
    const mealIdeas = await fetchMealIdeas(ingredient);
    setMeals(mealIdeas);
    setSelectedMeal(null);
    setMealDetails(null);
  }


  useEffect(() => {
    if (ingredient) {
      (async () => {
        const mealIdeas = await fetchMealIdeas(ingredient);
        setMeals(mealIdeas);
        setSelectedMeal(null);
        setMealDetails(null);
      })();
    } else {
      setMeals([]);
      setSelectedMeal(null);
      setMealDetails(null);
    }
  }, [ingredient]);

  // Handle Meal Selection
  async function handleMealSelect(meal) {
    if (selectedMeal && selectedMeal.idMeal === meal.idMeal) {
        // Deselect if the same meal is clicked
        setSelectedMeal(null);
        setMealDetails(null);
      } else {
        const details = await fetchMealDetails(meal.idMeal);
        setSelectedMeal(meal);
        setMealDetails(details);
    }
}




return (
    <div>
      <h1 className="text-2xl text-white">Meal Ideas</h1>
      <p className="text-white mb-4">
        {ingredient
          ? meals.length > 0
            ? `Here are some meal ideas using ${ingredient}:`
            : `No meal ideas found for ${ingredient}`
          : 'Select an item to see meal ideas'}
      </p>
      {meals.length > 0 && (
        <ul className="list-none p-0">
          {meals.map(meal => (
            <li 
              key={meal.idMeal} 
              className="mb-5 text-white cursor-pointer hover:bg-orange-500"
              onClick={() => handleMealSelect(meal)}
            >
              <span>{meal.strMeal}</span>
              {selectedMeal && selectedMeal.idMeal === meal.idMeal && mealDetails && (
                <div className="mt-2">
                  <h2 className="text-xl mb-2">Ingredients:</h2>
                  <ul className="list-disc list-inside">
                    {Array.from({ length: 20 }, (_, i) => i + 1).map(i => {
                      const ingredient = mealDetails[`strIngredient${i}`];
                      const measure = mealDetails[`strMeasure${i}`];
                      return ingredient ? (
                        <li key={i}>{ingredient} {measure && `- ${measure}`}</li>
                      ) : null;
                    })}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}