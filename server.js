const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');

app.set('port', process.env.PORT || 3000);
app.locals.title = "Binance Exchange API";
app.use(express.json());
app.use(cors());

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

app.get('/info', (request, response) => {
  const name = "Binance";
  const description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. N";
  const location = "country location";
  const logo = "https://example.com/exchange-logo.png";
  const website = "https://example.com";
  const twitter = "same twitter account"
  const version = "1.0";
  const capability = {
    markets: true,
    ordersSnapshot: true,
    candles: true
  }
  response.json({ name, description, location, logo, website, twitter, version, capability  });
});

app.get('/markets', (request, response) => {
  axios.get('http://api.binance.com/api/v3/exchangeInfo')
    .then(resp => {
      const data = resp.data.symbols;

      const translatedData = data.map(obj => {
        const typeOfTheMarket = obj.permissions;
        let finalTypeOfTheMarket = '';
        if (typeOfTheMarket[0] === 'SPOT') {
          finalTypeOfTheMarket = 'spot'
        } else {
          finalTypeOfTheMarket = 'derivative'
        }
        const translatedObject = {
          id: obj.symbol,
          type: finalTypeOfTheMarket,
          base: obj.baseAsset,
          quote: obj.quoteAsset
        }

        return translatedObject;
      })
      response.send({translatedData})
    })
    .catch(error => {
      console.log(`Error: `, error.message)
    })
});

