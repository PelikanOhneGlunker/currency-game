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
    fetchAllAsync()
    hexStorageTest()
    waitForFunction(() => {
        console.log("Nr Of Entrys" + centralKeyArray.length)
        deleteCurrencysWithMissingData(database)
    }, () => {
        return (centralKeyArray.length > 0 && sumCurrencyArrayInDB() > 0 && centralKeyArray.length == sumCurrencyArrayInDB())
    })
}

main()
