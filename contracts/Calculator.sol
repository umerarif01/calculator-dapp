//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Calculator {
int256 result;
int256 number1;
int256 number2;

constructor(){
    console.log("Deploying Calculator");
}


function Add() public {
    result = number1 + number2;
  }

  function Subtract() public {
    result = number1 - number2;
  }

  function Multiply() public {
    result = number1 * number2;
  }

  function Divide() public {
    result = number1 / number2;
  }
  function setValue(int256 num1,int256 num2) public{
       number1 = num1;
       number2 = num2;
   }

  function getResult() public view returns (int256) {
    return result;
  }
  function getNum1() public view returns (int256) {
    return number1;
  }
  function getNum2() public view returns (int256) {
    return number2;
  }
}



