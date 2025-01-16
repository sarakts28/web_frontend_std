import { EmptyContainer } from './style';

const EmptyComponent = ({ text }: { text: string }) => {
  return (
    <>
      <EmptyContainer>{text}</EmptyContainer>
    </>
  );
};

export default EmptyComponent;
