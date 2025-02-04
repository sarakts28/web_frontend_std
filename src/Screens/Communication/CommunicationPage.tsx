import Communication from '.';
import { CommunicationProvider } from '../../Hooks/useCommunication';

const CommunicationPage = () => {
  return (
    <CommunicationProvider>
      <Communication />
    </CommunicationProvider>
  );
};

export default CommunicationPage;
