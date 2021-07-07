import Layout from '@layouts/Layout';
import AppBar from '@ui/navigation/AppBar/AppBar';
import Footer from '@ui/navigation/Footer/Footer';
import HomeNavBar from '@ui/navigation/HomeNavBar/HomeNavBar';
import { PropsWithChildren } from 'react';
type Props = {
  className?: string;
};
const DefaultLayout = ({ className, children }: PropsWithChildren<Props>) => {
  return (
    <Layout
      size="lg"
      tw="flex flex-col min-h-full relative pb-var-app-bar lg:pb-0"
      className={className}
    >
      <HomeNavBar tw="hidden lg:block" />
      <AppBar tw="lg:hidden" />
      <Layout.Container as="main" tw="flex-1">
        {children}
      </Layout.Container>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis iste
      corporis placeat magni quasi vel vitae dolore culpa eius accusamus, dolor
      consequatur inventore saepe provident. Expedita delectus deserunt nulla
      exercitationem impedit nam in voluptatem assumenda, est quidem eaque
      deleniti fuga recusandae, totam non! Velit, illum! Dignissimos adipisci
      corrupti qui, harum praesentium reiciendis eaque obcaecati! Deleniti
      provident delectus autem, quisquam harum recusandae modi, quod possimus,
      necessitatibus doloribus illo quas eligendi animi cumque ratione adipisci
      quibusdam consequatur. Sunt, maiores pariatur in explicabo vel soluta illo
      omnis culpa delectus mollitia architecto commodi veritatis nihil quasi
      harum cupiditate ut, dicta porro praesentium, sequi numquam amet veniam?
      Officia fugit eos corporis porro, doloribus, molestias error fuga unde
      culpa, laborum similique vel praesentium voluptas reiciendis quasi
      explicabo neque vitae minus quos aliquam illum beatae in temporibus? Sit
      omnis nostrum tenetur facere veritatis saepe illo tempora voluptatibus?
      Excepturi repudiandae ducimus soluta tempore sequi facere eius culpa vero
      at obcaecati animi nam expedita cupiditate alias, quae accusamus aliquam
      voluptates? Consequatur nulla similique repellendus accusantium vero natus
      nemo consectetur quaerat sapiente voluptate temporibus, soluta fugit, ipsa
      nihil totam! Quisquam, odit mollitia. Similique distinctio ea, ad ratione
      beatae obcaecati accusantium neque tempora consectetur officia quo
      consequuntur itaque rem in et!
      <Footer />
    </Layout>
  );
};

export default DefaultLayout;
