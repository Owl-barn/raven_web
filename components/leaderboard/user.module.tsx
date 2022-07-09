import { Component } from "react";
import { webLevel } from "pages/leaderboard/[guild_id]";
import styles from "./user.module.scss";

export default class LeaderboardUser extends Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        const entry = this.props.entry;

        const index = this.props.index;

        return (
            <article className={styles.main}>
                <div className={styles.rank}>{index + 1}</div>
                <div className={styles.name}>{entry.member.displayName}</div>
                <div className={styles.score}>{entry.experience.level}</div>
            </article >
        );
    }
}

interface Props {
    entry: webLevel;
    index: number;
}