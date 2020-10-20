# Sophie API
This is the official API for Sophie's Database.
This API is in two places, this Github Repository (Where you may download and modify it for your needs) and our servers alongside Sophie's Pedophile Database.

When this API is on our servers, you **will** have rate-limits in place (at this time 5 requests per second) and they will not be removed for anyone. This is to prevent our servers from being attacked through our API or from someone reconstructing the PedoDB from our servers.

We want to make this clear: You are allowed to use the API on our servers for personal use or for small projects. You may not use the API on our servers to reconstruct PedoDB for commerical use. We will be watching requests if they come in, and if anyone abuses our API to rebuild PedoDB we will increase the rate limit further.

If you want to use the API to create a search engine that may help with detecting pedophiles, or you have a large-scale product, please [contact us](mailto:sophieapi@crix.nl) to get a private access key for your project. This access key may be removed for any reason at any time for any reason.

If you clone this repository, you may use it under the terms of the MIT License for any reason - and if it won't match your use-case you may remove the rate limit, however this will not grant you access to our servers and if that is what you are looking for, please resort to our full API.

This API does not give personally identifiable information, just their status in PedoDB. You will **never** get information such as an address, phone number, social security number, or IP address from PedoDB. If you have a user's ID or username, you may look up the user using this API.

## Using PedoDB's API
Using this API is very simple. HTTP requests are sent via HTTP at port 8080.
For example; `localhost:8080/api/pedodb/username`

This URL will give you an error, you must include a username in your HTTP request. You may get a response in the API, including if they are Suspicious, a Pedophile, or if they are Verified. You'll also recieve how many points they have in PedoDB, if they are none of the 3 values. You will not recieve an Age, as that is private information stored inside PedoDB for inside use only.

## Using Sophie's AI API
There is also another API avaiable for use. This API is also HTTP, and they are sent via HTTP at port 8080. 
For example; `localhost:8080/api/ai/message`

This URL will give you an error, you must include a message in your HTTP request. You will get a response in the API, including the intent (Which will be numbers 1-5 as well as "UNCOMFORTABLE" and "PARENTS" and how sure the AI is on the detected intent, this will be a number from 0.0 to 1.0

