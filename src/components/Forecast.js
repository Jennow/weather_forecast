import axios from 'axios';
import React, { useEffect, useState } from 'react';

const DateBlock = ({ dateString, city }) => {
	return <div className='dateHeadline'>{dateString}</div>;
};

const Forecast = ({ coordinates, city }) => {
	const [forecastData, setForecastData] = useState(null);
	const [dates, setDates] = useState([]);
	const [exactCity, setExactCity] = useState(null);

	useEffect(() => {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.long}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
			)
			.then((response) => {
				setForecastData(response.data);
				const tmpDates = [];
				let tmpDate = null;

				response.data.list.forEach((element) => {
					const date = new Date(
						element.dt * 1000
					).toLocaleDateString();
					if (date !== tmpDate) {
						tmpDate = date;
						tmpDates.push(date);
					}
				});
				setDates(tmpDates);
				setExactCity(response.data.city.name);
			});
	}, [city, coordinates]);

	console.log(forecastData);
	return (
		<div className='container'>
			<div className='itemsForDate'>
				<h2>
					Vorhersage für{' '}
					<span style={{ textTransform: 'capitalize' }}>{city} </span>
					({exactCity}){' '}
				</h2>

				{dates != null &&
					dates.map((dateString, i) => (
						<div key={i}>
							<DateBlock dateString={dateString} />
							<div className='tiles'>
								{forecastData != null &&
									forecastData.list != null &&
									forecastData.list.map((item, index) => {
										if (
											new Date(
												item.dt * 1000
											).toLocaleDateString() ===
											dateString
										) {
											return (
												<div
													key={index}
													className='tile'>
													<div className='time'>
														{new Date(
															item.dt * 1000
														).toLocaleTimeString()}
													</div>
													<div>
														<img
															alt='Wetter icon'
															src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}></img>
													</div>
													<div className='temperature'>
														{item.main.temp} °C
													</div>
												</div>
											);
										}
										return null;
									})}
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default Forecast;
