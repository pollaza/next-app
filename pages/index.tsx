import Head from 'next/head'
import {authSync} from "../services";
import AppLayout from "../components/AppLayout";

const Home = () => (
  <AppLayout>
    hola
  </AppLayout>
);

Home.getInitialProps = authSync;

export default Home
