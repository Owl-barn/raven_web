import { ReactNode } from "react";
import Link from "next/link"
import styles from "./authlayout.module.scss";
import { motion } from "framer-motion";


export default function AuthLayout({ children }: { children: ReactNode }): JSX.Element {

    return (
        <div className={styles.layout}>
            <motion.main
                initial={{ scale: .6 }}
                animate={{ scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
            >
                <div className={styles.contentWrapper}>
                    {children}
                </div>
            </motion.main>
        </div>
    );
}