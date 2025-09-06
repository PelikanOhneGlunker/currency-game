/**
 * @typedef  {Object} AutoComment
 * @property {string} line - Comment identifier (e.g., "D163")
 * @property {string} description - Comment description
 * @property {Int32}  state - Original git State
 */

/**
 * @typedef {"AUD"|"BGN"|"BRL"|"CAD"|
 * "CHF"|"CNY"|"CZK"|"DKK"|"EUR"|"GBP"|
 * "HKD"|"HUF"|"IDR"|"ILS"|"INR"|"ISK"| . . . } WaehrungCode
 */

/**
 * @type {Record<code, name>}
 * 
 */
const CURRENCY_NAMES_SHORT_AND_LONG = {
    "AUD": "Australischer Dollar (A$)",
    "BGN": "Bulgarischer Lew (лв)",
    "BRL": "Brasilianischer Real (R$)",
    "CAD": "Kanadischer Dollar (C$)",
    "CHF": "Schweizer Franken (CHF)",
    "CNY": "Renminbi Yuan (¥)",
    "CZK": "Tschechische Krone (Kč)",
    "DKK": "Dänische Krone (kr)",
    "GBP": "Britisches Pfund (£)",
    "HKD": "Hongkong-Dollar (HK$)",
    "HUF": "Ungarischer Forint (Ft)",
    "IDR": "Indonesische Rupiah (Rp)",
    "ILS": "Israelischer Neuer Schekel (₪)",
    "INR": "Indische Rupie (₹)",
    "ISK": "Isländische Krone (kr)",
    "JPY": "Japanischer Yen (¥)",
    "KRW": "Südkoreanischer Won (₩)",
    "MXN": "Mexikanischer Peso (MX$)",
    "MYR": "Malaysischer Ringgit (RM)",
    "NOK": "Norwegische Krone (kr)",
    "NZD": "Neuseeländischer Dollar (NZ$)",
    "PHP": "Philippinischer Peso (₱)",
    "PLN": "Polnischer Złoty (zł)",
    "RON": "Rumänischer Leu (lei)",
    "SEK": "Schwedische Krone (kr)",
    "SGD": "Singapur-Dollar (S$)",
    "THB": "Thailändischer Baht (฿)",
    "TRY": "Türkische Lira (₺)",
    "USD": "US-Dollar ($)",
    "ZAR": "Südafrikanischer Rand (R)",
    "EUR": "Euro (€)"
}
const CURRENCY_NAMES_SHORT_AND_LONG_LENGTH = 31
const ZEITRAUM = {
    VON: 2000,
    BIS: 2025
}
const NR_OF_YEARS = ZEITRAUM.BIS - ZEITRAUM.VON
const READ_FROM_LOCAL_STORAGE = true
const SPIN_COLOR = ["#00ff88", "#ff4757", "#61DAFB", "#CCCCCC"]
const TAUSEND_MILLISEKUNDEN = new HexNumber(0x3E8)
const SHOW_CLOCK_TICKS = false
