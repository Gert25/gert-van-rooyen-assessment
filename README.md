# gert-van-rooyen-assessment

## Installation 

1. Ensure that you have git localy installed on your machine. See the git [guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for instruction to install git on your machine.
2. Ensure that you have NodeJS globaly installed on your machine. Follow this [link](https://nodejs.org/en/download/) to install the right package for your machine. *This application was developed using node v8.9.0 and npm 5.5.1*
3. Clone the rempository `git clone git@github.com:Gert25/gert-van-rooyen-assessment.git assessment`
4. Root to the newly cloned folder (assessment) `cd assessment`
5. Once in the root directory of the application you can open up your terminal if your on a UNIX machine or open up your command Prompt if your using a Windows Machine. If you installed node correctly you should be able to run the following command in your terminal/command prompt `node -v` which will print out the node version. if you not able to run this please check the node documentation.
6. Now run `npm install`. This will install all the application's dependencies.

*Note that this project was developed and tested on a MacOs machine.* If you experiencing problems running this project on a different platform please email me at gcvanrooyen25@gmail.com.

## Running the project

To start the server and run the application please type the following command in your console/command prompt/terminal: `npm start`. This should start the http/https server. 

### Description
 npm start will execute the server.js file. This will run two server namely the http and https on respective ports. the http sever will redirect all trafic to the https server to ensure the connection is encrypted (not neccessary, but is a good practice ). Please note that the ssl cert is self signed. Which means that you might need to Authorize the application in your browser to view it.

## Running Test Scripts

I used jasmine as a testing framework for this application. To run test scripts: 
1. Install jasmine globally on your machine `npm i -g jasmine`
2. Then just run `jasmine` in your console.

## Description
    The test scripts are stored under the ./spec/serverTest/spec.js. The test report is not very verbose but you can have a look at the test specs to see what is been tested. 

    

