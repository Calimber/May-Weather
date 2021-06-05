import {Forecast} from "./tableReducer";

export const toCelsius = (forecast: Forecast): Forecast => {
    return {
        ...forecast,
        main: {
            ...forecast.main,
            temp: kelvinToCelsius(forecast.main.temp),
            feels_like: kelvinToCelsius(forecast.main.feels_like),
            temp_max: kelvinToCelsius(forecast.main.temp_max),
            temp_min: kelvinToCelsius(forecast.main.temp_min),
        }
    }
}

const kelvinToCelsius = (temp : number) => temp - 273.15;