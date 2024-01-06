const apiKey = "ad2602838dcf4459b3ff577047f83cb3";
let intervalID;
const timetd = document.getElementById("timeDisplay");
const city = document.getElementById("city");
const citytd = document.getElementById("cityDisplay");
const countrytd = document.getElementById("countryDisplay");
const temperature = document.getElementById("tempDisplay");
const humidity = document.getElementById("humidityDisplay");
const sky = document.getElementById("skyDisplay");
const skyImage = document.getElementById("image");
const countryName = new Intl.DisplayNames(['en'], {type: 'region'});

document.getElementById("myForm").addEventListener("submit", (e) => {
    e.preventDefault();

    if(city.value !== "")
    {
        fetchData();
    }
    else {
        alert("Please enter a city name");
    }
})

async function fetchData()
{
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}`)
        if(!response.ok)
        {
            throw new Error("Couldnt fetch resource");
        }
        else {
            const data = await response.json();
            checkInput(data);
        }
    } catch (error) {
        console.error(error)
        alert("Oops! Something went wrong");
    }
}


function checkInput(data)
{
    if(city.value.toLowerCase() == countryName.of(data.sys.country).toLowerCase())
    {
        alert("Please enter a city name");
    }
    else {
        displayData(data);
    }
}


function displayData(data)
{
    console.log(data);
    citytd.innerText = data.name;
    countrytd.innerText = `${countryName.of(data.sys.country)}`
    temperature.innerText = Math.round(((data.main.temp * 100) / 100) - 273) + "°C";
    humidity.innerText = "Humidity: " + data.main.humidity + "%";
    sky.innerText = "Sky: " + data.weather[0].main;
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    skyImage.style.background = "url(" + iconUrl + ")";
    updateTime(data.timezone);
    clearInterval(intervalID);
    intervalID = setInterval(() => {updateTime(data.timezone)},1000);
}


function updateTime(timezoneOffset) {
    const time = new Date();
    const utc = time.getTime() + (time.getTimezoneOffset() * 60000);
    const localTime = new Date(utc + (1000 * timezoneOffset));
    const hour = localTime.getHours().toString().padStart(2, 0);
    const minute = localTime.getMinutes().toString().padStart(2, 0);
    const second = localTime.getSeconds().toString().padStart(2,0);
    const timeNow = `${hour}:${minute}:${second}`;
    timetd.innerText = timeNow;
}