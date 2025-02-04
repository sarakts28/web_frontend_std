import { useTranslation } from 'react-i18next';
import { EmptyContainer } from './style';

const EmptyComponent = ({ text }: { text: string }) => {
  const { t } = useTranslation();

  return (
    <>
      <EmptyContainer>{t(text)}</EmptyContainer>
    </>
  );
};

export default EmptyComponent;
