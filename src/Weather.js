import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ico01d from "./assets/icons/01d@2x.png";
import ico01n from "./assets/icons/01n@2x.png";
import ico02d from "./assets/icons/02d@2x.png";
import ico02n from "./assets/icons/02n@2x.png";
import ico03d from "./assets/icons/03d@2x.png";
import ico03n from "./assets/icons/03n@2x.png";
import ico04d from "./assets/icons/04d@2x.png";
import ico04n from "./assets/icons/04n@2x.png";
import ico09d from "./assets/icons/09d@2x.png";
import ico09n from "./assets/icons/09n@2x.png";
import ico10d from "./assets/icons/10d@2x.png";
import ico10n from "./assets/icons/10n@2x.png";
import ico11d from "./assets/icons/11d@2x.png";
import ico11n from "./assets/icons/11n@2x.png";
import ico13d from "./assets/icons/13d@2x.png";
import ico13n from "./assets/icons/13n@2x.png";
import ico50d from "./assets/icons/50d@2x.png";
import ico50n from "./assets/icons/50n@2x.png";

const iconMapping = {
  "01d": ico01d,
  "01n": ico01n,
  "02d": ico02d,
  "02n": ico02n,
  "03d": ico03d,
  "03n": ico03n,
  "04d": ico04d,
  "04n": ico04n,
  "09d": ico09d,
  "09n": ico09n,
  "10d": ico10d,
  "10n": ico10n,
  "11d": ico11d,
  "11n": ico11n,
  "13d": ico13d,
  "13n": ico13n,
  "50d": ico50d,
  "50n": ico50n,
};



