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

// Дефолтный импорт массива продуктов products.json
import instruments from './products.json';
// console.log(instruments);
// Именнованный импорт функции разметки
import { createMarkup } from './templates/templatePLP';
// Дефолтный импорт массива common.json с ключом
import common from './common.json';

// Объект селекторов
const selectors = {
  list: document.querySelector('.js-list'),
};

// Создание разметки
selectors.list.insertAdjacentHTML('beforeend', createMarkup(instruments));

// Массив для корзины, берет значение из localStorage, если ничего нет, тогда пустой массив
const products = JSON.parse(localStorage.getItem(common.LS_PRODUCTS)) ?? [];

// Слушатель с делегированрием, событие клик на элементе li
selectors.list.addEventListener('click', handlerAdd);
function handlerAdd(evt) {
  //  Событие работает только при клике на кнопку, класс js-add на кнопке
  if (!evt.target.classList.contains('js-add')) {
    return;
  }

  // Получение первого родителя с классом .js-product' - ли элемент
  const product = evt.target.closest('.js-product');
  // Получение дата атрибута id, приведение к числу, при клике на кнопку товара
  const productID = Number(product.dataset.id);
  // Получение информации по продукту элемент массива instruments совпадающий по id с выбранным при клике, метод find
  const currentProduct = instruments.find(({ id }) => id === productID);
  // console.log(currentProduct);

  // Есть ли в массиве продуктов, которіе уже покупали, индекс продукта с id таким же, ка кликнули по карточке
  // Получение индекса элемента массива корзины, если товар с id по которому клик уже есть в корзине, или -1, если его нет
  const idx = products.findIndex(({ id }) => id === productID);
  // Добавление объекта с характеристиками продукта в корзину
  // Добавление ключа qty элементам массива корзины для подсчета количества одинаковых товаров
  if (idx == -1) {
    // Ключ qty по индексу продукта [idx] увеличивается на 1
    currentProduct.qty = 1;
    products.push(currentProduct);
  } else {
    products[idx].qty += 1;
  }
  // Вывод в консоль корзины (массив объектов)
  // console.log(products);
  // Запись в localStorage
  localStorage.setItem(common.LS_PRODUCTS, JSON.stringify(products));
}
