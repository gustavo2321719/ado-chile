import React, { useState, useEffect } from 'react';
import Flag from 'react-world-flags';
import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz';

const countryCodes = {
  'Afganistán': 'AF',
  'Alemania': 'DE',
  'Argentina': 'AR',
  'Australia': 'AU',
  'Bangladesh': 'BD',
  'Brasil': 'BR',
  'Canadá': 'CA',
  'Chile': 'CL',
  'China': 'CN',
  'Colombia': 'CO',
  'Corea del Sur': 'KR',
  'España': 'ES',
  'Estados Unidos': 'US',
  'Francia': 'FR',
  'India': 'IN',
  'Japón': 'JP',
  'México': 'MX',
  'Perú': 'PE',
  'Reino Unido': 'GB',
  'Rusia': 'RU',
  'Tailandia': 'TH',
  'Italia': 'IT',
  'Venezuela': 'VE',
  'Países Bajos': 'NL',
  'Dinamarca': 'DK',
  'Bélgica': 'BE',
  'Singapur': 'SG',
  'Taiwán': 'TW',
  'Filipinas': 'PH',

};

const CountdownTimer = ({ targetDate, location, timeZone }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const concertDateInUTC = zonedTimeToUtc(targetDate, timeZone);
    const difference = concertDateInUTC - now;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        Días: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutos: Math.floor((difference / 1000 / 60) % 60),
        Segundos: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  const country = location.split(', ').pop();
  const countryCode = countryCodes[country];

  return (
    <div className="concert-item">
      {countryCode && <img src={`https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`} alt={country} />}
      <h2>{location}</h2>
      {timerComponents.length ? timerComponents : <span>Concierto Realizado</span>}
    </div>
  );
};

export default CountdownTimer;