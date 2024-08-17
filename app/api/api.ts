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

export async function getAllPlayers() {
    const response = await fetch(`${backendURL}/all-players`, {
        method: 'GET'
    })

    return response
}

export async function obtainLeaderboard() {
    const response = await fetch(`${backendURL}/leaderboard`, {
        method: 'POST'
    })
    return response
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
    })

    return response
}

export async function sendChallenge(userID: string, opponentID: string) {
    const response = await fetch(`${backendURL}/send-challenge`, {
        method: 'POST',
        body: JSON.stringify({
            userID: userID,
            opponentID: opponentID
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })

    return response
}

export async function obtainOngoingMatches(userID: string) {
    const response = await fetch(`${backendURL}/ongoing-matches`, {
        method: 'POST',
        body: JSON.stringify({
            userID: userID
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })

    return response
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

    return response
}

export async function declineChallenge(matchID: string) {
    const response = await fetch(`${backendURL}/decline-challenge`, {
        method: 'POST',
        body: JSON.stringify({
            matchID: matchID
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })

    return response
}

export async function acceptChallenge(matchID: string) {
    const response = await fetch(`${backendURL}/accept-challenge`, {
        method: 'POST',
        body: JSON.stringify({
            matchID: matchID
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })

    return response
}

export async function sendMatchResult(matchID: string, winnerID: string, userID: string, opponentID: string) {
    const response = await fetch(`${backendURL}/send-match-result`, {
        method: 'POST',
        body: JSON.stringify({
            matchID: matchID,
            winnerID: winnerID,
            userID: userID,
            opponentID: opponentID
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })

    return response
}