'use strict'

const _ = require('lodash')
const data01 = require('./data').data01

const a = _.reduce(data01, (acc, value) => acc + value, 0)
console.log({a})

const tracker = [true]
let acc = 0
let done = false

while (!done) {
    done = _.some(data01, value => {
        acc = acc + value
        if (tracker[acc]) {
            return true
        }
        tracker[acc] = true
        return
    })
}
console.log({b: acc})
