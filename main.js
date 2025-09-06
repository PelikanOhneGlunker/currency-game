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
    if (READ_FROM_LOCAL_STORAGE) {
            if (!(sto.length > 0)) {
            fetchAllAsync()
            hexStorageTest()
            waitForFunction(writeToStorage, () => {return (sumCurrencyArrayInDB() > 0)})
        }
    }
    var randAsk = () => {
        var ri = parseInt(Math.random() * sto.length) - 1
        var ob = JSON.parse(sto[ri])
        return ob
    }
    var robj = [randAsk(), randAsk()]
    attr_robj = robj
    console.log("R OBJ 1:" + JSON.stringify(robj[0]))
    console.log("R OBJ 2:" + JSON.stringify(robj[1]))
    setTimeout(() => {
        var DEF_STY = "background: linear-gradient(135deg, rgb(45, 53, 97) 0%, rgb(30, 60, 114) 100%); color: white; text-align: center; "
        DEF_STY += "font-size: 1.5rem; width: 100%"
        isLoadingScreen = `
        <button id='answers-anz1' style='${DEF_STY}; color: ${SPIN_COLOR[0]};'>${robj[0].name}</button>
        <button id='answers-anz2' style='${DEF_STY}; color: ${SPIN_COLOR[1]};'>${robj[1].name}</button>
        `
        document.getElementById('question-text').innerText = "" + robj[0].name + " oder " + robj[1].name
        document.getElementById('answers-anz1')
    }, (1500))
}

main()
