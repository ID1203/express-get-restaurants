const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
//TODO: Create your GET Request Route Below: 
app.get('/restaurants', async (req, res) => {
      const restaurants = await Restaurant.findAll();
      res.json(restaurants);
});

app.get("/restaurants/:id", async (req, res) => {
    const id = req.params.id
    const restaurant =  await Restaurant.findByPk(id)
    res.json(restaurant)

})

app.post("/restaurants", async (req, res) => {
    const { name, location, cuisine } = req.body;
    console.log(req.body)

    const newRestaurant = await Restaurant.create({
      name,
      location,
      cuisine,
    });
    res.json(newRestaurant);
})

app.put("/restaurants/:id", async (req,res) => {
    const {id} = req.params
    const { name, location, cuisine } = req.body;
    const restaurant =  await Restaurant.findByPk(id)
    restaurant.name = name 
    restaurant.location = location
    restaurant.cuisine = cuisine 
    await restaurant.save()
    res.json(restaurant)
})

app.delete("/restaurants/:id", async (req,res) => {
    const {id} = req.params 
    const restaurant = await Restaurant.findByPk(id)
    res.json(restaurant)
    await restaurant.destroy()
    res.json(restaurant)


})





module.exports = app;