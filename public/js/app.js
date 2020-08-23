const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const p1 = document.querySelector('#number1')
const p2 = document.querySelector('#number2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    
    p1.textContent = ''
    p2.textContent = ''
    const location= searchInput.value
    
    fetch ('/weather?location='+ location).then((response)=>{
        response.json().then((data)=>{
            if (data.error){
                p1.textContent = (data.error)
            } else {
                p1.textContent = (data.Location)
                p2.textContent = (data.Forecast)
            }
            searchInput.value = '' 
        })
    })
})

