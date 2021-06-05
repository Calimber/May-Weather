import {useDispatch, useSelector} from "react-redux";
import {actionCreators, TableState, translateToCelsius} from "../store/tableReducer";
import "./Table.css"
import React, {ChangeEvent} from "react";

export const Table: React.FC = () => {

    const [region, setRegion] = React.useState('');

    const updateRegion = (e: ChangeEvent<HTMLInputElement>) => {
        setRegion(e.target.value);
    }

    const forecasts =
        useSelector<TableState, TableState['forecasts']>((state) => state.forecasts);

    const dispatch = useDispatch();

    let unit = '(C)';
    const onFetchClick = () => {
        actionCreators.fetchForecast(dispatch, region);
        setRegion('');
        unit = translateToCelsius ? '(C)' : '(K)';
    };

    return (
        <div className="Table">
            <input onChange={updateRegion} value={region} type="text" name="region" placeholder="Enter city name"/>
            <button onClick={onFetchClick}>Fetch</button>
            <table>
                <thead>
                <tr>
                    <th>Region</th>
                    <th>Temp. {unit}</th>
                    {/*<th>Temp. min {unit}</th>*/}
                    {/*<th>Temp. max {unit}</th>*/}
                    <th>Feels like {unit}</th>
                    <th>Humidity (%)</th>
                    <th>Pressure (hPa)</th>
                </tr>
                </thead>
                <tbody>
                {forecasts.map(forecast => {
                    return (
                        <tr key={forecast.region}>
                            <td>{forecast.region}</td>
                            <td>{forecast.main.temp.toFixed(2)}</td>
                            {/*<td>{forecast.main.temp_min.toFixed(2)}</td>*/}
                            {/*<td>{forecast.main.temp_max.toFixed(2)}</td>*/}
                            <td>{forecast.main.feels_like.toFixed(2)}</td>
                            <td>{forecast.main.humidity}</td>
                            <td>{forecast.main.pressure}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}