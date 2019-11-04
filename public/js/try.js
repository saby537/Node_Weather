const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const p1 = document.querySelector('#Location')
const p2 = document.querySelector('#Forcast')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    p1.textContent='Loading .........'
    p2.textContent=''
    
    fetch('/weather?address='+search.value).then((response)=>{
    response.json().then((data)=>{
        if(data.Error){
            return p1.textContent='Error: '+data.Error
        }
        p1.textContent=data.Location
        p2.textContent=data.forcast
    })
})
})