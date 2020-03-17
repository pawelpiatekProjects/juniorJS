import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import * as colors from '../../../assets/colors';
import axios from 'axios';
import {floralwhite} from "color-name";

const CompanyPreviewWrapper = styled.tr`
&:hover{
cursor: pointer;
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



const CompanyPreview = ({name, city,id, click}) => {
    const [companyData, setCompanyData] = useState([]);
    const [incomesSum, setIncomesSum] = useState(0);

    useEffect(()=>{
        axios.get(`https://recruitment.hal.skygate.io/incomes/${id}`)
            .then(response=>{
                setCompanyData(response.data.incomes);

                return response.data.incomes;
            })
            .then(incomes => {
                let sum = 0;
                incomes.map(income=> sum+= parseFloat(income.value));
                setIncomesSum(sum);
            })
    })

    return(
            <CompanyPreviewWrapper onClick={()=>click(id,name,city)}>
                <Row>
                    <CompanyPreviewText >{id}</CompanyPreviewText>
                </Row>
                <Row>
                    <CompanyPreviewText>{name}</CompanyPreviewText>
                </Row>
                <Row>
                    <CompanyPreviewText>{city}</CompanyPreviewText>
                </Row>
                <Row>
                    <CompanyPreviewText>{incomesSum.toFixed(2)}</CompanyPreviewText>
                </Row>
            </CompanyPreviewWrapper>
        );
};

export default CompanyPreview;
