'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Save, CheckCircle, Smartphone, Monitor, Type, Palette, Layout, Globe, ArrowRight, Download, Gift } from 'lucide-react';
import styles from './Wizard.module.css';
import { steps } from '@/data/steps';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import ReactMarkdown from 'react-markdown';

export default function Wizard() {
    const [currentStep, setCurrentStep] = useLocalStorage('wizard_step', 0);
    const [formData, setFormData] = useLocalStorage('wizard_data', {});
    const [startTime, setStartTime] = useLocalStorage('wizard_start_time', null);
    const [isClient, setIsClient] = useState(false);
    const stepperRef = useRef(null);

    useEffect(() => {
        setIsClient(true);
        if (!startTime) {
            setStartTime(Date.now());
        }
    }, [startTime, setStartTime]);

    useEffect(() => {
        if (stepperRef.current) {
            const activeStep = stepperRef.current.children[currentStep];
            if (activeStep) {
                activeStep.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }
    }, [currentStep]);

    if (!isClient) return null; // Avoid hydration mismatch

    const step = steps[currentStep];
    const isLastStep = currentStep === steps.length;
    const progress = ((currentStep) / steps.length) * 100;

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleChange = (value) => {
        setFormData(prev => ({ ...prev, [step.id]: value }));
    };

    const handleDownloadMarkdown = () => {
        let content = "# Cahier des Charges - Site Web\n\n";
        content += `*Généré le ${new Date().toLocaleDateString()}*\n\n`;

        steps.forEach(s => {
            const val = formData[s.id];
            const valStr = Array.isArray(val) ? val.join(', ') : (val ? val.toString() : 'Non spécifié');
            content += `### ${s.category} : ${s.question}\n`;
            content += `**Réponse** : ${valStr}\n\n`;
        });

        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cahier-des-charges-${formData.project_name || 'projet'}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const renderInput = () => {
        if (!step) return null;

        const value = formData[step.id] || '';

        switch (step.type) {
            case 'text':
            case 'date':
                return (
                    <input
                        type={step.type}
                        className={styles.textInput}
                        placeholder={step.placeholder}
                        value={value}
                        onChange={(e) => handleChange(e.target.value)}
                        autoFocus
                    />
                );
            case 'textarea':
                return (
                    <textarea
                        className={styles.textInput}
                        placeholder={step.placeholder}
                        rows={5}
                        value={value}
                        onChange={(e) => handleChange(e.target.value)}
                        autoFocus
                    />
                );
            case 'select':
                return (
                    <select
                        className={styles.textInput}
                        value={value}
                        onChange={(e) => handleChange(e.target.value)}
                    >
                        <option value="" disabled>Sélectionner...</option>
                        {step.options.map(opt => (
                            <option key={opt} value={opt} style={{ color: '#333' }}>{opt}</option>
                        ))}
                    </select>
                );
            case 'radio':
            case 'choices_with_icons': // Treat similar for now, can enhance icons later
                return (
                    <div className={styles.optionsGrid}>
                        {step.options.map(opt => (
                            <div
                                key={opt}
                                className={`${styles.optionCard} ${value === opt ? styles.optionCardSelected : ''}`}
                                onClick={() => handleChange(opt)}
                            >
                                <div className={styles.radioIndicator}>
                                    {value === opt && <CheckCircle size={20} color="var(--primary)" />}
                                </div>
                                <span>{opt}</span>
                            </div>
                        ))}
                    </div>
                );
            case 'checkbox':
                const selected = Array.isArray(value) ? value : [];
                const toggle = (opt) => {
                    if (selected.includes(opt)) {
                        handleChange(selected.filter(s => s !== opt));
                    } else {
                        handleChange([...selected, opt]);
                    }
                };
                return (
                    <div className={styles.optionsGrid}>
                        {step.options.map(opt => (
                            <div
                                key={opt}
                                className={`${styles.optionCard} ${selected.includes(opt) ? styles.optionCardSelected : ''}`}
                                onClick={() => toggle(opt)}
                            >
                                <div className={styles.checkboxIndicator}>
                                    {selected.includes(opt) ? <CheckCircle size={20} color="var(--primary)" /> : <div style={{ width: 20 }} />}
                                </div>
                                <span>{opt}</span>
                            </div>
                        ))}
                    </div>
                );
            case 'color':
                return (
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <input
                            type="color"
                            value={value || step.default}
                            onChange={(e) => handleChange(e.target.value)}
                            style={{ width: '60px', height: '60px', padding: 0, border: 'none', borderRadius: '12px', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '1.2rem', fontFamily: 'monospace' }}>{value || step.default}</span>
                    </div>
                );
            case 'boolean':
                return (
                    <div className={styles.optionsGrid}>
                        {['Oui', 'Non'].map(opt => (
                            <div
                                key={opt}
                                className={`${styles.optionCard} ${value === opt ? styles.optionCardSelected : ''}`}
                                onClick={() => handleChange(opt)}
                            >
                                <span>{opt}</span>
                            </div>
                        ))}
                    </div>
                );
            case 'slider':
                // Simple implementation for slider using radio style or actual range
                return (
                    <div style={{ padding: '2rem 0' }}>
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            value={value || 3}
                            onChange={(e) => handleChange(parseInt(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--primary)' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', color: '#94a3b8' }}>
                            <span>{step.labels[0]}</span>
                            <span>{step.labels[1]}</span>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const renderRecap = () => {
        const minutesTaken = startTime ? (Date.now() - startTime) / 60000 : 0;
        const isEligible = minutesTaken < 5;

        return (
            <div className={styles.recapList}>
                {isEligible && (
                    <div className={styles.discountCard}>
                        <Gift size={32} className={styles.discountIcon} />
                        <div className={styles.discountContent}>
                            <h3>Félicitations ! 🚀</h3>
                            <p>
                                Vous avez complété le formulaire en moins de 5 minutes ! ({minutesTaken.toFixed(1)} min)
                                <br />
                                Voici votre code de réduction -20% : <span className={styles.discountCode}>FAST5</span>
                            </p>
                        </div>
                    </div>
                )}

                {steps.map((s) => (
                    <div key={s.id} className={styles.recapItem}>
                        <span className={styles.recapLabel}>{s.category} - {s.question}</span>
                        <span className={styles.recapValue}>
                            {Array.isArray(formData[s.id])
                                ? formData[s.id].join(', ')
                                : (formData[s.id] ? formData[s.id].toString() : 'Non spécifié')}
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    const renderStepper = () => {
        // Extract unique categories
        const categories = [...new Set(steps.map(s => s.category))];
        const currentCategory = step ? step.category : 'Terminé';
        const currentCategoryIndex = categories.indexOf(currentCategory);

        // Helper to find first step index of a category
        const getCategoryStartIndex = (cat) => steps.findIndex(s => s.category === cat);

        return (
            <div className={styles.stepperContainer}>
                <div className={styles.stepperTrack} ref={stepperRef}>
                    {categories.map((cat, index) => {
                        const isActive = cat === currentCategory;
                        const isCompleted = currentCategoryIndex > index || (!step && index === categories.length - 1); // Last condition for "Terminé" if applicable, but usually we handle recap separately.

                        return (
                            <div key={cat} style={{ display: 'flex', alignItems: 'center' }}>
                                <div
                                    className={`${styles.stepDot} ${isActive ? styles.stepDotActive : ''} ${isCompleted ? styles.stepDotCompleted : ''}`}
                                    onClick={() => {
                                        // Allow jumping to start of a category if we've already reached it or passed it
                                        // Or if it's the next one (optional)
                                        // For now, allow consistent navigation to any previous category starter
                                        const targetIndex = getCategoryStartIndex(cat);
                                        if (targetIndex !== -1 && targetIndex <= currentStep) {
                                            setCurrentStep(targetIndex);
                                        }
                                    }}
                                    title={cat}
                                >
                                    {isCompleted ? <CheckCircle size={16} /> : index + 1}
                                </div>
                                {index < categories.length - 1 && (
                                    <div className={`${styles.stepLine} ${isCompleted ? styles.stepLineCompleted : ''}`} />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className={styles.wizardContainer}>
            <motion.div
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {renderStepper()}

                <div className={styles.header}>
                    {/* Discount Challenge Header */}
                    {!isLastStep && currentStep === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={styles.discountBadge}
                        >
                            <Gift size={16} />
                            <span>Challenge: Complétez en &lt; 5 min pour -20% !</span>
                        </motion.div>
                    )}

                    {!isLastStep ? (
                        <>
                            <span className={styles.category}>{step.category}</span>
                            <motion.h2
                                key={step.question}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={styles.question}
                            >
                                {step.question}
                            </motion.h2>
                        </>
                    ) : (
                        <>
                            <span className={styles.category}>Terminé</span>
                            <h2 className={styles.question}>Récapitulatif de votre projet</h2>
                        </>
                    )}
                </div>

                {step?.description && !isLastStep && (
                    <div className={styles.description}>
                        <ReactMarkdown>{step.description}</ReactMarkdown>
                    </div>
                )}

                <div className={styles.content}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            style={{ width: '100%' }}
                        >
                            {!isLastStep ? renderInput() : renderRecap()}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className={styles.controls}>
                    <button
                        className={styles.button}
                        onClick={handlePrev}
                        disabled={currentStep === 0}
                        style={{ opacity: currentStep === 0 ? 0.5 : 1 }}
                    >
                        <ChevronLeft size={20} /> Retour
                    </button>

                    {!isLastStep ? (
                        <motion.button
                            className={`${styles.button} ${styles.buttonPrimary}`}
                            onClick={handleNext}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Suivant <ChevronRight size={20} />
                        </motion.button>
                    ) : (
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                className={styles.button}
                                onClick={handleDownloadMarkdown}
                            >
                                <Download size={20} /> Markdown
                            </button>
                            <motion.button
                                className={`${styles.button} ${styles.buttonPrimary}`}
                                onClick={() => alert("Simulation: Projet sauvegardé en ligne !")}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Sauvegarder <Save size={20} />
                            </motion.button>
                        </div>
                    )}

                </div>
            </motion.div>

            {/* Footer info for student defense */}
            <div style={{ textAlign: 'center', marginTop: '2rem', color: '#64748b', fontSize: '0.9rem' }}>
                <p>Projet de Stage - ISET Nabeul</p>
                <p>Concepteur de Site Web Interactif</p>
            </div>
        </div>
    );
}
