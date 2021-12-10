import dayjs from 'dayjs';
import { useId } from '@radix-ui/react-id';
import { DATE_TIME_FORMATS } from '@models/constnats';
import Form, { inputCss, labelActiveCss, labelInvalidCss } from '@ui/Form/Form';
import { isEmptyString } from '@utils/validate-js-utils';
import { ReactNode, VFC } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DayPickerInputProps } from 'react-day-picker/types/Props';
import { useController } from 'react-hook-form';
import tw, { css, styled } from 'twin.macro';

type DateFieldProps = Omit<DayPickerInputProps, 'placeholder'> & {
  name: string;
  label: ReactNode;
  id?: string;
  inputDescription?: ReactNode;
};

const DateField: VFC<DateFieldProps> = ({
  name,
  label,
  id,
  inputDescription,
  inputProps,
  dayPickerProps,
  ...pickerProps
}) => {
  const { field, fieldState } = useController({ name });

  const dateFieldId = useId(id);
  const errMsgId = `datefield-error-${dateFieldId}`;
  const descId = `datefield-description-${dateFieldId}`;

  return (
    <StyledWrapper>
      <DayPickerInput
        format={DATE_TIME_FORMATS.LONG_DATE}
        inputProps={{
          id: dateFieldId,
          ref: field.ref,
          'aria-invalid': fieldState.invalid,
          'aria-describedby': `${errMsgId} ${descId}`,
          name: field.name,
          onChange: field.onChange,
          onBlur: field.onBlur,
          autoComplete: 'off',
          ...inputProps,
        }}
        // onDayChange won't work with user keyboard's input
        dayPickerProps={{ onDayClick: field.onChange, ...dayPickerProps }}
        placeholder=" "
        formatDate={dayJsFormatter}
        parseDate={dayJsParser}
        value={field.value}
        {...pickerProps}
      />

      <StyledLabel
        htmlFor={dateFieldId}
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

const dayJsFormatter = (date: Date, format: string) =>
  dayjs(date).format(format);
const dayJsParser = (dateStr: string, format: string) => {
  const parsed = dayjs(dateStr, format);
  return parsed.isValid() ? parsed.toDate() : undefined;
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

export default DateField;

export const reactDatePickerCss = css`
  .DayPickerInput {
    ${tw`w-full`}
  }
`;
