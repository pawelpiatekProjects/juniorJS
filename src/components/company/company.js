import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as colors from '../../assets/colors';



const CompanyWrapper = styled.div`
width: 60%;
margin: 0 auto;
@media(max-width: 1400px){
width: 70%;
}

@media(max-width: 1000px){
width: 90%;
}
@media(max-width: 800px){
width: 100%;
}
`;

const CompanyWrapperHeading = styled.div`
width: 100%;
background-color: ${colors.primaryBlue};
padding: 2rem;
color: ${colors.white};
text-align: center;
margin-top: 2rem;
`;

const CompanyInfo = styled.div`
width: 100%;
margin: 0 auto;
`;

const CompanyWrapperHeadingItem = styled.h1`
display: inline-block;
margin: 0 3rem;

@media(max-width: 850px){
font-size: 1.8rem;
}

@media(max-width: 650px){
font-size: 1.4rem;
margin: 0 1rem;
}

@media(max-width: 500px){
font-size: 1.2rem;
}
`;

const RangeContent = styled.div`
width: 100%;
margin: 2rem auto;
text-align: center;
`;

const MinDate = styled.input`
appearance: none;
  border: 1px solid ${colors.inputColor};
  background: transparent;
  font-size: 1.5rem;
  padding: .5rem;
  margin: 0 .5rem;
  height: 3rem;
  
  @media(max-width: 350px){
display: block;
margin: 1rem auto;
}
`;

const MaxDate = styled.input`
appearance: none;
  border: 1px solid ${colors.inputColor};
  background: transparent;
  font-size: 1.5rem;
  padding: .5rem;
  margin: 0 .5rem;
  height: 3rem;
  
  @media(max-width: 350px){
display: block;
margin: 1rem auto;
}
`;
const Button = styled.button`
border: none;
background-color: ${props=>props.isBlue ? colors.primaryBlue : colors.white};
color: ${props=>props.isBlue ? colors.white : colors.primaryBlue};
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
background: ${props=>props.isBlue ? colors.primaryBlueHover : colors.white};
}

@media(max-width: 500px){
font-size: 1.4rem;
}
`;

const CompanyContent = styled.div`
width: 100%;
margin: 5rem auto;
`;

const CompanyContentHeader = styled.h1`
text-align: center;
font-weight: 400;

span{
font-weight: 700;
margin-left: .5rem;
}

@media(max-width: 650px){
font-size: 1.8rem;
}

@media(max-width: 450px){
font-size: 1.4rem;
}
`;

const EmptyMessage = styled.h1`
width: 100%;
margin: 5rem auto;
text-align: center;
`;

const IncomeContainer = styled.div`
margin-top: 5rem;
`;

const IncomeContainerContent = styled.div`
display: ${props=>props.show ? 'block' : 'none'};
`;

const IncomeContainerHeading = styled.div`
background-color: ${colors.tableBorderGray1};
padding: 2rem;
width: 100%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const IncomeContainerHeadingContent = styled.h1`

@media(max-width: 850px){
font-size: 1.8rem;
}

@media(max-width: 650px){
font-size: 1.4rem;
margin: 0 1rem;
}

@media(max-width: 500px){
font-size: 1.2rem;
}
`;


const Income = styled.div`
border: 1px solid ${colors.tableBorderGray1};
background-color: ${colors.tableBorderGray2};
margin-top: 1rem;

@media(max-width: 650px){
margin-top: .2rem;
padding: 1rem;
}
`;


const IncomeDate = styled.h3`
font-size: 1.8rem;
text-align: center;

@media(max-width: 850px){
font-size: 1.8rem;
}

@media(max-width: 650px){
font-size: 1.4rem;
margin: 0 1rem;
}

@media(max-width: 500px){
font-size: 1.2rem;
}
`;

const IncomeValue = styled.p`
text-align: center;

@media(max-width: 850px){
font-size: 1.8rem;
}

@media(max-width: 650px){
font-size: 1.4rem;
margin: 0 1rem;
}

