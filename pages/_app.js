import '../styles/globals.css';
import { AppProps } from 'next/app';
import Layout from '../src/components/layout';
import store from '../src/store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
