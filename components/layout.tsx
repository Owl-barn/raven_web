import { ReactNode } from "react";
import Link from "next/link"
import styles from "./layout.module.scss";

export default function Layout({ children }: { children: ReactNode }): JSX.Element {

    return (
        <div className={styles.layout}>
            <menu className={styles.navigationWrapper}>
                <Link href="/profile">
                    <a>Profile</a>
                </Link>
                <Link href="/guilds">
                    <a>guilds</a>
                </Link>
                <Link href="/logout">
                    <a>logout</a>
                </Link>
            </menu>
            <div className={styles.contentWrapper}>
                {children}
            </div>
        </div>
    );
}