import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const fallbackLng = ["en"];

const availableLanguages = ["en", "ru"];

const resources = {
  en: {
    translation: {
      "select_language": "Select Language",
      "max_klishevich": "Max Klishevich",
      "sign_out": 'Sign out',
      'logged_in': 'logged in',
      'login': 'Login',
      'add_item_to_shop': 'Add item to shop',
      'add_new_blog': 'Add new blog',
      'home': 'Home',
      'about': 'About',
      'shop': 'Shop',
      'blog': 'Blog',
      'work': 'Work',
      'title': 'Title',
      'content': 'Content',
      'sign_up': 'Sign up',
      'new_item_name': 'item \'s name',
      'amount_of_items': 'amount of items',
      'price': 'price',
      'Price': 'Price',
      'image_name': 'image\'s name',
      'turkey': 'Turkey',
      'liked': 'liked',
      'delete_blog': 'delete blog',
      'cart': 'Cart',
      'desc': 'Description',
      'qty': 'Qty.',
      'sum': 'Total',
      'subtotal': 'Subtotal',
      'tax_ship': 'Tax & Shipping',
      'total': 'Total',
      'min': "min.",
      'empty_cart': 'Your cart is empty',
      'clear_cart': 'Clear cart',
      'check_out': 'Check out',
      'go_shopping': 'Go to shop',
      'shipp_address': 'shipping addres',
      'first_name': 'first name',
      'second_name': 'second name',
      'address': 'address',
      'city': 'city',
      'state': 'state, region',
      'zip_code': 'zip code',
      'phone': 'phone number',
      'finish_order': 'sign up',
      'auth': 'Authorization',
      'name': 'name',
      'pass': 'password',
      'sign_in': 'Sign in',
      'sold_out': 'sold out',
      'in_stock': 'In stock: ',
      'full_size': 'Full size',
      'add_to_cart': 'Add to cart',
      'close': 'Close',
      'select_country': 'Select your country',
      'Shop': 'Shop',
      'email': 'e-mail',
      'A_new_blog': 'A new blog',
      'has_been_added': 'has been added',
      'place_your_text_here': 'place your text here',
      'smth_wrong': 'Something went wrong. Try later',
      'item_sold_out': 'Item is sold out',
      'added_to_cart': 'added to cart',
      'paris': 'Paris',
      'benares': 'Benares',
      'angkor': 'Angkor Wat',
      'amsterdam': 'Amsterdam',
      'san': 'San Francisco',
      'budapest': 'Budapest',
      'hong': 'Hong Kong',
      'key': 'Key West FL',
      'death': 'Death Valley',
      'telavi': 'Tel Aviv-Yafo',
      'crimea': 'Crimea',
      'solar': 'Solar eclipse Novosibirsk',
      'odessa': 'Odessa',
      'surgut': 'Surgut',
      'show_email': 'show e-mail',
      'max_klish': 'Max Klishevich',
      'select_image': 'Upload Image',
      'rub': 'Rubles',
      'currency': 'Choose currenсy',
      'usd': 'US dollar',
      'rur': 'Russian ruble',
      'select_category': 'Select type',
      'make_order': 'How to make order',
      'how_to_pay': 'How to pay',
      'shipping': 'Shipping',
      'contacts': 'Contacts'
    }
  },
  ru: {
    translation: {
      "select_language": "Выберите язык",
      "max_klishevich": "Макс Клишевич",
      'sign_out': 'Выйти',
      'logged_in': 'вошел',
      'login': 'Войти',
      'add_item_to_shop': 'Добавить товар в магазин',
      'add_new_blog': 'Добавить блог',
      'home': 'Главная',
      'about': 'Обо мне',
      'shop': 'Мой магазин',
      'blog': 'Блог',
      'work': 'Моя работа',
      'title': 'Заголовок',
      'content': 'Ваш контент',
      'sign_up': 'Зарегистрироваться',
      'new_item_name': 'название товара',
      'amount_of_items': 'кол-во предметов',
      'price': 'цена за единицу',
      'Price': 'Цена',
      'image_name': 'имя файла картинки',
      'turkey': 'Турция',
      'liked': 'нравится',
      'delete_blog': 'удалить блог',
      'cart': 'Корзина',
      'desc': 'Описание товара',
      'qty': 'Кол-во',
      'sum': 'Итого',
      'subtotal': 'Промежуточный итог',
      'tax_ship': 'Налоги и доставка',
      'total': 'Итого к оплате',
      'min': 'мин.',
      'empty_cart': 'Ваша корзина пуста',
      'clear_cart': 'Очистить корзину',
      'check_out': 'Оформить заказ',
      'go_shopping': 'Перейти в магазин',
      'shipp_address': 'адрес доставки',
      'first_name': 'имя',
      'second_name': 'фамилия',
      'address': 'адрес',
      'city': 'город',
      'state': 'регион',
      'zip_code': 'почтовый индекс',
      'phone': 'номер телефона',
      'finish_order': 'завершить оформление',
      'auth': 'Авторизация',
      'name': 'имя',
      'pass': 'пароль',
      'sign_in': 'войти',
      'sold_out': 'нет в наличии',
      'in_stock': 'В наличии: ',
      'full_size': 'посмотреть',
      'add_to_cart': 'в корзину',
      'close': 'Закрыть',
      'select_country': 'Выберете страну',
      'Shop': 'Каталог товаров',
      'email': 'электронная почта',
      'A_new_blog': 'Новый блог',
      'has_been_added': 'был добавлен',
      'place_your_text_here': 'поместите ваш текст здесь',
      'smth_wrong': 'Что-то пошло не так. Попробуйте позже.',
      'item_sold_out': 'Предмет продан',
      'added_to_cart': 'добавлен в корзину',
      'paris': 'Париж',
      'benares': 'Варанаси',
      'angkor': 'Ангкор Ват',
      'amsterdam': 'Амстердам',
      'san': 'Сан-Франциско',
      'budapest': 'Будапешт',
      'hong': 'Гонконг',
      'key': 'Ки-Уэст, Флорида',
      'death': 'Долина Смерти',
      'telavi': 'Тель-Авив',
      'crimea': 'Крым',
      'solar': 'Солнечное затмение Новосибирск',
      'odessa': 'Одесса',
      'surgut': 'Сургут',
      'show_email': 'показать e-mail',
      'max_klish': 'Макс Клишевич',
      'select_image': 'Загрузить картинку',
      'rub': 'рублей',
      'currency': 'Выберите валюту',
      'usd': 'Доллар США',
      'rur': 'Российский рубль',
      'select_category': 'Выберети тип',
      'make_order': 'Как сделать заказ',
      'how_to_pay': 'Способы оплаты',
      'shipping': 'Доставка',
      'contacts': 'Контакты и реквизиты'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng,

    detection: {
      checkWhitelist: true
    },

    debug: false,

    whitelist: availableLanguages,

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;