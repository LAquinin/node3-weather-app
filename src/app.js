const path = require('path')
const express = require ('express')
const hbs = require('hbs')
//llamar forecast y geocode
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app=express()
const port = process.env.PORT || 3000

//New path directory
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Handlebar (engine and view location)
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(publicPath))

//Home page app.com/
app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        author: 'Louise Aquinin'
    })
})

//About page app.com/about
app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About',
        author: 'Louise Aquinin'
    })
})

//help page app.com/help
app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        author: 'louise Aquinin',
        message: 'This is a helpful message'
    })
})

//Weather page app.com/weather
app.get('/weather', (req, res)=> {
    if (!req.query.location) {
        return res.send ({
            error: 'you must provide a location'
        })
    }

    //definir location para ser utilizada en geocode
    const location = req.query.location

    if (location){
        geocode (location, (error, {latitude, longitude, place_name}={}) =>{
            if (error != undefined){
                return res.send({
                    error: error
                })
            } 
            
            forecast(latitude, longitude, (error, data) => {
                if (error != undefined){
                    return res.send({
                        error: error
                    })
                }
                
                res.send({
                    Address: location,
                    Location: place_name,
                    Forecast: data
                })      
            })
        })    
    } else {
        res.send({
            error: 'Invalid Location. Try again'
        })
    }
})

//404 page for wrong help article
app.get('/help/*', (req, res)=>{
    res.render('404help', {
        title: '404',
        author: 'Louise Aquinin', 
        message: 'this article could not be found, go back to Help'
    })
})

//404 page
app.get('*', (req, res)=>{
    res.render ('404',{
        title: '404',
        author: 'Louise Aquinin',
        message: 'This page could not be found'
    })
})

app.listen(port, ()=>{
    console.log ('Server is up on port ' + port)
})