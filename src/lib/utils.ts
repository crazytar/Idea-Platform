import { currencyType } from "@/types/main"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function convertPrice(input: currencyType, output: currencyType, price: number): number {
    if (input === output) {
        return price
    }

    switch (input) {
        case 'USD':
            switch (output) {
                case 'EUR':
                    return price * 0.8
                case 'RUB':
                    return price * 70
                default:
                    return price
            }
        case 'EUR':
            switch (output) {
                case 'USD':
                    return price * 1.2
                case 'RUB':
                    return price * 80
                default:
                    return price
            }
        case 'RUB':
            switch (output) {
                case 'USD':
                    return Math.round(price / 80 * 100) / 100
                case 'EUR':
                    return Math.round(price / 80 * 100) / 100
                default:
                    return price
            }
        default:
            return price
    }

}
