import Head from "next/head";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
const fetcher = async (url: string, payload?: string) => {
  const options = {
    method: payload ? "POST" : "GET",
    ...(payload && { body: payload }),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  return fetch(url, options).then((r) => r.json());
};

export default function Home() {
  const onClick = (e, num) => {
    let newNum = String(num - 1);
    fetch("/api/getDB?id=10000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: "10000", content: newNum }),
    });
  };
  const { data, error, mutate } = useSWR("/api/getDB?id=10000", fetcher);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  if (data)
    return (
      <div className={styles.container}>
        <Head>
          <title>10000 Hours</title>
          <meta name="description" content="Countdown" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <h1 className={styles.heading}>10,000 Hours</h1>
          <section>
            <div className={styles.count}>
              <div className={styles.card}>{data.content.S}</div>
              <div className={styles.wrap}>
                <button
                  className={styles.button}
                  onClick={(e) => {
                    onClick(e, data.content.S);
                    mutate();
                  }}
                >
                  Decrement
                </button>
              </div>
            </div>
          </section>
        </main>
        <footer className={styles.footer}></footer>
      </div>
    );
}
