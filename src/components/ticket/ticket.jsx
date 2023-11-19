import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import cls from './ticket.module.scss';
import apiService from '../../services';

export default function Ticket({ ticket }) {
  const { price, carrier, segments } = ticket;
  // eslint-disable-next-line react/no-array-index-key
  const renderSegments = () => segments.map((segment, id) => <SegmentRoute segment={segment} key={id} />);

  const getTicketPrice = () => {
    const priceFormatted = new Intl.NumberFormat('ru-RU').format(price);
    return `${priceFormatted} Р`;
  };

  return (
    <div className={cls.container}>
      <div className={cls.header}>
        <span className={cls.price}>{getTicketPrice()}</span>
        <img className={cls.carrier} src={apiService.getCarrierLogo(carrier)} alt="" />
      </div>
      {renderSegments()}
    </div>
  );
}

Ticket.propTypes = {
  ticket: PropTypes.shape({
    price: PropTypes.number,
    carrier: PropTypes.string,
    segments: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

function SegmentRoute({ segment }) {
  const { origin, destination, date, stops, duration } = segment;

  const getStopsCountText = () => {
    switch (stops.length) {
      case 1:
        return '1 Пересадка';
      case 2:
      case 3:
        return `${stops.length} пересадки`;
      default:
        return 'Без пересадок';
    }
  };

  const getStops = () => stops.join(', ');
  const getTravelTime = () => {
    return `${Math.floor(duration / 60)}ч ${duration % 60}м`;
  };
  const getRouteTimes = () => {
    const origDate = new Date(date);
    const destDate = new Date(origDate.getTime() + duration * 6e4);
    return `${format(origDate, 'HH:mm')} - ${format(destDate, 'HH:mm')}`;
  };

  return (
    <div className={cls.segment}>
      <div className={cls.route}>
        <div className={cls.top}>{`${origin} - ${destination}`}</div>
        <div className={cls.bottom}>{getRouteTimes()}</div>
      </div>
      <div className={cls.length}>
        <div className={cls.top}>В пути</div>
        <div className={cls.bottom}>{getTravelTime()}</div>
      </div>
      <div className={cls.stops}>
        <div className={cls.top}>{getStopsCountText()}</div>
        <div className={cls.bottom}>{getStops()}</div>
      </div>
    </div>
  );
}

SegmentRoute.propTypes = {
  segment: PropTypes.shape({
    origin: PropTypes.string,
    destination: PropTypes.string,
    date: PropTypes.string,
    stops: PropTypes.arrayOf(PropTypes.string),
    duration: PropTypes.number,
  }).isRequired,
};
