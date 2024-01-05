const apiKey = "ad2602838dcf4459b3ff577047f83cb3";
const city = document.getElementById("city");
const citytd = document.getElementById("cityDisplay");
const countrytd = document.getElementById("countryDisplay");
const temperature = document.getElementById("tempDisplay");
const humidity = document.getElementById("humidityDisplay");
const sky = document.getElementById("skyDisplay");
const skyImage = document.getElementById("image");
const countryName = new Intl.DisplayNames(['en'], {type: 'region'});

async function fetchData()
{
    if(city.value !== "")
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
    else {
        alert("Please enter a city name");
    }
}

function checkInput(data)
{
    if(city.value == countryName.of(data.sys.country).toLowerCase())
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
    document.querySelector('.container').style.visibility = "visible";
    citytd.innerText = data.name;
    countrytd.innerText = `${countryName.of(data.sys.country)}`
    temperature.innerText = Math.round(((data.main.temp * 100) / 100) - 273) + "°C";
    humidity.innerText = "Humidity: " + data.main.humidity + "%";
    sky.innerText = "Sky: " + data.weather[0].main;
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    skyImage.style.background = "url(" + iconUrl + ")";
}