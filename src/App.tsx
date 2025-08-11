import { FC } from 'react';
import { GlobalStyle, Content } from './styles';
import TimelineSection from './components/TimelineSection';
import { timelineData } from './mocks/timelineData';

const App: FC = () => {
  return (
    <>
      <GlobalStyle />
      <Content>
        <TimelineSection
          title={timelineData.title}
          categories={timelineData.categories}
          events={timelineData.events}
        />

        {/*  Add new block here */}
      </Content>
    </>
  );
};

export default App;
