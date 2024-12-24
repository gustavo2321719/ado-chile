import React from 'react';
import './App.css';
import CountdownTimer from './components/CountdownTimer';
import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz';
import { differenceInHours, differenceInMinutes, differenceInDays } from 'date-fns';

const continentMap = {
  'Japón': 'Asia y Australia',
  'Tailandia': 'Asia y Australia',
  'Filipinas': 'Asia y Australia',
  'Taiwán': 'Asia y Australia',
  'Corea del Sur': 'Asia y Australia',
  'China': 'Asia y Australia',
  'Singapur': 'Asia y Australia',
  'Australia': 'Asia y Australia',
  'Bélgica': 'Europa',
  'Dinamarca': 'Europa',
  'Alemania': 'Europa',
  'Reino Unido': 'Europa',
  'Países Bajos': 'Europa',
  'Francia': 'Europa',
  'España': 'Europa',
  'Italia': 'Europa',
  'Estados Unidos': 'Norteamérica',
  'Canadá': 'Norteamérica',
  'México': 'Latinoamérica',
  'Brasil': 'Latinoamérica',
  'Argentina': 'Latinoamérica',
  'Chile': 'Latinoamérica'
};

const concerts = [
  { date: '2025-04-26T17:00:00', location: 'Saitama, Japón', timeZone: 'Asia/Tokyo' },
  { date: '2025-04-27T16:00:00', location: 'Saitama, Japón', timeZone: 'Asia/Tokyo' },
  { date: '2025-05-04T18:00:00', location: 'Bangkok, Tailandia', timeZone: 'Asia/Bangkok' },
  { date: '2025-05-08T20:00:00', location: 'Manila, Filipinas', timeZone: 'Asia/Manila' },
  { date: '2025-05-11T18:00:00', location: 'Taipéi, Taiwán', timeZone: 'Asia/Taipei' },
  { date: '2025-05-15T20:00:00', location: 'Seúl, Corea del Sur', timeZone: 'Asia/Seoul' },
  { date: '2025-05-18T17:00:00', location: 'Hong Kong, China', timeZone: 'Asia/Hong_Kong' },
  { date: '2025-05-21T20:00:00', location: 'Singapur, Singapur', timeZone: 'Asia/Singapore' },
  { date: '2025-05-25T20:00:00', location: 'Sídney, Australia', timeZone: 'Australia/Sydney' },
  { date: '2025-05-27T20:00:00', location: 'Melbourne, Australia', timeZone: 'Australia/Melbourne' },
  { date: '2025-06-10T20:30:00', location: 'Amberes, Bélgica', timeZone: 'Europe/Brussels' },
  { date: '2025-06-14T20:30:00', location: 'Copenhague, Dinamarca', timeZone: 'Europe/Copenhagen' },
  { date: '2025-06-17T20:30:00', location: 'Berlín, Alemania', timeZone: 'Europe/Berlin' },
  { date: '2025-06-19T20:30:00', location: 'Londres, Reino Unido', timeZone: 'Europe/London' },
  { date: '2025-06-21T20:30:00', location: 'Ámsterdam, Países Bajos', timeZone: 'Europe/Amsterdam' },
  { date: '2025-06-25T20:30:00', location: 'París, Francia', timeZone: 'Europe/Paris' },
  { date: '2025-06-29T20:30:00', location: 'Barcelona, España', timeZone: 'Europe/Madrid' },
  { date: '2025-07-02T20:30:00', location: 'Milán, Italia', timeZone: 'Europe/Rome' },
  { date: '2025-07-10T20:00:00', location: 'Seattle, WA, Estados Unidos', timeZone: 'America/Los_Angeles' },
  { date: '2025-07-13T20:00:00', location: 'San José, CA, Estados Unidos', timeZone: 'America/Los_Angeles' },
  { date: '2025-07-16T20:00:00', location: 'Los Ángeles, CA, Estados Unidos', timeZone: 'America/Los_Angeles' },
  { date: '2025-07-19T20:00:00', location: 'Phoenix, AZ, Estados Unidos', timeZone: 'America/Phoenix' },
  { date: '2025-07-22T20:00:00', location: 'Fort Worth, TX, Estados Unidos', timeZone: 'America/Chicago' },
  { date: '2025-07-24T20:00:00', location: 'Duluth, GA, Estados Unidos', timeZone: 'America/New_York' },
  { date: '2025-07-26T20:00:00', location: 'Orlando, FL, Estados Unidos', timeZone: 'America/New_York' },
  { date: '2025-07-29T20:00:00', location: 'Baltimore, MD, Estados Unidos', timeZone: 'America/New_York' },
  { date: '2025-07-31T20:00:00', location: 'Chicago, IL, Estados Unidos', timeZone: 'America/Chicago' },
  { date: '2025-08-03T20:00:00', location: 'Toronto, ON, Canadá', timeZone: 'America/Toronto' },
  { date: '2025-08-05T20:00:00', location: 'Newark, NJ, Estados Unidos', timeZone: 'America/New_York' },
  { date: '2025-08-08T20:00:00', location: 'Ciudad de México, México', timeZone: 'America/Mexico_City' },
  { date: '2025-08-13T20:30:00', location: 'São Paulo, Brasil', timeZone: 'America/Sao_Paulo' },
  { date: '2025-08-15T20:30:00', location: 'Buenos Aires, Argentina', timeZone: 'America/Argentina/Buenos_Aires' },
  { date: '2025-08-18T21:00:00', location: 'Santiago, Chile', timeZone: 'America/Santiago' },
];

const getTimeRemaining = (concertDate, timeZone) => {
  const now = new Date(); // Fecha y hora actual en UTC
  const concertUTC = zonedTimeToUtc(concertDate, timeZone); // Convertir la fecha del concierto a UTC
  const days = differenceInDays(concertUTC, now);
  const hours = differenceInHours(concertUTC, now) % 24;
  const minutes = differenceInMinutes(concertUTC, now) % 60;
  return { days, hours, minutes };
};

const formattedConcerts = concerts.map(concert => {
  const concertDate = new Date(concert.date);
  const { days, hours, minutes } = getTimeRemaining(concertDate, concert.timeZone);
  return { ...concert, timeRemaining: `${days} days, ${hours} hours, and ${minutes} minutes` };
});

const groupedConcerts = formattedConcerts.reduce((acc, concert) => {
  const country = concert.location.split(', ').pop();
  const continent = continentMap[country] || 'Otros';
  if (!acc[continent]) {
    acc[continent] = [];
  }
  acc[continent].push(concert);
  return acc;
}, {});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hibana 2025 - Ado</h1>
        {Object.keys(groupedConcerts).map((continent) => (
          <div key={continent}>
            <h2>{continent}</h2>
            <div className="concert-list">
              {groupedConcerts[continent].map((concert, index) => (
                <CountdownTimer key={index} targetDate={concert.date} location={concert.location} timeZone={concert.timeZone} />
              ))}
            </div>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;