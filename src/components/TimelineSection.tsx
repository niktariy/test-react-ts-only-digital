import styled from 'styled-components';
import DecorationLine from './DecorationLine';
import TimelineContent from './TimelineContent';
import { TimelineData } from '../interfaces/Timeline.interface';

const StyledSection = styled.section`
  height: 100vh;
  padding-block: clamp(3.75rem, 2.375rem + 6.875vw, 10.625rem) clamp(1.25rem, 0.175rem + 5.375vw, 6.625rem);
`;
const TimelineHeading = styled.h2`
  position: relative;
  max-width: calc(var(--grid-column) * 5);
  margin-block: 0;
  padding-inline-start: var(--content-padding);
  text-align: left;
  font-weight: 700;
  font-size: clamp(1.25rem, 0.8rem + 2.25vw, 3.5rem);
  line-height: 1.2;

  @media screen and (width > 1200px) {
    &::before {
      --decor-offset: 0.4375rem;
      content: '';
      position: absolute;
      left: 0;
      top: var(--decor-offset);
      height: calc(100% - var(--decor-offset) * 2);
      width: 5px;
      background: linear-gradient(180deg, rgb(var(--blue-9)) -5%, rgb(var(--fuschia-8)) 85%);
    }
  }
`;

const TimelineSection = ({ title, categories, events }: TimelineData) => {
  return (
    <StyledSection>
      <DecorationLine
        styles={{
          position: 'absolute',
          top: 0,
          left: '50%',
          translate: '-50% 0',
        }}
      />
      <TimelineHeading>{title}</TimelineHeading>
      <TimelineContent
        categories={categories}
        events={events.map((e) => ({ ...e, category: e.category }))}
      />
    </StyledSection>
  );
};

export default TimelineSection;
