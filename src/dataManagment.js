var cdb = []

async function addData(pshort, pmul, pname, pyear, plocalStorageAdress) {
    cdb.push({
        short: pshort, 
        mul: pmul, 
        name: pname, 
        year: pyear, 
        localStorageAdress: plocalStorageAdress
    })
}

var wiredValue = async (params) => {
    function checkP(p) {
        if (param == undefined) {
            return true
        }
        if (param == null) {
            return true
        }
        if (param == "") {
            return true
        }
        if (param == NaN) {
            return true
        }
    }
    for (var i = 0; i < params.length; i++) {
        if (checkP(params[i])) {
            return true
        }
    }
    return false
}

var deleteCurrencysWithMissingData = async (pdatabase) => {
    return new Promise((resolve, reject) => {
        if (cdb.length != 0) {
            var database = pdatabase
            var persisitentStorAdrr = 0x0205F8
            for (var year = 2000, i = 0; year < 2025, i < database.length; year++, i++) {
                for (var ptr = 0; ptr < database[i].currency_array.length; ptr++) {
                    var short = database[year].currency_array[ptr].short
                    var mul = database[year].currency_array[ptr].mul
                    var name = database[year].currency_array[ptr].name
                    if (wiredValue([short, mul, name])) {
                        continue
                    }
                    addData(short, mul, name, year, new String("#" + persisitentStorAdrr))
                    persisitentStorAdrr++
                }
            }
            resolve("Operation succeeded!");
        } else {
            reject("Operation failed.");
        }
    })
}
