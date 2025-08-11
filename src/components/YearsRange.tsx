import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const StyledYearsRange = styled.div`
  @media screen and (width > 1200px) {
    position: absolute;
    top: 50%;
    translate: 0 -55%;
  }
`;

const StyledYear = styled.span<{ $isEnd?: boolean }>`
  --start-year-color: var(--blue-9);
  --end-year-color: var(--fuschia-8);

  font-size: clamp(3.5rem, 1.7rem + 9vw, 12.5rem);
  font-weight: 700;
  color: rgb(
    ${({ $isEnd = false }) => ($isEnd ? 'var(--end-year-color)' : 'var(--start-year-color)')}
  );
  letter-spacing: -0.02em;

  @media screen and (width >= 1440px) {
    --end-year-color: var(--fuschia-9);
  }
`;

interface YearsRangeProps {
  start: number;
  end: number;
  className?: string;
}

function useAnimatedNumber(target: number, duration = 0.7) {
  const [value, setValue] = useState(target);
  const obj = useRef({ n: target });

  useGSAP(() => {
    if (value === target) return;
    const tween = gsap.to(obj.current, {
      n: target,
      duration,
      ease: 'power1.out',
      onUpdate: () => setValue(Math.round(obj.current.n)),
      onStart: () => setValue(Math.round(obj.current.n)),
    });
    return () => {
      tween.kill();
    };
  }, [target]);

  return value;
}

const YearsRange: React.FC<YearsRangeProps> = ({ start, end, className }) => {
  const animatedStart = useAnimatedNumber(start);
  const animatedEnd = useAnimatedNumber(end);
  return (
    <StyledYearsRange className={className}>
      <StyledYear>{animatedStart}&nbsp;</StyledYear>
      <StyledYear $isEnd={true}>&nbsp;{animatedEnd}</StyledYear>
    </StyledYearsRange>
  );
};

export default YearsRange;
