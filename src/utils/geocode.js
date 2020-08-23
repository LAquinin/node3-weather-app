const request = require('request')

const geocode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + (address) + '.json?access_token=pk.eyJ1IjoibGFxdWluaW4iLCJhIjoiY2tkbm1lMHc4MGRjczJyb3l1OGtwaHdpZyJ9.QdCX5L0nTOnVpvasPIG-gw&limit=1'  

    request ({url, json: true}, (error, {body})=>{
        if (error){
            callback('Unable to connect to location services!', undefined)
        }else if(body.message || body.features.length === 0){
            callback('Unable to find location. Try another search', undefined)
        }else{
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                place_name: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode