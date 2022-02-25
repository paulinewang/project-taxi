import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../Components/Layout";

const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Project Taxi 🚕</title>
        <meta name="description" content="Driving your fun" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Image
          src="/landing-page-illustration.png"
          alt="Yellow taxi and a lost girl"
          title="Yellow taxi and a lost girl"
          width="500"
          height="400"
        />
      </Layout>

      <footer className={styles.footer}>Made with fun</footer>
    </div>
  );
};

export default Home;
