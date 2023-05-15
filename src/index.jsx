import './styles/style.css';
import prud from './assets/prud.jpg';
import './styles/scss.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => (
	<div className="container">
	<h1>Webpack Corse</h1>
	<hr/>
	<div className="logo">
	</div>
	<div className="box">
		<h2>SASS</h2>
	</div>
</div>
	);

const root = createRoot(document.getElementById('app'));
root.render(<App/>);
