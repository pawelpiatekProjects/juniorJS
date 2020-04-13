import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import * as colors from '../../../assets/colors';
import axios from 'axios';
import LoadingAnimation from '../../loadingAnimation/loadingAnimation';

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

@media(max-width: 650px){

font-size: 1.4rem;

}

@media(max-width: 450px){

font-size: 1.2rem;

}
`;

const SpinnerWrapper = styled.div`

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
                    <SpinnerWrapper>
                        <CompanyPreviewText>{totalIncome.toFixed(2)}</CompanyPreviewText>
                    </SpinnerWrapper>
                </Row>
                <Row>
                    <SpinnerWrapper>
                       <CompanyPreviewText>{averageIncome.toFixed(2)}</CompanyPreviewText>
                    </SpinnerWrapper>
                </Row>
                <Row>
                    {/**/}
                    <SpinnerWrapper>
                        {/*{console.log(lastMonthIncome)}*/}
                       <CompanyPreviewText>{lastMonthIncome.toFixed(2)}</CompanyPreviewText>
                    </SpinnerWrapper>
                </Row>
            </CompanyPreviewWrapper>
        );
};

export default CompanyPreview;
