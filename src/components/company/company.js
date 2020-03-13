import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const CompanyWrapper = styled.div`

`;

const MinDate = styled.input`

`;

const MaxDate = styled.input`

`;
const SortButton = styled.button`

`;

//todo: change last month income (sum all incomes in last month)
const Company = (props) =>{
    const[incomes, setIncomes] = useState([]);
    const[incomeSum, setIncomeSum] = useState(0);
    const[lastMonthIncome, setLastMonthIncome] = useState(0);
    const[minDate, setMinDate] = useState(null);
    const[maxDate, setMaxDate] = useState(null);

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
    const setRange = () =>{
       const rangedIncomes =  incomes.filter(income=>{
            if(Date.parse(income.date)>= Date.parse(minDate) && Date.parse(income.date)<= Date.parse(maxDate)){
                return income;
            }
        });
       setIncomes(rangedIncomes);
    };

    const incomesList = (
        incomes.length === 0 ? <p>there is no incomes</p>
             :
            incomes.map(income=>(
                <div>
                    {/*{console.log(Date.parse(income.date))}*/}
                    <p>{income.value}</p>
                    <p>{income.date.toString()}</p>
                </div>
            ))
    );


    return(
        <CompanyWrapper>
            <h1>{props.location.state.id}</h1>
            <h1>Average income: {averageIncome}</h1>
            <h1>Last month income: {lastMonthIncome}</h1>
            <MinDate type="date" onChange={e=>setMinDate(e.target.value)}/>
            <MaxDate type="date" onChange={e=>setMaxDate(e.target.value)}/>
            <SortButton onClick={setRange}>set range</SortButton>
            {incomesList}
        </CompanyWrapper>
    )
};

export default Company;
