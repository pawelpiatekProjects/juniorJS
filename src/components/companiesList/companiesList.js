import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {Redirect, withRouter} from 'react-router-dom';
import CompanyPreview from './companyPreview/companyPreview';
import PaginationButtons from '../paginationButtons/paginationButtons'
import * as colors from '../../assets/colors';

const CompaniesListWrapper = styled.div`
width: 50%;
margin: 1rem auto;
`;

const CompaniesListTable = styled.table`
width: 100%;
margin: 1rem auto;
border: 1px solid ${colors.tableBorderGray1};
border-spacing: 0;
`;

const CompaniesListThead = styled.thead`
border-bottom: 3px solid ${colors.tableBorderGray1};
background-color: ${colors.primaryBlue};

`;

const CompaniesListTbody = styled.tbody`

`;

const CompaniesListFirstRow = styled.tr`
height: 100%;
`;

const CompaniesListFirstRowItem = styled.th`
p{
color: ${colors.white};
}
`;

const CompaniesFilterInput = styled.input`
border: 1px solid ${colors.inputColor};
padding: .5rem;
width: 30%;
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
                setCompaniesList(response.data.sort((a, b) => b.id - a.id));
            })
    }, [])

    const SearchInputMethod = e => {
        setSearchInputValue(e.target.value);
    };

    const lastCompany = currentCompaniesPage * companiesOnPage;
    const firstCompany = lastCompany - companiesOnPage;
    const currentPage = companiesList.slice(firstCompany, lastCompany);
    const lastPage = companiesList.length / companiesOnPage;

    const toNextPage = () => {
        if (currentCompaniesPage < lastPage) {
            setCurrentCompaniesPage(currentCompaniesPage + 1);
        }
    };

    const toPreviousPage = () => {
        if (currentCompaniesPage >= 2) {
            setCurrentCompaniesPage(currentCompaniesPage - 1);
        }
    };


    const getCompanyData = (id, name, city) => {
        // console.log(id);
        const info = `${id}.${name}.${city}`.toString();
        console.log(info);

        console.log(info.split("."));

        props.history.push({
            pathname: `/company/${id}`,
            state: {
                info:info
            }
        })
    }

    return (
        <CompaniesListWrapper>
            <CompaniesFilterInput
                placeholder="Search"
                onChange={SearchInputMethod}/>
            <CompaniesListTable>
                <CompaniesListThead>
                    <CompaniesListFirstRow>
                        <CompaniesListFirstRowItem><p>Id</p></CompaniesListFirstRowItem>
                        <CompaniesListFirstRowItem><p>Name</p></CompaniesListFirstRowItem>
                        <CompaniesListFirstRowItem><p>City</p></CompaniesListFirstRowItem>
                    </CompaniesListFirstRow>
                </CompaniesListThead>
                <CompaniesListTbody>
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
                </CompaniesListTbody>
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
