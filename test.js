var Web3 = require('web3');
var Accounts = require('web3-eth-accounts');


var account = "wallet address"
var privateKeyJS = "private key"

// Define the Web3 provider
const web3 = new Web3('https://rpc.testnet.moonbeam.network');
var accounts = new Accounts('https://rpc.testnet.moonbeam.network');

// Define the function for the Custom Web3 Request
const customWeb3Request = async (web3Provider, method, params) => {
    try {
      return await requestPromise(web3Provider, method, params);
    } catch (error) {
      throw new Error(error);
    }
  };
  
  // In Web3.js we need to return a promise
  const requestPromise = async (web3Provider, method, params) => {
    return new Promise((resolve, reject) => {
      web3Provider.send(
        {
          jsonrpc: '2.0',
          id: 1,
          method,
          params,
        },
        (error, result) => {
          if (error) {
            reject(error.message);
          } else {
            if (result.error) {
              reject(result.error.message);
            }
            resolve(result);
          }
        }
      );
    });
  };



async function nestedCall() {
    var nonce = await customWeb3Request(
        web3.currentProvider,
        'eth_getTransactionCount',
        [account]
    );

    for (let i = 0; i < 10; i++){
    currentnonce = '0x'+(parseInt(nonce.result.substring(2),16)+i).toString(16)
    //currentvalue =  '0x'+i.toString(16)
    
    let callTx = await accounts.signTransaction(
      {
        from: account,
        to: "0xf24FF3a9CF04c71Dbc94D0b566f7A27B94566cac",
        gas: "0x100000",
        //value: currentvalue,
        value: "0x00",
        data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', // mock data
        nonce: currentnonce,
        //nonce: nonce.result

      },
      privateKeyJS
    );
    console.log(callTx.rawTransaction)
    const receipt = await customWeb3Request(web3.currentProvider, "eth_sendRawTransaction", [callTx.rawTransaction]);
    console.log(receipt)
    }
  }



nestedCall()