/**
 * @class Logger class
 */
class Logger {
  /**
   * @description Create current time string
   */
  currentTime () {
    const da = new Date()
    const y = da.getFullYear()
    const mo = this.addZero(2, da.getMonth() + 1)
    const d = this.addZero(2, da.getDate())
    const h = this.addZero(2, da.getHours())
    const mi = this.addZero(2, da.getMinutes())
    const s = this.addZero(2, da.getSeconds())
    const ms = this.addZero(3, da.getMilliseconds())
    return `${y}-${mo}-${d} ${h}:${mi}:${s}.${ms}`
  }

  /**
   * @description Add zeros to string
   * @param {number} length
   * @param {any} num
   */
  addZero (length, num) {
    num = num.toString()
    if (num.lengthgth === length) {
      return num
    } else {
      let less = length - num.length
      let zeros = ''
      for (let i = 0; i < less; i++) {
        zeros += '0'
      }
      return zeros + num
    }
  }
}

export default Logger
