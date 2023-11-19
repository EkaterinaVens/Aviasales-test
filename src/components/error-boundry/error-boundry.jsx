import React from 'react';
import cls from './error-boundry.module.scss';
import errorImg from '../../images/error.svg';

export default class ErrorBoundry extends React.Component {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  renderError() {
    return (
      <div className={cls.container}>
        <div className={cls.error}>
          <img src={errorImg} width="80" alt="error" className={cls.image} />
          Oops, something went wrong
        </div>
      </div>
    );
  }

  render() {
    const { hasError } = this.state;
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;

    return hasError ? this.renderError() : children;
  }
}
