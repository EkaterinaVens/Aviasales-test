import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cls from './filters.module.scss';
import * as actions from '../../store/actions';

const filtersModel = [
  { key: 'all', text: 'Все' },
  { key: 'withoutStops', text: 'Без пересадок' },
  { key: 'oneStop', text: '1 пересадка' },
  { key: 'twoStops', text: '2 пересадки' },
  { key: 'threeStops', text: '3 пересадки' },
];

const renderFilters = (filters, changeFilter) => {
  return filtersModel.map(({ key, text }) => {
    return (
      <li className={cls.listItem} key={key}>
        <label className={cls.check}>
          <input
            className={cls.checkInput}
            type="checkbox"
            checked={filters[key]}
            onChange={() => {
              changeFilter({ type: key, value: !filters[key] });
            }}
          />
          <span className={cls.checkBox} />
          {text}
        </label>
      </li>
    );
  });
};

function Filters() {
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const changeFilter = useCallback(
    (value) => {
      dispatch(actions.changeFilter(value));
      dispatch(actions.setStatus({ isNeedUpdate: true }));
    },
    [dispatch]
  );

  return (
    <div className={cls.container}>
      <h3 className={cls.header}>Количество пересадок</h3>
      <ul className={cls.list}>{renderFilters(filters, changeFilter)}</ul>
    </div>
  );
}

export default Filters;
