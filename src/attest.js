
var express = require('express');
var uport = require('uport');
var jsontokens = require('jsontokens')

var app = express();
app.use(express.static('public'))
app.use(express.static('node_modules'))


var signerSwissBank = uport.SimpleSigner('639931d7afcd987ec68db25255c84120150cbfd3c818e59f16fa446b425c0f2b')


app.get('/', function (req, res) {
    res.send("use overview.html")
})


var credentials = new uport.Credentials({
  appName: 'Bank Switzerland',
  address: '2oqTZr4TSu3gc6F9KtNs6A2EsY1zk8Lzefp',
  signer: signerSwissBank
  //networks: {'0x4': {'registry' : '0x2cc31912b2b0f3075a87b3640923d45a26cef3ee', 'rpcUrl' : 'https://rinkeby.infura.io'}}
  // Note: we use Rinkeby by default, the above is the explicit format for selecting a network
})
// Read and fill infos


app.get('/readData', function (req, res) {
    credentials.createRequest({
    requested: ['name','phone','identity_no'],
    callbackUrl: 'https://localhost:8081/readDataCallback?random=345' // URL to send the response of the request to
  }).then(requestToken => {
    // send requestToken to browser
    //taken from demo.uport.me
    //me.uport:me?requestToken=eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJyZXF1ZXN0ZWQiOlsibmFtZSIsInBob25lIiwiY291bnRyeSJdLCJwZXJtaXNzaW9ucyI6WyJub3RpZmljYXRpb25zIl0sImNhbGxiYWNrIjoiaHR0cHM6Ly9jaGFzcXVpLnVwb3J0Lm1lL2FwaS92MS90b3BpYy9UaWY0WEh5TGhlbURUc2c1IiwibmV0IjoiMHg0IiwidHlwZSI6InNoYXJlUmVxIiwiaXNzIjoiMm9lWHVmSEdEcFU1MWJmS0JzWkRkdTdKZTl3ZUozcjdzVkciLCJpYXQiOjE1MDIxNzg0ODk1ODV9.hh0pEmjgIKUc-JaK13KxftMwAJoMtOOjgHL3w1eGErq7Mq5XfXVGrjxSQen1ndNrJf8kkRSiJPXYRS8GHWmjTQ
    let uri="me.uport:me?requestToken="+requestToken
    var returnValue = {link:uri,requestToken:requestToken}
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(returnValue));
  })
})


app.get('/readDataCallback', function (req, res) {
  log("readDataCallback ")
})


app.get('/attest', function (req, res) {
  credentials.attest({
    sub: '2omkd7pypnRVmRvZdVKAWLkGknswVyxh56N',  // uport address of user   ws:
    exp: 1552046024213,
    claim: {name : 'Walter Strametz', location:'CH'}
  }).then(function (att) {
    console.log(att)
    console.log(jsontokens.decodeToken(att))
    var uri = 'me.uport:add?attestations=' + att
    var qrurl = 'http://chart.apis.google.com/chart?cht=qr&chs=400x400&chl=' + uri
    console.log(uri)
    res.send('check sombobodys name and location <img src=' + qrurl + '></img>');
  })
})


var server = app.listen(8081, function () {
  console.log("Tutorial app running...")
})


//
/*
const uportApp = new Connect('cofundme', {
  clientId: '2oqTZr4TSu3gc6F9KtNs6A2EsY1zk8Lzefp',
  signer: uport.SimpleSigner('bc41ddd213a04a2d45ce689bc9bf07bc8c37006ede9e98ac7fd1284d2b889826')
})

// Request credentials to login
uportApp.requestCredentials({
  requested: ['name', 'phone', 'country'],
  notifications: true // We want this if we want to recieve credentials
})
.then((credentials) => {
    console.log(" login from "+credentials)
})
// Attest specific credentials
uportApp.attestCredentials({
  sub: THE_RECEIVING_UPORT_ADDRESS,
  claim: {
    CREDENTIAL_NAME: CREDENTIAL_VALUE
  },
  exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
})
*/

app.get('/test', function (req, res) {
  res.send("hello world");
})
