import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  Select,
  MenuItem,
  SelectChangeEvent,
  Chip,
  Checkbox,
} from '@mui/material';
import { BiArrowFromLeft } from 'react-icons/bi';
import useData from '../../Screens/TimeTracker/data';
import InputField from '../InputField';
import ButtonField from '../ButtonField';
import { Colors } from '../../Utilities/Colors';
import { breakWords, generateRandomId } from '../../Utilities/commonFunctions';
import { useActivityTimers } from '../../Hooks/useActivityTimer';
import { useSelector } from 'react-redux';
import { getUserData } from '../../Store/Selectors/AuthSelector';
import { useTranslation } from 'react-i18next';

const NestedSelect = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selections, setSelections] = useState<number[]>([]);

  const currentUserData = useSelector(getUserData);

  const { t } = useTranslation();

  const handleSelection = (event: SelectChangeEvent<number>) => {
    const value = event.target.value as number;
    const newSelections = [...selections.slice(0, activeStep), value];

    setSelections(newSelections);
  };

  const [text, setText] = useState<string>('');

  const { addActivityTimer } = useActivityTimers();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelections([]);
  };

  const handleDone = () => {
    const id = generateRandomId(5);
    let activityArray = selections.map((item: any, index) => ({
      level: index,
      value: item,
    }));

    if (text) {
      activityArray.push({
        level: activityArray.length,
        value: text,
      });
    }

    addActivityTimer({
      id: id,
      customerId: '',
      userId: currentUserData?.userId,
      mainCategory: '',
      subTask: '',
      detailedSubTask: '',
      description: '',
      context: '',
      localDate: new Date().toISOString(),
      duration: 0,
    });
    setActiveStep(0);
    setSelections([]);
  };

  const [steps, setSteps] = useState([
    t('Customer'),
    t('Context'),
    t('MainCategory'),
    t('SubTask'),
    t('Description'),
  ]);

  const { mainCategoryArray, clients } = useData();

  const getCurrentOptions = useCallback(() => {
    if (activeStep === 0) {
      // First step: Return clients
      return clients;
    } else if (activeStep === 1) {
      return mainCategoryArray;
    } else if (activeStep === 2) {
      const selectedCategory = mainCategoryArray.find(
        (item: any) => item.value === selections[1]
      );

      return selectedCategory?.subTasks || [];
    }
    //  else if (activeStep === 3) {
    //   const selectedCategory = mainCategoryArray.find(
    //     (item: any) => item.value === selections[1]
    //   );
    //   const selectedsubTask = selectedCategory?.subTasks?.find(
    //     (item2: any) => item2.value === selections[2]
    //   );

    //   return selectedsubTask?.context || selectedsubTask?.subDetailedTask || [];
    // } else if (activeStep === 4) {
    //   const selectedCategory = mainCategoryArray.find(
    //     (item: any) => item.value === selections[1]
    //   );
    //   const selectedsubTask = selectedCategory?.subTasks?.find(
    //     (item2: any) => item2.value === selections[2]
    //   );
    //   const selectedSubDetail = selectedsubTask?.subDetailedTask?.find(
    //     (item3: any) => item3.value === selections[3]
    //   );

    //   return selectedSubDetail?.context || [];
    // }

    return [];
  }, [activeStep, mainCategoryArray, clients, selections]);

  useEffect(() => {
    if (activeStep === 3) {
      const selectedCategory = mainCategoryArray.find(
        (item: any) => item.value === selections[1]
      );
      const selectedsubTask = selectedCategory?.subTasks?.find(
        (item2: any) => item2.value === selections[2]
      );

      if (selectedsubTask?.subDetailedTask?.length && steps.length === 5) {
        setSteps([
          t('Customer'),
          t('Context'),
          t('MainCategory'),
          t('SubTask'),
          t('DetailSubTask'),
          t('Description'),
        ]);
      } else if (
        !selectedsubTask?.subDetailedTask?.length &&
        steps.length === 6
      ) {
        setSteps([
          t('Customer'),
          t('Context'),
          t('MainCategory'),
          t('SubTask'),
          t('Description'),
        ]);
      }
    }
  }, [activeStep, selections, mainCategoryArray, steps, t]);

  const getSelectedPath = () => {
    if (selections?.length > 0) {
      return selections.map((item: any) => {
        return breakWords(item);
      });
    }

    return [];
  };

  const isDisable = useMemo(() => {
    if (steps[activeStep] === 'Description') {
      return false;
    } else {
      return !selections[activeStep];
    }
  }, [activeStep, selections, steps]);

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 4 }}>
          {activeStep === steps.length ? (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                All steps completed
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Your final selection:
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  justifyContent: 'center',
                  mb: 2,
                }}
              >
                {getSelectedPath().map((name, index) => (
                  <Chip key={index} label={name} color="primary" />
                ))}
              </Box>
              <ButtonField
                onClick={handleReset}
                label="Reset"
                backgroundColor={Colors.secondaryApplicationColor}
                sx={{ mr: 2 }}
              />
              <ButtonField onClick={handleDone} label="Done" />
            </Box>
          ) : (
            <>
              <Typography variant="h6" gutterBottom>
                Step {activeStep + 1}: Select {steps[activeStep]}
              </Typography>

              {steps[activeStep] === 'Description' ? (
                <InputField
                  onChange={(e: any) => setText(e.target.value)}
                  name="description"
                  placeholder="Description"
                  value={text}
                  sx={{ mb: 2 }}
                />
              ) : (
                <Select
                  value={selections[activeStep] || ''}
                  onChange={handleSelection}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  {getCurrentOptions().map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              )}

              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button
                  onClick={handleNext}
                  variant="contained"
                  disabled={isDisable}
                  endIcon={
                    activeStep === steps.length - 1 ? (
                      <Checkbox />
                    ) : (
                      <BiArrowFromLeft />
                    )
                  }
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </Box>
        {activeStep < steps.length && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Current selection:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {getSelectedPath().map((name, index) => (
                <Chip
                  key={index}
                  label={name}
                  variant="outlined"
                  size="small"
                />
              ))}
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default NestedSelect;
