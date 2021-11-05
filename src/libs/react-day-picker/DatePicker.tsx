import { DATE_TIME_FORMATS } from '@models/constnats';
import Form, { inputCss, labelActiveCss, labelInvalidCss } from '@ui/Form/Form';
import { isEmptyString } from '@utils/validate-js-utils';
import { ReactNode, VFC, useMemo } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DayPickerInputProps } from 'react-day-picker/types/Props';
import { useController } from 'react-hook-form';
import { styled } from 'twin.macro';
import { formatDate, parseDate } from './react-day-picker-utils';

type DatePickerProps = Omit<DayPickerInputProps, 'placeholder'> & {
  id: string;
  name: string;
  label: ReactNode;
  inputDescription?: ReactNode;
};

const DatePicker: VFC<DatePickerProps> = ({
  id,
  name,
  label,
  inputDescription,
  inputProps,
  dayPickerProps,
  ...pickerProps
}) => {
  const { field, fieldState } = useController({ name });
  const errMsgId = useMemo(() => `error-${id}`, [id]);
  const descId = useMemo(() => `description-${id}`, [id]);
  return (
    <StyledWrapper>
      <DayPickerInput
        format={DATE_TIME_FORMATS.LONG_DATE}
        {...pickerProps}
        inputProps={{
          ...inputProps,
          id,
          ref: field.ref,
          'aria-invalid': fieldState.invalid,
          'aria-describedby': fieldState.invalid ? errMsgId : descId,
          name: field.name,
          onChange: field.onChange,
          onBlur: field.onBlur,
          autoComplete: 'off',
        }}
        // onDayChange won't work with user keyboard's input
        dayPickerProps={{ ...dayPickerProps, onDayClick: field.onChange }}
        placeholder=" "
        formatDate={formatDate}
        parseDate={parseDate}
      />

      <StyledLabel
        isInvalid={fieldState.invalid}
        isActive={!isEmptyString(field.value)}
      >
        {label}
      </StyledLabel>

      <Form.TextWrapper>
        {fieldState.invalid ? (
          <Form.ErrorMessage id={errMsgId}>
            {fieldState.error?.message}
          </Form.ErrorMessage>
        ) : (
          <Form.Description id={descId}>{inputDescription}</Form.Description>
        )}
      </Form.TextWrapper>
    </StyledWrapper>
  );
};

type StyledLabelProps = {
  isActive: boolean;
  isInvalid: boolean;
};
const StyledLabel = styled(Form.Label)<StyledLabelProps>`
  && {
    ${(p) => p.isActive && labelActiveCss}
    ${(p) => p.isInvalid && labelInvalidCss}
  }
`;

const StyledWrapper = styled(Form.Group)`
  input {
    ${inputCss}
  }

  &:focus-within ${StyledLabel} {
    ${labelActiveCss}
  }
`;

export default DatePicker;
