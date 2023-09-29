// function for markup

function createMarkup(arr) {
  return arr
    .map(
      ({ img, name, price, qty }) => `
      <li class="card-item">
      <img class="product-img" src="${img}" alt="${name}">
      <h2>${name}</h2>
      <p>Quantity: ${qty}</p>
      <p>Total price: ${qty * price}</p>
    </li>`
    )
    .join('');
}

// Name export function
export { createMarkup };
