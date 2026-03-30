export function ProductCard(product) {
    let imageUrl = product.images[0] ? product.images[0].replace(/[\[\]"]/g, "") : "";
    const fallbackImage = "https://placehold.co/400x400?text=No+Image+Available";

    return `
        <div class="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
            
            <div class="relative overflow-hidden aspect-square">
                <img 
                    src="${imageUrl}" 
                    onerror="this.src='${fallbackImage}'"
                    alt="${product.title}" 
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                >
                
            </div>

            <div class="p-4 flex flex-col flex-grow gap-2">
                <span class="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                    ${product.category.name}
                </span>
                
                <h3 class=" text-sm text-gray-800 line-clamp-2 h-10 leading-tight">
                    ${product.title}
                </h3>

                <div class="mt-auto flex flex-col gap-3">
                    <span class="text-xl font-black text-gray-900 leading-none">
                        $${product.price}
                    </span>
                    
                    <button onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${imageUrl}')" class="w-full bg-blue-600 text-white py-2.5 rounded-lg font-bold text-xs hover:bg-blue-800 active:scale-95 transition-all duration-200 cursor-pointer shadow-md shadow-blue-200">
                        ADD TO CART
                    </button>
                </div>
            </div>
        </div>
    `;
}