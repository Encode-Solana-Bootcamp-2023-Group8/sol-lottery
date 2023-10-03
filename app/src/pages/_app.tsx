import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
import { ContextProvider } from '../contexts/ContextProvider';
import { AppBar } from '../components/AppBar';
import { ContentContainer } from '../components/ContentContainer';
import { Footer } from '../components/Footer';
import Notifications from '../components/Notification'
import { RequestAirdrop } from 'components/RequestAirdrop';
import { StartGame } from 'components/StartGame';
require('@solana/wallet-adapter-react-ui/styles.css');
require('../styles/globals.css');

const App: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
          <Head>
            <title>Solana Scaffold Lite</title>
          </Head>

          <ContextProvider>
            <div className="flex flex-col h-screen">
              <Notifications />
              <AppBar/>
              <div class="flex justify-center mt-40">
                <StartGame />
                <RequestAirdrop />
              </div>
              {/* <ContentContainer> */}
                {/* <Component {...pageProps} /> */}
                {/* <Footer/> */}
              {/* </ContentContainer> */}
            </div>
          </ContextProvider>
        </>
    );
};

export default App;
