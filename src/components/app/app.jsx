import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/images/Logo.svg";
import TicketsPage from "../tickets-page";

import { fetchTickets, filterTickets, setStatus } from "../../store/actions";
import classes from "./app.module.scss";
import {
  selectFilters,
  selectSortingType,
  selectStatus,
} from "../../selectors";

export default function App() {
  const status = useSelector(selectStatus);
  const filters = useSelector(selectFilters);
  const sortingType = useSelector(selectSortingType);
  const { isLoaded, isStopped, isError } = status;
  const dispatch = useDispatch();
  const load = useCallback(() => dispatch(fetchTickets()), [dispatch]);
  const filter = useCallback(
    (...args) => dispatch(filterTickets(...args)),
    [dispatch]
  );

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
