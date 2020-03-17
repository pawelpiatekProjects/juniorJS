import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import * as colors from '../../../assets/colors';
import axios from 'axios';
import LoadingAnimation from '../../loadingAnimation/loadingAnimation';

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

const SpinnerWrapper = styled.div`

`;



const CompanyPreview = ({name, city,id, click}) => {
    const [companyData, setCompanyData] = useState([]);
    const [incomesSum, setIncomesSum] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        setIsLoading(true);
        axios.get(`https://recruitment.hal.skygate.io/incomes/${id}`)
            .then(response=>{
                setCompanyData(response.data.incomes);

                return response.data.incomes;
            })
            .then(incomes => {
                let sum = 0;
                incomes.map(income=> sum+= parseFloat(income.value));
                setIncomesSum(sum);
                setIsLoading(false);
            })

    },[])

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
                    <SpinnerWrapper>
                        {isLoading ? <LoadingAnimation isBig={false}/> :<p>{incomesSum.toFixed(2)}</p>}
                    </SpinnerWrapper>
                </Row>
            </CompanyPreviewWrapper>
        );
};

export default CompanyPreview;
