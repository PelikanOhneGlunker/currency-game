/**
 * @linkcode src/ui/styles.js
 */
export const darkTheme = {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    containerBg: '#0f0f1e',
    headerBg: 'linear-gradient(135deg, #2d3561 0%, #1e3c72 100%)',
    text: '#e2e8f0',
    textSecondary: '#a0aec0',
    border: '#2d3748',
    statItemBg: 'rgba(255, 255, 255, 0.1)',
    questionText: '#f0f4f8',
    timerText: '#cbd5e0',
    answerButton1: 'linear-gradient(135deg, #8e44ad 0%, #c0392b 100%)',
    answerButton2: 'linear-gradient(135deg, #2980b9 0%, #3498db 100%)',
    levelBarBg: 'rgba(255, 255, 255, 0.15)',
    levelBarFill: 'linear-gradient(90deg, #f39c12 0%, #e67e22 100%)',
    loadingSpinner: '#3498db'
};

export const applyStyles = (element, styles) => {
    Object.assign(element.style, styles);
};

export const getViewportWidth = () => window.innerWidth;
export const isTablet = () => getViewportWidth() >= 768;
export const isDesktop = () => getViewportWidth() >= 1024;

export const getResponsiveValue = (mobile, tablet = null, desktop = null) => {
    if (isDesktop() && desktop !== null) return desktop;
    if (isTablet() && tablet !== null) return tablet;
    return mobile;
};

export const baseStyles = {
    reset: () => ({
        margin: '0',
        padding: '0',
        boxSizing: 'border-box'
    }),
    
    flexCenter: () => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }),
    
    transition: (property = 'all', duration = '0.3s') => ({
        transition: `${property} ${duration} ease`
    }),
    
    borderRadius: (size) => ({
        borderRadius: size
    }),
    
    gradient: (colors) => ({
        background: colors
    })
};

export const injectGlobalStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            overflow-x: hidden;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes scroll-ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
    `;
    document.head.appendChild(style);
};
