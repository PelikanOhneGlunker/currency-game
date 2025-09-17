/**
 * 
 * @param {Function} callback 
 * @param {Function} getFlag 
 */
var waitForFunction = async function(callback, getFlag) {
    setTimeout(() => {
        if (getFlag()) {
            callback()
        } else {
            waitForFunction(callback, getFlag)
        }
    }, 100)
}

/**
 * @event <ENTRYPOINT>
 */
async function main() {
    var sto = readStorage(0x0C0000)
    if (!(sto.length > 0)) {
        fetchAllAsync()
        await waitForFunction(writeToStorage, () => {return (sumCurrencyArrayInDB() > 0)})
    }
    var randAsk = () => {
        var ri = parseInt(Math.random() * sto.length) - 1
        var ob = JSON.parse(sto[ri])
        return ob
    }
    var quest_function = (winner = 0, selected_winner = 0) => {
        setTimeout(() => {
            var game_state = null
            if (winner == 0) {
                window.UIController = new UIController()
                window.AnswerManager = new AnswerManager()
                if (readGameState() == undefined) {
                    game_state = window.UIController.getAllValues()
                } else {
                    game_state = JSON.parse(readGameState())
                    window.UIController.setMultiple(game_state)
                    console.log("read game_state")
                    console.log(game_state)
                }
            } else {
                game_state = window.UIController.getAllValues()
            }
            if (winner > 0 && (winner == selected_winner || winner == 3)) {
                game_state.coins = parseInt(game_state.coins)
                game_state.xp = parseInt(game_state.xp)
                game_state.level = parseInt(game_state.level)
                window.UIController.setCoins(game_state.coins + 5)
                game_state.xp = game_state.xp + 25
                window.UIController.setXP(game_state.xp)
                if (game_state.xp != 0 && game_state.xp % 100 == 0) {
                    window.UIController.setLevelProgress(100)
                    setTimeout(() => {
                        window.UIController.setLevelProgress(0)
                    }, 444)
                } else {
                    window.UIController.setLevelProgress(game_state.xp % 100)
                }
                if (game_state.xp % 100 == 0 && game_state.xp != 0) {
                    window.UIController.setLevel(game_state.level + 1)
                    window.UIController.setCurrentLevel(game_state.level + 1)
                    window.UIController.setNextLevel(game_state.level + 2)
                }
                console.log(window.UIController.getAllValues())
                writeGameState(window.UIController.getAllValues())
            }
            var robj = [randAsk(), randAsk()]
            var quest = "" + robj[0].name + " oder " + robj[1].name
            winner = (robj[0].mul < robj[1].mul) ? 2 : 1
            if (robj[0].mul == robj[1].mul) {
                winner = 3
            }
            console.log("R OBJ 1:" + JSON.stringify(robj[0]))
            console.log("R OBJ 2:" + JSON.stringify(robj[1]))
            window.UIController.setQuestion(quest)
            window.AnswerManager.showLoading()
            window.AnswerManager.hideLoading()
            window.AnswerManager.addAnswerButton(robj[0].name, 0, () => {
                quest_function(winner, 1)
            })
            window.AnswerManager.addAnswerButton(robj[1].name, 1, () => {
                quest_function(winner, 2)
            })
            window.AnswerManager.enableAllButtons()
            global_refresh_page = () => {
                location.reload()
            }
        }, ((winner == 0) ? 1000 : 300))
    }
    quest_function()
}

main()
