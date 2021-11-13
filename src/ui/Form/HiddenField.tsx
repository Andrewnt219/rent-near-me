import { InputHTMLAttributes, VFC } from 'react';
import { useController } from 'react-hook-form';

type HiddenFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  hiddenVisually?: boolean;
};

const HiddenField: VFC<HiddenFieldProps> = ({
  name,
  hiddenVisually = false,
  ...inputProps
}) => {
  const { value, ...field } = useController({ name }).field;
  return (
    <input
      type={hiddenVisually ? 'text' : 'hidden'}
      {...inputProps}
      {...field}
      value={value.toString()}
      css={{ display: hiddenVisually ? 'none' : undefined }}
    />
  );
};

export default HiddenField;
