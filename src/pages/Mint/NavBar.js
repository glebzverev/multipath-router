import React from 'react';
import { useState } from "react";

import { Box, Button, Flex, Image, Link, SliderProvider, Spacer, Text } from '@chakra-ui/react';

import { ethers, BigNumber } from "ethers";
import Token from "../../abi/Token.json";

const TokenAddress = "0x2ec581d1cc3c3038917a4bbb0500662bb98ce2ea";


var NavBar = ({accounts, setAccounts}) => {
    const isConnected = Boolean(accounts[0]);
    const [totalSupply, setTotalSupply] = useState('');
    const [balance, setBalance] = useState('');
    const [oneTokenPrice, setOneTokenPrice] = useState('');

    async function getTotalSuply() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          TokenAddress,
          Token.abi,
          signer
        );    
        try {
            setTotalSupply('...');
          let response = await contract.totalSupply();
          setTotalSupply(Math.floor((response.toString())/10**15)/1000);
        } catch (err) {
          console.log("error: ", err);
        }
      }

    async function getBalance(address) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
        TokenAddress,
        Token.abi,
        signer
        );
        
        try {
            setBalance('...');
        let response = await contract.balanceOf(address);
        setBalance(Math.floor((response.toString())/10**15)/1000);
        } catch (err) {
        console.log("error: ", err);
        }
    }

    function countOneTokenPrice(){

        const a = totalSupply*10**18;
        const b = a + 10**18;
        return '~' + (Math.floor((b**2 - a**2) / 10**34)/10**3).toString() + '$';
    }

    async function updateData(){
        if(window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
        await getTotalSuply();
        setOneTokenPrice(countOneTokenPrice());
        getBalance(accounts[0]);
        setAccounts(accounts);
        return accounts
    }
    }

    return(
        <div>
            <Flex align="center" padding="20px" height="10vh">
            
                {/*Left Side - Social Media Icons*/}
                {/* <Flex justify="space-around" width="40%" padding="75px">
                    <Link href="https://www.facebook.com">
                        <Image src={Facebook} boxSize="42px" margin="0 15px"/>
                    </Link>
                    <Link href="https://github.com/formal-crypto/TokenSaleMachine">
                        <Image src={GitHub} boxSize="42px" margin="0 15px"/>
                    </Link>
                    <Link href="https://formalcrypto.org/">
                        <Image src={Email} boxSize="42px" margin="0 15px"/>
                    </Link>
                </Flex> */}

                
                {/*Right Side - Sections and Connect*/}
                {/* <Flex justify="space-between" align="center" padding="30px"> */}


                { isConnected ? (
                    <Box position = 'absolute' margin="0 15px" left ="5%">Current One Token Price {oneTokenPrice}</Box>
                ) : (
                    <p></p>
                )}
                { isConnected ? (
                    <Box position = 'absolute'  fontSize="15px" justify-content = 'center' width = "350px" margin="0 15px" right ="20%">{accounts[0]} is Connected </Box>
                ) : (
                    <Box position = 'absolute' margin="0 15px" right ="5%">Connect to buy and view data</Box>
                ) }
            </Flex>

            <Flex justify="space-between" height="10vh" padding="15px" >
                <Box width = "250px" fontSize="20px"  position = 'absolute' margin="0 5px" left ="10%"> Total supply {totalSupply}</Box>
                <Box width = "250px"  fontSize="20px" position = 'absolute' margin="0 5px" right ="10%">Your balance {balance}</Box>
            </Flex>

            <Flex justify="center" align="center" height="10vh" padding="30px" >
            { isConnected ? (
                    
                <Button
                backgroundColor="#008fd4"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                margin="10"
                justify-content = 'center'

                onClick={updateData}
                >
                Update data
                </Button>
            ) : (
                <Button
                backgroundColor="#008fd4"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                margin="10"
                justify-content = 'center'
                onClick={updateData}
                >
                Connect
                </Button>
            ) }
            </Flex>
        </div>
    );
};

export default NavBar;