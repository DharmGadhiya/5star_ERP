import { motion } from 'framer-motion';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <motion.footer
            className={styles.footer}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <div className={styles.footer__brand}>
                5star ERP SYSTEM
            </div>
            <p className={styles.footer__copy}>
                © 2026 5-Star Team. Built with passion for the future of automotive technology.
            </p>
            <div className={styles.footer__links}>
                <a className={styles.footer__link} href="#home">Home</a>
                <a className={styles.footer__link} href="#login">Portals</a>
                <a className={styles.footer__link} href="#about">About</a>
            </div>
        </motion.footer>
    );
}
