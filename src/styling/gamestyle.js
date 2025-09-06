/**
 * @injectGlobalStyles gameUI.js
 * Gaming Interface Design System - Dark & High Contrast Themes
 * Optimized for game HUD elements with responsive layout
 */

// ============== GAME THEMES ==============
window.gameThemes = {
    dark: {
        // Main backgrounds
        background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
        centralFrame: 'rgba(12, 12, 24, 0.95)',
        panelBg: 'rgba(20, 20, 35, 0.9)',
        
        // Game UI colors
        primary: '#00d4ff', // Cyan gaming accent
        secondary: '#ff6b35', // Orange accent
        success: '#00ff88', // Bright green
        warning: '#ffaa00', // Gold
        danger: '#ff3366', // Red
        
        // Text colors
        textPrimary: '#ffffff',
        textSecondary: '#b8c5d6',
        textMuted: '#6b7788',
        textGlow: '#00d4ff',
        
        // HUD elements
        coin: '#ffd700',
        xp: '#9d4edd',
        level: '#00ff88',
        
        // Borders and effects
        border: 'rgba(0, 212, 255, 0.3)',
        borderGlow: 'rgba(0, 212, 255, 0.6)',
        shadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
        glow: '0 0 20px rgba(0, 212, 255, 0.4)'
    },
    
    darkHighContrast: {
        // High contrast backgrounds
        background: 'linear-gradient(135deg, #000000 0%, #0f0f0f 50%, #1a1a1a 100%)',
        centralFrame: 'rgba(0, 0, 0, 0.98)',
        panelBg: 'rgba(15, 15, 15, 0.95)',
        
        // High contrast colors
        primary: '#00ffff', // Bright cyan
        secondary: '#ff4500', // Bright orange
        success: '#00ff00', // Pure green
        warning: '#ffff00', // Pure yellow
        danger: '#ff0040', // Bright red
        
        // High contrast text
        textPrimary: '#ffffff',
        textSecondary: '#cccccc',
        textMuted: '#888888',
        textGlow: '#00ffff',
        
        // HUD elements - high contrast
        coin: '#ffff00',
        xp: '#cc00ff',
        level: '#00ff00',
        
        // High contrast borders
        border: 'rgba(255, 255, 255, 0.5)',
        borderGlow: 'rgba(0, 255, 255, 0.8)',
        shadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
        glow: '0 0 25px rgba(0, 255, 255, 0.6)'
    }
};

// ============== RESPONSIVE BREAKPOINTS ==============
window.gameBreakpoints = {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px'
};

// ============== CENTRAL FRAME LAYOUT ==============
/**
 * @injectGlobalStyles gameLayout.js, components/GameFrame.jsx
 */
window.gameFrameStyles = {
    container: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90vw',
        height: '85vh',
        maxWidth: '1200px',
        maxHeight: '800px',
        minWidth: '320px',
        minHeight: '500px',
        background: window.gameThemes.dark.centralFrame,
        backdropFilter: 'blur(20px)',
        border: `2px solid ${window.gameThemes.dark.border}`,
        borderRadius: '20px',
        boxShadow: window.gameThemes.dark.shadow,
        display: 'grid',
        gridTemplate: `
            "header header header" 80px
            "stock stock stock" 1fr
            "decision decision decision" 120px
            "counter counter counter" 60px
            / 1fr 2fr 1fr
        `,
        gap: '16px',
        padding: '20px',
        overflow: 'hidden'
    },
    
    // Mobile layout adjustment
    mobile: {
        '@media (max-width: 768px)': {
            width: '95vw',
            height: '90vh',
            gridTemplate: `
                "header" 70px
                "stock" 1fr
                "decision" 100px
                "counter" 50px
                / 1fr
            `,
            gap: '12px',
            padding: '16px',
            borderRadius: '16px'
        }
    }
};

// ============== HEADER STATS (Coins, XP, Level) ==============
/**
 * @injectGlobalStyles gameStats.js, components/PlayerStats.jsx
 */
