var ws = new W3CWebSocket(`wss://${WEB_SOCKET}/ws/${otk}`);

ws.onmessage = async function (event) {
  const json = JSON.parse(event.data);
  console.log(`Data received from server web socket: ${JSON.stringify(json)}`);
  
  if(json.payload.msg.mobileConnected === true){
    setSignUpStep(0.05)
  }else if(json.payload.msg.mobileSignRequest === true){
    setSignUpStep(1)
  }else if(json.payload.msg.mobileSignedMessage === true){
    setSignUpStep(2)
  }else if(json.payload.logInSuccess === true){
    setSignUpStep(4)
  }
  // validate Auth
  // console.log(validJWT) 