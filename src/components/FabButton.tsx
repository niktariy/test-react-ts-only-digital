import { ButtonHTMLAttributes, FC, ReactNode, Ref } from 'react';
import styled, { css } from 'styled-components';

type ButtonSizeType = 'small' | 'default' | 'large';
type ButtonVariantType = 'raised' | 'outlined';

export interface FabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSizeType | number | string;
  variant?: ButtonVariantType;
  icon?: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

const Fab = styled.button<{
  $size: ButtonSizeType | number | string;
  $variant: ButtonVariantType;
}>`
  --button-small-size: 2.5rem;
  --button-size: 3.125rem;
  --button-large-size: 3.5rem;
  --nav-button-padding: 0.875rem;

  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  width: ${({ $size }) => {
    if ($size === 'small') return 'var(--button-small-size)';
    if ($size === 'default') return 'var(--button-size)';
    if ($size === 'large') return 'var(--button-large-size)';
    return typeof $size === 'number' ? `${$size}px` : $size;
  }};
  height: ${({ $size }) => {
    if ($size === 'small') return 'var(--button-small-size)';
    if ($size === 'default') return 'var(--button-size)';
    if ($size === 'large') return 'var(--button-large-size)';
    return typeof $size === 'number' ? `${$size}px` : $size;
  }};
  aspect-ratio: 1/1;
  font-weight: 400;
  font-size: 1.25rem;
  cursor: pointer;
  background-color: var(--fab-button-bg, rgb(var(--blue-1)));
  box-shadow: var(--fab-button-shadow, none);
  color: var(--fab-button-color, inherit);
  transition-property: box-shadow, background-color, color, scale, opacity;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  transition-duration: 0.4s;

  ${({ $variant }) =>
    $variant === 'outlined'
      ? css`
          --fab-button-color: var(--text-color);
          --fab-button-shadow: inset 0 0 0 1px rgba(var(--blue-12), 0.5);
        `
      : css`
          --fab-button-bg: rgb(var(--white));
          --fab-button-color: rgb(var(--blue-9));
          --fab-button-shadow: 0 0 15px rgba(var(--blue-9), 0.1);
        `}

  &:hover:not(:disabled) {
    ${({ $variant }) =>
      $variant === 'outlined'
        ? css`
            --fab-button-bg: rgb(var(--white));
          `
        : css``}
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

export const FabButton: FC<FabButtonProps> = ({
  size = 'default',
  variant = 'raised',
  icon,
  ref,
  children,
  ...rest
}) => {
  return (
    <Fab $size={size} $variant={variant} ref={ref && ref} {...rest}>
      {icon || children}
    </Fab>
  );
};
