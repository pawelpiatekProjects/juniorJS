import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const CompanyWrapper = styled.div`

`;

const Company = (props) =>{
    const[incomes, setIncomes] = useState([]);
    const[incomeSum, setIncomeSum] = useState(0);
    const[lastMonthIncome, setLastMonthIncome] = useState(0);

    useEffect(()=>{
        let sum = 0;
        axios.get(`https://recruitment.hal.skygate.io/incomes/${props.location.state.id}`)
            .then(response => {
                const sortedIncomes = response.data.incomes.sort((a,b)=> Date.parse(a.date) - Date.parse(b.date) )
                setIncomes(sortedIncomes)
                return sortedIncomes;
            })
            .then(incomes=>{
                incomes.map(income=>{
                    const incomeNum = parseFloat(income.value);
                    sum+=incomeNum;
                })
                setIncomeSum(sum);
                setLastMonthIncome(incomes[incomes.length-1].value)
            })

    },[]);

    const averageIncome = incomeSum/incomes.length;


    return(
        <CompanyWrapper>
            <h1>{props.location.state.id}</h1>
            <h1>Average income: {averageIncome}</h1>
            <h1>Last month income: {lastMonthIncome}</h1>
            {console.log(lastMonthIncome)}
            {incomes.map(income=>(
                <div>
                    {/*{console.log(Date.parse(income.date))}*/}
                    <p>{income.value}</p>
                    <p>{income.date.toString()}</p>
                </div>
            ))}
        </CompanyWrapper>
    )
};

export default Company;
