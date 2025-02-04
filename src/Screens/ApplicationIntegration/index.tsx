import { CardActions, CardMedia, Switch, Typography } from '@mui/material';
import {
  AIHeader,
  AISubHeader,
  AppicationContent,
  ApplicationCard,
  ApplicationMediaBox,
  ApplicationContainer,
} from './styled';
import { ApplicationDataType, data } from './dataFile';
import { ButtonField } from '../../Components';
import { IoSettings } from 'react-icons/io5';
import { useState } from 'react';
import ApplicationDrawer from './ApplicationDrawer';

const ApplicationIntegrations = () => {
  const [applicationData, setApplicationData] =
    useState<ApplicationDataType[]>(data);
  const [selectedItem, setSelectedItem] = useState<ApplicationDataType | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const handleSwitchChange = (selectItem: ApplicationDataType) => {
    const updatedData = applicationData.map((item: ApplicationDataType) => {
      if (item.id === selectItem.id) {
        return {
          ...item,
          checked: !item.checked,
        };
      }

      return item;
    });

    setApplicationData(updatedData);
  };

  const renderCard = (item: ApplicationDataType) => {
    return (
      <>
        <ApplicationCard>
          <ApplicationMediaBox>
            <CardMedia
              component="img"
              sx={{ width: 80, height: 80, borderRadius: 1 }}
              image={item.image}
              alt={item.name}
            />
          </ApplicationMediaBox>

          <AppicationContent>
            <Typography sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
            <Typography>{item.description}</Typography>
          </AppicationContent>

          <CardActions
            sx={{
              borderTop: '1px solid #e0e0e0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Switch
              checked={item.checked}
              onChange={() => handleSwitchChange(item)}
            />
            <ButtonField
              label="Settings"
              height={30}
              backgroundColor="transparent"
              labelStyle={{ color: '#000' }}
              startIcon={<IoSettings color="#000" />}
              onClick={() => {
                setSelectedItem(item);
                setOpen(true);
              }}
            />
          </CardActions>
        </ApplicationCard>
      </>
    );
  };

  return (
    <>
      <AIHeader>Integration & Workflows</AIHeader>
      <AISubHeader>
        Supercharge your workflow and connect the tools you and your team uses
        every day.
      </AISubHeader>
      <ApplicationContainer>
        {applicationData.map((item: ApplicationDataType) => {
          return renderCard(item);
        })}
      </ApplicationContainer>

      <ApplicationDrawer
        selectedItem={selectedItem}
        open={open}
        setClose={() => setOpen(false)}
      />
    </>
  );
};

export default ApplicationIntegrations;
