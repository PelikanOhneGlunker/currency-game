/**
 * @AutoComment <D055> " Now this works without NS_ERROR_NOT_AVAILABLE" (0x2dF9)
 * @AutoComment <D040> " Define your hex-backed properties" (0x2dF9)
 * @AutoComment <D018> " If it’s a function, bind it back to localStorage" (0x2dF9)
 * @AutoComment <D015> " For anything else, grab the property" (0x2dF9)
 * @AutoComment <D008> " Handle your defined keys" (0x2dF9)
*/
const definitions = {}
function defineHex(key, opts) {
  definitions[key] = { ...opts }
}
const hexStorage = new Proxy(localStorage, {
  get(target, prop, receiver) {
    if (prop in definitions) {
      const { parse, defaultValue } = definitions[prop]
      const raw = target.getItem(prop)
      return raw !== null ? parse(raw) : defaultValue
    }
    const val = Reflect.get(target, prop, receiver)
    if (typeof val === 'function') {
      return val.bind(target)
    }
    return val
  },
  set(target, prop, value) {
    if (prop in definitions) {
      const { transform, validate } = definitions[prop]
      if (!validate(value)) {
        throw new Error(`Invalid value for ${prop}`)
      }
      target.setItem(prop, transform(value))
      return true
    }
    target[prop] = value
    return true
  }
})
const hexStorageTest = () => {
  defineHex('0xB20000', {
    transform: JSON.stringify,
    parse:     JSON.parse,
    validate:  v => typeof v === 'object',
    defaultValue: {}
  })
  var mess = {value: "Hallo, I'm a Object and existing on " + "0xB20000"}
  hexStorage['0xB20000'] = mess
  console.log(hexStorage['0xB20000'])
  if (hexStorage['0xB20000'] == mess) {
    console.log("Can read 0xB20000")
  } else {
    console.log("ERROR: Storage # 0xB20000")
  }
}
var badValue = async (params) => {
    var checkP = (p) => {
        if (p == undefined || p == null || p == "" || p == NaN) {
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
/**
 * @param {WaehrungCode} waehrung
 * @param {float} multiplikator
 * @param {String} CurrencyName
 * @param {int} yearDataCollected
 * @param {int*} localStorageCashe
 */
var addData = async (pshort, pmul, pname, pyear, plocalStorageAdress) => {
    if (badValue([pshort, pmul, pname, pyear])) {
      return null
    }
    defineHex(plocalStorageAdress, {
      transform: JSON.stringify,
      parse:     JSON.parse,
      validate:  v => typeof v === 'object',
      defaultValue: {}
    })
    hexStorage[plocalStorageAdress] = {
        short: pshort, 
        mul: pmul, 
        name: pname, 
        year: pyear, 
        localStorageAdress: plocalStorageAdress
    }
}
var deleteCurrencysWithMissingData = async (database) => {
  var startAdress = new HexNumber(0x0C0000)
  var range = new HexNumber(centralKeyArray.length)
  var endAdress = startAdress.add(range)
  console.log("Start Adress: " + startAdress)
  console.log("Range Adress: " + range)
  console.log("End__ Adress: " + endAdress)
  console.log("pDatabase length: " + database.length)
  var yearIndex = 0
  var currencyIndex = 0
  startAdress.iterate(endAdress, (currentAddress) => {
    var ent = database[yearIndex].currency_array[currencyIndex]
    addData(ent.short, ent.mul, ent.name, yearIndex + 2000, currentAddress)
  })
}