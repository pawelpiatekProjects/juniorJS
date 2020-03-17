import React from 'react';
import styled from 'styled-components';
import * as colors from '../../assets/colors';

//styled components variables
const Button = styled.button`
border: none;
background-color: ${props => props.isBlue ? colors.primaryBlue : colors.white};
color: ${props => props.isBlue ? colors.white : colors.primaryBlue};
padding: .5rem;
height: 3rem;

&:disabled{
background: ${colors.primaryBlueDisabled};
cursor: not-allowed;
    &:hover{
    background: ${colors.primaryBlueDisabled};
    cursor: not-allowed;
    }
}
&:hover{
background: ${props => props.isBlue ? colors.primaryBlueHover : colors.white};
}

@media(max-width: 500px){
font-size: 1.4rem;
}
`;
//End of styled components variables

const ButtonComponent = ({click, text ,isBlue, disabled}) =>(
    <Button onClick={()=>click()} isBlue={isBlue} disabled={disabled}>{text}</Button>
);

export default ButtonComponent;
