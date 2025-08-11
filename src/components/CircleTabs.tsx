import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import styled from 'styled-components';
import TabButton from './TabButton';

gsap.registerPlugin(MotionPathPlugin);

const CIRCLE_SIZE = 530; // px
const STROKE_WIDTH = 1; // px
const RADIUS = CIRCLE_SIZE / 2 - STROKE_WIDTH / 2;
const CENTER = CIRCLE_SIZE / 2;

const circlePathD = `
  M ${CENTER + RADIUS} ${CENTER}
  A ${RADIUS} ${RADIUS} 0 1 1 ${CENTER - RADIUS} ${CENTER}
  A ${RADIUS} ${RADIUS} 0 1 1 ${CENTER + RADIUS} ${CENTER}
`;

const CircleTablist = styled.div`
  display: flex;
  position: relative;
  
  @media screen and (width > 1200px) {
    width: ${CIRCLE_SIZE + STROKE_WIDTH}px;
    height: ${CIRCLE_SIZE + STROKE_WIDTH}px;
  }
`;

const StyledSVG = styled.svg`
  pointer-events: none;
  user-select: none;
  width: 100%;
  height: 100%;
  display: block;

  @media screen and (width < 1200px) {
    display: none;
  }
`;

const TabButtonWrapper = styled.span`
  @media screen and (width > 1200px) {
    position: absolute;
    left: 0;
    top: 0;
  }
`;

const TabLabel = styled.h3<{ $isVisible: boolean }>`
  margin: 0;
  padding-left: 1.25rem;
  font-size: 1.25rem;
  font-weight: 700;
  text-transform: capitalize;

  @media screen and (width > 1200px) {
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translate(0, -50%);
    pointer-events: none;
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
    z-index: 3;
  }
`;

interface Category {
  key: string | number;
  label: string;
}

interface CircleTabsProps {
  categories: Category[];
  selectedCategoryIdx: number;
  onSelectCategoryIdx: (idx: number) => void;
}

