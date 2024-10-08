import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import './styles/globals.less'
import 'leaflet/dist/leaflet.css'; // Importation des styles Leaflet

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
