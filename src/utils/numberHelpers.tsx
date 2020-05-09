import React from "react"
import {random, range} from 'lodash'

export const printMoney = (money: number) => {
    try {
        return money ? <span>
                UGX&nbsp;
            {new Intl.NumberFormat('en-US', {maximumFractionDigits: 2}).format(money)}
            </span> : ""
    } catch (e) {
        return ''
    }
}

export const printNumber = (number: number) => {
    try {
        return number ? new Intl.NumberFormat().format(number) : ''
    } catch (e) {
        return ''
    }
}

export const printFloatNumber = (number: number) => {
    try {
        return number ? new Intl.NumberFormat('en-US', {maximumFractionDigits: 0}).format(number) : ''
    } catch (e) {
        return ''
    }
}

export const printDecimal = (number: number) => {
    try {
        return number ? new Intl.NumberFormat('en-US', {maximumFractionDigits: 2}).format(number) : ''
    } catch (e) {
        return ''
    }
}

export const printInteger = (number: number) => {
    try {
        return number ? new Intl.NumberFormat('en-US', {maximumFractionDigits: 0}).format(number) : ''
    } catch (e) {
        return ''
    }
}

export const randomInt = (min = 0, max = 10): number => {
    return random(min, max)
}

export const intRange = (min = 0, max = 10): number[] => {
    return range(min, max)
}
