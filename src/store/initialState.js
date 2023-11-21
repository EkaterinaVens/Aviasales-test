const initialState = {
  status: {
    isLoaded: false,
    isStopped: false,
    isError: false,
  },
  loadedTickets: [],
  readyTickets: [],
  filters: {
    all: false,
    withoutStops: true,
    oneStop: true,
    twoStops: false,
    threeStops: false,
  },
  sortingType: 'cheapest',
};

export default initialState;
