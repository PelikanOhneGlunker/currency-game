// src/answerManager.js
import { applyStyles, darkTheme, baseStyles, getResponsiveValue } from './styles.js';
import { uiController } from './uiController.js';

export class AnswerManager {
    constructor() {
        this.container = null;
        this.buttons = [];
    }

    init() {
        this.container = document.getElementById('answers-container');
        return !!this.container;
    }

    createButton(text, index) {
        const button = document.createElement('button');
        button.className = 'answer-button';
        button.textContent = text;
        
        const gradient = index % 2 === 0 ? darkTheme.answerButton1 : darkTheme.answerButton2;
        
        applyStyles(button, {
            ...baseStyles.gradient(gradient),
            color: 'white',
            border: 'none',
            borderRadius: '15px',
            padding: getResponsiveValue('1rem 1.5rem', '1rem 1.5rem', '1.25rem 2rem'),
            fontSize: getResponsiveValue('1rem', '1.1rem', '1.15rem'),
            fontWeight: '600',
            cursor: 'pointer',
            ...baseStyles.transition(),
            minHeight: getResponsiveValue('60px', '80px', '90px'),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: '1'
        });

        this.addEffects(button);
        return button;
    }

    addEffects(button) {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 10px 20px rgba(52, 152, 219, 0.3)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'none';
        });
    }

    addAnswer(text, index, onClick) {
        if (!this.container && !this.init()) return null;
        
        const button = this.createButton(text, index);
        if (onClick) button.addEventListener('click', onClick);
        
        this.container.appendChild(button);
        this.buttons.push(button);
        
        uiController.emit('update', { type: 'answerAdded', text, index });
        return button;
    }

    clear() {
        if (this.container) {
            this.container.innerHTML = '';
            this.buttons = [];
        }
    }

    showLoading() {
        if (!this.container && !this.init()) return;
        
        this.container.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div class="loading-spinner" style="
                    width: 50px;
                    height: 50px;
                    border: 4px solid ${darkTheme.border};
                    border-top: 4px solid ${darkTheme.loadingSpinner};
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                "></div>
                <p style="color: ${darkTheme.textSecondary}">Loading...</p>
            </div>
        `;
    }

    disableAll() {
        this.buttons.forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.6';
        });
    }

    enableAll() {
        this.buttons.forEach(btn => {
            btn.disabled = false;
            btn.style.opacity = '1';
        });
    }
}

export const answerManager = new AnswerManager();
