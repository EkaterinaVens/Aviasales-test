import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { debounce } from 'lodash';
import cls from './ticket-list.module.scss';
import Ticket from '../ticket';
import { useEventListener } from '../../hooks';

const renderTickets = (tickets) => {
  return tickets.map((ticket, id) => (
    // eslint-disable-next-line react/no-array-index-key
    <li className={cls.item} key={id}>
      <Ticket ticket={ticket} />
    </li>
  ));
};

const uploadTickets = (setShownTickets) => {
  return debounce(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop >= scrollHeight - clientHeight) {
      setShownTickets((value) => value + 5);
    }
  }, 1500);
};

const renderSpinner = () => {
  return <div className={cls.spinner}>Загрузка</div>;
};

function TicketList() {
  const tickets = useSelector((state) => state.readyTickets);
  const [shownTickets, setShownTickets] = useState(5);

  useEventListener('scroll', uploadTickets(setShownTickets));

  return (
    <ul className={cls.list}>
      {renderTickets(tickets.slice(0, shownTickets))}
      {shownTickets < tickets.length && renderSpinner()}
    </ul>
  );
}

export default TicketList;
