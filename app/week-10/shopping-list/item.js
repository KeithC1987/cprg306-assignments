

export default function Item({ name, quantity, category, onSelect }) {
    return(
      <li className="flex justify-between items-center p-4 mx-4 my-2 bg-slate-900 max-w-sm  border-gray-700 rounded-lg cursor-pointer hover:bg-orange-500"
      onClick={() => onSelect(name)}>
      <div className="flex flex-col">
        <span className="text-2xl font-bold  text-white">{name}</span>
        <span className="text-sm text-gray-400 ">Buy {quantity} in {category}</span>
      </div>
    </li>
  );
  }