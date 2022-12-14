import './CrosschainRouter.css';
import './Background.css';

import { Box, Button, Flex, Spacer, Input, Text } from "@chakra-ui/react";

function NavBar({ routerValue, setRouterValue, setBackground, setIsUniswap, setIsZerox, setIsMultiPath, setIsNewUniswap, setIsCrosschain}){
    
    function returnRouter(){
        setIsUniswap(false);
        setIsZerox(false);
        setIsMultiPath(false);
        setIsNewUniswap(false);
        if (routerValue == 'UniswapV2Router'){   
            setBackground('uniswap-background')
            setIsUniswap(true);
        }
        else if (routerValue == 'NewUniswapV2ExchangerRouter') {   
            setBackground('new-uniswap-background')
            setIsNewUniswap(true);
        }
        else if (routerValue == 'ZeroxV4'){
            setBackground('zerox-background')
            setIsZerox(true);
        }
        else if (routerValue == "MultiPath"){
            setBackground('multipath-background')
            setIsMultiPath(true);
        }
        else{
            setBackground('base-background')
        }
    }  

    function changeSelect() {
        setRouterValue(document.getElementById('Router').value);
    }

    return(
        <div>
            <div>
            <select id='Router' value={routerValue} onChange={changeSelect}>
                <option>UniswapV2Router</option>
                <option>ZeroxV4</option>
                <option>MultiPath</option>
                <option>SimpleSwap</option>
                <option>NewUniswapV2ExchangerRouter</option>
            </select>
            <Button className="customButton" onClick={returnRouter}>
                Set Router
            </Button>
            </div>
        </div>
    );
}


export default NavBar;