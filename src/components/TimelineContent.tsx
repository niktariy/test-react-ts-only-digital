import { useState, useMemo, KeyboardEvent } from 'react';
import ArrowLeftIcon from '../assets/icons/arrow-left-icon.svg';
import ArrowRightIcon from '../assets/icons/arrow-right-icon.svg';

import CircleTabs from './CircleTabs';
import EventsSlider from './EventsSlider';
import { FabButton } from './FabButton';
import { TimelineData } from '../interfaces/Timeline.interface';
import DecorationLine from './DecorationLine';
import YearsRange from './YearsRange';
import { styled } from 'styled-components';

export const CategoryTabsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-inline: var(--content-padding);
  width: 100%;

  @media screen and (width > 1200px) {
    margin-top: -89px;
    margin-bottom: -48px;
  }
`;

export const CategoryPagination = styled.nav`
  --navigation-gap: 0.75rem;

  display: flex;
  flex-direction: column;
  gap: var(--navigation-gap);
  padding-inline: var(--content-padding);
  font-size: 0.875rem;

  @media screen and (width > 600px) {
    --navigation-gap: 1.25rem;
  }
`;

export const NavButtonGroup = styled.div`
  --button-group-gap: 0.5rem;

  display: flex;
  gap: var(--button-group-gap);

  @media screen and (width > 600px) {
    --button-group-gap: 1.25rem;
  }
`;

type TimelineContentProps = Omit<TimelineData, 'title'>;

const TimelineContent = ({ categories, events }: TimelineContentProps) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selectedCategory = categories[selectedIdx];
  const totalCategories = categories.length;

  const filteredEvents = useMemo(
    () => events.filter((e) => e.category === selectedCategory.key),
    [events, selectedCategory.key],
  );

  const getYearRange = () => {
    if (filteredEvents.length === 0) return { start: 0, end: 0 };
    let start = filteredEvents[0].year;
    let end = filteredEvents[0].year;
    for (const event of filteredEvents) {
      if (event.year < start) start = event.year;
      if (event.year > end) end = event.year;
    }
    return { start, end };
  };

  const { start: startYear, end: endYear } = getYearRange();

  const clampIndex = (idx: number) => Math.min(Math.max(idx, 0), totalCategories - 1);

  const selectCategoryByIndex = (idx: number) => setSelectedIdx(clampIndex(idx));

  const handleKey = (action: () => void) => (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <>
      <CategoryTabsContainer>
        <YearsRange start={startYear} end={endYear} />
        <DecorationLine
          horisontal
          styles={{ position: 'absolute', left: 0, top: '50%', translate: '0 -50%' }}
        />
        <CircleTabs
          categories={categories}
          selectedCategoryIdx={selectedIdx}
          onSelectCategoryIdx={selectCategoryByIndex}
        />
      </CategoryTabsContainer>

      <CategoryPagination>
        <div>
          <span>0{selectedIdx + 1}</span>/<span>0{totalCategories}</span>
        </div>
        <NavButtonGroup>
          <FabButton
            variant="outlined"
            aria-label="Предыдущая категория"
            disabled={selectedIdx === 0}
            onClick={() => selectCategoryByIndex(selectedIdx - 1)}
            onKeyDown={handleKey(() => selectCategoryByIndex(selectedIdx - 1))}
            icon={<ArrowLeftIcon />}
          />
          <FabButton
            variant="outlined"
            aria-label="Следующая категория"
            disabled={selectedIdx === totalCategories - 1}
            onClick={() => selectCategoryByIndex(selectedIdx + 1)}
            onKeyDown={handleKey(() => selectCategoryByIndex(selectedIdx + 1))}
            icon={<ArrowRightIcon />}
          />
        </NavButtonGroup>
      </CategoryPagination>

      <div
        id={`tabpanel-${selectedCategory.key}`}
        role="tabpanel"
        aria-labelledby={`tab-${selectedCategory.key}`}
      >
        <EventsSlider events={filteredEvents} />
      </div>
    </>
  );
};

export default TimelineContent;
