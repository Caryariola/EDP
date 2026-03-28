export function CartItem(item) {
  return `
    <div class="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
      <div class="flex items-center gap-4">
        <img src="${item.image}" alt="${item.title}" class="w-20 h-20 object-cover rounded-lg bg-gray-50">
        
        <div>
          <h3 class="font-bold text-gray-800 text-sm md:text-base">${item.title}</h3>
          <p class="text-blue-600 font-bold">$${item.price}</p>
        </div>
      </div>

      <div class="flex items-center gap-6">
        <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden">
          <button onclick="changeQty(${item.id}, -1)" class="px-3 py-1 bg-gray-50 hover:bg-gray-200 cursor-pointer">-</button>
          <span class="px-4 font-bold text-sm">${item.quantity}</span>
          <button onclick="changeQty(${item.id}, 1)" class="px-3 py-1 bg-gray-50 hover:bg-gray-200 cursor-pointer">+</button>
        </div>

        <button onclick="removeItem(${item.id})" class="text-red-500 hover:text-red-700 cursor-pointer transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </div>
    </div>
  `;
}