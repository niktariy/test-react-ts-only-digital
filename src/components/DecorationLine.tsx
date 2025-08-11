import React, { CSSProperties } from 'react';
import styled, { css } from 'styled-components';

const StyledLine = styled.span<{ $horizontal?: boolean }>`
  ${({ $horizontal }) =>
    $horizontal
      ? css`
          width: 100%;
          height: 1px;
        `
      : css`
          width: 1px;
          height: 100%;
        `}

  display: block;
  border: var(--line-style);
  mix-blend-mode: var(--line-blend);
  user-select: none;
  pointer-events: none;
  z-index: -1;
`;

const DecorationLine: React.FC<{
  horisontal?: boolean;
  styles: CSSProperties;
}> = ({ horisontal, styles }) => {
  return <StyledLine $horizontal={horisontal} aria-hidden="true" style={styles} />;
};

export default DecorationLine;
