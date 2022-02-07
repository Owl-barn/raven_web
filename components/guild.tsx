import Link from "next/link"
import styles from "./guild.module.scss";
import { GuildItem } from "../types/guild.type";

export default function Guild(guild: GuildItem): JSX.Element {

    return (
        <Link href={`/guilds/${guild.id}`} scroll={true}>
            <a className={styles.guild}>
                {guild.name}
            </a>
        </Link>
    );
}