import * as types from './types';
import aviaService from '../services';

export const setStatus = (value) => {
  return {
    type: types.SET_STATUS,
    payload: value,
  };
};

export const changeFilter = (filter) => {
  return {
    type: types.SET_FILTERS,
    payload: filter,
  };
};

export const setReadyTickets = (tickets) => {
  return {
    type: types.SET_READY_TICKETS,
    payload: tickets,
  };
};

export const setLoadedTickets = (tickets) => {
  return {
    type: types.SET_LOADED_TICKETS,
    payload: tickets,
  };
};

export const setSortingType = (value) => {
  return {
    type: types.SET_SORTING_TYPE,
    payload: value,
  };
};

export const fetchTickets = () => async (dispatch) => {
  try {
    dispatch(setStatus({ isLoaded: false }));
    const searchId = await aviaService.getSearchId();
    const data = await aviaService.getTickets(searchId);
    dispatch(setLoadedTickets(data.tickets));
    dispatch(setStatus({ isLoaded: true }));
    if (data.stop) {
      dispatch(setStatus({ isStopped: true }));
    }
  } catch (err) {
    if (err.message === '500') {
      dispatch(fetchTickets());
    } else {
      dispatch(setStatus({ isError: true }));
    }
  }
};

export const sortTickets = (tickets) => (dispatch, getState) => {
  const { sortingType } = getState();
  if (!tickets) {
    return;
  }
  const sortedTickets = [...tickets];

  process.nextTick(() => {
    if (sortingType === 'cheapest') {
      sortedTickets.sort((ticketA, ticketB) => ticketA.price - ticketB.price);
    }
    if (sortingType === 'quickest') {
      sortedTickets.sort(
        (ticketA, ticketB) =>
          ticketA.segments[0].duration -
          ticketB.segments[0].duration +
          ticketA.segments[1].duration -
          ticketB.segments[1].duration
      );
    }
    dispatch(setReadyTickets(sortedTickets));
  });
};

export const filterTickets = () => (dispatch, getState) => {
  const { all, withoutStops, oneStop, twoStops, threeStops } = getState().filters;
  const filtersArr = Object.values({ withoutStops, oneStop, twoStops, threeStops });
  let filteredTickets = [...getState().loadedTickets];
  process.nextTick(() => {
    if (!all) {
      filteredTickets = filteredTickets.filter((ticket) => {
        return ticket.segments.every((segment) => {
          return filtersArr[segment.stops.length];
        });
      });
    }
    dispatch(sortTickets(filteredTickets));
  });
};
