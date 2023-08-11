const token = import.meta.env.VITE_TOKEN;

export const searchCities = async (citie) => {
  const weatherAPI = `http://api.weatherapi.com/v1/search.json?lang=pt&key=${token}&q=${citie}`;

  const response = await fetch(weatherAPI);

  const data = await response.json();
  if (data.length === 0) window.alert('Nenhuma cidade encontrada');
  return data;
};

export const getWeatherByCity = async (url) => {
  const citiesURL = `http://api.weatherapi.com/v1/current.json?lang=pt&key=${token}&q=${url}`;
  try {
    const response = await fetch(citiesURL);
    const data = await response.json();
    const weather = data.current;
    return weather;
  } catch (error) {
    console.log('Erro ao buscar clima:', error);
    throw error;
  }
};

export const sevenDaysForecast = async (url) => {
  const days = 7;
  const nextDaysAPI = `http://api.weatherapi.com/v1/forecast.json?lang=pt&key=${token}&q=${url}&days=${days}`;

  const response = await fetch(nextDaysAPI);
  const data = await response.json();
  const { forecast } = data;
  const { forecastday } = forecast;
  return forecastday.map((day) => {
    const { date, day: dayForTemp } = day;
    const { maxtemp_c: maxTemp, mintemp_c: minTemp, condition: conditionD } = dayForTemp;
    const { text: condition, icon } = conditionD;
    return { date, maxTemp, minTemp, condition, icon };
  });
};
