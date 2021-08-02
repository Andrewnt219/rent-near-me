import Layout from '@layouts/Layout';

type Props = {
  className?: string;
};
const Footer = ({ className }: Props) => {
  return (
    <footer className={className} tw="bg-light">
      <Layout.Container>Footer</Layout.Container>
    </footer>
  );
};

export default Footer;
