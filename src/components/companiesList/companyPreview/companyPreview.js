import React from 'react';
import styled from 'styled-components';
import * as colors from '../../../assets/colors';


//styled components variables
const CompanyPreviewWrapper = styled.tr`
&:hover{
background-color: ${colors.tableBorderGray2};
}
`;
const Row = styled.td`
padding: 1rem;
`
const CompanyPreviewText = styled.p`
text-align: center;

@media(max-width: 950px){
font-size: 1.4rem;
}

@media(max-width: 600px){
font-size: 1.2rem;
}

@media(max-width: 450px){
font-size: 1rem;
}

`;

//End of styled components variables

const CompanyPreview = ({name, city,id, totalIncome, averageIncome, lastMonthIncome}) => {

    return(
            <CompanyPreviewWrapper>
                <Row>
                    <CompanyPreviewText>{id}</CompanyPreviewText>
                </Row>
                <Row>
                    <CompanyPreviewText>{name}</CompanyPreviewText>
                </Row>
                <Row>
                    <CompanyPreviewText>{city}</CompanyPreviewText>
                </Row>
                <Row>
                        <CompanyPreviewText>{totalIncome.toFixed(2)}</CompanyPreviewText>
                </Row>
                <Row>
                       <CompanyPreviewText>{averageIncome.toFixed(2)}</CompanyPreviewText>
                </Row>
                <Row>
                       <CompanyPreviewText>{lastMonthIncome.toFixed(2)}</CompanyPreviewText>
                </Row>
            </CompanyPreviewWrapper>
        );
};

export default CompanyPreview;
