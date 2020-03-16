import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as colors from '../../assets/colors';
import Charts from '../chart/chart';


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
        setIncomeSum(sum);
        setIncomes(rangedIncomes);
        const lastMonthIncomeDate = rangedIncomes[rangedIncomes.length-1].date.slice(0,7);
        let lastMonthIncome = 0;
        rangedIncomes.filter(month => (
            month.date.slice(0, 7).toString() === lastMonthIncomeDate
        ))
            .map(el => {
                lastMonthIncome += parseFloat(el.value);
            })
        setLastMonthIncome(lastMonthIncome);
    };

    const incomesList = (
        incomes.length === 0 ? <EmptyMessage>There is no income during this period</EmptyMessage>
            :
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
                    {
                        incomes.map(income => (
                            <div>
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
