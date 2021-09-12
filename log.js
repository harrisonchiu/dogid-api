const currentTime = () => {
    const date = new Date()

    return `${date.toLocaleTimeString('en-GB')}:${('000' + date.getMilliseconds()).slice(-3)}`
}

const loggerCurrentTime = () => {
    const date = new Date()

    // Current time HH:mm:ss (24 hours) with milliseconds (constantly 3 digits)
    return `[${date.toLocaleTimeString('en-GB')}:${('000' + date.getMilliseconds()).slice(-3)}]`
}

class Logger {
    static trace(logText) {
        console.log(`${loggerCurrentTime()} [TRACE] ${logText}`)
    }

    static debug(logText) {
        console.log(`${loggerCurrentTime()} [DEBUG] ${logText}`)
    }

    static info(logText) {
        console.log(`${loggerCurrentTime()} [INFO] ${logText}`)
    }

    static warn(logText) {
        console.log(`${loggerCurrentTime()} [WARN] ${logText}`)
    }

    static error(logText) {
        console.log(`${loggerCurrentTime()} [ERROR] ${logText}`)
    }

    static fatal(logText) {
        console.log(`${loggerCurrentTime()} [FATAL] ${logText}`)
    }
    
    static success(logText) {
        console.log(`${loggerCurrentTime()} [SUCCESS] ${logText}`)
    }
}

module.exports = {
    currentTime,
    Logger
}