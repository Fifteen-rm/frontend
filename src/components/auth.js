const users = [
    { name: "master", idnumber: "000000-0000000" },
    { name: "test", idnumber: "000000-0000000"},
]
const doctors = [
    { part: "orthopedics", dname: "doctor", password: "0000" },
]

export function signIn({ name, idnumber }) {
    const user = users.find(
        (user) => user.name === name && user.idnumber === idnumber
    )
    if(user === undefined) throw new Error()
        return user
}

export function dsignIn({ part, dname, password }) {
    const doctor = doctors.find(
        (doctor) => doctor.part === part && doctor.dname === dname && doctor.password === password
    )
    if(doctor === undefined) throw new Error()
        return doctor
}