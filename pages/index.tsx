import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { signInWithGoogle } from "./_app";

const Home: NextPage = ({ firebase }: any) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user: any) => setUser(user));
  }, [firebase]);

  function signOut() {
    firebase.auth().signOut();
  }

  console.log("User details:", user);
  return (
    <div className={styles.container}>
      <Head>
        <title>Project Taxi 🚕</title>
        <meta name="description" content="Driving your fun" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {!user && <button onClick={signInWithGoogle}>Sign in</button>}
        {user && <button onClick={signOut}>Sign out</button>}
        <h2>{user ? "Signed in" : "Signed out"}</h2>

        <Image
          src="/landing-page-illustration.png"
          alt="Yellow taxi and a lost girl"
          title="Yellow taxi and a lost girl"
          width="500"
          height="400"
        />
      </main>

      <footer className={styles.footer}>Made with fun</footer>
    </div>
  );
};

export default Home;
