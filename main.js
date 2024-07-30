let cities = [
    {
        arabicName:"مكة المكرمة",
        name:"Makkah al Mukarramah"
    },
    {
        arabicName:"الرياض",
        name:"Ar Riyāḑ"
    },
    {
        arabicName:"جزان",
        name:"Jāzān"
    },
    {
        arabicName:"القصيم",
        name:"Al Qaşīm"
    }
    
]

for(city of cities){
    const content = `
    <option>${city.arabicName}</option>
    `
    document.getElementById("city-select").innerHTML += content;
}

//Select
document.getElementById("city-select").addEventListener("change",function(){
    document.getElementById("header").innerHTML = this.value

    let cityname=""
    for(let city of cities){
        if(city.arabicName==this.value){
            cityname = city.name
        }
    }
    getprayOfcity(cityname)
})


function getprayOfcity(CityName){
    // Api
let params = {
    country:"SA",
    city:CityName //"Makkah al Mukarramah"
}
axios.get("http://api.aladhan.com/v1/timingsByCity", {
    params:params
})
.then(function (response) {
    const timings = response.data.data.timings
    TimePray("Fajr",timings.Fajr)
    // Simple Example
    // document.getElementById("Fajr").innerHTML = timings.Fajr
    console.log(response.data.data.timings.Fajr);

    TimePray("Fajr",timings.Fajr)
    TimePray("Sunrise",timings.Sunrise)
    TimePray("Dhuhr",timings.Dhuhr)
    TimePray("Asr",timings.Asr)
    TimePray("Maghrib",timings.Maghrib)
    TimePray("Isha",timings.Isha)

    // Simple Example   
    console.log(response.data.data.date.gregorian.date)
    console.log(response.data.data.date.hijri.weekday.ar)

    const date = response.data.data.date.gregorian.date
    const weekday = response.data.data.date.hijri.weekday.ar
    const plus = weekday+ " " +date;
    document.getElementById("day").innerHTML = plus
})
.catch(function (error) {
    console.log(error);
})

}

    function TimePray(id,time){
        document.getElementById(id).innerHTML = time
    }