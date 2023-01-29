import React, { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Results from "./components/Results";
import Title from "./components/Title";

type ResultsStateType = {
  country: string;
  cityName: string;
  temperature: string;
  conditionText: string;
  icon: string;
};

function App() {
  const [city, setCity] = useState<string>("");
  const [results, setResults] = useState<ResultsStateType>({
    country: "",
    cityName: "",
    temperature: "",
    conditionText: "",
    icon: "",
  });
  const getWeather = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=d8b679fb06e1416cb44143127232901&q=${city}&aqi=no`
    )
      .then((res) => res.json())
      .then((data) => {
        setResults({
          country: data.location.country,
          cityName: data.location.name,
          temperature: data.current.temp_c,
          conditionText: data.current.condition.text,
          icon: data.current.condition.icon,
        });
      });
  };
  return (
    <div className="wrapper">
      <div className="container">
        <Title></Title>
        <Form setCity={setCity} getWeather={getWeather}></Form>
        <Results results={results}></Results>
      </div>
    </div>
  );
}

export default App;
