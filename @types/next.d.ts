declare module '@/next' {
  import { NextPage } from 'next';
  import { ReactNode } from 'react';

  type NextPageWithLayout = NextPage & {
    /**
     * @description share **layout-level** states between pages
     *
     * ## Rule #1
     * Only states defined in layout or states of component that are imported in layout will be kept
     *
     * ```tsx
     * const Layout = (props) => {
     *  const [count, setCount] = useState(0); // ✅ This will be kept
     *
     *  return (
     *    <div>
     *      <Searchbar /> // ✅ State of Searchbar will be kept
     *      {props.children}
     *    </div>
     *  )
     * }
     * ```
     *
     * ## Rule #2
     * State are only shared/synced between page with the same exact layout when invoke `getLayout`
     *
     * ```tsx
     * PageA.getLayout = (page) => <Layout1>{page}</Layout1>
     * PageB.getLayout = (page) => <Layout1>{page}</Layout1> // Sync with PageA
     * PageC.getLayout = (page) => <Layout1><Layout2>{page}</Layout2></Layout1> // Sync with PageA and PageB
     * PageD.getLayout = (page) => <Layout1><Layout2>{page}</Layout2></Layout1> // Sync with PageA and PageB and Page C
     *
     * const Layout34 = <Layout3><Layout4>{page}</Layout4></Layout3>;
     * PageE.getLayout = (page) => <Layout3><Layout4>{page}</Layout4></Layout3>
     * PageF.getLayout = (page) => <Layout34>{page}</Layout34> // Doesn't sync with PageE
     * PageG.getLayout = (page) => <Layout34>{page}</Layout34> // Sync with PageF only
     * ```
     *
     * ## Rule #3
     * Layout with `tw` is counted as a different layout
     */
    getLayout?(page: ReactNode): ReactNode;
  };
}
