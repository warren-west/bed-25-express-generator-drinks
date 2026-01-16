// we want a variable to store the drinks
// it should be populated with drinks data when the server starts
// drinks data should not be fetched more than the one time. (only if the server restarts)

const API_URL = "https://my-json-server.typicode.com/SeanNoroff/drinks-api/drinks"
const drinksList = []

async function getDrinksFromApi() {
    if (drinksList.length == 0) {
        console.log(`🚨 PINGING THE API`)
        const resp = await fetch(API_URL)
        const json = await resp.json()
    
        drinksList.push(...json)
        console.log(`✅ Fetched drinksList data.`)
        console.log(drinksList)
    } else {
        console.log(`❌ Not fetching again because drinksList has data.`)
    }
}

module.exports = {
    drinksList,
    getDrinksFromApi,
}