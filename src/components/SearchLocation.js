import axios from 'axios';
import React, { useRef, useState } from 'react';

const SearchLocation = ({ setCoordinates, setCity }) => {
	const cityInputRef = useRef(null);
	const [showError, setShowError] = useState(false);

	const updateCoordinates = (e) => {
		if (cityInputRef.current.value !== '') {
			axios
				.get(
					`https://api.openweathermap.org/geo/1.0/direct?q=${
						cityInputRef.current.value
					}&limit=${1}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
				)
				.then((response) => {
					if (response.data.length > 0) {
						const city = response.data[0];
						setCity(cityInputRef.current.value);
						setCoordinates({
							lat: city.lat,
							long: city.lon,
						});
						setShowError(false);
					} else {
						setShowError(true);
					}
				});
		}
	};

	return (
		<div className='searchLocation'>
			<input
				type='text'
				ref={cityInputRef}
				placeholder='Stadt eingeben'></input>
			<button onClick={updateCoordinates}>Suchen</button>
			{showError && (
				<p className='error'>
					Diese Stadt konnte nicht gefunden werden
				</p>
			)}
		</div>
	);
};

export default SearchLocation;
