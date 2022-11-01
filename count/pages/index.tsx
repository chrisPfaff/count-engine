import Head from "next/head";
import styles from "../styles/Home.module.css";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR("/api/getDB?id=10000", fetcher);

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  return <code>{JSON.stringify(data, null, 2)}</code>;

  // return (
  //   <div className={styles.container}>
  //     <Head>
  //       <title>10000 Hours</title>
  //       <meta name="description" content="Countdown" />
  //       <link rel="icon" href="/favicon.ico" />
  //     </Head>

  //     <footer className={styles.footer}></footer>
  //   </div>
  // );
}
