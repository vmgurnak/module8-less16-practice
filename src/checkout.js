// import createMarkup
import { createMarkup } from './templates/templateCheckout';
// Дефолтный импорт объекта common.json с ключом
import common from './common.json';

// Объект селекторов
const selectors = {
  list: document.querySelector('.js-list'),
  btnClear: document.querySelector('.js-clear'),
};

// Массив из корзины, берет значение из localStorage, если ничего нет, тогда пустой массив
const products = JSON.parse(localStorage.getItem(common.LS_PRODUCTS)) ?? [];

// Проверка, если есть что-то в корзине, кнопка очистить корзину появляется
if (products.length) {
  selectors.btnClear.hidden = false;
}

// Создание разметки
selectors.list.insertAdjacentHTML('beforeend', createMarkup(products));

// Событие клик на кнопке очистить корзину, очистка localstorage
selectors.btnClear.addEventListener('click', handlerClear);
function handlerClear() {
  localStorage.removeItem(common.LS_PRODUCTS);
  // Очистка разметки
  // selectors.list.innerHTML = '';
  // Переход на страницу index.html
  window.location.href = './index.html';
}
