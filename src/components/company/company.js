import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as colors from '../../assets/colors';
import Charts from '../chart/chart';
import groupArray from 'group-array';

const CompanyWrapper = styled.div`
width: 60%;
margin: 0 auto;
`;

const CompanyWrapperHeading = styled.div`
width: 100%;
background-color: ${colors.primaryBlue};
padding: 2rem;
color: ${colors.white};
text-align: center;
`;

const CompanyInfo = styled.div`
width: 100%;
margin: 0 auto;
`;

const CompanyWrapperHeadingItem = styled.h1`
display: inline-block;
margin: 0 3rem;
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
`;

const MaxDate = styled.input`
appearance: none;
  border: 1px solid ${colors.inputColor};
  background: transparent;
  font-size: 1.5rem;
  padding: .5rem;
  margin: 0 .5rem;
  height: 3rem;
`;
const SortButton = styled.button`
border: none;
background-color: ${colors.primaryBlue};
color: ${colors.white};
padding: .5rem;
height: 3rem;
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
`;

const EmptyMessage = styled.h1`
width: 100%;
margin: 5rem auto;
text-align: center;
`;

//todo: change last month income (sum all incomes in last month)
const Company = (props) => {
    const [incomes, setIncomes] = useState([]);
    const [incomeSum, setIncomeSum] = useState(0);
    const [lastMonthIncome, setLastMonthIncome] = useState(0);
    const [minDate, setMinDate] = useState(null);
    const [maxDate, setMaxDate] = useState(null);

    const info = props.location.state.info.split(".");

    useEffect(() => {
        let sum = 0;
        axios.get(`https://recruitment.hal.skygate.io/incomes/${info[0]}`)
            .then(response => {
                const sortedIncomes = response.data.incomes.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
                setIncomes(sortedIncomes)
                return sortedIncomes;
            })
            .then(incomes => {
                incomes.map(income => {
                    income.date=new Date(income.date.slice(0,10));
                    const incomeNum = parseFloat(income.value);
                    sum += incomeNum;
                })
                setIncomeSum(sum);
                setLastMonthIncome(parseFloat(incomes[incomes.length - 1].value))

                return incomes
            })
            .then(incomes=>{
                setIncomes(incomes, incomes.date);
                console.log(incomes) //todo: change
            })

    }, []);

    const averageIncome = incomeSum / incomes.length;
    const setRange = () => {
        const rangedIncomes = incomes.filter(income => {
            if (Date.parse(income.date) >= Date.parse(minDate) && Date.parse(income.date) <= Date.parse(maxDate)) {
                return income;
            }
        });
        setIncomes(rangedIncomes);
    };

    const incomesList = (
        incomes.length === 0 ? <EmptyMessage>There is no income during this period</EmptyMessage>
            :
            (
                <CompanyContent>
                    <CompanyContentHeader>
                        Average income:
                        <span>{averageIncome.toFixed(2)}</span>
                    </CompanyContentHeader>
                    <CompanyContentHeader>
                        Last month income:
                        <span>{lastMonthIncome.toFixed(2)}</span>
                    </CompanyContentHeader>
                    {
                        incomes.map(income => (
                            <div>
                                {/*{console.log(Date.parse(income.date))}*/}
                                <p>{income.value}</p>
                                <p>{income.date.toString()}</p>

                            </div>
                        ))
                    }

                </CompanyContent>
            )

    );


    return (
        <CompanyWrapper>
            <CompanyWrapperHeading>
                <CompanyWrapperHeadingItem>{info[0]}</CompanyWrapperHeadingItem>
                <CompanyWrapperHeadingItem>{info[1]}</CompanyWrapperHeadingItem>
                <CompanyWrapperHeadingItem>{info[2]}</CompanyWrapperHeadingItem>
            </CompanyWrapperHeading>
            <CompanyInfo>
                <RangeContent>
                    <MinDate type="date" onChange={e => setMinDate(e.target.value)}/>
                    <MaxDate type="date" onChange={e => setMaxDate(e.target.value)}/>
                    <SortButton onClick={setRange}>Set range</SortButton>
                </RangeContent>
                {incomesList}

            </CompanyInfo>

        </CompanyWrapper>
    )
};

export default Company;
