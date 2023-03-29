import React from 'react';
import styles from './About.module.scss';

export const About: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <p>
                Naprogramoval <a href="https://www.martinhujer.cz/">Martin Hujer</a> v roce 2023. Zdrojové kódy jsou na{' '}
                <a href="https://github.com/mhujer/ants">githubu</a>.
            </p>
            <p>
                Princip hry, grafiku a zvuky jsem převzal z původní hry Mravenci, kterou vymyslel a naprogramoval{' '}
                <a href="https://www.breatharian.eu/Panda38/index.html">Ing. Miroslav Němeček</a>.<br /> Originální hru
                pro Windows a případně i samostatnou grafiku a zvuky si{' '}
                <a href="https://www.breatharian.eu/sw/index.html">můžete stáhnout ze stránek autora</a> (zhruba v
                polovině stránky) pod licencí <em>&quot;použijte tu z toho co chcete a kde chcete&quot;</em>.
            </p>
        </footer>
    );
};
