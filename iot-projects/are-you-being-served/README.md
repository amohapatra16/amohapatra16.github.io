# are-you-being-served
PROJECT: Creating a pair of servers that perform different tasks

**Table of Contents**
 
- [Installation](#installation)
- [Lesson Steps](#lesson-steps)
    - [Request Server: ](#request-server)
        - [TODO 1: Initialize Variables](#todo-1--initialize-variables)
        - [TODO 2: Basic Request Server](#todo-2--basic-request-server)
        - [TODO 3: Test Your Server](#todo-3--test-your-server)
        - [TODO 4: Generalize With Command Line Arguments](#todo-4--generalize-with-command-line-arguments)
        - [TODO 5: Allow for Plain Text Responses](#todo-5--allow-for-plain-text-responses)
    - [Parallel Server: ](#parallel-server)
        - [TODO 6: Get Start Time](#todo-6--get-start-time)
        - [TODO 7: Create Wrapper Function](#todo-7--create-wrapper-function)
        - [TODO 8: Add the Function List](#todo-8--add-the-function-list)
        - [TODO 9: Write the Async Callback](#todo-9--write-the-async-callback)
        - [TODO 10: Test Your Race Server](#todo-10--test-your-race-server)
        - [TODO 11: Make it Parallel](#todo-11--make-it-parallel)

## Installation
* Enter the command `git clone https://github.com/operationspark/are-you-being-served` to add the base HTML files for this project to your projects directory
* Enter the command `cd are-you-being-served` to enter the new project's directory
* Enter the command `rm -rf .git .gitignore` so you don't accidentally add the git management files to your own repository when you commit later
* Run the command `npm install request async` to install the libraries we will be using during this project

## Lesson Steps
There are two separate servers that you will be creating. One of them make use of the request library, the other will use the async library. The server using the request library will generate a copy of an existing web page. The other server will make use of parallel processes to host a race between virtual competitors.

### Request Server
The request server is simple enough, as it is essentially making use of the "request" library to grab the HTML code from a specified website and display it, either as raw text or the actual rendered web page. However, you will make use of a new technique that you might not have seen before, and that is the use of command line arguments. Be sure to read the instructions on how to use command line arguments carefully when you get to them.

#### TODO 1: Initialize Variables
First, you need to import both the "http" and the "request" libraries. Then you will want to initialize a variable called "port" to store the port number (8686 is a good number, but you can use a different one if you'd rather).

#### TODO 2: Basic Request Server
Create an HTML server. In this server should be only one commands: a `request()` call with the first argument being the URL to your github home page (i.e. `https://<username>.github.io`).

The callback function passed to the `request()` call should be what generates the response. If the status code returned by the request is 200 and there were no errors, the callback should do the following:

1. it should specify the header of the response to have a status code of `200` (meaning ok) and set the content-type to be "text/html"
2. it should write the body of the HTML returned as its response

If the request returned an error or the status code was anything other than 200, then the callback should do the following:

1. it should specify the header of the response to have a status code of `response.statusCode` (assuming that the second parameter to your callback is named "response") and set the content-type to be "text/plain"
2. it should write the error as your response

In either case, the callback should also end the response with a call to `res.end()`. 

#### TODO 3: Test Your Server
Once you've completed this step, you can test your server by opening up a terminal tab. Make sure you are in the "are-you-being-served" directory in your terminal. You can check this by typing `pwd` in the terminal. If it prints out the path to your "are-you-being-served" directory, you're in the right place!

If you aren't in the correct directory (or folder in Windows), you will need to change to that directory. You can do that by typing `cd <new-directory>`. You can either type out the entire path to your "are-you-being-served" directory in place of "new-directory", or you can type in a relative directory name in place of "new-directory". For instance, if you are in the "Home" directory and there is a subdirectory named "Desktop", you can switch to the "Desktop" directory by typing `cd Desktop`. If you need to go up instead of down in the directory list, type `cd ..`.

Once you are in the correct directory, you can run your server by typing `node requestServer.js`. Then, open up a browser tab to `localhost:<port number>` to see if it worked!

#### TODO 4: Generalize With Command Line Arguments
Your new server is neat and all, but it would be even better if you could make the server request different web pages depending on how you configure it at start up. You can do that with command line arguments. 

Here's a quick rundown on command line arguments. Any time you type a command into the terminal (i.e. `cd Desktop`), that entire command is actually given to the program that runs in the form of an array. For instance, `cd Desktop` would become the array `["cd", "Desktop]`. This is true of any command, so if you type `node requestServer.js`, then your server is given an array holding `["node", "requestServer.js"]`. In JavaScript, this data is stored in a built-in variable named `process.argv`.

Your command can be as long as you like, and this enables you to give your program additional data at the start. For instance, if you typed `node requestServer.js https://dkogler.github.io`, then "https://dkogler.github.io" would be added to the array of data passed into the program.

If you add the line `var args = process.argv;` at the start of your code, then you will store this array in the variable "args". However, we don't need the first two elements of this array, as they will always be "node" and "requestServer.js", and we can't do anything with that. What we can do is add the following line instead to get rid of that un-useful data:

    `var args = process.argv.slice(2)`

This will only store any extra data that we give to our program that we might want to use to configure the server. So now, if you were to type `node requestServer.js https://wikipedia.com`, then `args` would store `["https://wikipedia.com"]`, which means you can use that URL in your program! 

Now that we have support for command line arguments, you should update your `createServer()` function to have the following line:

    `var url = args[0] ? args[0] : "<a default url>";`

where `"<a default url>"` can be your home page. Don't forget to also update your `request()` call to use this new URL!

#### TODO 5: Allow for Plain Text Responses
The final step for this first server is to give support for it to return the HTML code of the requested website as plaintext instead of a rendered HTML page. This can be done via further command line support. Instead of simply having an additional command line argument for a custom URL, you can give support for two additional arguments, with the second one being whether or not to return HTML code or plain text.

Try to figure out how to add this support in on your own. Remember that `res.writeHead()` is where you specify the format of the returned data, and you should only need to change that format in the case of a successful response.

### Parallel Server
The second server you are going to create will host a race between virtual racers. The skeleton for this server has already been written, as has a function that will select the winners. Your goal is to write the code that will time the race, send each racer off on their journey, and write the results in the response sent back by the server.

#### TODO 6: Get Start Time
You will need to make use of the built in object class "Date" to handle timing. To do so, all you need to do is create a new Date object and grab the time from that object. You can do so with the following code:

```js
let d = new Date();
let startTime = d.getTime();
```

#### TODO 7: Create Wrapper Function
We want the race to be fair for all racers, so they should all run the same race. To do so, you are going to create a function that will simulate running a race by calling the `setTimeout()` function. The details of this function are as follows:

* The function name should be "wrapper"
* "wrapper" should take a single parameter, and that parameter is a callback function provided by the async library (we'll get to that in TODO 8). This callback function's purpose is to store results for recovery later.
* The only thing wrapper should do is call `setTimeout()` with two arguments: 
    * `setTimeout()`'s second argument should be `Math.random()*1000`. This will mean that every call to wrapper will see its callback triggered at a random time between 0 and 1000 milliseconds after wrapper is called.
    * `setTimeout()`'s first argument is a function with the following properties:
        * no parameters
        * creates a new Date object stored in a variable called "d"
        * calls the callback function passed into wrapper with the arguments `null` and `d.getTime()`

#### TODO 8: Add the Function List
Right now, the call to `async.series()`'s first argument is an empty array. You need to populate that array with four identical functions that have the following characteristics:

* take a single parameter called "callback"
* call the function `wrapper()`, passing "callback" as an argument to the `wrapper()` function.

#### TODO 9: Write the Async Callback
The async function's callback is where you will want to generate your server's response. This response can be broken up into three parts.

**Step 1: The Header**
Simply write `res.write("Results:\n");` on the first line of your callback's body.

**Step 2: The Racers**
After the header, write the command `var victoryOrder = sortTogether(racers, results);`. This will sort all of your racer names based on the times recorded in the "results" array. While the `sortTogether()` function has been provided for you, you should still take the time to look over it's code and try to understand what it is doing. You may need to look up "Array.sort()" online for it all to make sense.

After calling `sortTogether()`, loop through the array "victoryOrder" and write the racer names to your server's response. You will need to add the string `"\n"` after each name ("\n" is a special character that means "new line", and is essentially hitting the "enter" key in your response).

**Step 3: The Race Time**
Finally, create a new Date object and use `.getTime()` to get the end time for the race. The last line you should write in your response will be the time for the entire race, which you can get by subtracting your start time from your end time.

#### TODO 10: Test Your Race Server
You can test your race server the same way you tested your request server. However, if you want to get the results of multiple requests a bit faster, you can do so by using cURL. You will need to open up a separate terminal from the one that you are running your server in and simply type `curl localhost:8686` (assuming you didn't change the port number). 

What do you notice? Does there seem to be any randomness in the order that the racers are finishing?

#### TODO 11: Make it Parallel
Change the async call from `async.series()` to `async.parallel()`. Try testing your server again. 

Do you notice anything different about the results now? How about the time it takes for the race to complete? What you are seeing are the effects of running several functions in parallel instead of in sequence. We use the `setTimeout()` function to make the differences a bit more obvious, but if you were running functions with heavy workloads instead of `setTimeout()` you would see the same results.

#### Bonus
Change your `wrapper()` function so that instead of calling `setTimeout()`, it executes a `for` loop a random number of times before calling `callback()`. To really see the effects, a double for loop might be preferable. For instance:

```js
for (var i = 0; i < 1000; i++){
    for (var j = 0; j < Math.random() * 1000000000; j++){
        // do some random math
    }
}
```

If you give a workload similar to or greater than the one in the above example, you can switch back and forth between calling `async.parallel()` and `async.series()` to see just how much of a difference time-wise running in parallel can make.
