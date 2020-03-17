import React from 'react';
import styled, {keyframes} from 'styled-components';
import * as colors from '../../assets/colors';

const spinnerAnimation = keyframes`
 0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;


const SpinnerWrapper = styled.div`
display: inline-block;
  position: relative;
  width: 15rem;
  height: 15rem;
`;

const SpinnerWrapperChild = styled.div`

  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 12rem;
  height: 12rem;
  margin: .8rem;
  border: .8rem solid ${colors.primaryBlue};
  border-radius: 50%;
  animation: ${spinnerAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: ${colors.primaryBlue} transparent transparent transparent;
  
  &:nth-child(1){
    animation-delay: -0.45s;
  }
  
  &:nth-child(2){
    animation-delay: -0.3s;
  }
  
  &:nth-child(3){
    animation-delay: -0.15s;
  }
`;

const LoadingAnimation = () =>(
    <>
        <SpinnerWrapper>
            <SpinnerWrapperChild></SpinnerWrapperChild>
            <SpinnerWrapperChild></SpinnerWrapperChild>
            <SpinnerWrapperChild></SpinnerWrapperChild>
            <SpinnerWrapperChild></SpinnerWrapperChild>
        </SpinnerWrapper>
    </>
);

export default LoadingAnimation;