window.gameStatsStyles = {
    header: {
        gridArea: 'header',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: window.gameThemes.dark.panelBg,
        borderRadius: '12px',
        padding: '12px 20px',
        border: `1px solid ${window.gameThemes.dark.border}`,
        
        '@media (max-width: 768px)': {
            padding: '10px 16px',
            flexDirection: 'column',
            gap: '8px'
        }
    },
    
    statGroup: {
        display: 'flex',
        gap: '24px',
        alignItems: 'center',
        
        '@media (max-width: 768px)': {
            gap: '16px',
            justifyContent: 'center',
            width: '100%'
        }
    },
    
    // Individual stat styles
    coinStat: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        background: 'rgba(255, 215, 0, 0.1)',
        border: `1px solid ${window.gameThemes.dark.coin}`,
        borderRadius: '8px',
        boxShadow: `0 0 10px rgba(255, 215, 0, 0.2)`,
        
        icon: {
            fontSize: '18px',
            color: window.gameThemes.dark.coin
        },
        
        value: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: window.gameThemes.dark.coin,
            textShadow: '0 0 5px rgba(255, 215, 0, 0.5)'
        }
    },
    
    xpStat: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        background: 'rgba(157, 78, 221, 0.1)',
        border: `1px solid ${window.gameThemes.dark.xp}`,
        borderRadius: '8px',
        boxShadow: `0 0 10px rgba(157, 78, 221, 0.2)`,
        
        icon: {
            fontSize: '18px',
            color: window.gameThemes.dark.xp
        },
        
        value: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: window.gameThemes.dark.xp,
            textShadow: '0 0 5px rgba(157, 78, 221, 0.5)'
        }
    },
    
    levelStat: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        padding: '8px 16px',
        background: 'rgba(0, 255, 136, 0.1)',
        border: `1px solid ${window.gameThemes.dark.level}`,
        borderRadius: '8px',
        boxShadow: `0 0 10px rgba(0, 255, 136, 0.2)`,
        
        label: {
            fontSize: '12px',
            color: window.gameThemes.dark.textSecondary,
            fontWeight: '500'
        },
        
        value: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: window.gameThemes.dark.level,
            textShadow: '0 0 5px rgba(0, 255, 136, 0.5)'
        }
    }
};

// ============== XP BAR COMPONENT ==============
/**
 * @injectGlobalStyles xpBar.js, components/XPBar.jsx
 */
window.xpBarStyles = {
    container: {
        width: '200px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        
        '@media (max-width: 768px)': {
            width: '150px'
        }
    },
    
    bar: {
        width: '100%',
        height: '8px',
        background: 'rgba(157, 78, 221, 0.2)',
        borderRadius: '4px',
        overflow: 'hidden',
        border: `1px solid ${window.gameThemes.dark.xp}`,
        position: 'relative'
    },
    
    fill: {
        height: '100%',
        background: `linear-gradient(90deg, ${window.gameThemes.dark.xp} 0%, #c77dff 100%)`,
        borderRadius: '3px',
        transition: 'width 0.5s ease',
        boxShadow: `0 0 10px rgba(157, 78, 221, 0.6)`,
        animation: 'xpGlow 2s ease-in-out infinite alternate'
    },
    
    text: {
        fontSize: '11px',
        color: window.gameThemes.dark.textSecondary,
        textAlign: 'center',
        fontWeight: '500'
    }
};

// ============== STOCK INFORMATION PANEL ==============
/**
 * @injectGlobalStyles stockPanel.js, components/StockInfo.jsx
 */
