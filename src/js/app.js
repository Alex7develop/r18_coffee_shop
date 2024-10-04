// Фильтр слайдера для кофе
import Filter from './slider-coffee/filter';

// Навигация
import ControllNav from './navigation/controllNavigation';
import RedrawNav from './navigation/redrawNavigation';

// Мобильная навигация
import ControllNavM from './navigation-mobile/controllNavM';
import RedrawNavM from './navigation-mobile/redrawNavM';

// самый верхний слайдер с видео
import RedrawSlHead from './slider-head/redrawSlHead';
import ControllSlHead from './slider-head/controllSlHead';

// кофейный слайдер
import ControllSlСoffee from './slider-coffee/controllSlСoffee';
import RedrawSlСoffee from './slider-coffee/redrawSlСoffee';
// import sliderCoffeeData from '../base/slider-coffee.json';

// слайдер с карточками в перспективе
import ControllSLP from './slider-perspective/controllSlP';
import RedrawSLP from './slider-perspective/redrawSlP';
// import sliderMerchData from '../base/slider-merch.json';
// import sliderAccessData from '../base/slider-accessories.json';

// SERVICE
import ControlService from './service/controlService';
import RedrawService from './service/redrawService';

// Кнопка прокрутки вверх
import buttonToTop from './button-to-top/button-to-top';

// Заказы временно через контакты
import temporaryOrders from './temporary-orders/temporary-orders';

// DELIVERY
import ControllDelivery from './delivery/ControllDelivery';
import RedrawDelivery from './delivery/RedrawDelivery';

// ACCOUNT BUTTON
import ControllAccountButton from './accountButton/ControllAccountButton';
import RedrawAccountButton from './accountButton/RedrawAccountButton';

// BASKET BUTTON
import ControllBasketButton from './basketButton/ControlBasketButton';
import RedrawBasketButton from './basketButton/RedrawBasketButton';

// АССOUNT PAGE
import ControllAccount from './account/ControllAccount';
import RedrawTypeContent from './account/RedrawTypeContent';
import RedrawAccountProfile from './account/RedrawAccountProfile';
import RedrawHistory from './account/RedrawHistory';

// AIR DATAPICKER (для account)
import AirDatepicker from 'air-datepicker';

// IMASK
import IMask from 'imask';

