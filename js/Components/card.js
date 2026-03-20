export function ProductCard(product) {
    return `
        <div class="product-card" id="item-${product.id}">
            <h3>${product.title}</h3>
            <p>${product.body}</p>
            <button class="add-btn">Add to Cart</button>
        </div>
    `;
}