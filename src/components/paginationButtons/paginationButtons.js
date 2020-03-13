import React from 'react';
import styled from 'styled-components';

const PaginationButtonsWrappper =styled.div`

`;

const PaginationButton = styled.button`

`;

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
