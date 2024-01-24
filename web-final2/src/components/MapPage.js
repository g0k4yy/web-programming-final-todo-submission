import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { Button } from 'reactstrap'; // Import from reactstrap

const MapPage = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [mapCenter, setMapCenter] = useState([51.505, -0.09]); // Default center

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    q: city,
                    appid: '459e37e5b84a7421d616a58fe0d63caf', // Replace with your actual API Key
                    units: 'metric'
                }
            });
            setWeatherData(response.data);
            setMapCenter([response.data.coord.lat, response.data.coord.lon]);
            console.log(weatherData);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const MapUpdater = () => {
        const map = useMap();
        map.setView(mapCenter, map.getZoom());
        return null;
    };
    

    return (
        <div style={{ textAlign: 'center' }}> {/* Centering the Map */}
            <h2>Map and Weather Forecast</h2>
            <input 
                type="text" 
                value={city} 
                onChange={handleCityChange} 
                placeholder="Enter a city" 
            />
            <Button color="primary mb-2" onClick={handleSearch}>Search</Button>
            <div style={{ margin: 'auto', width: '80%', height: '450px' }}> {/* Map Container Wrapper for Centering */}
                <MapContainer center={mapCenter} zoom={13} style={{ height: '90%', width: '90%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {weatherData && (
                        <Marker position={[weatherData.coord.lat, weatherData.coord.lon]}>
                            <Popup maxWidth="200">
                                <div style={{ textAlign: 'left' }}> {/* Ensure Content Fits in Popup */}
                                    <h3>Weather in {weatherData.name}</h3>
                                    {weatherData.weather[0].icon && (
                                        <img 
                                            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                                            alt="Weather icon" 
                                        />
                                    )}
                                    <p><strong>Temperature:</strong> {weatherData.main.temp} °C</p>
                                    <p><strong>Feels Like:</strong> {weatherData.main.feels_like} °C</p>
                                    <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
                                    <p><strong>Pressure:</strong> {weatherData.main.pressure} hPa</p>
                                    <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
                                    <p><strong>Description:</strong> {weatherData.weather[0].description}</p>
                                </div>
                            </Popup>
                        </Marker>
                    )}
                    <MapUpdater />
                </MapContainer>
            </div>
        </div>
    );
};

export default MapPage;