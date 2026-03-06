import { motion } from 'framer-motion';
import styles from './About.module.css';

const features = [
    {
        title: 'Precision ERP',
        description: 'Designed specifically for the complexities of automobile manufacturing and supply chains.',
        icon: '⚙️'
    },
    {
        title: 'Intelligent Data',
        description: 'Real-time analytics and predictive modeling for smarter enterprise-wide decisions.',
        icon: '📊'
    },
    {
        title: 'Seamless Integration',
        description: 'Bridges the gap between financial planning and product lifecycle management.',
        icon: '🔗'
    },
    {
        title: 'Future Proof',
        description: 'Built on high-end tech stacks to evolve with the changing automotive landscape.',
        icon: '🚀'
    }
];

export default function About() {
    return (
        <section className={styles.about} id="about">
            <div className={styles.container}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <span className={styles.label}>About the Company</span>
                    <h2 className={styles.title}>Revolutionizing Automobile Enterprise Planning</h2>
                    <p className={styles.subtitle}>
                        We specialize in building deep-tech solutions for the intelligent automobile industry,
                        empowering global manufacturers with software that thinks as fast as they drive.
                    </p>
                </motion.div>

                <div className={styles.grid}>
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className={styles.card}
                            initial={{ scale: 0.8, opacity: 0, y: 100 }}
                            whileInView={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: "easeOut", delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className={styles.icon}>{feature.icon}</div>
                            <h3 className={styles.cardTitle}>{feature.title}</h3>
                            <p className={styles.cardDescription}>{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
