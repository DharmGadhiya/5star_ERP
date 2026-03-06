import { motion } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero} id="home">
            {/* Live badge */}
            <motion.div
                className={styles.hero__badge}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
                <span className={styles['hero__badge-dot']} />
                Hackathon 2026 — Live
            </motion.div>

            {/* Main title */}
            <motion.h1
                className={styles.hero__title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
            >
                5star ERP
                <br />
                System
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                className={styles.hero__subtitle}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
            >
                Build the future of intelligent automobile enterprise systems.
            </motion.p>

            {/* Problem Statement */}
            <motion.div
                className={styles.hero__problem}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.9, ease: 'easeOut' }}
            >
                <div className={styles['hero__problem-label']}>
                    Problem Statement
                </div>
                <p className={styles['hero__problem-text']}>
                    Design and develop a <strong>comprehensive ERP solution</strong> tailored for the automobile industry.
                    The system should seamlessly integrate <strong>financial management</strong>, <strong>product lifecycle tracking</strong>,
                    and <strong>enterprise-wide operations</strong> into a single intelligent platform.
                    Teams must demonstrate how their solution improves efficiency, reduces costs,
                    and enables <strong>data-driven decision making</strong> across the automobile manufacturing value chain.
                </p>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                className={styles.hero__scroll}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1, delay: 1.5 }}
            >
                <div className={styles['hero__scroll-line']} />
                <span className={styles['hero__scroll-text']}>Scroll</span>
            </motion.div>
        </section>
    );
}
