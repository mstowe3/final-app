import { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonList, IonItem, IonLabel, IonIcon, IonText } from '@ionic/react';
import { cloudOutline, sunnyOutline, rainyOutline, thunderstormOutline } from 'ionicons/icons';
import './WeatherForecast.css';

const API_KEY = '791119b1eb4577738faeb3057a6a6962'; 
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const WeatherForecast: React.FC = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [error, setError] = useState('');

  // Fetch weather data
  const fetchWeather = async () => {
    if (!city.trim()) return;
    setError('');

    try {
      const response = await fetch(`${WEATHER_API_URL}?q=${city}&appid=${API_KEY}&units=imperial`);
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
        fetchForecast(city);
      } else {
        setError('City not found. Try another.');
        setWeather(null);
      }
    } catch (err) {
      setError('Error fetching weather.');
      console.error(err);
    }
  };

  // Fetch 7-day forecast
  const fetchForecast = async (cityName: string) => {
    try {
      const response = await fetch(`${FORECAST_API_URL}?q=${cityName}&appid=${API_KEY}&units=imperial`);
      const data = await response.json();
      console.log('Forecast Data:', data); // Debugging log

      if (data.cod === '200') {
        const dailyForecast = data.list.filter((entry: any, index: number) => index % 8 === 0);
        setForecast(dailyForecast.map((day: any) => ({
          date: new Date(day.dt_txt).toLocaleDateString(),
          temp: day.main.temp,
          condition: day.weather[0].main,
        })));
      }
    } catch (err) {
      console.error('Error fetching forecast:', err);
    }
  };

  // Get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    if (condition.includes('Clear')) return sunnyOutline;
    if (condition.includes('Clouds')) return cloudOutline;
    if (condition.includes('Rain')) return rainyOutline;
    if (condition.includes('Thunderstorm')) return thunderstormOutline;
    return cloudOutline;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Weather Forecast</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="weather-container">
        {/* Location Input */}
        <IonInput
          className="weather-input"
          placeholder="Enter city..."
          value={city}
          onIonChange={e => setCity(e.detail.value!)}
        />
        <IonButton className="weather-button" expand="block" onClick={fetchWeather}>
          Get Weather
        </IonButton>

        {error && <IonText color="danger">{error}</IonText>}

        {/* Current Weather Display */}
        {weather && (
          <div className="weather-current">
            <IonIcon className="weather-icon" icon={getWeatherIcon(weather.weather[0].main)} />
            <h2>{weather.main.temp}°F - {weather.weather[0].description}</h2>
          </div>
        )}

        {/* 7-Day Forecast */}
        <IonList className="weather-list">
          {forecast.map((day, index) => (
            <IonItem key={index}>
              <IonLabel>{day.date} - {day.temp}°F - {day.condition}</IonLabel>
            </IonItem>
          ))}
        </IonList>

      
      </IonContent>
    </IonPage>
  );
};

export default WeatherForecast;