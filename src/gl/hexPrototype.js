/**
 * @see {@link /docs/CommandsForShell # USAGE_IT}
 * @typedef  {Object} HexNumber
 * @param {String | Int} value "0x000000" | 0x000000
 */
function HexNumber(value) {
    if (typeof value === 'string') {
        this.value = parseInt(value.replace(/^0x/i, ''), 16)
    } else if (typeof value === 'number') {
        this.value = Math.floor(Math.abs(value)); // Ensure positive integer
    } else {
        throw new Error('Invalid input: must be a number or hex string')
    }
    if (isNaN(this.value)) {
        throw new Error('Invalid hexadecimal value')
    }
}
HexNumber.prototype.add = function(other) {
    const otherValue = other instanceof HexNumber ? other.value : new HexNumber(other).value
    return new HexNumber(this.value + otherValue)
}
/**
 * @returns {String} 0x000000 format
 */
HexNumber.prototype.toString = function() {
    const hexString = this.value.toString(16).toUpperCase()
    const paddedHex = hexString.padStart(6, '0')
    return '0x' + paddedHex
}
/**
 * 
 * @param {HexNumber} other 
 * @returns {boolean} {true|false}
 */
HexNumber.prototype.equ = function(other) {
    const otherValue = other instanceof HexNumber ? other.value : new HexNumber(other).value
    return (this.value.toString() === otherValue.toString())
}
HexNumber.prototype.iterate = function(endAddress, callback, step) {
    if (typeof callback !== 'function') {
        throw new Error('Second parameter must be a callback function');
    }
    if (step === undefined) {
        step = 1;
    }
    let endValue;
    if (endAddress instanceof HexNumber) {
        endValue = endAddress.value;
    } else {
        endValue = new HexNumber(endAddress).value;
    }
    const stepValue = Math.abs(Number(step));
    if (stepValue === 0) {
        throw new Error('Step value cannot be zero');
    }
    let currentValue = this.value;
    if (this.value <= endValue) {
        while (currentValue <= endValue) {
            var currentAddress = new HexNumber(currentValue);
            var continueIteration = callback(currentAddress);
            if (continueIteration === false) {
                break;
            }
            if (continueIteration === true) {
                continue;
            }
            currentValue += stepValue;
        }
    } else {
        while (currentValue >= endValue) {
            var currentAddress = new HexNumber(currentValue);
            var continueIteration = callback(currentAddress);
            if (continueIteration === false) {
                break;
            }
            if (continueIteration === true) {
                continue;
            }
            currentValue -= stepValue;
        }
    }
    return this;
}
