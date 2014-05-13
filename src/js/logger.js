// JavaScript source code
//logger.js included in index.html. Could use some dependency loader to ensure that this function is loaded in other scripts.

//Just a simple function, can be expanded to filter different types of messages. A more complex logger object can be created to handle different types of logging.
var Logger = function (msg)
{
    //Just comment this out when no output is wanted.
    console.log(msg);
}