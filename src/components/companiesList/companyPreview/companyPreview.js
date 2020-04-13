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



const CompanyPreview = ({name, city,id, totalIncome, averageIncome}) => {

    //hooks used to manage state in this component
    const [incomesSum, setIncomesSum] = useState(0); //total income
    const [incomesLength, setIncomesLength] = useState(0);
    const [lastMonthIncome, setLastMonthIncome] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    //hook used to fetch data
    useEffect(()=>{
        setIsLoading(true);
        axios.get(`https://recruitment.hal.skygate.io/incomes/${id}`)
            .then(response=>{
                console.log(response.data.incomes);
                const sortedIncomes = response.data.incomes.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
                setIncomesLength(response.data.incomes.length);
                return sortedIncomes;
            })
            .then(incomes => {
                let sum = 0;
                console.log(incomes)
                incomes.map(income=> sum+= parseFloat(income.value));
                setIncomesSum(sum);
                setIsLoading(false);

                return incomes
            })
            .then(array=>{
                let lastMonthIncome = 0;
                const lastIncomeDate = array[array.length - 1].date.slice(0, 7);
                array.filter(month => (
                    month.date.slice(0, 7).toString() === lastIncomeDate
                ))
                    .map(el => (
                        lastMonthIncome += parseFloat(el.value)
                    ))
                setLastMonthIncome(lastMonthIncome)
                setIsLoading(false);
            })
    },[])

    // const averageIncome = incomesSum/incomesLength;

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
                        {isLoading ? <LoadingAnimation isBig={false}/> :<CompanyPreviewText>{totalIncome.toFixed(2)}</CompanyPreviewText>}
                    </SpinnerWrapper>
                </Row>
                <Row>
                    <SpinnerWrapper>
                        {isLoading ? <LoadingAnimation isBig={false}/> :<CompanyPreviewText>{averageIncome.toFixed(2)}</CompanyPreviewText>}
                    </SpinnerWrapper>
                </Row>
                <Row>
                    <SpinnerWrapper>
                        {isLoading ? <LoadingAnimation isBig={false}/> :<CompanyPreviewText>{lastMonthIncome.toFixed(2)}</CompanyPreviewText>}
                    </SpinnerWrapper>
                </Row>
            </CompanyPreviewWrapper>
        );
};

export default CompanyPreview;
