
import Router, { useRouter } from 'next/router'
import { useEffect } from 'react';
import Command from '../../components/command.component';
import Layout from '../../components/layout';
import GuildSwr from '../../data/guild.swr';
import styles from "../../styles/guild.module.scss"
const redirectUrl = "https://discord.com/api/oauth2/authorize?client_id=896781020056145931&redirect_uri=https%3A%2F%2Fapi.xayania.com%2Foauth&response_type=code&scope=identify%20guilds";


export default function Guild() {
    const router = useRouter()
    const { guild_id } = router.query
    const { guild, loading, loggedOut } = GuildSwr(guild_id as string);

    const data = guild as unknown as webGuild;


    useEffect(() => { if (loggedOut) Router.replace(redirectUrl); }, [loggedOut]);
    if (loggedOut) return <Layout>redirecting....</Layout>
    if (loading) return <Layout>Loading...</Layout>

    return (
        <Layout>
            <h1>{data.name}</h1>

            <h2>Server info:</h2>
            <div className={styles.info}>
                <p>memberCount: {data.memberCount}</p>
                <p>guild id: {data.id}</p>
            </div>

            <h2>Commands:</h2>
            <div className={styles.commands}>
                {data.commands.map(x => <Command key={x.name} {...x} />)}
            </div>


            <h2>Roles:</h2>
            <div className={styles.roles}>

            </div>
        </Layout>
    )
}


interface webGuild {
    name: string;
    id: string;
    icon: string | null;
    memberCount: number;
    roles: webRole[]
    commands: webCommand[];
}

interface webRole {
    name: string;
    index: number;
    id: string;
}

interface webCommand {
    name: string;
    enabled: boolean;
    id: string;
}