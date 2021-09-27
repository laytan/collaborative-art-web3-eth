# Collaborative art board

This project allows users to upload an image to the blockchain and pick a spot where it will be shown.

After uploading, the art will be put on the artboard with all the previously uploaded images, making it a collaborative art board.

## Motivation

This project originated from me wanting to learn what smart contracts are all about and how they are developed. I took inspiration from that viral web page where everyone could buy a pixel and the community created very interesting art.

## Tech

For the front-end I chose to use [Vue3](https://vuejs.org/) with [Web3.js](https://web3js.readthedocs.io/en/v1.5.2/), build by [Vite](https://vitejs.dev/), supported by [Typescript](https://www.typescriptlang.org/) and [Eslint](https://eslint.org/) for quality assurance and developer experience.

The smart contracts are written with [Solidity](https://docs.soliditylang.org/), the programming language that the Ethereum blockchain uses for smart contract development.

For deploying and local development of smart contracts I used [Truffle](https://www.trufflesuite.com/truffle) and [Ganache](https://www.trufflesuite.com/ganache).
