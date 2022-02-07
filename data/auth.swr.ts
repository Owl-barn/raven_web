import useSWR from "swr";
import { GuildItem } from "../types/guild.type";

const fetcher = async (url: string) => await fetch(url, { credentials: "include", mode: "cors" }).then(x => x.json());

export default function AuthSwr() {
    const { data, mutate, error } = useSWR("https://api.xayania.com/auth", fetcher);

    console.log(data, mutate, error);

    const loading = !data && !error;
    const loggedOut = error && (error.status === 403 || error.status === 401);

    return {
        loading,
        loggedOut,
        user: data as GuildItem[],
        mutate
    };
}
