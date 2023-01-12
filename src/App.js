import { useState } from 'react';
import './App.css';
import Forecast from './components/Forecast';
import SearchLocation from './components/SearchLocation';

function App() {
	const [coordinates, setCoordinates] = useState({
		lat: 47.376888,
		long: 8.541694,
	});
	const [city, setCity] = useState('Zürich');

	return (
		<div className='App'>
			<div
				className='
			header'>
				Wetter App
			</div>

			<div className='Widget'>
				<SearchLocation
					setCoordinates={setCoordinates}
					setCity={setCity}
				/>
				<Forecast
					coordinates={coordinates}
					city={city}
				/>
			</div>
		</div>
	);
}

export default App;
