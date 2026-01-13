"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Layout, X, Zap, BookOpen } from 'lucide-react';
import styles from './Header.module.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
    const [activeModal, setActiveModal] = useState(null);

    const handleReset = () => {
        if (confirm("Êtes-vous sûr de vouloir commencer un nouveau projet ? Tout le progrès actuel sera perdu.")) {
            localStorage.removeItem('wizard_step');
            localStorage.removeItem('wizard_data');
            window.location.href = "/";
        }
    };

    const Modal = ({ title, children, onClose }) => (
        <div className={styles.overlay} onClick={onClose}>
            <motion.div
                className={styles.modal}
                onClick={e => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
            >
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>{title}</h2>
                    <button className={styles.closeButton} onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>
                <div className={styles.modalContent}>
                    {children}
                </div>
            </motion.div>
        </div>
    );

    return (
        <>
            <header className={styles.header}>
                <div className={styles.container}>
                    <div className={styles.logo}>
                        <Layout size={28} className={styles.logoIcon} />
                        <span className={styles.logoText}>WebPlanner</span>
                    </div>

                    <nav className={styles.nav}>
                        <Link href="/" onClick={handleReset} className={styles.navLink}>Accueil</Link>

                        <div className={styles.navLink} onClick={() => setActiveModal('features')}>
                            Fonctionnalités
                        </div>

                        <div className={styles.navLink} onClick={() => setActiveModal('guide')}>
                            Guide
                        </div>

                        <div className={`${styles.navLink} ${styles.cta}`} onClick={handleReset}>
                            Nouveau Projet
                        </div>
                    </nav>
                </div>
            </header>

            <AnimatePresence>
                {activeModal === 'features' && (
                    <Modal title="Fonctionnalités" onClose={() => setActiveModal(null)}>
                        <p>WebPlanner est un outil puissant conçu pour simplifier la création de votre cahier des charges.</p>

                        <h3>✨ Sauvegarde Automatique</h3>
                        <p>Ne perdez jamais votre progression. Vos réponses sont enregistrées localement sur votre navigateur en temps réel.</p>

                        <h3>📄 Export Format Markdown</h3>
                        <p>À la fin du formulaire, téléchargez un fichier .md parfaitement formaté, prêt à être envoyé à des développeurs ou agences.</p>

                        <h3>🎨 Design Intuitif</h3>
                        <p>Une interface fluide et moderne en mode sombre pour une expérience utilisateur agréable.</p>
                    </Modal>
                )}

                {activeModal === 'guide' && (
                    <Modal title="Guide d'utilisation" onClose={() => setActiveModal(null)}>
                        <p>Bienvenue sur WebPlanner ! Voici comment créer le plan parfait pour votre site web :</p>

                        <h3>1. Répondez aux questions</h3>
                        <p>Parcourez les 9 étapes du formulaire. Chaque section couvre un aspect essentiel de votre futur site (Design, Technique, Contenu...).</p>

                        <h3>2. Naviguez librement</h3>
                        <p>Utilisez les cercles en haut de page pour revenir sur une section précédente si vous changez d'avis.</p>

                        <h3>3. Finalisez et Exportez</h3>
                        <p>Une fois terminé, vous obtiendrez un récapitulatif complet. Cliquez sur "Sauvegarder" ou "Markdown" pour récupérer votre document.</p>
                    </Modal>
                )}
            </AnimatePresence>
        </>
    );
}
