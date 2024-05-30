

export default function Item({name, quantity, category}){


 
    return(
        <li className="flex justify-between items-center p-3 mx-4 my-4 bg-slate-900 max-w-sm  border-gray-700">
        <div className="flex flex-col">
          <span className="text-2xl font-bold  text-white">{name}</span>
          <span className="text-sm text-white ">Buy {quantity} in {category}</span>
        </div>
      </li>
    );


}