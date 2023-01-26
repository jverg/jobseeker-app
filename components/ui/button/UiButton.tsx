import React from 'react';
import { Button, ButtonProps } from 'antd';

export interface UiButtonProps extends ButtonProps {
  onClick: React.MouseEventHandler<HTMLElement>;
}

const UiButton: React.FC<UiButtonProps> = ({ children, onClick, className, ...rest }) => {
  return (
    <Button onClick={onClick} {...rest} className={`ui-button ${className}`}>
      {children}
    </Button>
  );
};

export default UiButton;
