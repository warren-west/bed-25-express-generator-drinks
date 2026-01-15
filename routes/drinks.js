const express = require('express')
const router = express.Router()
const { getDrinksFromApi } = require('../api/apiHelper')

/* GET /drinks */
router.get('/', async function (req, res) {
  // try fetch drink data to populate the drinksList
  const drinks = await getDrinksFromApi()
  console.log(`DRINKS.JS`)
  console.log(drinks)

  res.render('drinks', { title: 'Drinks', drinks })
})

module.exports = router