window.addEventListener('load', () => {
  // SLIDER HEAD
  const sliderHead = document.querySelector('.slider-h');
  if (sliderHead) {
    const redrawSlHead = new RedrawSlHead(sliderHead);
    const controllSlHead = new ControllSlHead(redrawSlHead);
    controllSlHead.init();
  }

  // АССOUNT ВХОД - РЕГИСТРАЦИЯ
  const accButton = document.querySelector('.header__account');
  if (accButton) {
    const redraw = new RedrawAccountButton(accButton);
    const controll = new ControllAccountButton(redraw, IMask);
    controll.init();
  }

  // BASKET
  const basket = document.querySelector('.header__basket');
  let controllBasket;
  if (basket) {
    const mobileBasket = document.querySelector(
      '.nav-mob__item[data-item="basket"]'
    );

    const redraw = new RedrawBasketButton(basket, mobileBasket);
    controllBasket = new ControllBasketButton(redraw, IMask);
    controllBasket.init();
  }

  // ACCOUNT PAGE
  const account = document.querySelector('.account');
  if (account) {
    const redrawTypeContent = new RedrawTypeContent(account);

    const profile = account.querySelector('.account__profile');
    const redrawProfile = new RedrawAccountProfile(profile);

    const history = account.querySelector('.account__history');
    const redrawHistory = new RedrawHistory(history);

    const redraw = {
      content: redrawTypeContent,
      profile: redrawProfile,
      history: redrawHistory,
    };

    const controll = new ControllAccount(redraw, AirDatepicker, IMask);
    controll.init();
  }

  // Кофейный слайдер
//   const sliderCoffe1 = document.querySelector('.coffee__wr-slider-top');
//   if (sliderCoffe1) {
//     const filterList = sliderCoffe1.querySelector('.sl-prod__filter-list');

//     const redrawSlCoffe = new RedrawSlСoffee(sliderCoffe1, sliderCoffeeData);
//     const filter = new Filter(filterList);
//     const controllSlCoffe = new ControllSlСoffee(
//       redrawSlCoffe,
//       filter,
//       controllBasket.addToBasket
//     );
//     controllSlCoffe.init();
//   }

//вот рабочий вариант 
const sliderCoffe1 = document.querySelector('.coffee__wr-slider-top');
if (sliderCoffe1) {
    const filterList = sliderCoffe1.querySelector('.sl-prod__filter-list');

    async function fetchCoffeeData() {
        try {
            const response = await fetch('https://dev.r18.coffee/api/mainpage/coffee');
            const data = await response.json();
            console.log('Статус ответа который мы заслужили:', response.status);

            const transformedData = data.OFFERS.map(offer => {
                // Преобразуем значение поля 'packing'
                if (offer.packing === "Фильтр-кофе") {
                    offer.packing = "filter";
                }

                // Удаляем ненужные поля, если они не нужны
                delete offer.system_id;

                return {
                    packing: offer.packing,
                    "filter-name": offer["filter-name"],
                    id: offer.id,
                    part: offer.part,
                    title: offer.title,
                    taste: offer.taste,
                    region: offer.region,
                    height: offer.height,
                    sort: offer.sort,
                    processing: offer.processing,
                    q: offer.q,
                    roasting: offer.roasting,
                    harvest: offer.harvest,
                    weight: offer.weight,
                    img: offer.img,
                    link: "#",
                    description: `Кофе R18: '${offer.title}'`
                };
            });

            // Вывод преобразованных данных в консоль
            console.log('======>', transformedData);

            // Применение преобразованных данных к слайдеру
            const redrawSlCoffe = new RedrawSlСoffee(sliderCoffe1, transformedData);
            const filter = new Filter(filterList);
            const controllSlCoffe = new ControllSlСoffee(
                redrawSlCoffe,
                filter,
                controllBasket.addToBasket
            );
            controllSlCoffe.init();
        } catch (error) {
            console.error('Ошибочка:', error);
        }
    }

    fetchCoffeeData();
}
  // слайдер МЕРЧ с карточками в перспективе
  // const merchSL = document.querySelector('.merch__wr-slider .sl-p');
  // if(merchSL) {
  //     const redrawSLP = new RedrawSLP(merchSL, sliderMerchData);
  //     const controllSLP = new ControllSLP(redrawSLP, controllBasket.addToBasket);
  //     controllSLP.init();
  // }
  const merchSL = document.querySelector('.merch__wr-slider .sl-p');

  if (merchSL) {
    const fetchMerchData = async () => {
      try {
        const response = await fetch(
          'https://thingproxy.freeboard.io/fetch/https://dev.r18.coffee/api/mainpage/merch'
        );

        console.log('Статус ответа', response.status);

        if (!response.ok) {
          throw new Error('Ошибочка залетела');
        }

        const data = await response.json();
        return transformData(data);
      } catch (error) {
        console.error('Что-то не так', error);
        return null;
      }
    };

    const colorMapping = {
      '000000': { name: 'black', value: '#3F3937' },
      'ffffff': { name: 'white', value: '#ffffff' },
    };

    const mapColorToName = (color) => {
      return colorMapping[color] || { name: 'unknown', value: '#000000' };
    };

    const transformData = (data) => {
      return Object.values(data).map((item) => {
        const uniqueOffers = {};
        const offers = item.OFFERS;

        for (const offer of offers) {
          if (!uniqueOffers[offer.ID]) {
            uniqueOffers[offer.ID] = offer;
          }
        }

        const uniqueOffersArray = Object.values(uniqueOffers);
        const colors = Array.from(
          new Set(
            uniqueOffersArray.map((offer) => offer.PROPERTY_COLOR_REF_VALUE)
          )
        );

        const transformedItem = {
          article: item.ID,
          title: item.NAME,
          colors: colors.map(mapColorToName),
          price: `${parseInt(uniqueOffersArray[0]?.PRICE, 10)} р.`,
          composition: uniqueOffersArray
            .map((offer) => offer.PREVIEW_TEXT)
            .filter((v, i, a) => a.indexOf(v) === i),
          link: 'dev.r18.coffee',
          description: `Добавлен товар:  '${item.NAME}'`,
        };

        colors.forEach((color) => {
          const colorName = mapColorToName(color).name;
          const isSpecialItem = item.ID === '56';

          transformedItem[colorName] = {
            img: uniqueOffersArray
              .filter((offer) => offer.PROPERTY_COLOR_REF_VALUE === color)
              .flatMap((offer) => offer.PROPERTY_PICTURES_VALUE_SRC)
              .slice(0, isSpecialItem ? 3 : 2),
            sizes: uniqueOffersArray
              .filter((offer) => offer.PROPERTY_COLOR_REF_VALUE === color)
              .map((offer) => offer.PROPERTY_SIZE_VALUE)
              .filter((size, index, self) => self.indexOf(size) === index),
          };
        });

        return transformedItem;
      });
    };

    fetchMerchData().then((sliderMerchData) => {
      if (sliderMerchData) {
        const redrawSLP = new RedrawSLP(merchSL, sliderMerchData);
        const controllSLP = new ControllSLP(
          redrawSLP,
          controllBasket.addToBasket
        );
        controllSLP.init();
      }
    });
  }

  // слайдер АКСЕССУАРЫ с карточками в перспективе
//   const accessSL = document.querySelector('.accessories__wr-slider .sl-p');
//   if (accessSL) {
//     const redrawSLP = new RedrawSLP(accessSL, sliderAccessData);
//     const controllSLP = new ControllSLP(redrawSLP, controllBasket.addToBasket);
//     controllSLP.init();
//   }

const accessoriesSL = document.querySelector('.accessories__wr-slider .sl-p');

if (accessoriesSL) {
  const fetchAccessoriesData = async () => {
    try {
      const response = await fetch(
        'https://thingproxy.freeboard.io/fetch/https://dev.r18.coffee/api/mainpage/accessories'
      );

      console.log('Статус ответа', response.status);

      if (!response.ok) {
        throw new Error('Ошибка при загрузке данных');
      }

      const data = await response.json();
      return transformAccessoriesData(data);
    } catch (error) {
      console.error('Что-то пошло не так', error);
      return null;
    }
  };

  const transformAccessoriesData = (data) => {
    return Object.values(data).map((item) => {
      const uniqueOffers = {};
      const offers = item.OFFERS;

      for (const offer of offers) {
        if (!uniqueOffers[offer.ID]) {
          uniqueOffers[offer.ID] = offer;
        }
      }

      const uniqueOffersArray = Object.values(uniqueOffers);
      const colors = ['black']; 

      const transformedItem = {
        article: item.ID,
        title: item.NAME,
        colors: colors.map(() => ({
          name: '',
          value: ''
        })),
        price: `${parseInt(uniqueOffersArray[0]?.PRICE, 10)} р.`,
        composition: uniqueOffersArray
          .map((offer) => offer.PREVIEW_TEXT)
          .filter((v, i, a) => a.indexOf(v) === i),
        link: '#',
        description: `${item.NAME} ${uniqueOffersArray[0]?.PROPERTY_SIZE_VALUE || ''}`,
      };

      colors.forEach((color) => {
        transformedItem[color] = {
          img: uniqueOffersArray
            .flatMap((offer) => offer.PROPERTY_PICTURES_VALUE_SRC)
            .slice(0, 1),
          sizes: uniqueOffersArray
            .map((offer) => offer.PROPERTY_SIZE_VALUE)
            .filter((size, index, self) => self.indexOf(size) === index),
        };
      });

      return transformedItem;
    });
  };

  fetchAccessoriesData().then((sliderAccessoriesData) => {
    if (sliderAccessoriesData) {
      const redrawSLP = new RedrawSLP(accessoriesSL, sliderAccessoriesData);
      const controllSLP = new ControllSLP(
        redrawSLP,
        controllBasket.addToBasket
      );
      controllSLP.init();
    }
  });
}

  // кнопка прокрутки вверх
  const buttons = document.querySelectorAll('.button-to-top');
  if (buttons.length > 0) buttonToTop(buttons);

  // Навигация в HEADER
  const naviHeader = document.querySelector('.nav');
  if (naviHeader) {
    const redrawNav = new RedrawNav(
      naviHeader,
      '.sl-prod__filter-list',
    //   sliderCoffeeData
    );
    const controllNav = new ControllNav(redrawNav);
    controllNav.init();
  }

  if (innerWidth <= 991) {
    // Мобильная навигация
    const ctrl = document.querySelector('.nav-mob__control-list');
    const navM = document.querySelector('.nav-mob-list');
    if (navM) {
      const redrawNavM = new RedrawNavM(ctrl, navM, sliderCoffeeData);
      const controllNavM = new ControllNavM(redrawNavM);
      controllNavM.init();
    }
  }

  // Навигация в FOOTER
  const naviFooter = document.querySelector('.footer nav');
  if (naviFooter) {
    const redrawNav = new RedrawNav(naviFooter);
    const controllNav = new ControllNav(redrawNav);
    controllNav.init();
  }

  // Заказы временно через контакты
  const contacts = document.querySelector('.contacts');
  const temporaryLink = document.querySelector('.orders-are-temporary a');
  if (contacts && temporaryLink) {
    temporaryOrders(temporaryLink, contacts);
  }

  // SERVICE смена карточек
  const service = document.querySelector('.service');
  if (service) {
    const redrawService = new RedrawService(service);
    const controlService = new ControlService(redrawService);
    controlService.init();
  }

  // DELIVERY
  const delivery = document.querySelector('.delivery');
  if (delivery && innerWidth <= 1200) {
    const redraw = new RedrawDelivery(
      delivery,
      'delivery__controll-item_active',
      'delivery__direction_active'
    );
    const controll = new ControllDelivery(redraw);
    controll.init();
  }
});
