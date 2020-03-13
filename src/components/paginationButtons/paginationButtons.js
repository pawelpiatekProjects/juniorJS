import React from 'react';
import styled from 'styled-components';

const PaginationButtonsWrappper =styled.div`

`;

const PaginationButton = styled.button`

`;

const PaginationButtons = ({next, previous}) => (
    <PaginationButtonsWrappper>
        <PaginationButton onClick={previous}>Previous</PaginationButton>
        <PaginationButton onClick={next}>Next</PaginationButton>
    </PaginationButtonsWrappper>
);

export default PaginationButtons;
