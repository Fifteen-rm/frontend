const users = [
    { name: "master", idnumber: "000000-0000000" }
]

export function signIn({ name, idnumber }) {
    const user = users.find(
        (user) => user.name === name && user.idnumber === idnumber
    )
    if(user === undefined) throw new Error()
        return user
}