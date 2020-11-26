const users = [
    { patient_name: "손흥민", idnumber: "000000-0000000" },
    { patient_name: "박찬호", idnumber: "000000-0000000"},
]
const doctors = [
    { doctor_part: "정형외과", doctor_name: "엄중식", password: "123456" },
    { doctor_part: "가정의학과", doctor_name: "김덕배", password: "123456" },
]

export function signIn({ patient_name, idnumber }) {
    const user = users.find(
        (user) => user.patient_name === patient_name && user.idnumber === idnumber
    )
    if(user === undefined) throw new Error()
        return user
}
export function dsignIn({ doctor_part, doctor_name, password }) {
    const doctor = doctors.find(
        (doctor) => doctor.doctor_part === doctor_part && doctor.doctor_name === doctor_name && doctor.password === password
    )
    if(doctor === undefined) throw new Error()
        return doctor
}