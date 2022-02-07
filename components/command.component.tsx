import styles from "./command.module.scss";
import Link from "next/link"

export default function Command(commnand: webCommand): JSX.Element {

    return (
        <Link href={`/command/${commnand.id}`}>
            <a className={`${styles.command} ${commnand.enabled ? styles.enabled : ""}`}>
                {commnand.name}
            </a>
        </Link>
    )
}

interface webCommand {
    name: string;
    enabled: boolean;
    id: string;
}