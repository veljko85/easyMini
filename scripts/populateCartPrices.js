//POPULATE CART PRICES

function populateCartPrices(cartPricesLoaded) {
  let products = document.querySelectorAll("#SmartCart input");

  let productIds = [];
  for (let i = 0; i < products.length; i++) {
    productIds.push(products[i].attributes.pid.nodeValue.split("/ ")[2]);
  }

  let productApis = [];

  for (let i = 0; i < productIds.length; i++) {
    productApis.push(
      "https://mega-holz.de/wp-json/wc/store/products/" + productIds[i]
    );
  }

  let productPrices = [];

  for (let i = 0; i < productApis.length; i++) {
    productPrices.push("0");
    products[i].attributes.fprice.nodeValue = productPrices[i];
    products[i].attributes.pprice.nodeValue = productPrices[i];
  }
  let a = 0;
  for (let i = 0; i < productApis.length; i++) {
    fetch(productApis[i])
      .then((response) => response.json())
      .then((data) => {
        a += 1;
        // console.log(i, data.prices, a);
        productPrices[i] = data.prices.price;
        productPrices[i] =
          productPrices[i].substring(0, productPrices[i].length - 2) +
          "." +
          productPrices[i].substring(
            productPrices[i].length - 2,
            productPrices[i].length
          );
        products[i].attributes.fprice.nodeValue = productPrices[i];
        products[i].attributes.pprice.nodeValue = productPrices[i];
        if (a == productApis.length) cartPricesLoaded[0] = true;
      });
  }
}
