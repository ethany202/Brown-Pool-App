const backendURL = "http://Yanchtop:80"

export async function userLogin(email: string, password: string) {
    const response = await fetch(`${backendURL}/login`, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })

    return (await response.json())
}