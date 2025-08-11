import { FC } from 'react';
import { styled } from 'styled-components';

export const EventCard = styled.article`
  --event-year-color: rgb(var(--blue-9));

  --event-year-font-size: 1rem;
  --event-text-font-size: 0.875rem;
  --event-text-line-height: 1.45;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;

  @media screen and (width > 600px) {
    --event-year-font-size: 1.5625rem;
    --event-text-font-size: 1.25rem;
    --event-text-line-height: 1.5;
  }
`;

export const EventYear = styled.h4`
  font-family: var(--font-accent);
  font-weight: normal;
  font-size: var(--event-year-font-size);
  line-height: 1.2;
  color: var(--event-year-color);
  text-transform: uppercase;
  margin-block: 0 0.9375rem;
`;

export const EventText = styled.p`
  font-family: 'PT Sans', sans-serif;
  font-size: var(--event-text-font-size);
  line-height: var(--event-text-line-height);
  margin: 0;
`;

export type YearInfoProps = {
  year: number;
  description: string;
};

const YearInfo: FC<YearInfoProps> = ({ year, description }) => (
  <EventCard>
    <EventYear>{year}</EventYear>
    <EventText>{description}</EventText>
  </EventCard>
);

export default YearInfo;
