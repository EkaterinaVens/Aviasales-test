import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { debounce } from 'lodash';
import Filters from '../filters';
import TicketList from '../ticket-list';
import cls from './tickets-page.module.scss';
import SortingButtons from '../sorting-buttons';
import { useEventListener } from '../../hooks';

const renderError = () => {
  return <div className={cls.error}>Oops, Something Went Wrong</div>;
};

const renderLoader = () => {
  return <div className={cls.loader}>Загружаем билеты...</div>;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const renderBackTop = () => {
  return (
    <button className={cls.backTop} type="button" onClick={scrollToTop}>
      Вверх
    </button>
  );
};

const renderNoTicketsNotify = () => {
  return <div className={cls.error}>Рейсов, подходящих под заданные фильтры, не найдено</div>;
};

const addingBackTopOnPage = (isScrolled, setIsScrolled) => {
  return debounce(() => {
    const { scrollTop, clientHeight } = document.documentElement;
    if (scrollTop >= clientHeight && !isScrolled) {
      setIsScrolled(true);
    }
    if (scrollTop < clientHeight && isScrolled) {
      setIsScrolled(false);
    }
  }, 100);
};

function TicketsPage() {
  const { isError, isStopped } = useSelector((state) => state.status);
  const [isScrolled, setIsScrolled] = useState(false);
  const ticketsCount = useSelector((state) => state.readyTickets.length);

  useEventListener('scroll', addingBackTopOnPage(isScrolled, setIsScrolled));

  return (
    <main className={cls.container}>
      <div className={cls.filters}>
        <Filters />
      </div>
      <div className={cls.content}>
        <SortingButtons />
        <div className={cls.tickets}>
          {isError && renderError()}
          {isStopped && !ticketsCount && renderNoTicketsNotify()}
          {!isError && !isStopped && renderLoader()}
          <TicketList />
        </div>
      </div>
      {isScrolled && renderBackTop()}
    </main>
  );
}

export default TicketsPage;
