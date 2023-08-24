const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const compression = require('compression');
const path = require('path');
const data = require('./hotelData');

const API_KEY=process.env.API_KEY
const baseUrl = 'https://maps.googleapis.com/maps/api/place'
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
    console.log("yes")
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(compression());
// console.log(path.join(__dirname, './client/dist'))


app.use(express.json());

app.get('/', (req, res) => {
    const query = req.query.query
    console.log("get suggestions ",query)
    fetch(`${baseUrl}/autocomplete/json?input=${query}&key=${API_KEY}`)
    .then(data=> data.json())
    .then(data=> {
        // console.log("data",data)
        res.send({ data});
    })
    .catch(err => {
        console.error("error",err)
        res.status(500).send({err})
    })
    // console.log(req)
    
});

app.get('/getHotels', (req, res) => {
    const query = req.query.query
    console.log("gethotels",query)
    // console.log(req)
    const filteredHotels = data.hotels.filter(hotel => hotel.title.toLowerCase().includes(query.toLowerCase()) || 
    hotel.address.toLowerCase().includes(query.toLowerCase()))
    res.send({data:filteredHotels})
    
});

app.get('/getHotelDetails', (req, res) => {
    const id = req.query.id
    console.log(id)
    const hotel = data.hotels.find(hotel => hotel.hotelID === id)
    res.send(hotel)
    
});
app.get('/getPlaceDetails', (req, res) => {
    const id = req.query.id
    console.log(id)
    fetch(`${baseUrl}/details/json?place_id=${id}&key=${API_KEY}`)
    .then(data=> data.json())
    .then(data=> {
        // console.log("data",data)
        res.send(data);
    })
    .catch(err => {
        console.error("error",err)
        res.status(500).send({err})
    })
    
});

app.use(express.static(path.join(__dirname, './client/dist')));

app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './client/dist/index.html'));
  });




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

