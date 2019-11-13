require("dotenv").config();

var unirest = require("unirest");
const axios = require("axios");


var keys = require("../keys.js");

var apiKey = keys.skyscannerKEY;


function getSessionID(destination, departureDate, returnDate) { 
    return new Promise(resolve =>{
        let start = unirest("POST", "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/v1.0");

        start.headers({
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": apiKey,
            "content-type": "application/x-www-form-urlencoded"
        });

        start.form({
            "inboundDate": returnDate, // YYYY-MM-DD
            "cabinClass": "economy",
            "children": "0",
            "infants": "0",
            "country": "US",
            "currency": "USD",
            "locale": "en-US",
            "originPlace": "BNA-sky",
            "destinationPlace": destination + "-sky", // Destination must be airport code
            "outboundDate": departureDate,
            "adults": "1"
        });

        start.end(function (res) {
            if (res.error) throw new Error(res.error);

            let location = res.headers.location;
            let sessionID = location.replace("http://partners.api.skyscanner.net/apiservices/pricing/uk2/v1.0/","");
            console.log("sessionID = " + sessionID);
            resolve(sessionID);
        });
    });
};

function getFlightResults(sessionID){
    
    console.log("Promise succcess " + sessionID);
    return new Promise(resolve =>{
        axios({
        "method":"GET",
        "url":"https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/pricing/uk2/v1.0/" + sessionID,
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "x-rapidapi-key": "99c0c74dd3mshd212d82d0830294p1c802ajsna0e5f09408fb"
        },"params":{
        "sortType":"price",
        "pageIndex":"0",
        "pageSize":"10"
        }
        })
        .then((response)=>{
            
            let flightAgent = response.data.Itineraries[0].PricingOptions[0].Agents[0]; //Select agent code number
            console.log("flight agent = " + flightAgent)

            let outboundID = response.data.Itineraries[0].OutboundLegId;
            let inboundID = response.data.Itineraries[0].InboundLegId;
            console.log("outboundID " + outboundID + " | inboundID " + inboundID)

            // Match leg IDs for leg info
            let allLegs = response.data.Legs
            let outboundLegInfo = allLegs.filter(leg => leg.Id === outboundID);
            let inboundLegInfo = allLegs.filter(leg => leg.Id === inboundID);
            console.log(outboundLegInfo[0].Carriers[0])
            
            // Match airline to flight legs
            let allAirlines = response.data.Carriers
            let outboundAirline = allAirlines.filter(carrier => carrier.Id === outboundLegInfo[0].Carriers[0])
            let inboundAirline = allAirlines.filter(carrier => carrier.Id === inboundLegInfo[0].Carriers[0])

            
            // console.log(inboundLegInfo[0])
            
            console.log("Airline " + outboundAirline[0].Name)

            // let allAgents = response.data.Agents; //Select array of Agent objects
            // console.log("all agents = " + response.data.Agents)

            // let agentName = matchAgent(allAgents,flightAgent); //Return name of flight Agent
            
            let flightResult = {
              price : response.data.Itineraries[0].PricingOptions[0].Price,
              airline : outboundAirline[0].Name,
              outboundDepartureTime : outboundLegInfo[0].Departure,
              outboundArrivalTime : outboundLegInfo[0].Arrival,
              inboundDepartureTime : inboundLegInfo[0].Departure,
              inboundArrivalTime : inboundLegInfo[0].Arrival,
              bookingURL : response.data.Itineraries[0].PricingOptions[0].DeeplinkUrl

            };
            console.log("Flight info", flightResult)
            resolve(flightResult);
                
        })
        .catch((error)=>{
          console.log(error) //.request.res.statusMessage
        });
    });
};




var searchFlights = async function (data) {
   console.log(data);
    var destination = data.airport;
    var departureDate = data.departure;
    var returnDate = data.return;
    let searchID = await getSessionID(destination, departureDate, returnDate); 
    return flightInfo = await getFlightResults(searchID,);

}


module.exports = {searchFlights: searchFlights}