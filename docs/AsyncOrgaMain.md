# AsyncOrgaMain

/**
 * @static <D012> " Or for multiple dependencies:" (0x2dF9)
 * @static <D005> " Do this (safe):" (0x2dF9)
 * @static <D000> " Instead of this (causes errors):" (0x2dF9)
 */
```
function myFunction() {
    window.uiController.setCoins(100); // Error if uiController is null
}
function myFunction() {
    window.useModule('uiController', (uiController) => {
        uiController.setCoins(100); // Only runs when uiController exists
    })
}
function myComplexFunction() {
    window.useModules(['uiController', 'answerManager'], (modules) => {
        modules.uiController.setCoins(100)
        modules.answerManager.clearAnswers()
    })
}
```
# Asyncrone funktion nach DOM build
var testModel = async function() {
    console.log(44564648)
}

window.appInitializer.ready(testModel)
