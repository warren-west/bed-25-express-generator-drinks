const { getDrinksFromApi, drinksList } = require('../api/apiHelper')

async function populateDrinksMiddleware(req, res, next) {
    // fetch drink data if drinksList is empty
    if (drinksList.length == 0) {
        console.log(`✅ MIDDLEWARE POPULATED DRINKS LIST`)
        await getDrinksFromApi()
    }

    next()
}

module.exports = populateDrinksMiddleware