/*
http://localhost:3000/calsum?counter=287 
>> here localhost:3000 is the url of the server (host name and port number)
>> calsum is the route(from where the calculateSum function will be called)
>> after '?' we are sending the 'num' as query parameter, which means we are sending the value of 'num' variable as a parameter to the calculateSum function.

*/


const express = require('express') //importing express module
const bodyParser = require('body-parser') //importing body-parser module
const app = express() //creating an instance of express module
const port = 3000 //port number on which the server will run


//middleware is a function that has access to the request and response object, this act as a bridge between the request and response, think it as a middleman that will do some work before the route is called.(eg> check for authentication, authorization, valid input, etc.) 

function middleware1(req, res, next){
    console.log('middleware1(checkpoint)');
    // res.send('this text is from inside middleware1'); // if we send the response from the middleware, then the route will not be called.
    next();//this will call the next middleware function
} //this is a middleware function, which will be called before the route is called.

app.use(middleware1); //this will call the middleware1 function before the route is called.

app.use(bodyParser.json()); //this will call the body-parser middleware function before the route is called, and will parse the body of the request and convert it into json format. {remember, passed a jason object in body as parameter in postman}

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
    // var num = req.query.num; //sending num as query parameter
    //req.query.counter will get the value of num from the url
    // var num = req.headers.num; //sending num as header, this is more secure than sending as query parameter as it is not visible in the url.

     var num = req.body.num;//sending num as body
    
    var calculatedSum = calculateSum(num);
    var answer= `Sum is ${calculatedSum}`;
    // res.send(answer); //sending the answer as response to the client(browser/front-end)
    if(num>1000000){
        res.status(411).send("number is too big");
    } else{
        res.status(200).send(answer);
    }
    // res.status(200); //this will set the status code of the response to 200, which means the request was successful.{we can set any status code, eg: 404, 500, etc. and send the response accordingly}
 }
 //res.status(411).send("response to frontend"); //this will set the status code of the response to 411, which means the request was unsuccessful and will send the response to the client(browser/front-end), this is called chaining of methods.

function portStarted(){
    console.log(`Example app listening on port ${port}`)
}

//types of request: get, post, put, delete
//get: to get the data from the server
//post: to send the data to the server
//put: to update the data on the server
//delete: to delete the data from the server
//all these request types are called http methods,used to communicate with the server.

app.post('/', handleRequest); // '/' is the route,which is the default route and will call handleRequest function.
app.get('/hello',handleRequest2);// app.put('/hello', handleRequest2); // '/hello' is the route, which will call handleRequest2 function.
app.get('/calsum', handleSum); // '/calsum' is the route, which will call handleSum function.

app.listen(port, portStarted); //this will start the server on port 3000 and call portStarted function.
  
