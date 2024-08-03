import AsyncStorage from "@react-native-async-storage/async-storage"

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

    return response
}

export async function obtainLeaderboard() {
    const response = await fetch(`${backendURL}/leaderboard`, {
        method: 'POST'
    })
    return (await response.json())
}

export async function obtainMatchHistory(userID: string) {
    const response = await fetch(`${backendURL}/match-history`, {
        method: 'POST',
        body: JSON.stringify({
            userID: userID
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
        // headers: {
        //     'Authorization': `Bearer ${AsyncStorage.getItem('jwtToken')}`
        // }
    })

    return response
}

export async function obtainProfileData(email: string, userID: string) {
    const response = await fetch(`${backendURL}/profile-data`, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            userID: userID
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
        // headers: {
        //     'Authorization': `Bearer ${AsyncStorage.getItem('jwtToken')}`
        // }
    })

    return (await response.json())
}

export async function obtainMatchRequests(userID: string) {
    const response = await fetch(`${backendURL}/match-requests`, {
        method: 'POST',
        body: JSON.stringify({
            userID: userID
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })

    return (await response.json())
}