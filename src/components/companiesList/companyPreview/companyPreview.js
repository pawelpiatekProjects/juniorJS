import React,{useState, useEffect} from 'react';
import styled from 'styled-components';
import * as colors from '../../../assets/colors';
import axios from 'axios';
import LoadingAnimation from '../../loadingAnimation/loadingAnimation';

//styled components variables
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
//End of styled components variables



const CompanyPreview = ({name, city,id, click}) => {

    //hooks used to manage state in this component
    const [incomesSum, setIncomesSum] = useState(0); //total income
    const [isLoading, setIsLoading] = useState(false);

    //hook used to fetch data
    useEffect(()=>{
        setIsLoading(true);
        axios.get(`https://recruitment.hal.skygate.io/incomes/${id}`)
            .then(response=>{
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
                        {isLoading ? <LoadingAnimation isBig={false}/> :<CompanyPreviewText>{incomesSum.toFixed(2)}</CompanyPreviewText>}
                    </SpinnerWrapper>
                </Row>
            </CompanyPreviewWrapper>
        );
};

export default CompanyPreview;
