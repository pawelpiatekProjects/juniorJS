import React from 'react';
import styled from 'styled-components';
import * as colors from '../../assets/colors';

//styled components variables
const PaginationButtonsWrappper =styled.div`
width: 100%;
margin: 0 auto;
text-align: center;
`;

const PaginationButton = styled.button`
border: none;
padding: .5rem;
background-color: ${colors.primaryBlue};
color: ${colors.white};
font-size: 1.6rem;
margin: 0 1rem;
width: 9rem;

&:disabled{
background: ${colors.primaryBlueDisabled};
cursor: not-allowed;
    &:hover{
    background: ${colors.primaryBlueDisabled};
    cursor: not-allowed;
    }
}
&:hover{
background: ${colors.primaryBlueHover};
}

`;
//End of styled components variables

const PaginationButtons = ({next, previous, pageNum, lastPage}) => {

    return(
            <PaginationButtonsWrappper>
                <PaginationButton
                    disabled={pageNum <2 ? true : false}
                    onClick={previous}>Previous</PaginationButton>
                <PaginationButton
                    disabled={pageNum >= lastPage ? true : false}
                    onClick={next}>Next</PaginationButton>
            </PaginationButtonsWrappper>
        );
};

export default PaginationButtons;