@media(max-width: 500px){
font-size: 1.2rem;
}
`;


const Company = (props) => {
    const [incomes, setIncomes] = useState([]);
    const [incomeSum, setIncomeSum] = useState(0);
    const [lastMonthIncome, setLastMonthIncome] = useState(0);
    const [minDate, setMinDate] = useState(null);
    const [maxDate, setMaxDate] = useState(null);
    const [showIncomes, setShowIncomes] = useState(false);
    const [canDisplayIncome, setCanDisplayIncome] = useState(true);

    const info = props.location.state.info.split(".");

    useEffect(() => {
        axios.get(`https://recruitment.hal.skygate.io/incomes/${info[0]}`)
            .then(response => {
                const sortedIncomes = response.data.incomes.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
                setIncomes(sortedIncomes)
                return sortedIncomes;
            })
            .then(response => {
                let sum = 0;
                response.map(el => {
                    sum += parseFloat(el.value);
                })
                setIncomeSum(sum)
                return response;
            })
            .then(array => {
                let lastMonthIncome = 0;
                const lastIncomeDate = array[array.length - 1].date.slice(0, 7);
                array.filter(month => (
                    month.date.slice(0, 7).toString() === lastIncomeDate
                ))
                    .map(el => {
                        lastMonthIncome += parseFloat(el.value);
                    })
                setLastMonthIncome(lastMonthIncome)
            })
    }, []);
//todo: fix error when range is 0
    const averageIncome = incomeSum / incomes.length;
    const setRange = () => {
        let sum = 0;
        const rangedIncomes = incomes.filter(income => {
            if (Date.parse(income.date) >= Date.parse(minDate) && Date.parse(income.date) <= Date.parse(maxDate)) {
                sum += parseFloat(income.value);
                return income;
            }
        })
        if(rangedIncomes.length>0){
            setCanDisplayIncome(true);
            console.log(rangedIncomes)
            setIncomeSum(sum);
            setIncomes(rangedIncomes);
            const lastMonthIncomeDate = rangedIncomes[rangedIncomes.length - 1].date.slice(0, 7);
            let lastMonthIncome = 0;
            rangedIncomes.filter(month => (
                month.date.slice(0, 7).toString() === lastMonthIncomeDate
            ))
                .map(el => {
                    lastMonthIncome += parseFloat(el.value);
                })
            setLastMonthIncome(lastMonthIncome);
        }else{
            setCanDisplayIncome(false);
        }

    };
//<EmptyMessage>There is no income during this period</EmptyMessage>
    const incomesList = (
        canDisplayIncome ?
            (
                <CompanyContent>
                    <CompanyContentHeader>
                        Total income:
                        <span>{incomeSum.toFixed(2)}</span>
                    </CompanyContentHeader>
                    <CompanyContentHeader>
                        Average income:
                        <span>{averageIncome.toFixed(2)}</span>
                    </CompanyContentHeader>
                    <CompanyContentHeader>
                        Last month income:
                        <span>{lastMonthIncome.toFixed(2)}</span>
                    </CompanyContentHeader>
                    <IncomeContainer>
                        <IncomeContainerHeading>
                            <IncomeContainerHeadingContent>Incomes</IncomeContainerHeadingContent>
                            <Button isBlue onClick={()=>setShowIncomes(!showIncomes)}>
                                {showIncomes ? 'Hide incomes' : 'Show incomes'}
                            </Button>
                        </IncomeContainerHeading>

                        <IncomeContainerContent show={showIncomes}>
                            {incomes.map(income => (
                                <Income key={income.date.toString()+income.value.toString()}>
                                    <IncomeDate>Date: {income.date.toString().slice(0,10)}</IncomeDate>
                                    <IncomeValue>Value: {income.value}</IncomeValue>
                                </Income>
                            ))}
                        </IncomeContainerContent>

                    </IncomeContainer>
                </CompanyContent>
            )
            :<EmptyMessage>There is no income during this period</EmptyMessage>


    );


    return (
        <CompanyWrapper>
            <Button isBlue onClick={()=>props.history.push('/')}>Back to list</Button>
            <CompanyWrapperHeading>

                <CompanyWrapperHeadingItem>{info[0]}</CompanyWrapperHeadingItem>
                <CompanyWrapperHeadingItem>{info[1]}</CompanyWrapperHeadingItem>
                <CompanyWrapperHeadingItem>{info[2]}</CompanyWrapperHeadingItem>
            </CompanyWrapperHeading>
            <CompanyInfo>
                <RangeContent>
                    <MinDate type="date" onChange={e => setMinDate(e.target.value)}/>
                    <MaxDate type="date" onChange={e => setMaxDate(e.target.value)}/>
                    <Button
                        isBlue
                        disabled={
                            (maxDate=== null || minDate=== null) || (maxDate===null && minDate===null)   ? true : false
                        }
                        onClick={setRange}>Set range</Button>
                </RangeContent>
                {incomesList}

            </CompanyInfo>

        </CompanyWrapper>
    )
};

export default Company;
