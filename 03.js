const _ = require('lodash')
const data03 = require('./data03')

const claims = _(data03)
    .split('\n')
    .map(claim => {
        const [_id, measurements] = _.split(claim, '@')
        const [edges, sizes] = _.split(measurements, ':')
        const [leftEdge, topEdge] = _.split(edges, ',').map(_.parseInt)
        const [width, height] = _.split(sizes, 'x').map(_.parseInt)
        const id = _.trim(_id, '# ')

        return { id, leftEdge, topEdge, width, height }
    })
    .keyBy('id')
    .value()

function claimPatch(mapping, claim) {
    const { leftEdge, topEdge, width, height, id } = claim

    for (i = leftEdge; i < leftEdge + width; i++) {
        for (j = topEdge; j < topEdge + height; j++) {
            if (!mapping[i]) {
                mapping[i] = {}
            }

            const value = mapping[i][j]
            if (!!value) {
                mapping[i][j].push(id)
            } else {
                mapping[i][j] = [id]
            }
        }
    }
}

const mapping = {}
_.forEach(claims, claim => claimPatch(mapping, claim))

const a = _.flatMap(mapping, _.values).filter(val => val.length > 1).length
console.log(a)

const b = _(mapping)
    .flatMap(_.values)
    .filter(val => val.length === 1)
    .flatten()
    .groupBy()
    .mapValues(val => val.length)
    .pickBy((area, id) => {
        const { width, height } = claims[id]
        return area === width * height
    })
    .value()
console.log(b)
