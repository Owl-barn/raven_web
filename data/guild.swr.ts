import useSWR from "swr";
import { GuildItem } from "../types/guild.type";

const fetcher = async (url: string) => await fetch(url, { credentials: "include", mode: "cors" })
    .then((x) => {
        if (x.ok) return x.json();
        throw { code: x.status, message: x.body}
    });

const GuildSwr = (guild = "") => {

    const { data, mutate, error } = useSWR(`https://api.xayania.com/guilds${guild ? `/${guild}` : ""}`, fetcher);

    const loading = !data && !error;
    const loggedOut = error && (error.code === 403 || error.code == 401);

    return {
        loading,
        loggedOut,
        guild: data as GuildItem[],
        mutate
    };
}

export default GuildSwr