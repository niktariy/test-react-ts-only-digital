import { FC, PropsWithChildren } from 'react';
import { FabButton, FabButtonProps } from './FabButton';
import { styled } from 'styled-components';

export interface StyledTabButtonProps {
  $isActive: boolean;
}

export const StyledTabButton = styled(FabButton)<StyledTabButtonProps>`
  background-color: rgb(var(--blue-12));
  transition: scale 0.5s ease;
  scale: 0.10715;

  @media screen and (width > 1200px) {
    background-color: rgb(var(--blue-1));
    scale: ${({ $isActive }) => ($isActive ? 1 : 0.10715)};

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background-color: rgb(var(--blue-12));
      opacity: var(--button-fill-opacity, 0);
      transition: opacity 0.3s ease;
    }

    &:hover,
    &:focus {
      --button-fill-opacity: 0;
      scale: 1;
    }
    &:where([aria-selected='false']) {
      --button-fill-opacity: 1;
    }
  }
`;

export type TabButtonProps = PropsWithChildren<FabButtonProps> & {
  active?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
};

export const TabButton: FC<TabButtonProps> = ({ active = false, children, ref, ...rest }) => (
  <StyledTabButton variant="outlined" size="large" $isActive={!!active} ref={ref && ref} {...rest}>
    {children}
  </StyledTabButton>
);

export default TabButton;
