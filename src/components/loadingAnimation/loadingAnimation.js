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
  width: ${props=>props.isBig ? '15rem' : '2rem'};
  height: ${props=>props.isBig ? '15rem' : '2rem'};
`;

const SpinnerWrapperChild = styled.div`

  box-sizing: border-box;
  display: block;
  position: absolute;
  width: ${props=>props.isBig ? '12rem' : '2rem'};
  height: ${props=>props.isBig ? '12rem' : '2rem'};
 
  border: ${props=>props.isBig ? '.8rem' : '.4rem'} solid ${props=>props.isBig ? colors.primaryBlue : colors.tableBorderGray1};
  border-radius: 50%;
  animation: ${spinnerAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: ${props=>props.isBig ? colors.primaryBlue : colors.tableBorderGray1} transparent transparent transparent;
  
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

const LoadingAnimation = ({isBig}) =>(
    <>
        <SpinnerWrapper>
            <SpinnerWrapperChild isBig={isBig}></SpinnerWrapperChild>
            <SpinnerWrapperChild isBig={isBig}></SpinnerWrapperChild>
            <SpinnerWrapperChild isBig={isBig}></SpinnerWrapperChild>
            <SpinnerWrapperChild isBig={isBig}></SpinnerWrapperChild>
        </SpinnerWrapper>
    </>
);

export default LoadingAnimation;
