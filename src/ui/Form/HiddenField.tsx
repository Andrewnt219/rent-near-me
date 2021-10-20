import { InputHTMLAttributes } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

type Props<FormValues extends FieldValues> =
  InputHTMLAttributes<HTMLInputElement> & {
    children?: never;
    hiddenVisually?: boolean;
    controller: UseControllerProps<FormValues>;
  };

function TextField<FormValues extends FieldValues>({
  controller,
  hiddenVisually = false,
  ...inputProps
}: Props<FormValues>) {
  const { value, ...field } = useController(controller).field;
  return (
    <input
      type={hiddenVisually ? 'text' : 'hidden'}
      {...inputProps}
      {...field}
      value={value.toString()}
      css={{ display: hiddenVisually ? 'none' : undefined }}
    />
  );
}

export default TextField;
