import React from 'react';
import styled from 'styled-components';
import * as colors from "../../../assets/colors";

const CompanyContentWrapper = styled.div`
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

const IncomeContainer = styled.div`
margin-top: 5rem;
`;

const IncomeContainerContent = styled.div`
display: ${props => props.show ? 'block' : 'none'};
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

//todo: change Button styled component to separate component
const CompanyContent = ({incomeSum, averageIncome, lastMonthIncome, setShowIncomes, showIncomes, incomes}) => (
    <CompanyContentWrapper>
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
                <Button isBlue onClick={() => setShowIncomes(!showIncomes)}>
                    {showIncomes ? 'Hide incomes' : 'Show incomes'}
                </Button>
            </IncomeContainerHeading>

            <IncomeContainerContent show={showIncomes}>
                {incomes.map(income => (
                    <Income key={income.date.toString() + income.value.toString()}>
                        <IncomeDate>Date: {income.date.toString().slice(0, 10)}</IncomeDate>
                        <IncomeValue>Value: {income.value}</IncomeValue>
                    </Income>
                ))}
            </IncomeContainerContent>

        </IncomeContainer>
    </CompanyContentWrapper>
);

export default CompanyContent;
