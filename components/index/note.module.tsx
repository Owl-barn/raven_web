import { Component } from "react";
import styles from "./note.module.scss";

export default class Note extends Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <svg
                className={styles.main}
                style={
                    {
                        animationDelay: `${this.props.delay}ms`,
                    }
                }
                width={this.props.size}
                height={this.props.size}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 360.28 377.05"
            >
                <polygon className={styles.stroke} points="353.74 5.8 355.27 283.07 322.42 323.49 268.48 331.74 225.06 302.98 217.58 254.06 250.43 213.64 304.36 205.39 325.57 217.42 325.57 56.71 143.6 87.04 142.97 323.15 110.12 363.57 56.19 371.82 12.76 343.06 5.28 294.14 38.13 253.71 92.06 245.47 115.44 259.66 115.17 41.54 353.74 5.8" />
            </svg>
        );
    }
}
interface Props {
    delay: number;
    size: number;
}