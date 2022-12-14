import{ useState, form } from 'react';
import Uniswap from './../Uniswap/Uniswap'
import NewUniswap from './../NewUniswap/NewUniswap'
import Zerox from './../Zerox/Zerox'
import MultiPath from './../MultiPath/MultiPath'
import './CrosschainRouter.css';
import './Background.css';
import Connect from '../Connect/Connect';
import Approve from './../Approve/Approve';
import { render } from 'react-dom';
import NavBar from './NavBar';

// import { Box, Button, Flex, Spacer, Input, Text } from "@chakra-ui/react";

function CrosschainRouter(){

    const [isCrosschain, setIsCrosschain] = useState(true);
    const [routerValue, setRouterValue] = useState('UniswapV2Router');
    const [customBackground, setBackground] = useState('base-background');
    const [signer, setSigner] = useState('');
    const [isConnected, setIsConnected] = useState(Boolean(signer)); 
    const [isUniswap, setIsUniswap] = useState(false); 
    const [isNewUniswap, setIsNewUniswap] = useState(false); 
    const [isZerox, setIsZerox] = useState(false); 
    const [isMultiPath, setIsMultiPath] = useState(false); 
    const [renderconnectinfo, setrenderconnectinfo] = useState('');

    return (
        <div>
    <div className="overlay">
        <Connect 
        signer={signer} setSigner={setSigner} 
        isConnected={isConnected} setIsConnected={setIsConnected}
        renderconnectinfo={renderconnectinfo} setrenderconnectinfo={setrenderconnectinfo}
        />
        <NavBar 
        routerValue={routerValue}
        setRouterValue={setRouterValue} 
        setBackground={setBackground}
        setIsUniswap={setIsUniswap}
        setIsZerox={setIsZerox}
        setIsMultiPath={setIsMultiPath}
        setIsNewUniswap={setIsNewUniswap}
        setIsCrosschain={setIsCrosschain}
        />
        {
        isUniswap && 
            <Uniswap  />
        }
        {
        isNewUniswap && 
            <NewUniswap  />
        }
        {
        isZerox &&
            <Zerox />
        }
        {
        isMultiPath &&
            <MultiPath />
        }
        <Approve />
        <div className={customBackground}> </div>
    </div>
    </div>
    );
}

export default CrosschainRouter;
