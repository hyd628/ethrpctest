const ethers = require('ethers');

const network = 'moonbase';
const providerRPC = {
  moonbase: {
    name: 'moonbase',
    rpc: 'https://rpc.testnet.moonbeam.network',
    chainId: 1287,
  },
};

// Create provider
const provider = new ethers.providers.StaticJsonRpcProvider(providerRPC[network].rpc, {
  chainId: providerRPC[network].chainId,
  name: providerRPC[network].name,
});

// Burner account
const account_from = {
  privateKey: 'e31b9a051cbe8139b599814c12394851f58fc97af56b1118595e28ad7084265a',
};
const addressTo = '0x12Cb274aAD8251C875c0bf6872b67d9983E53fDd';
let wallet = new ethers.Wallet(account_from.privateKey, provider);

const send = async () => {
  // Create Tx
  const tx = {
    to: addressTo,
    value: ethers.utils.parseEther('0.001'),
  };
  const populatedTx = await wallet.populateTransaction(tx);

  // Logs
  console.log('Tx Details:');
  console.log(populatedTx);

  // Sign Tx
  const signedTx = await wallet.signTransaction(populatedTx);

  // Logs
  console.log(`Signed Tx: ${signedTx}`);
  console.log(`Expected Receipt: ${ethers.utils.keccak256(signedTx)}`);

  // Send Tx
  const receipt = await provider.sendTransaction(signedTx);
  await receipt.wait();

  // Logs
  console.log(`Tx Hash: ${receipt.hash}`);
};

send();