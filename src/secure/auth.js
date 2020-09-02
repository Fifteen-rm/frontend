const users = [
    { name: "1", idnumber: "111111-1111111" }
]

export function signIn({ name, idnumber }) {
    const user = users.find(
        (user) => user.name === name && user.idnumber === idnumber
    )
    if(user === undefined) throw new Error()
        return user
}