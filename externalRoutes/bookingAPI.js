/* eslint-disable prettier/prettier */
const axios = require("axios");

var getHotel = async function(destID, arrival, departure) {
  //Asynchronus search for Booking API hotel results
  return new Promise(resolve => {
    axios({
      method: "GET",
      url: "https://apidojo-booking-v1.p.rapidapi.com/properties/list",
      headers: {
        //  "content-type":"application/octet-stream",
        "x-rapidapi-host": "apidojo-booking-v1.p.rapidapi.com",
        "x-rapidapi-key": "73fa84054dmsh20d3801b69bc360p1468bdjsn1cafe41c4f3b"
      },
      params: {
        "price_filter_currencycode": "USD",
        "categories_filter": "price::9-40,class::1,class::0,class::2",
        "search_id": "none",
        "order_by": "popularity",
        "languagecode": "en-us",
        "search_type": "city",
        "dest_ids": destID,
        "arrival_date": arrival,
        "departure_date": departure
      }
    })
      .then(response => {
        var searchResult = response.data.result;

        // Filter search results for specific room info (Name, price, link to booking)
        var roomResults = searchResult
          .map(function(item) {
            try {
              return {
                hotel: item.hotel_name,
                price: item.price_breakdown.gross_price,
                url: item.url
              };
            } catch (error) {
              console.log(error);
            }
          })
          .filter(x => x !== undefined); //Filter out rooms with missing information

        let roomInfo = roomResults[0]; //Selects first index of room results to send back to user
        resolve(roomInfo);
      })
      .catch(error => {
        console.log(error);
      });
  });
};

module.exports = { getHotel: getHotel };
