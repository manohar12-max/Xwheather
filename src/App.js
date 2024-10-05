import { useState } from "react";
import "./styles.css";
import axios from "axios";
let url =
  "https://api.weatherapi.com/v1/current.json?key=f580763ae76e40f7b1685212240510&q=";
export default function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    fetchData();
  };
  const fetchData = async () => {
    if (input == "") return;
    input.charAt(0).toUpperCase(), setLoading(true);
    try {
      let res = await axios.get(`${url}${input}`);
      setData(res.data);
    } catch (e) {
      setData({});
      alert("Failed to fetch weather data");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="App">
      <form onSubmit={submit}>
        <input
          onChange={(e) => {
            setInput(e.target.value);
          }}
          required
          type="text"
          placeholder="Enter city name"
        />{" "}
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        JSON.stringify(data) != "{}" && (
          <div className="weather-cards">
            <div className="weather-card">
              <h4>Temparature</h4>
              <p>{data.current.temp_c}°C</p>
            </div>
            <div className="weather-card">
              <h4>Humidity</h4>
              <p>{data.current.humidity}%</p>
            </div>
            <div className="weather-card">
              <h4>Condition</h4>
              <p>{data.current.condition.text}</p>
            </div>
            <div className="weather-card">
              <h4>Wind Speed</h4>
              <p>{data.current.wind_kph} kph</p>
            </div>
          </div>
        )
      )}
    </div>
  );
}
