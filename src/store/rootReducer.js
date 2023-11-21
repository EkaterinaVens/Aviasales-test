import initialState from './initialState';
import * as types from './types';

const ACTIVE_ALL_FILTERS = { all: true, withoutStops: true, oneStop: true, twoStops: true, threeStops: true };
const INACTIVE_ALL_FILTERS = { all: false, withoutStops: false, oneStop: false, twoStops: false, threeStops: false };

const filtersHandler = (prevFilters, filter) => {
  if (filter.type === 'all') {
    return filter.value ? ACTIVE_ALL_FILTERS : INACTIVE_ALL_FILTERS;
  }
  // Сливаем фильтры из стейта с входным фильтром
  // и достаём их значения для последующей проверки
  const filters = { ...prevFilters, [filter.type]: filter.value };
  const { withoutStops, oneStop, twoStops, threeStops } = filters;
  const filtersValues = Object.values({ withoutStops, oneStop, twoStops, threeStops });

  // Если все фильтры включены
  if (filtersValues.every((val) => val)) {
    return { ...filters, all: true };
  }
  // Если все фильтры отключены
  if (filtersValues.every((val) => !val)) {
    return { ...filters, all: false };
  }
  // Если хотя бы один фильтр выключен
  if (filtersValues.some((val) => !val)) {
    return { ...filters, all: false };
  }
  return filters;
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADED_TICKETS:
      return { ...state, loadedTickets: [...state.loadedTickets, ...action.payload] };
    case types.SET_SORTING_TYPE:
      return { ...state, sortingType: action.payload };
    case types.SET_FILTERS:
      return { ...state, filters: filtersHandler(state.filters, action.payload) };
    case types.SET_READY_TICKETS:
      return { ...state, readyTickets: action.payload };
    case types.SET_STATUS:
      return { ...state, status: { ...state.status, ...action.payload } };
    default:
      return state;
  }
};

export default rootReducer;
