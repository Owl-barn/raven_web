import NavBar from "@components/global/navbar.module";
import React from "react";
import styles from "@styles/index.module.scss";
import Note from "@components/index/note.module";
import Head from "next/head";
import Link from "next/link";

const premiumUrl = process.env.NEXT_PUBLIC_PREMIUM_URL;
const api = process.env.NEXT_PUBLIC_API_URL;

export default class Index extends React.Component<Props> {

  private PremiumStar = () =>
    <em className={styles.premium}>
      <Link href={`${premiumUrl}/tiers`}>
        <a target="_blank" rel="noreferrer">
          *
        </a>
      </Link>
    </em>


  render() {
    return (
      <>
        <Head>
          <title>Raven</title>
          <meta name="theme-color" content="#B5A691" />
          <meta name="description" content="Multi-purpose Discord bot" />
        </Head>

        <NavBar />

        <main className={styles.main}>

          <section className={styles.summary}>
            <h1>Raven</h1>
            <p>A multi-purpose Discord bot</p>
            <p>Trusted by <b>{this.props.status.memberCount}</b> members</p>
            <p>In <b>{this.props.status.guildCount}</b> communities</p>
          </section>

          <section className={styles.divider}></section>

          <section className={styles.features}>
            <article>
              <section className={styles.artwork}>
                <Note delay={0} size={120} />
                <Note delay={800} size={80} />
              </section>
              <section className={styles.info}>
                <h1>Music streaming<this.PremiumStar /></h1>
                <p>Use Raven&apos;s one of a kind Owlet system and listen to music in a <b>multitude of channels</b> at once!</p>
              </section>
            </article>

            <article>
              <section className={styles.artwork}>
                <Note delay={0} size={120} />
                <Note delay={800} size={80} />
              </section>
              <section className={styles.info}>
                <h1>Moderate with ease</h1>
                <p>Moderate your community easily and effectively with Raven&apos;s unique tools designed with the biggest of communities in mind!</p>
              </section>
            </article>

            <article>
              <section className={styles.artwork}>
                <Note delay={0} size={120} />
                <Note delay={800} size={80} />
              </section>
              <section className={styles.info}>
                <h1>Voice channel privacy<this.PremiumStar /></h1>
                <p>Create your own invite-only voice channel in 1 click!</p>
              </section>
            </article>

            <article>
              <section className={styles.artwork}>
                <Note delay={0} size={120} />
                <Note delay={800} size={80} />
              </section>
              <section className={styles.info}>
                <h1>Level leaderboard</h1>
                <p>Gain experience with each message and get rewards!</p>
              </section>
            </article>

            <article>
              <section className={styles.artwork}>
                <Note delay={0} size={120} />
                <Note delay={800} size={80} />
              </section>
              <section className={styles.info}>
                <h1>Happy Birthday!</h1>
                <p>Keep track of your friend&apos;s birthdays and automatically congratulate them with their own role!</p>
              </section>
            </article>

            <article>
              <section className={styles.artwork}>
                <Note delay={0} size={120} />
                <Note delay={800} size={80} />
              </section>
              <section className={styles.info}>
                <h1>Express yourself!</h1>
                <p>Allow your community to easily assign themselves certain <b>self roles</b>!</p>
              </section>
            </article>
          </section>
        </main>
      </>
    )
  }
}

export async function getStaticProps() {
  const res = await fetch(`${api}/status`);
  const status = await res.json()

  return {
    props: {
      status,
    },
    revalidate: 3600,
  }
}

interface Props {
  status: Status
}

interface Status {
  memberCount: number;
  guildCount: number;
  uptime: number | null;
}