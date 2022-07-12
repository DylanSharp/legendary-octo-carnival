/**
 * Takes a date as a string and returns a nice human-readable string like '2 days ago'
 * @param dateString A date string representing the time the comment was created.
 * @returns {string}
 */
function timeSince(dateString) {
    const date = new Date(dateString)
    let secondsSince = Math.floor((new Date() - date) / 1000);

    const sanitize = (intervalName, interval) => {
        intervalName = interval > 1 ? intervalName + 's' : intervalName
        return interval + ' ' + intervalName + ' ago'
    }

    let interval = secondsSince / 31536000;
    if (interval > 1) {
        return sanitize('year', Math.floor(interval));
    }
    interval = secondsSince / 2592000;
    if (interval > 1) {
        return sanitize('month', Math.floor(interval));
    }
    interval = secondsSince / 86400;
    if (interval > 1) {
        return sanitize('day', Math.floor(interval));
    }

    let now = new Date();
    let then = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
    const secondsSinceYesterday = Math.floor((now.getTime() - then.getTime()) / 1000);

    interval = secondsSince / secondsSinceYesterday;
    if (interval > 1) {
        return "Yesterday";
    }

    interval = secondsSince / 3600;
    if (interval > 1) {
        return sanitize('hour', Math.floor(interval));
    }
    interval = secondsSince / 60;
    if (interval > 1) {
        return sanitize('minute', Math.floor(interval));
    }
    return 'A moment ago'
}


const sortCommentData = (commentData) => {
    return commentData.sort((a, b) => {
        if (a.createdAt > b.createdAt) {
            return -1;
        }
        if (a.createdAt < b.createdAt) {
            return 1;
        }
        return 0;
    })
}

module.exports = {
    timeSince,
    sortCommentData
}