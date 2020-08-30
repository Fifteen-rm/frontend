const users = [
    { name: "1", front_number: "1", back_number: "1" }
]

export function signIn({ name, front_number, back_number }) {
    const user = users.find(
        (user) => user.name === name && user.front_number === front_number && user.back_number === back_number
    )
    if(user === undefined) throw new Error()
        return user
}