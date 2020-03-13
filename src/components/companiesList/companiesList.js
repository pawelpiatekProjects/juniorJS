import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {Redirect, withRouter} from 'react-router-dom';
import CompanyPreview from './companyPreview/companyPreview';
import PaginationButtons from '../paginationButtons/paginationButtons'

const CompaniesListWrapper = styled.div`
width: 50%;
margin: 1rem auto;
`;

const CompaniesListTable = styled.table`
width: 100%;
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
//todo: change to sorting by incomes
//todo: add buttons to pagination
const CompaniesList = (props) => {
    const [searchInputValue, setSearchInputValue] = useState('');
    const [companiesList, setCompaniesList] = useState([]);
    const [currentCompaniesPage, setCurrentCompaniesPage] = useState(1);
    const [companiesOnPage, setCompaniesOnPage] = useState(20);

    useEffect(() => {
        axios.get('https://recruitment.hal.skygate.io/companies')
            .then(response => {
                console.log(response.data);
                setCompaniesList(response.data.sort((a,b)=> b.id - a.id));
            })
    },[])

    const SearchInputMethod = e =>{
        setSearchInputValue(e.target.value);
    };

    const lastCompany = currentCompaniesPage * companiesOnPage;
    const firstCompany = lastCompany - companiesOnPage;
    const currentPage = companiesList.slice(firstCompany, lastCompany);
    const lastPage = companiesList.length/companiesOnPage;

    const toNextPage= () =>{
        if(currentCompaniesPage<lastPage){
            setCurrentCompaniesPage(currentCompaniesPage+1);
        }
    };

    const toPreviousPage = () =>{
        if(currentCompaniesPage>=2) {
            setCurrentCompaniesPage(currentCompaniesPage - 1);
        }
    };

    const getCompanyData =(id) =>{
        // console.log(id);
                props.history.push({
                    pathname: `/company/${id}`,
                    state: {id: id}
                })
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
                {currentPage
                    .filter(company => company.name.toLowerCase().includes(searchInputValue.toLowerCase()))
                    .map(company => (
                    <CompanyPreview
                        click={getCompanyData}
                        key={company.id}
                        name={company.name}
                        city={company.city}
                        id={company.id}/>
                ))}
            </CompaniesListTable>
            <PaginationButtons
                next={toNextPage}
                previous={toPreviousPage}
                pageNum={currentCompaniesPage}
                lastPage={lastPage}
            />
        </CompaniesListWrapper>
    )
};
export default CompaniesList;
