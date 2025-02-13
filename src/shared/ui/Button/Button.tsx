import clsx from 'clsx';
import { ButtonHTMLAttributes, FC } from 'react';

import styles from './Button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline';
}

export const Button: FC<IButtonProps> = ({
  variant = 'solid',
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(styles[variant], styles.button, className)}
      {...props}
    >
      {children}
    </button>
  );
};
