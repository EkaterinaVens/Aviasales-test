import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import cls from './sorting-buttons.module.scss';
import { setSortingType, setStatus } from '../../store/actions';

const BUTTONS_MODEL = [
  {
    type: 'cheapest',
    text: 'Самый дешевый',
  },
  {
    type: 'quickest',
    text: 'Самый быстрый',
  },
];

const renderButtons = (sortingType, onChangeType) => {
  return BUTTONS_MODEL.map(({ type, text }) => {
    const isActive = sortingType === type;
    return (
      <button
        type="button"
        key={type}
        className={cn(cls.btn, { [cls.activeBtn]: isActive })}
        data-type={type}
        disabled={isActive}
        onClick={onChangeType}
      >
        {text}
      </button>
    );
  });
};

const SortingButtons = () => {
  const dispatch = useDispatch();
  const onChangeType = useCallback(
    (evt) => {
      const { type } = evt.target.dataset;
      dispatch(setSortingType(type));
      dispatch(setStatus({ isNeedUpdate: true }));
    },
    [dispatch]
  );
  const { sortingType } = useSelector((state) => state);
  return <div className={cls.container}>{renderButtons(sortingType, onChangeType)}</div>;
};

export default SortingButtons;
