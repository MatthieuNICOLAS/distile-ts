
import {join} from "../helper/join.js"
import {Bounded} from "../bounded.js"
import {Order, Ordering, compareBasedOrder} from "../order.js"


// Impl.

const numberBounds: Bounded<number> = {
    bottom: Number.MIN_VALUE,
    top: Number.MAX_VALUE
}

const safeIntImpl: Bounded<number> & Order<number> = join({

    compare (a: number, b: number): Ordering {
        const signA = Math.sign(a)
        const signB = Math.sign(b)

        if (signA === signB) {
            if (Math.abs(a - b) < Number.EPSILON) {
                return Ordering.Equal
            } else if (a < b) {
                return Ordering.Less
            } else {
                return Ordering.Greater
            }
        } else {
            if(Math.sign(a + -1*signA*Number.EPSILON) !== signA &&
                Math.sign(b + -1*signB*Number.EPSILON) !== signB) {

                return Ordering.Equal
            } else if (signA === -1 || signB === 1) {
                return Ordering.Less
            } else {
                return Ordering.Greater
            }
        }
    }

}, compareBasedOrder, numberBounds)

export {
    numberBounds,
    safeIntImpl
}
