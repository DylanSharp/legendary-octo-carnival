const API = (() => {
    const baseUrl = 'http://localhost:8080';
    return {
        getLatestComments: async () => {
            const res = await fetch(baseUrl + '/comment_data')
            return await res.json();
        },
        addUpvote: (commentId) => {
            return fetch(baseUrl + '/upvote/' + commentId, {
                method: 'POST'
            })
        },
        addComment: async (content) => {
            const res = await fetch(baseUrl + '/comment', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({content})
            })
            return await res.json();
        }
    }
})()