
import { level } from '@prisma/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import Head from "next/head";
import Image from "next/image";
import styles from "@styles/leaderboard.module.scss"
import LeaderboardUser from "@components/leaderboard/user.module";
import NavBar from '@components/global/navbar.module';

const api = process.env.NEXT_PUBLIC_API_URL

export default class leaderboard extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        const leaderBoard = this.props.leaderboard;
        const guild = this.props.guild;
        return (
            <>
                <Head>
                    <title>{guild.name} leaderboard</title>
                    <meta name="theme-color" content="#B5A691" />
                    <meta name="description" content="View leaderboard" />
                </Head>

                <NavBar />
                <main className={styles.main}>
                    <section className={styles.banner}></section>

                    <section className={styles.info}>
                        <section className={styles.guildInfo}>
                            <div className={styles.serverIconContainer}>
                                <Image
                                    className={styles.serverIcon}
                                    src={guild.icon
                                        ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=256`
                                        : "https://cdn.discordapp.com/attachments/535494948288462858/940261604430336071/prideDuo.png"}
                                    alt="Server Icon"
                                    width={256}
                                    height={256}
                                />
                            </div>
                            <h1>{this.props.guild.name}</h1>
                            <p>memberCount: {guild.memberCount}</p>
                        </section>
                    </section>

                    <section className={styles.scoreboard}>
                        {leaderBoard.map((x, y) => <LeaderboardUser key={y} entry={x} index={y} />)}
                    </section>

                    <section className={styles.banner}></section>
                </main>
            </>
        )
    }
}

interface Props {
    leaderboard: webLevel[];
    guild: guild;
}

interface guild {
    name: string;
    id: string;
    icon: string | null;
    memberCount: number;
}

export interface webLevel {
    created: Date
    user_id: string
    guild_id: string
    experience: levelData
    member: any
}

interface levelData {
    totalXP: number;
    level: number;
    levelXP: number;
    currentXP: number;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const leaderboardReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leaderboard/${params?.guild_id}`, { headers: { authorization: process.env.CLIENT_SECRET as string } })
        .then(x => {
            if (x.ok) return x;
            else return false;
        });

    const guildReq = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guild/${params?.guild_id}`, { headers: { authorization: process.env.CLIENT_SECRET as string } })
        .then(x => {
            if (x.ok) return x;
            else return false;
        });

    if (!leaderboardReq || !guildReq) {
        return { notFound: true, };
    }

    const leaderboard = await leaderboardReq.json() as level[];
    const guild = await guildReq.json() as level[];

    return {
        props: { leaderboard, guild },
        revalidate: 600,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch(`${api}/leaderboard`, { headers: { authorization: process.env.CLIENT_SECRET as string } });
    const guilds = await res.json() as guilds[];

    const paths = guilds.map((guild) => ({ params: { guild_id: guild.id }, }))

    return { paths, fallback: 'blocking' }
}

interface guilds {
    id: string;
}