function Weather() {
  const rCity = useRef();
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [temp, setTemp] = useState("");
  const [temp1, setTemp1] = useState("");
  const [temp2, setTemp2] = useState("");
  const [temp3, setTemp3] = useState("");
  const [temp4, setTemp4] = useState("");
  const [ico, setIco] = useState("");
  const [ico1, setIco1] = useState("");
  const [ico2, setIco2] = useState("");
  const [ico3, setIco3] = useState("");
  const [ico4, setIco4] = useState("");
  const [weather, setWeather] = useState("");
  const [citymsg, setCityMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDate = new Date();

  const hCity = (event) => {
    setCity(event.target.value);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (tdition) => {
          setLatitude(tdition.coords.latitude);
          setLongitude(tdition.coords.longitude);
          setLoading(false);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          setLoading(false);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      const s_url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=fe1fdc5f99b46096b24b1b166f5f6894&units=metric`;
      axios.get(s_url)
        .then(res => {
	  console.log(res.data);
	  const icon = iconMapping[res.data.weather[0].icon];
	  setIco(icon);
          setCityMsg(res.data.name);
          setTemp(res.data.main.temp);
          setWeather(res.data.weather[0].description);
        })
        .catch(err => {
          console.log("Issue in fetching weather from lat long ", err);
        });
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      const url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=fe1fdc5f99b46096b24b1b166f5f6894&units=metric`;
      axios.get(url2)
        .then(res => {
          var time = new Date().getHours();
          const icon1 = iconMapping[res.data.list[8].weather[0].icon];
          const icon2 = iconMapping[res.data.list[16].weather[0].icon];
          const icon3 = iconMapping[res.data.list[24].weather[0].icon];
          const icon4 = iconMapping[res.data.list[32].weather[0].icon];
          
          if ((time >= 0) && (time < 3)) {
            setTemp1(res.data.list[8].main.temp);
            setIco1(icon1);
            setTemp2(res.data.list[16].main.temp);
            setIco2(icon2);
            setTemp3(res.data.list[24].main.temp);
            setIco3(icon3);
            setTemp4(res.data.list[32].main.temp);
            setIco4(icon4);
          } else if ((time >= 3) && (time < 6)) {
            setTemp1(res.data.list[7].main.temp);
            setIco1(iconMapping[res.data.list[7].weather[0].icon]);
            setTemp2(res.data.list[15].main.temp);
            setIco2(iconMapping[res.data.list[15].weather[0].icon]);
            setTemp3(res.data.list[23].main.temp);
            setIco3(iconMapping[res.data.list[23].weather[0].icon]);
            setTemp4(res.data.list[31].main.temp);
            setIco4(iconMapping[res.data.list[31].weather[0].icon]);
          } else if ((time >= 6) && (time < 9)) {
            setTemp1(res.data.list[6].main.temp);
            setTemp2(res.data.list[14].main.temp);
            setTemp3(res.data.list[22].main.temp);
            setTemp4(res.data.list[30].main.temp);
            setIco1(iconMapping[res.data.list[6].weather[0].icon]);
            setIco2(iconMapping[res.data.list[14].weather[0].icon]);
            setIco3(iconMapping[res.data.list[22].weather[0].icon]);
            setIco4(iconMapping[res.data.list[30].weather[0].icon]);
          } else if ((time >= 9) && (time < 12)) {
            setTemp1(res.data.list[5].main.temp);
            setTemp2(res.data.list[13].main.temp);
            setTemp3(res.data.list[21].main.temp);
            setTemp4(res.data.list[29].main.temp);
            setIco1(iconMapping[res.data.list[5].weather[0].icon]);
            setIco2(iconMapping[res.data.list[13].weather[0].icon]);
            setIco3(iconMapping[res.data.list[21].weather[0].icon]);
            setIco4(iconMapping[res.data.list[29].weather[0].icon]);
          } else if ((time >= 12) && (time < 15)) {
            setTemp1(res.data.list[4].main.temp);
            setTemp2(res.data.list[12].main.temp);
            setTemp3(res.data.list[20].main.temp);
            setTemp4(res.data.list[28].main.temp);
            setIco1(iconMapping[res.data.list[4].weather[0].icon]);
            setIco2(iconMapping[res.data.list[12].weather[0].icon]);
            setIco3(iconMapping[res.data.list[20].weather[0].icon]);
            setIco4(iconMapping[res.data.list[28].weather[0].icon]);
          } else if ((time >= 15) && (time < 18)) {
            setTemp1(res.data.list[3].main.temp);
            setTemp2(res.data.list[11].main.temp);
            setTemp3(res.data.list[19].main.temp);
            setTemp4(res.data.list[27].main.temp);
            setIco1(iconMapping[res.data.list[3].weather[0].icon]);
            setIco2(iconMapping[res.data.list[11].weather[0].icon]);
            setIco3(iconMapping[res.data.list[19].weather[0].icon]);
            setIco4(iconMapping[res.data.list[27].weather[0].icon]);
          } else if ((time >= 18) && (time < 21)) {
            setTemp1(res.data.list[2].main.temp);
            setTemp2(res.data.list[10].main.temp);
            setTemp3(res.data.list[18].main.temp);
            setTemp4(res.data.list[26].main.temp);
            setIco1(iconMapping[res.data.list[2].weather[0].icon]);
            setIco2(iconMapping[res.data.list[10].weather[0].icon]);
            setIco3(iconMapping[res.data.list[18].weather[0].icon]);
            setIco4(iconMapping[res.data.list[26].weather[0].icon]);
          } else if ((time >= 21) && (time < 24)) {
            setTemp1(res.data.list[1].main.temp);
            setTemp2(res.data.list[9].main.temp);
            setTemp3(res.data.list[17].main.temp);
            setTemp4(res.data.list[25].main.temp);
            setIco1(iconMapping[res.data.list[1].weather[0].icon]);
            setIco2(iconMapping[res.data.list[9].weather[0].icon]);
            setIco3(iconMapping[res.data.list[17].weather[0].icon]);
            setIco4(iconMapping[res.data.list[25].weather[0].icon]);
          }
        })
        .catch(err => {
          console.log("Daily Forecast Error " + err);
        });
    }
  }, [latitude, longitude]);

	const handleSubmit = (event) => {
		event.preventDefault();
		getRealWeather();
		getRealWeather_4days();
	}
  const getRealWeather = () => {
    const s_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fe1fdc5f99b46096b24b1b166f5f6894&units=metric`;
    axios.get(s_url)
      .then(res => {
        const icon = iconMapping[res.data.weather[0].icon];
        setIco(icon);
        setCityMsg(res.data.name);
        setTemp(res.data.main.temp);
        setWeather(res.data.weather[0].description);

      })
      .catch(err => {
        console.log("Issue in fetching weather from city name", err);
      });
  };
	
  const getRealWeather_4days = () => {
    const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=fe1fdc5f99b46096b24b1b166f5f6894&units=metric`;
    axios.get(url2)
      .then(res => {
        var time = new Date().getHours();
        const icon1 = iconMapping[res.data.list[8].weather[0].icon];
        const icon2 = iconMapping[res.data.list[16].weather[0].icon];
        const icon3 = iconMapping[res.data.list[24].weather[0].icon];
        const icon4 = iconMapping[res.data.list[32].weather[0].icon];
        
        if ((time >= 0) && (time < 3)) {
          setTemp1(res.data.list[8].main.temp);
          setIco1(icon1);
          setTemp2(res.data.list[16].main.temp);
          setIco2(icon2);
          setTemp3(res.data.list[24].main.temp);
          setIco3(icon3);
          setTemp4(res.data.list[32].main.temp);
          setIco4(icon4);
        } else if ((time >= 3) && (time < 6)) {
          setTemp1(res.data.list[7].main.temp);
          setIco1(iconMapping[res.data.list[7].weather[0].icon]);
          setTemp2(res.data.list[15].main.temp);
          setIco2(iconMapping[res.data.list[15].weather[0].icon]);
          setTemp3(res.data.list[23].main.temp);
          setIco3(iconMapping[res.data.list[23].weather[0].icon]);
          setTemp4(res.data.list[31].main.temp);
          setIco4(iconMapping[res.data.list[31].weather[0].icon]);
        } else if ((time >= 6) && (time < 9)) {
          setTemp1(res.data.list[6].main.temp);
          setTemp2(res.data.list[14].main.temp);
          setTemp3(res.data.list[22].main.temp);
          setTemp4(res.data.list[30].main.temp);
          setIco1(iconMapping[res.data.list[6].weather[0].icon]);
          setIco2(iconMapping[res.data.list[14].weather[0].icon]);
          setIco3(iconMapping[res.data.list[22].weather[0].icon]);
          setIco4(iconMapping[res.data.list[30].weather[0].icon]);
        } else if ((time >= 9) && (time < 12)) {
          setTemp1(res.data.list[5].main.temp);
          setTemp2(res.data.list[13].main.temp);
          setTemp3(res.data.list[21].main.temp);
          setTemp4(res.data.list[29].main.temp);
          setIco1(iconMapping[res.data.list[5].weather[0].icon]);
          setIco2(iconMapping[res.data.list[13].weather[0].icon]);
          setIco3(iconMapping[res.data.list[21].weather[0].icon]);
          setIco4(iconMapping[res.data.list[29].weather[0].icon]);
        } else if ((time >= 12) && (time < 15)) {
          setTemp1(res.data.list[4].main.temp);
          setTemp2(res.data.list[12].main.temp);
          setTemp3(res.data.list[20].main.temp);
          setTemp4(res.data.list[28].main.temp);
          setIco1(iconMapping[res.data.list[4].weather[0].icon]);
          setIco2(iconMapping[res.data.list[12].weather[0].icon]);
          setIco3(iconMapping[res.data.list[20].weather[0].icon]);
          setIco4(iconMapping[res.data.list[28].weather[0].icon]);
        } else if ((time >= 15) && (time < 18)) {
          setTemp1(res.data.list[3].main.temp);
          setTemp2(res.data.list[11].main.temp);
          setTemp3(res.data.list[19].main.temp);
          setTemp4(res.data.list[27].main.temp);
          setIco1(iconMapping[res.data.list[3].weather[0].icon]);
          setIco2(iconMapping[res.data.list[11].weather[0].icon]);
          setIco3(iconMapping[res.data.list[19].weather[0].icon]);
          setIco4(iconMapping[res.data.list[27].weather[0].icon]);
        } else if ((time >= 18) && (time < 21)) {
          setTemp1(res.data.list[2].main.temp);
          setTemp2(res.data.list[10].main.temp);
          setTemp3(res.data.list[18].main.temp);
          setTemp4(res.data.list[26].main.temp);
          setIco1(iconMapping[res.data.list[2].weather[0].icon]);
          setIco2(iconMapping[res.data.list[10].weather[0].icon]);
          setIco3(iconMapping[res.data.list[18].weather[0].icon]);
          setIco4(iconMapping[res.data.list[26].weather[0].icon]);
        } else if ((time >= 21) && (time < 24)) {
          setTemp1(res.data.list[1].main.temp);
          setTemp2(res.data.list[9].main.temp);
          setTemp3(res.data.list[17].main.temp);
          setTemp4(res.data.list[25].main.temp);
          setIco1(iconMapping[res.data.list[1].weather[0].icon]);
          setIco2(iconMapping[res.data.list[9].weather[0].icon]);
          setIco3(iconMapping[res.data.list[17].weather[0].icon]);
          setIco4(iconMapping[res.data.list[25].weather[0].icon]);
        }
      })
      .catch(err => {
        console.log("Issue in fetching 4-day weather from city name", err);
      });
  };

  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator while fetching geolocation
  }

  return (
    <>
<div className="container-fluid p-4">
  <div className="text-center mb-5">
    <h1 className="display-2 fw-bold text-primary">Weather App</h1>
  </div>

  <div className="row justify-content-center mb-5">
    <div className="col-12 col-md-8 col-lg-6">
      <form onSubmit={handleSubmit} className="d-flex align-items-center">
        <input
          type="text"
          placeholder="Enter Location"
          className="form-control me-5 rounded-pill border-secondary shadow-lg"
          onChange={hCity}
          style={{ height:'60px', maxWidth: '500px', fontSize: '1.25rem' }}
        />
        <button
          type="submit"
          className="btn btn-warning rounded-pill px-5 py-3 fs-4 ms-4"
          style={{ height: '60px', lineHeight: '22px' }}
        >
          Get Weather
        </button>
      </form>
    </div>
  </div>

  <div className="card mx-auto mb-5 p-4 rounded-4 shadow-lg" style={{ maxWidth: '900px'}}>
    <div className="row align-items-center">
      <div className="col-5 text-end d-flex align-items-center justify-content-center">
        <img src={ico} className="img-fluid" alt="weather icon" style={{ height: '200px', width: 'auto', filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' }} />
      </div>
      <div className="col-7 text-start">
        <p className="day fs-3 fw-bold mb-1">Today</p>
        <p className="city fs-1 fw-bolder mb-2">{citymsg}</p>
        <p className="tempdata fs-4 fw-normal lh-1 mb-1">Temperature: {temp} °C</p>
        <p className="tempdata fs-5 fw-normal">{weather}</p>
      </div>
    </div>
  </div>

  <div className="row g-4 justify-content-center">
    <div className="col-12 col-sm-6 col-md-3">
      <div className="card border-dark rounded-4 shadow-lg" style={{}}>
        <div className="card-body text-center">
          <p className="card-title fs-5 mb-2 fw-bold text-dark">{daysOfWeek[(currentDate.getDay() + 1) % 7]}</p>
          <img src={ico1} alt="Weather icon" className="img-fluid" style={{ maxHeight: '80px', filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' }} />
          <p className="fs-4 mb-0">{temp1} °C</p>
        </div>
      </div>
    </div>
    <div className="col-12 col-sm-6 col-md-3">
      <div className="card border-dark rounded-4 shadow-lg" style={{ }}>
        <div className="card-body text-center">
          <p className="card-title fs-5 mb-2 fw-bold text-dark">{daysOfWeek[(currentDate.getDay() + 2) % 7]}</p>
          <img src={ico2} alt="Weather icon" className="img-fluid" style={{ maxHeight: '80px', filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' }} />
          <p className="fs-4 mb-0">{temp2} °C</p>
        </div>
      </div>
    </div>
    <div className="col-12 col-sm-6 col-md-3">
      <div className="card border-dark rounded-4 shadow-lg" style={{ }}>
        <div className="card-body text-center">
          <p className="card-title fs-5 mb-2 fw-bold text-dark">{daysOfWeek[(currentDate.getDay() + 3) % 7]}</p>
          <img src={ico3} alt="Weather icon" className="img-fluid" style={{ maxHeight: '80px', filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' }} />
          <p className="fs-4 mb-0">{temp3} °C</p>
        </div>
      </div>
    </div>
    <div className="col-12 col-sm-6 col-md-3">
      <div className="card border-dark rounded-4 shadow-lg" style={{ }}>
        <div className="card-body text-center">
          <p className="card-title fs-5 mb-2 fw-bold text-dark">{daysOfWeek[(currentDate.getDay() + 4) % 7]}</p>
          <img src={ico4} alt="Weather icon" className="img-fluid" style={{ maxHeight: '80px', filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' }} />
          <p className="fs-4 mb-0">{temp4} °C</p>
        </div>
      </div>
    </div>
  </div>
</div>


    </>
  );
}

export default Weather;
