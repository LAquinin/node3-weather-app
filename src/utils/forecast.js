
const request = require('request')

const forecast = (lat, lon, callback) => {
    url = 'http://api.weatherstack.com/current?access_key=6efc87aea10cf6c79180474256a8d46d&query='+ lat + ',' + lon + '&units=f'

    request({url, json: true}, (error, {body})=>{
        if (error) {
            callback('Unable to access the location server', undefined)
        } else if (body.error){
            callback ('Unable to find the location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. The current temperature is ' + body.current.temperature + ' degrees, but it feels like ' + body.current.feelslike +' degrees. The humidity is ' + body.current.humidity + '.')
        }
    })
}

module.exports = forecast
