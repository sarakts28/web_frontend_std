import { styled } from '@mui/system';
import { TextField } from '@mui/material';
import { Colors } from '../../Utilities/Colors';
import { GenericStyle } from '../../Utilities/GenericStyle';

interface CustomTextFieldProps {
  height?: string;
  sx?: object;
}

export const CustomTextField = styled(TextField)<CustomTextFieldProps>`
  & .MuiInputBase-input {
    font-size: ${(props) =>
      (props.sx as { fontSize?: string })?.fontSize ||
      GenericStyle.font14Regular.fontSize};

    text-align: ${(props) =>
      (props.sx as { textAlign?: string })?.textAlign ||
      'left'}; /* Use user-defined text-align or default */
    padding: ${GenericStyle.tertiary_padding};
    color: ${Colors.applicationColor};
    height: ${(props) =>
      props.height || '40px'}; /* Use user-defined height or default */
    line-height: 1.5;
  }

  & .MuiOutlinedInput-root {
    background-color: transparent;

    & fieldset {
      border-color: ${Colors.black};
      border-width: 1px;
    }

    &:hover fieldset {
      border-color: ${Colors.applicationColor};
      border-width: 1px;
    }

    &.Mui-focused fieldset {
      border-color: ${Colors.applicationColor};
      border-width: 1px;
    }
  }

  & .MuiFormHelperText-root {
    margin-left: 0;
  }
`;
