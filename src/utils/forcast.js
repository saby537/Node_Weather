const request=require('request')
const raise=require('superscript-text')

const forcast=(lat,long,callback)=>{
    const url='https://api.darksky.net/forecast/ae4b10e85bc734f9fad576a1f6df8649/'+lat+','+long+''
    request({url,json:true},(error,{body})=>{
        if(error){
           callback('Unable to connect to Weather Services !!',undefined)
        }
        else if(body.error){
            callback('Incorrect Location Entry !!!!',undefined)
        }
        else{
            
            const temp=Math.round((5/9)*(body.currently.temperature-32))
            callback(undefined,(body.daily.data[0].summary+' The temperature is '+temp+raise("0")+'C with '+(body.currently.precipProbability*100)+'% chance of raining. Humidity is '+body.currently.humidity))
        }
    })
}
module.exports=forcast