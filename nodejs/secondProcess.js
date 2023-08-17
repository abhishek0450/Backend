// Objective: This file will send a request to the server and will receive the response from the server.

//this logResponseBody function will log the response body to the console,that we will receive from the server.
function logResponseBody(jsonBody){ 
    console.log(jsonBody);
}

//this is the callback function that will be called when the response is received from the server.
function callbackfn(result){
    //this will convert the response body to json object and then call logResponseBody function.
    result.json().then(logResponseBody); //here result is the response that we will receive from the server. (any name can be used instead of result)
};

//this is the object that we will send to the server and it will contain the method type and other details like headers, body, etc.
var sendObj = {
    method : "GET" //this is the http method type, we can use any method type here.
};

//this will send the request to the server and call callbackfn function.
fetch("http://localhost:3000/calculate?num=4", sendObj).then(callbackfn); 