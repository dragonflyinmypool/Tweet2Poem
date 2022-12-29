# Tweet2Poem

A bot that turns tweets to poems for users.

This is how it works:
1. User mentions my account @tweet2poem in their tweet.
2. Bot is listing to this via webhooks, Tiwtter Account Activity API.
3. The bot reads the users tweet, send that tweet to GPT3 API and asks for a poem based on the tweet.
4. My bot replies to the users tweet with the poem.
