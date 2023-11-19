import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../images/Logo.svg';
import TicketsPage from '../tickets-page';
import classes from './app.module.scss';
import { fetchTickets, filterTickets, setStatus } from '../../store/actions';

export default function App() {
  const status = useSelector((state) => state.status);
  const filters = useSelector((state) => state.filters);
  const sortingType = useSelector((state) => state.sortingType);
  const { isLoaded, isStopped, isError } = status;
  const dispatch = useDispatch();
  const load = useCallback(() => dispatch(fetchTickets()), [dispatch]);
  const filter = useCallback((...args) => dispatch(filterTickets(...args)), [dispatch]);

  useEffect(() => {
    if (isLoaded) {
      filter();
      dispatch(setStatus({ isLoaded: false }));
      return;
    }
    if (!isStopped && !isError) {
      load();
    }
  }, [isLoaded, isStopped, isError, filter, dispatch, load]);

  useEffect(() => {
    filter();
  }, [filters, sortingType, filter]);

  return (
    <div className={classes.container}>
      <img className={classes.logo} src={logo} alt="aviasales logo" />
      <TicketsPage />
    </div>
  );
}
