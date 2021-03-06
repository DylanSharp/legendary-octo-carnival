const API = (() => {
    const baseUrl = 'http://44.205.18.18';
    return {
        getLatestComments: async () => {
            const res = await fetch(baseUrl + '/comment_data')
            return res.json();
        },
        addUpvote: (commentId) => {
            return fetch(baseUrl + '/upvote/' + commentId, {
                method: 'POST'
            })
        },
        addComment: async (content, isReply, parentCommentId) => {
            const res = await fetch(baseUrl + '/comment', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content,
                    isReply: isReply || false,
                    parentCommentId: parentCommentId || null
                })
            })
            return await res.json();
        }
    }
})()

export default API;