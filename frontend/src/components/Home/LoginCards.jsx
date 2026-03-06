import { motion } from 'framer-motion';
import styles from './LoginCards.module.css';

const cards = [
    {
        id: 'finance',
        icon: '💰',
        title: 'Login as Financial Person',
        desc: 'Access financial dashboards, budgeting, and cost analytics for automobile manufacturing.',
        href: '#finance-login',
    },
    {
        id: 'product',
        icon: '🚗',
        title: 'Login as Product Person',
        desc: 'Manage product lifecycle, engineering specs, and production pipeline tracking.',
        href: '#product-login',
    },
    {
        id: 'admin',
        icon: '🛡️',
        title: 'Login Admin',
        desc: 'Access administrator dashboard and manage system configurations.',
        href: '#admin-login',
    },
    {
        id: 'about',
        icon: '🏢',
        title: 'About the Company',
        desc: 'Learn about our mission to revolutionize automobile enterprise resource planning.',
        href: '#about',
    },
];

const cardVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 100 },
    visible: { scale: 1, opacity: 1, y: 0 },
};

export default function LoginCards({ onRoleSelect }) {
    return (
        <section className={styles['cards-section']} id="login">
            <motion.span
                className={styles['cards-section__label']}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
            >
                Get Started
            </motion.span>

            <motion.h2
                className={styles['cards-section__title']}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.1 }}
            >
                Choose Your Portal
            </motion.h2>

            <motion.p
                className={styles['cards-section__desc']}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.2 }}
            >
                Select your role to access the right tools and dashboards.
            </motion.p>

            <div className={styles['cards-grid']}>
                {cards.map((card, i) => {
                    // Prevent 'about' card from trying to trigger a literal Auth Role
                    const handleClick = (e) => {
                        e.preventDefault();
                        if (card.id === 'about') {
                            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                            return;
                        }
                        if (onRoleSelect) onRoleSelect(card.id);
                    };

                    return (
                        <motion.button
                            key={card.id}
                            onClick={handleClick}
                            className={styles.card}
                            style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer' }}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.9, ease: 'easeOut', delay: i * 0.15 }}
                        >
                            <div className={styles.card__icon}>{card.icon}</div>
                            <h3 className={styles.card__title}>{card.title}</h3>
                            <p className={styles.card__desc}>{card.desc}</p>
                        </motion.button>
                    );
                })}
            </div>
        </section>
    );
}
