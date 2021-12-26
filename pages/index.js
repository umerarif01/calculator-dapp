import Head from 'next/head'
import { useState } from 'react';
import { ethers } from 'ethers'
import Calculator from './artifacts/contracts/Calculator.sol/Calculator.json'

export default function Home() {
  const ContractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  const [result,setResult] = useState();
  const [number1, setNumber1] = useState();
  const [number2, setNumber2] = useState();

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function fetchData() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(ContractAddress, Calculator.abi, provider)
      try {
        const num1 = await contract.getNum1()
        const num2 = await contract.getNum2()
        console.log('num1: ',parseInt(num1._hex, 16))
        console.log('num2: ',parseInt(num2._hex, 16))
      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }

  async function fetchResult() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(ContractAddress, Calculator.abi, provider)
      try {
        const data = await contract.getResult()
        setResult(parseInt(data._hex, 16));
        console.log("Result : ",parseInt(data._hex, 16))
      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }
  
  async function setNumbers() {
    if (!number1 && number2) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(ContractAddress, Calculator.abi, signer)
      const transaction = await contract.setValue(number1,number2)
      await transaction.wait()
      fetchData() 
    }
  }

  async function AddNumbers() {
    if (!number1 && number2) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const contract = new ethers.Contract(ContractAddress, Calculator.abi, signer)
      const transaction = await contract.Add()
      await transaction.wait()
      fetchResult() 
    }
  }
  
  return (
    <div className="flex flex-col items-center space-y-3 justify-center min-h-screen py-2">
      <Head>
        <title>DAPP</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <h1 className='text-3xl font-sans font-bold'>Calculator Dapp</h1>
      <button 
      className='border-2 px-2 py-2'
      onClick={fetchData}>Fetch Numbers</button>
      <input 
      onChange={e => setNumber1(e.target.value)} 
      placeholder="Set Number1"
      className='border-2 px-2 py-2' />
      <input onChange={e => setNumber2(e.target.value)}
       placeholder="Set Number2" 
       className='border-2 px-2 py-2'
       />
       <button 
      className='border-2 px-2 py-2'
      onClick={setNumbers}>Set Numbers</button>
      <button 
      className='border-2 px-2 py-2'
      onClick={fetchResult}>Fetch Result</button>
      <button 
      className='border-2 px-2 py-2'
      onClick={AddNumbers}>Add Numbers</button>
       <p>Result:{result}</p>
      
      
    </div>
  )
}
