import { useState } from "react"

export const useDeposit = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const transactionType = 'deposit'
    const url = 'http://localhost:9000/account/deposit'

    const makeDeposit = async (email, balance, deposit, auth) => {
        setIsLoading(true)
        setError(null)
        const name = auth.name

        const response = await fetch(url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({ email, balance })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            const url = 'http://localhost:9000/account/transaction'
            const transaction = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'Application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    transactionType,
                    amount: deposit,
                    balance
                })
            })
            setIsLoading(false)
        }
    }
    return { makeDeposit, error, isLoading }
}