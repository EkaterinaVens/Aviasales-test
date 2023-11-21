import React from "react";

import errorImg from "../../assets/images/error.svg";
import cls from "./error-boundry.module.scss";

export default class ErrorBoundry extends React.Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  static renderError() {
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

    return hasError ? ErrorBoundry.renderError() : children;
  }
}