window.stockPanelStyles = {
    container: {
        gridArea: 'stock',
        background: window.gameThemes.dark.panelBg,
        borderRadius: '16px',
        border: `1px solid ${window.gameThemes.dark.border}`,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        
        '@media (max-width: 768px)': {
            padding: '20px 16px'
        }
    },
    
    title: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: window.gameThemes.dark.primary,
        marginBottom: '16px',
        textAlign: 'center',
        textShadow: `0 0 10px ${window.gameThemes.dark.primary}`
    },
    
    stockData: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px',
        width: '100%',
        maxWidth: '600px',
        
        '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr',
            gap: '12px'
        }
    },
    
    stockItem: {
        background: 'rgba(0, 212, 255, 0.05)',
        border: `1px solid ${window.gameThemes.dark.border}`,
        borderRadius: '8px',
        padding: '16px',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        
        ':hover': {
            borderColor: window.gameThemes.dark.borderGlow,
            boxShadow: window.gameThemes.dark.glow,
            transform: 'scale(1.02)'
        },
        
        name: {
            fontSize: '14px',
            color: window.gameThemes.dark.textSecondary,
            marginBottom: '8px'
        },
        
        value: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: window.gameThemes.dark.textPrimary
        },
        
        change: {
            fontSize: '12px',
            fontWeight: '500',
            marginTop: '4px'
        }
    }
};

// ============== DECISION BUTTONS ==============
/**
 * @injectGlobalStyles decisionButtons.js, components/DecisionPanel.jsx
 */
window.decisionButtonStyles = {
    container: {
        gridArea: 'decision',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '32px',
        padding: '20px',
        
        '@media (max-width: 768px)': {
            gap: '20px',
            padding: '16px'
        }
    },
    
    button: {
        base: {
            padding: '16px 32px',
            fontSize: '18px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
            minWidth: '140px',
            minHeight: '60px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            
            '@media (max-width: 768px)': {
                padding: '14px 24px',
                fontSize: '16px',
                minWidth: '120px',
                minHeight: '50px'
            }
        },
        
        buy: {
            background: `linear-gradient(135deg, ${window.gameThemes.dark.success} 0%, #00cc6a 100%)`,
            color: '#000000',
            boxShadow: `0 6px 20px rgba(0, 255, 136, 0.3)`,
            border: `2px solid ${window.gameThemes.dark.success}`,
            
            ':hover': {
                transform: 'translateY(-3px) scale(1.05)',
                boxShadow: `0 10px 30px rgba(0, 255, 136, 0.5)`,
                filter: 'brightness(1.1)'
            },
            
            ':active': {
                transform: 'translateY(-1px) scale(1.02)'
            }
        },
        
        sell: {
            background: `linear-gradient(135deg, ${window.gameThemes.dark.danger} 0%, #cc1744 100%)`,
            color: '#ffffff',
            boxShadow: `0 6px 20px rgba(255, 51, 102, 0.3)`,
            border: `2px solid ${window.gameThemes.dark.danger}`,
            
            ':hover': {
                transform: 'translateY(-3px) scale(1.05)',
                boxShadow: `0 10px 30px rgba(255, 51, 102, 0.5)`,
                filter: 'brightness(1.1)'
            },
            
            ':active': {
                transform: 'translateY(-1px) scale(1.02)'
            }
        }
    }
};

// ============== HEX COUNTER ==============
/**
 * @injectGlobalStyles hexCounter.js, components/HexCounter.jsx
 */
window.hexCounterStyles = {
    container: {
        gridArea: 'counter',
        background: window.gameThemes.dark.panelBg,
        borderRadius: '10px',
        border: `1px solid ${window.gameThemes.dark.border}`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
    },
    
    counter: {
        fontSize: '24px',
        fontWeight: 'bold',
        fontFamily: '"Courier New", monospace',
        color: window.gameThemes.dark.primary,
        textShadow: `0 0 10px ${window.gameThemes.dark.primary}`,
        letterSpacing: '2px',
        
        '@media (max-width: 768px)': {
            fontSize: '20px',
            letterSpacing: '1px'
        }
    },
    
    label: {
        position: 'absolute',
        top: '8px',
        left: '12px',
        fontSize: '10px',
        color: window.gameThemes.dark.textMuted,
        fontWeight: '500',
        textTransform: 'uppercase'
    }
};

