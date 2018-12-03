const _ = require('lodash')
const data02 = require('./data').data02

function counter(acc, id) {
    const split = _.split(id, '')
    const hashGroup = _.groupBy(split, val => val)

    const twice = _.some(hashGroup, value => value.length === 2)
    const thrice = _.some(hashGroup, value => value.length === 3)

    if (twice) {
        acc.twice++
    }
    if (thrice) {
        acc.thrice++
    }
    return acc
}
const result = _.reduce(data02, counter, { twice: 0, thrice: 0 })

console.log(result.twice * result.thrice)

function isMatch(baseId, id) {
    if (baseId.length !== id.length) {
        return false
    }

    let diffCount = 0
    _.forEach(_.split(baseId, ''), (char, idx) => {
        if (char !== id[idx]) {
            diffCount++
        }
    })

    if (diffCount === 1) {
        return id
    }
}

for (let i = 0; i < data02.length; i++) {
    const baseId = data02[i]
    const comparators = _.drop(data02, i + 1)

    const match = _.find(comparators, comparatorId =>
        isMatch(baseId, comparatorId)
    )

    if (!!match) {
        const removeIndex = _.findIndex(
            _.split(baseId, ''),
            (char, idx) => char !== match[idx]
        )

        const commonString =
            baseId.slice(0, removeIndex) + baseId.slice(removeIndex + 1)

        console.log(commonString)
        break
    }
}