const CircleTabs = ({ categories, selectedCategoryIdx, onSelectCategoryIdx }: CircleTabsProps) => {
  const tabCount = categories.length;

  const [isLargeScreen, setIsLargeScreen] = useState(() => window.innerWidth >= 1200);
  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1200);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tabRefs = useRef<(HTMLElement | null)[]>(new Array(tabCount).fill(null));
  const labelRefs = useRef<(HTMLHeadingElement | null)[]>(new Array(tabCount).fill(null));
  const circleRef = useRef<SVGPathElement>(null);

  const [carouselOffset, setCarouselOffset] = useState(selectedCategoryIdx);
  const isAnimating = useRef(false);

  const step = 1 / tabCount;

  const calcPos = useCallback(
    (posIndex: number) => ({
      start: step * posIndex,
      end: step * posIndex + step,
    }),
    [step],
  );

  const getPos = useCallback(
    (index: number, offset: number) => (((index - offset) % tabCount) + tabCount) % tabCount,
    [tabCount],
  );

  const applyOffset = useCallback(
    (offset: number) => {
      if (!circleRef.current) return;

      const path = circleRef.current;

      tabRefs.current.forEach((tab, index) => {
        if (!tab) return;

        const posIndex = getPos(index, offset);

        gsap.set(tab, {
          motionPath: {
            path: path,
            align: path,
            autoRotate: false,
            alignOrigin: [0.5, 0.5],
            start: calcPos(posIndex).start,
            end: calcPos(posIndex).end,
          },
        });
      });
    },
    [calcPos, getPos],
  );

  const calculateDiff = (current: number, target: number): number => {
    const forwardDiff = (target - current + tabCount) % tabCount;
    const backwardDiff = (current - target + tabCount) % tabCount;
    return current < target ? forwardDiff : -backwardDiff;
  };

  const animateToIdx = useCallback(
    (newIdx: number) => {
      if (isAnimating.current || newIdx === carouselOffset) return;

      isAnimating.current = true;

      labelRefs.current.forEach((label) => {
        if (label) gsap.to(label, { opacity: 0, y: 6, duration: 0.12 });
      });

      const diff = calculateDiff(carouselOffset, newIdx);

      const state = { offset: carouselOffset };
      gsap.to(state, {
        offset: carouselOffset + diff,
        duration: 1.2,
        ease: 'power1.inOut',
        onUpdate: () => applyOffset(state.offset),
        onComplete: () => {
          const normalizedOffset = ((state.offset % tabCount) + tabCount) % tabCount;
          setCarouselOffset(normalizedOffset);

          const activeLabel = labelRefs.current[newIdx];
          if (activeLabel) gsap.to(activeLabel, { opacity: 1, y: 0, duration: 0.28, delay: 0.05 });

          isAnimating.current = false;
        },
      });
    },
    [applyOffset, carouselOffset, selectedCategoryIdx, tabCount],
  );

  const setTabRef = useCallback(
    (el: HTMLElement | null, idx: number) => {
      tabRefs.current[idx] = el;
      if (tabRefs.current.every(Boolean)) {
        applyOffset(carouselOffset);
      }
    },
    [applyOffset, carouselOffset],
  );

  const setLabelRef = useCallback((el: HTMLHeadingElement | null, idx: number) => {
    labelRefs.current[idx] = el;
  }, []);

  useEffect(() => {
    animateToIdx(selectedCategoryIdx);
  }, [selectedCategoryIdx, animateToIdx]);

  useEffect(() => {
    if (!isLargeScreen) {
      tabRefs.current.forEach(tab => {
        if (tab) {
          tab.style.position = '';
          tab.style.transform = '';
        }
      });
    } else {
      applyOffset(carouselOffset);
    }
  }, [isLargeScreen, applyOffset, carouselOffset]);

  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown': {
          e.preventDefault();
          onSelectCategoryIdx((idx + 1) % tabCount);
          break;
        }
        case 'ArrowLeft':
        case 'ArrowUp': {
          e.preventDefault();
          onSelectCategoryIdx((idx - 1 + tabCount) % tabCount);
          break;
        }
        case 'Home': {
          e.preventDefault();
          onSelectCategoryIdx(0);
          break;
        }
        case 'End': {
          e.preventDefault();
          onSelectCategoryIdx(tabCount - 1);
          break;
        }
      }
    },
    [onSelectCategoryIdx, tabCount],
  );

  return (
    <CircleTablist role="tablist" aria-label="Категории" id="categories-tablist">
      {isLargeScreen && (
        <StyledSVG
          width={CIRCLE_SIZE + STROKE_WIDTH}
          height={CIRCLE_SIZE + STROKE_WIDTH}
          viewBox={`0 0 ${CIRCLE_SIZE + STROKE_WIDTH} ${CIRCLE_SIZE + STROKE_WIDTH}`}
          aria-hidden="true"
        >
          <path
            ref={circleRef}
            id="motionPathCircle"
            d={circlePathD}
            fill="transparent"
            stroke="rgb(var(--blue-12))"
            strokeWidth={STROKE_WIDTH}
            strokeOpacity={0.2}
          />
        </StyledSVG>
      )}

      {categories.map((category, idx) => {
        const isSelected = selectedCategoryIdx === idx;

        return (
          <TabButtonWrapper key={category.key} ref={(el) => setTabRef(el, idx)}>
            <TabButton
              active={isSelected}
              id={`tab-${idx}`}
              role="tab"
              aria-selected={isSelected}
              aria-controls={`tabpanel-${idx}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onSelectCategoryIdx(idx)}
              onKeyDown={(e) => handleTabKeyDown(e, idx)}
            >
              <span>{idx + 1}</span>
              <TabLabel ref={(el) => setLabelRef(el, idx)} $isVisible={isSelected}>
                {category.label}
              </TabLabel>
            </TabButton>
          </TabButtonWrapper>
        );
      })}
    </CircleTablist>
  );
};

export default CircleTabs;
