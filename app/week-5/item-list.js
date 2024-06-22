"use client"

import React, { useState } from 'react';
import Item from './item';
import itemsData from './items.json';

export default function ItemList() {
  const [sortBy, setSortBy] = useState("name");

  const sortItems = (items, sortBy) => {
    return items.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'category') {
        return a.category.localeCompare(b.category);
      }
      return 0;
    });
  };

  const getGroupedItems = (items) => {
    return items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});
  };

  const sortedItems = sortBy === 'grouped' ? getGroupedItems(itemsData) : sortItems([...itemsData], sortBy);

  return (
    <div>
      <div className="mb-4">
        <label className="text-gray-300 mr-2">Sort by:</label>
        <button
          className={`bg-orange-500 p-1 m-2 w-28 rounded ${sortBy === 'name' ? 'bg-orange-500' : 'bg-orange-700'}`}
          onClick={() => setSortBy('name')}
        >
          Name
        </button>
        <button
          className={`bg-orange-500 p-1 m-2 w-28 rounded ${sortBy === 'category' ? 'bg-orange-500' : 'bg-orange-700'}`}
          onClick={() => setSortBy('category')}
        >
          Category
        </button>
        <button
          className={`bg-orange-500 p-1 m-2 w-28 rounded ${sortBy === 'grouped' ? 'bg-orange-500' : 'bg-orange-700'}`}
          onClick={() => setSortBy('grouped')}
        >
          Grouped Category
        </button>
        <label className="absolute top-20 left-240 text-gray-600 text-xs italic" htmlFor="group-category">← "Grouped Category" is an optional extra challenge</label>
      </div>

      {sortBy === 'grouped' ? (
        Object.keys(sortedItems).map((category) => (
          <div key={category}>
            <h2 className="text-lg font-bold capitalize text-white">{category}</h2>
            <ul>
              {sortedItems[category].sort((a, b) => a.name.localeCompare(b.name)).map(item => (
                <Item key={item.id} name={item.name} quantity={item.quantity} category={item.category} />
              ))}
            </ul>
          </div>
        ))
      ) : (
        <ul>
          {sortedItems.map(item => (
            <Item key={item.id} name={item.name} quantity={item.quantity} category={item.category} />
          ))}
        </ul>
      )}
    </div>
  );
}
