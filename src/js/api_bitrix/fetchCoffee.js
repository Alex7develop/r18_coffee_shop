export async function fetchCoffeeData() {
  try {
      const response = await fetch('https://dev.r18.coffee/api/mainpage/coffee');
      const data = await response.json();
      console.log('Статус ответа который мы заслужили:', response.status);

      const transformedData = data.OFFERS.map(offer => {
          if (offer.packing === "Фильтр-кофе") {
              offer.packing = "filter";
          }
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

      console.log('Вот тут готовый вариант ======>', transformedData);

      return transformedData; 
  } catch (error) {
      console.error('Ошибочка:', error);
  }
}
