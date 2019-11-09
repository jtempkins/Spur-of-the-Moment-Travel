const axios = require("axios");

var bookings = function (callback) {
  axios({
    "method": "GET",
    "url": "https://apidojo-booking-v1.p.rapidapi.com/properties/list",
    "headers": {
      //  "content-type":"application/octet-stream",
      "x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com",
      "x-rapidapi-key": "73fa84054dmsh20d3801b69bc360p1468bdjsn1cafe41c4f3b"
    }, "params": {
      "price_filter_currencycode": "USD",
      //  "travel_purpose":"leisure",
      "categories_filter": "price::9-40,class::1,class::0,class::2",
      "search_id": "none",
      "order_by": "popularity",
      "languagecode": "en-us",
      "search_type": "city",
      //  "offset":"0",
      "dest_ids": "20088325", // variable from aboe
      //  "guest_qty":"2",
      "arrival_date": "2019-12-05",
      "departure_date": "2019-12-10",
      //  "room_qty":"1"
    }
  })
    .then((response) => {

      var array01 = response.data.result;
      var array02 = array01.map(
        function (item) {
          try {
            return { hotel: item.hotel_name, price: item.price_breakdown.gross_price, url: item.url }
          } catch (error) {
            console.log(error)

          }
        }).filter(x => x !== undefined);;
      console.log(array02[0])
    })
    .catch((error) => {
      console.log(error)
    });
}
var mytest = bookings(function (data) { console.log(data) });
// console.log(mytest);
module.exports = bookings