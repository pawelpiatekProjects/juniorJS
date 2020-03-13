import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CompanyPreview from './companyPreview/companyPreview';

const CompaniesListWrapper = styled.div`

`;

const CompaniesListTable = styled.table`
width: 50%;
margin: 1rem auto;
border: 1px solid #333;
`;

const CompaniesListFirstRow = styled.tr`
border-bottom: 1px solid #333;
`;

const CompaniesListFirstRowItem = styled.th`
padding: 1rem;

`;

const CompaniesFilterInput = styled.input`

`;
//todo: loading screen
const CompaniesList = () => {
    const [searchInputValue, setSearchInputValue] = useState('');
    const [companiesList, setCompaniesList] = useState([]);

    useEffect(() => {
        axios.get('https://recruitment.hal.skygate.io/companies')
            .then(response => {
                setCompaniesList(response.data);
                console.log(response.data);
            })
    },[])

    const SearchInputMethod = e =>{
        setSearchInputValue(e.target.value);
    }



    return (
        <CompaniesListWrapper>
            <CompaniesFilterInput onChange={SearchInputMethod}/>
            <CompaniesListTable>
                <CompaniesListFirstRow>
                    <CompaniesListFirstRowItem>Id</CompaniesListFirstRowItem>
                    <CompaniesListFirstRowItem>Name</CompaniesListFirstRowItem>
                    <CompaniesListFirstRowItem>City</CompaniesListFirstRowItem>
                </CompaniesListFirstRow>
                {companiesList
                    .sort((a,b)=>b.id - a.id)
                    .filter(company => company.name.toLowerCase().includes(searchInputValue.toLowerCase()))
                    .map(company => (
                    <CompanyPreview key={company.id} name={company.name} city={company.city} id={company.id}/>
                ))}
            </CompaniesListTable>

        </CompaniesListWrapper>
    )
};

export default CompaniesList;
