require('dotenv').config();
const Web3 = require('web3');
const apikey = process.env['API_KEY'];
const network = 'sepolia';

const node = `https://eth.getblock.io/${apikey}/${network}/`

const web3 = new Web3(node);

// console.log(web3);

const accountTo = web3.eth.accounts.create();
console.table(accountTo);
const privateKey = process.env['PRIVATE_KEY'];
const accountFrom = web3.eth.accounts.privateKeyToAccount(privateKey);
console.table(accountFrom);

const createSignedTxn = async(rawTxn) => {
    rawTxn.gas = await web3.eth.estimateGas(rawTxn);
    return await accountFrom.signTransaction(rawTxn);
}

const sendSignedTxn = async(signedTxn) => {
    web3.eth.sendSignedTransaction(signedTxn.rawTransaction).then(
        console.log
    )
}

const amountTo = "0.001";
const rawTxn = {
    to:accountTo.address,
    value:web3.utils.toWei(amountTo,"ether")
}

createSignedTxn(rawTxn).then(sendSignedTxn);