"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Layout, X, Zap, BookOpen, Menu } from 'lucide-react';
import styles from './Header.module.css';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
    const [activeModal, setActiveModal] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleReset = () => {
        setMobileMenuOpen(false);
        if (confirm("Êtes-vous sûr de vouloir commencer un nouveau projet ? Tout le progrès actuel sera perdu.")) {
            localStorage.removeItem('wizard_step');
            localStorage.removeItem('wizard_data');
            window.location.href = "/";
        }
    };

    const openModal = (modalName) => {
        setMobileMenuOpen(false);
        setActiveModal(modalName);
    };

    const Modal = ({ title, children, onClose }) => (
        <div className={styles.overlay} onClick={onClose}>
            <motion.div
                className={styles.modal}
                onClick={e => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
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

                    {/* Desktop Navigation */}
                    <nav className={styles.nav}>
                        <Link href="/" onClick={handleReset} className={styles.navLink}>Accueil</Link>

                        <div className={styles.navLink} onClick={() => openModal('features')}>
                            Fonctionnalités
                        </div>

                        <div className={styles.navLink} onClick={() => openModal('guide')}>
                            Guide
                        </div>

                        <div className={`${styles.navLink} ${styles.cta}`} onClick={handleReset}>
                            Nouveau Projet
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className={styles.mobileMenuBtn}
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Menu"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </header>

            <AnimatePresence>
                {/* Mobile Menu Overlay */}
                {mobileMenuOpen && (
                    <motion.div
                        className={styles.mobileMenu}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    >
                        <div className={styles.mobileMenuHeader}>
                            <div className={styles.logo}>
                                <Layout size={28} className={styles.logoIcon} />
                                <span className={styles.logoText}>WebPlanner</span>
                            </div>
                            <button
                                className={styles.closeButton}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <X size={28} />
                            </button>
                        </div>

                        <nav className={styles.mobileNav}>
                            <Link href="/" onClick={handleReset} className={styles.mobileNavLink}>
                                <span>Accueil</span>
                            </Link>

                            <div className={styles.mobileNavLink} onClick={() => openModal('features')}>
                                <span>Fonctionnalités</span>
                                <Zap size={20} />
                            </div>

                            <div className={styles.mobileNavLink} onClick={() => openModal('guide')}>
                                <span>Guide</span>
                                <BookOpen size={20} />
                            </div>

                            <div
                                className={styles.mobileNavLink}
                                onClick={handleReset}
                                style={{ color: 'var(--primary, #8b5cf6)' }}
                            >
                                <span>Nouveau Projet</span>
                                <Layout size={20} />
                            </div>
                        </nav>
                    </motion.div>
                )}

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
