// *************Практика*************** \\

// Для практичного завдання використаємо збірку Parcel та ES6 модулі
// Застосувати готові стилі з файлу style.css
// Потрібно створити інтернет-магазин в якому буде 2 сторінки.

// Сторінка Home має:
// 1 Містити картки товарів (їх можна знайти в файлі products.json)
// (приклад однієї картки https://prnt.sc/klV2uzLIcG8w)
// 2 На списку товарів реалізовано делегування подій на додавання товару в кошик
// 3 Для додавання товару в кошик використовуй LS
// 4 Під час додавання контролюй кількість доданих товарів, для цього створи в об'єкті доданого товару новий ключ quantity

// Сторінка Checkout має:
// 1 Список карток доданих товарів, кожна картка має містити кількість куплених товарів та загальна вартість за даний товар.
// (приклад однієї картки https://prnt.sc/ssZA4rzw1x9L)
// 2 Повідомлення про загальну вартість покупки, якщо кошик порожній, то повідомлення "Your basket is empty"
// 3 Кнопку для очищення кошика, після натискання на неї всі товари видаляються, а користувача перенаправляємо на сторінку Home

import instruments from './products.json';
import { createMarkup } from './templates/templatePLP';
import common from './common.json';

const products = JSON.parse(localStorage.getItem(common.LS_PRODUCTS)) ?? [];
const selectors = {
  list: document.querySelector('.js-list'),
};

selectors.list.insertAdjacentHTML('beforeend', createMarkup(instruments));
selectors.list.addEventListener('click', handlerAdd);

function handlerAdd(evt) {
  if (!evt.target.classList.contains('js-add')) {
    return;
  }

  const product = evt.target.closest('.js-product');
  const productId = Number(product.dataset.id);
  const currentProduct = instruments.find(({ id }) => id === productId);
  const idx = products.findIndex(({ id }) => id === productId);

  if (idx === -1) {
    currentProduct.qty = 1;
    products.push(currentProduct);
  } else {
    products[idx].qty += 1;
  }

  localStorage.setItem(common.LS_PRODUCTS, JSON.stringify(products));
}

const cart = new Map();

function addToCart(item) {
  if (cart.has(item)) {
    cart.set(item, cart.get(item) + 1);
  } else {
    cart.set(item, 1);
  }
}

addToCart('item1');
addToCart('item2');
addToCart('item1');

console.log(cart);

// так можно в корзину добавлять