// ============== ANIMATIONS ==============
/**
 * @injectGlobalStyles gameAnimations.js, animations.css
 */
window.gameAnimations = {
    keyframes: `
        @keyframes xpGlow {
            0% { box-shadow: 0 0 5px rgba(157, 78, 221, 0.6); }
            100% { box-shadow: 0 0 15px rgba(157, 78, 221, 0.9); }
        }
        
        @keyframes counterPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        @keyframes buttonGlow {
            0%, 100% { box-shadow: 0 6px 20px rgba(0, 255, 136, 0.3); }
            50% { box-shadow: 0 8px 25px rgba(0, 255, 136, 0.5); }
        }
        
        @keyframes frameGlow {
            0%, 100% { border-color: rgba(0, 212, 255, 0.3); }
            50% { border-color: rgba(0, 212, 255, 0.6); }
        }
    `,
    
    // Animation utility classes
    classes: {
        counterPulse: {
            animation: 'counterPulse 1s ease-in-out infinite'
        },
        buttonGlow: {
            animation: 'buttonGlow 2s ease-in-out infinite'
        },
        frameGlow: {
            animation: 'frameGlow 3s ease-in-out infinite'
        }
    }
};

// ============== THEME SWITCHER ==============
/**
 * @injectGlobalStyles themeManager.js
 */
window.gameThemeManager = {
    currentTheme: 'dark',
    
    switchTheme: (themeName) => {
        if (window.gameThemes[themeName]) {
            window.gameThemeManager.currentTheme = themeName;
            // Update CSS custom properties
            const root = document.documentElement;
            const theme = window.gameThemes[themeName];
            
            Object.entries(theme).forEach(([key, value]) => {
                root.style.setProperty(`--game-${key}`, value);
            });
            
            console.log(`🎮 Switched to ${themeName} theme`);
        }
    },
    
    getTheme: () => window.gameThemes[window.gameThemeManager.currentTheme]
};

// ============== UTILITY FUNCTIONS ==============
/**
 * @injectGlobalStyles gameUtils.js, utils/gameUI.js
 */
window.gameUIUtils = {
    // Format numbers for display
    formatNumber: (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    },
    
    // Convert milliseconds to hex
    msToHex: (ms) => {
        return '0x' + ms.toString(16).toUpperCase().padStart(8, '0');
    },
    
    // Get stock change color
    getStockChangeColor: (change) => {
        const theme = window.gameThemeManager.getTheme();
        if (change > 0) return theme.success;
        if (change < 0) return theme.danger;
        return theme.textSecondary;
    },
    
    // Calculate XP bar percentage
    calculateXPPercentage: (currentXP, levelXP) => {
        return Math.min(100, (currentXP / levelXP) * 100);
    },
    
    // Device-specific button size
    getButtonSize: () => {
        return window.innerWidth <= 768 ? 'mobile' : 'desktop';
    }
};

// ============== INITIALIZATION ==============
/**
 * Initialize the game UI system
 *
 * Device settings are good but we only need wem for some items and only in dark and dark(height contrast style). This app is a Game.
 * We habe labels with coins and xp and level as number and bar. In the middle part showed some stock information
 * and you have the disition of to buttons. At the botten we have a counter in hex milliseconds.
 * There things are all on a central frame. And components order and resize by device.
 */
window.initGameUI = () => {
    // Inject animations
    const style = document.createElement('style');
    style.textContent = window.gameAnimations.keyframes;
    document.head.appendChild(style);
    
    // Set initial theme
    window.gameThemeManager.switchTheme('dark');
    
    // Add base game styles
    const gameStyle = document.createElement('style');
    gameStyle.textContent = `
        body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: ${window.gameThemes.dark.background};
            color: ${window.gameThemes.dark.textPrimary};
            user-select: none;
        }
        
        * {
            box-sizing: border-box;
        }
    `;
    document.head.appendChild(gameStyle);
    
    console.log('🎮 Game UI System initialized');
};

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initGameUI);
} else {
    window.initGameUI();
}


