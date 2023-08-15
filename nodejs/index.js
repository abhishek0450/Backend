/*
http://localhost:3000/calsum?counter=287 
>> here localhost:3000 is the url of the server (host name and port number)
>> calsum is the route(from where the calculateSum function will be called)
>> after '?' we are sending the 'num' as query parameter, which means we are sending the value of 'num' variable as a parameter to the calculateSum function.
*/


const express = require('express') //importing express module
const app = express() //creating an instance of express module
const port = 3000 //port number on which the server will run

function calculateSum(num){
    var sum=0;
    for(var i=0;i<=num;i++){
        sum = sum+i;
    }
    return sum;
}

function handleRequest(req, res){
    res.send('Hello Worldy!') // this is a function that sends the response to the client(browser/front-end).
}

function handleRequest2(req, res){
    res.send('this is second route')
}

function handleSum(req, res){
    var num = req.query.num; //sending num as query parameter
    //req.query.counter will get the value of num from the url
    var calculatedSum = calculateSum(num);
    var answer= `Sum is ${calculatedSum}`;
    res.send(answer); //sending the answer as response
}

function portStarted(){
    console.log(`Example app listening on port ${port}`)
}

app.post('/', handleRequest); // '/' is the route,which is the default route and will call handleRequest function.
app.get('/hello', handleRequest2); // '/hello' is the route, which will call handleRequest2 function.
app.get('/calsum', handleSum); // '/calsum' is the route, which will call handleSum function.

app.listen(port, portStarted); //this will start the server on port 3000 and call portStarted function.
  






