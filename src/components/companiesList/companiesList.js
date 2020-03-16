import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CompanyPreview from './companyPreview/companyPreview';
import PaginationButtons from '../paginationButtons/paginationButtons'
import * as colors from '../../assets/colors';

const CompaniesListWrapper = styled.div`
width: 50%;
margin: 1rem auto;
@media(max-width: 1400px){
width: 70%;
}

@media(max-width: 1000px){
width: 80%;
}
@media(max-width: 800px){
width: 100%;
}
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

@media(max-width: 650px){
p{
font-size: 1.4rem;
}
}
`;

const CompaniesFilterInput = styled.input`
border: 1px solid ${colors.inputColor};
padding: .5rem;
width: 30%;

@media(max-width: 650px){
width: 50%;
}

@media(max-width: 450px){
width: 100%;
}
`;
//todo: loading screen
//todo: change to sorting by incomes
const CompaniesList = (props) => {
    const [searchInputValue, setSearchInputValue] = useState('');
    const [companiesList, setCompaniesList] = useState([]);
    const [currentCompaniesPage, setCurrentCompaniesPage] = useState(1);
    const [companiesOnPage, setCompaniesOnPage] = useState(20);
    const [income, setIncome] = useState([]);

    useEffect(() => {
        axios.get('https://recruitment.hal.skygate.io/companies')
            .then(response => {
                const sorted = response.data.sort((a, b) => b.id - a.id)

                return sorted;
            })
            .then(response=>{
              setCompaniesList(response)

            })
    }, [])

    const SearchInputMethod = e => {
        setSearchInputValue(e.target.value);
        console.log(e.target.value.length)
        if(e.target.value.length>0){
            setCompaniesOnPage(companiesList.length)
        }else{
            setCompaniesOnPage(20)
        }
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

        const info = `${id}.${name}.${city}`.toString();

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
                        .map(company => {
                            return(
                                    <CompanyPreview
                                        click={getCompanyData}
                                        key={company.id}
                                        name={company.name}
                                        city={company.city}
                                        id={company.id}/>
                                )
                            }
                        )}
                </CompaniesListTbody>
            </CompaniesListTable>
            {/*switching between pagination mode */}
            {companiesOnPage != companiesList.length ? (
                <PaginationButtons
                    next={toNextPage}
                    previous={toPreviousPage}
                    pageNum={currentCompaniesPage}
                    lastPage={lastPage}
                />
            ) : null}

        </CompaniesListWrapper>
    )
};
export default CompaniesList;
