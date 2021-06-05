import {toCelsius} from "./tempTranslations";

const weatherApiUrl = (region: string) => `http://api.openweathermap.org/data/2.5/weather?q=${region}&appid=341fb58751e4e88fe0f40d0bad844273`

export interface Forecast {
    region: string,
    main: {
        "temp": number,
        "feels_like": number,
        "temp_min": number,
        "temp_max": number,
        "pressure": number,
        "humidity": number
    }
}

export interface TableState {
    forecasts: Forecast[];
}

export const initialState: TableState = {forecasts: []}

type FetchDataAction = {
    type: "FETCH",
    forecast: Forecast
}
type Action = FetchDataAction;

const extractMainInfo = (json: any): Forecast => ({region: json.name, main: json.main})

export const translateToCelsius = true;
export const actionCreators = {
    fetchForecast: (dispatch: (action: Action) => void, region = 'samara') => {
        fetch(weatherApiUrl(region))
            .then(response => response.json())
            .then(extractMainInfo)
            .then(forecast => {
                if (forecast.region !== undefined)
                    dispatch({
                        type: "FETCH",
                        forecast: translateToCelsius ? toCelsius(forecast) : forecast
                    });
                else
                    alert('Error occurred');
            })
    }
}

export const reducer = (state = initialState, action: Action): TableState => {
    switch (action.type) {
        case "FETCH":
            return {...state, forecasts: [...state.forecasts, action.forecast]};
        default:
            return state;
    }
}

