const request=require('request')

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
        callback(undefined,(body.daily.data[0].summary+' The temperature is '+body.currently.temperature+' degress with '+body.currently.precipProbability+' probablity of raining'))
        }
    })
}
module.exports=forcast