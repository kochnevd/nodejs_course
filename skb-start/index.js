var Skb = require('skb');
var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ODFkYjUwOTAzNTc1NzAwMTI1NmMxY2QiLCJ1c2VybmFtZSI6ImtvY2huZXZkQG1haWwucnUiLCJyb2xlIjoidXNlciIsImlhdCI6MTQ3ODM0MTg5OH0.L6Uz0y7T1i2J_KNVaRfokC24QWEH1J3_m5vAVQg0wNI';
var skb = new Skb(token);
skb.taskHelloWorld('Выполненное задание');