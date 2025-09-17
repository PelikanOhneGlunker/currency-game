window.StyleUtils = {
    applyStyles: (element, styles) => {
        Object.assign(element.style, styles)
    },
    
    getViewportWidth: () => window.innerWidth,
    isTablet: () => window.innerWidth >= 768,
    isDesktop: () => window.innerWidth >= 1024,
    
    getResponsiveStyles: (base, tablet = {}, desktop = {}) => {
        if (window.StyleUtils.isDesktop()) return { ...base, ...tablet, ...desktop }
        if (window.StyleUtils.isTablet()) return { ...base, ...tablet }
        return base
    }
}
window.darkTheme = {
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
}
window.baseStyles = {
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
    
    transition: (property = 'all', duration = '0.3s', easing = 'ease') => ({
        transition: `${property} ${duration} ${easing}`
    }),
    
    borderRadius: (size) => ({
        borderRadius: size
    }),
    
    gradient: (colors) => ({
        background: colors
    })
}
const addGlobalAnimations = () => {
    if (!document.getElementById('global-animations')) {
        const style = document.createElement('style')
        style.id = 'global-animations'
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes scroll-ticker {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
        `
        document.head.appendChild(style)
    }
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addGlobalAnimations)
} else {
    addGlobalAnimations()
}
if (window.ModuleLoader) {
    window.ModuleLoader.register('styles', {
        StyleUtils: window.StyleUtils,
        darkTheme: window.darkTheme,
        baseStyles: window.baseStyles
    })
}
