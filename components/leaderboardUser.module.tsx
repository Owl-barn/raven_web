import { Component } from "react";
import { webLevel } from "../pages/leaderboard/[guild_id]";
import styles from "./leaderboardUser.module.scss";

export default class LeaderboardUser extends Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        const entry = this.props.entry;

        const index = this.props.index;
        let colour = "rgb(39, 39, 39)"

        return (
            <div className={styles.main}>
                <div className={styles.rank} style={{ backgroundColor: colour }}>{index + 1}</div>
                <div className={styles.name}>{entry.member.displayName}</div>
                <div className={styles.score}>{entry.experience.level}</div>
            </div >
        );
    }
}

interface Props {
    entry: webLevel;
    index: number;
}