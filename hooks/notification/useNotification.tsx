import React from 'react';
import { notification } from 'antd';
import WarningIcon from '@assets/svgs/warning-icon.svg';
import SuccessIcon from '@assets/svgs/success-icon.svg';
import ErrorIcon from '@assets/svgs/error-icon.svg';
import InfoIcon from '@assets/svgs/info-icon.svg';
import StateEnum from '@constants/state.enum';

function useNotification(
  type: StateEnum,
  message?: string,
  description?: string,
  buttonText?: string,
  buttonOnClick?: Function,
  key?: string,
  duration = 6,
) {
  const icon =
    (type === StateEnum.SUCCESS && <SuccessIcon />) ||
    (type === StateEnum.ERROR && <ErrorIcon />) ||
    (type === StateEnum.INFO && <InfoIcon />) ||
    (type === StateEnum.WARNING && <WarningIcon />);

  const openNotification = (mess?: string, desc?: string | JSX.Element) => {
    notification[type]({
      message: <div className="h5 ant-notification-notice-message__text">{mess || message}</div>,
      duration,
      description: (
        <div className="main-body-text ant-notification-notice-description__text">{desc || description}</div>
      ),
      btn: buttonText && buttonOnClick && (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          role="button"
          tabIndex={0}
          className="ant-notification-notice-btn__text"
          onClick={() => buttonOnClick(key)}
          onKeyDown={() => buttonOnClick(key)}
        >
          {buttonText}
        </a>
      ),
      icon,
      className: `${type}-notification`,
      key,
    });
  };
  return [openNotification];
}

export default useNotification;
