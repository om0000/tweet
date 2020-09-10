export const addTweet=(tweet)=>{
    return {
        type:'ADD_TWEET',
        payload:tweet
    };
};

export const updateTweetList=(tweetsArr)=>{
    return {
        type:'UPDATE_TWEETS',
        payload:tweetsArr
    }
}