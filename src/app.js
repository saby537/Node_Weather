const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forcast=require('./utils/forcast')

const app=express()

// Define paths for express
const publicPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates')
const partialPath=path.join(__dirname,'../templates/partials')
//Setup handlebars engine and viewlocation
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicPath))

app.get((''),(req,res)=>{
    res.render('index',{
        title:'Weather App',
        creator: 'Saby'
    })
})
app.get(('/about'),(req,res)=>{
    res.render('about',{
        title:'About Me',
        creator: 'Saby'
    })
})
app.get(('/help'),(req,res)=>{
    res.render('help',{
        title:'Help',
        creator: 'Saby'
    })
})
app.get(('/weather'),(req,res)=>{
    const query=req.query
    if(!query.address){
        return res.send({
            'Error' : 'Enter an address'
        })
    }
    geocode(query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
        return  res.send({
            'Error': error
            })
        }
    
        forcast(latitude,longitude,(error,fdata)=>{
            if(error){
                return  res.send({
                    'Error': error
                    })
            }
            res.send({
                'Location': location,
                'forcast': fdata        
            })
        })
    })

})
app.get(('/help/*'),(req,res)=>{
    res.render('404',{
        title:'Help',
        creator: 'Saby',
        message: 'Help Article not found'
    })
})
app.get(('*'),(req,res)=>{
    res.render('404',{
        title:'Help',
        creator: 'Saby',
        message: 'Page not found'

    })
})
app.listen(3000,()=>{
    console.log('Server is running !!!!')
})