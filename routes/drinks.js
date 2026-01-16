const express = require('express')
const router = express.Router()
const { drinksList } = require('../api/apiHelper')

/* GET /drinks */
router.get('/', function (req, res) {
  const currentUser = req.user ? req.user : undefined
  res.render('drinks', { title: 'Drinks', drinksList, currentUser })
})

// GET /drinks/5
router.get('/:id', (req, res) => {
  console.log("We've landed on the /drinks/:id page")

  if (req.isAuthenticated()) {
    // if the user is logged in, show the drinksDetails page

    // filter drinksList to find the drink whose ID matches the ID in the URL
    const matchingDrink = drinksList.find(d => d.id == req.params.id)

    res.render('drinkDetails', {
      title: "Drink Details",
      matchingDrink,
    })
  } else {
    // if the user is NOT logged in, redirect to the drinks menu page
    res.redirect('/drinks')
  }

})

module.exports = router