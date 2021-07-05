import tw from 'twin.macro';

type Props = {
  className?: string;
};
const Button = tw.button``;

export const RoundButton = tw.button`px-md rounded-full  hover:bg-light focus-visible:(ring ring-dark)`;
export default Button;
