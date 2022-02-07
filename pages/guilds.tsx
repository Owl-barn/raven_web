import Layout from '../components/layout';
import Guild from '../components/guild';
import styles from "../styles/guilds.module.scss"
import GuildSwr from '../data/guild.swr';
import Router from 'next/router'
import { useEffect } from 'react';
const redirectUrl = "https://discord.com/api/oauth2/authorize?client_id=896781020056145931&redirect_uri=https%3A%2F%2Fapi.xayania.com%2Foauth&response_type=code&scope=identify%20guilds";


export default function Guilds() {
    const { guild, loading, loggedOut } = GuildSwr();


    useEffect(() => { if (loggedOut) Router.replace(redirectUrl); }, [loggedOut]);
    if (loggedOut) return <Layout>redirecting....</Layout>
    if (loading) return <Layout>Loading...</Layout>
    if (!guild) return <Layout>No compatible guilds</Layout>

    return (
        <Layout>
            <h1>Guilds</h1>
            <div className={styles.guildsWrapper}>
                {guild.map(x => <Guild key={x.id} {...x} />)}
            </div>
        </Layout>
    )

}
