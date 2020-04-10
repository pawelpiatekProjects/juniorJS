import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CompanyPreview from './companyPreview/companyPreview';
import PaginationButtons from '../paginationButtons/paginationButtons'
import * as colors from '../../assets/colors';
import LoadingAnimation from "../loadingAnimation/loadingAnimation";

//styled components variables
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

const LoadingAnimationWrapper = styled.div`
width: 50%;
margin: 5rem auto;
text-align: center;
`;
//End of styled components variables

const CompaniesList = (props) => {

    //hooks used to manage state in this component
    const [searchInputValue, setSearchInputValue] = useState('');
    const [companiesList, setCompaniesList] = useState([]); //list of displaying companies
    const [currentCompaniesPage, setCurrentCompaniesPage] = useState(1); //which page of table is being displayed
    const [companiesOnPage, setCompaniesOnPage] = useState(20); //how many companies on one page
    const [isLoading, setIsLoading] = useState(false);


    //hook used to fetch data
    useEffect(() => {
        setIsLoading(true);
        axios.get('https://recruitment.hal.skygate.io/companies')
            .then(response => {
                const sorted = response.data.sort((a, b) => b.id - a.id)

                return sorted;
            })
            .then(response => {
                setCompaniesList(response)
                setIsLoading(false);
            })
    }, [])

    // Method which is used to set value for input
    const SearchInputMethod = e => {
        setSearchInputValue(e.target.value);
        if (e.target.value.length > 0) {
            setCompaniesOnPage(companiesList.length)
        } else {
            setCompaniesOnPage(20)
        }
    };

    // Variables used to calculate how many companies will be displayed on one page in the table
    const lastCompany = currentCompaniesPage * companiesOnPage;
    const firstCompany = lastCompany - companiesOnPage;
    const currentPage = companiesList.slice(firstCompany, lastCompany);
    const lastPage = companiesList.length / companiesOnPage;

    // Method which is used to navigate to the next page in the table
    const toNextPage = () => {
        if (currentCompaniesPage < lastPage) {
            setCurrentCompaniesPage(currentCompaniesPage + 1);
        }
    };

    // Method which is used to navigate to the previous page in the table
    const toPreviousPage = () => {
        if (currentCompaniesPage >= 2) {
            setCurrentCompaniesPage(currentCompaniesPage - 1);
        }
    };

    // Method which is called after clicking on selected company.
    const getCompanyData = (id, name, city) => {
        const info = `${id}.${name}.${city}`.toString();
        props.history.push({
            pathname: `/company/${id}`,
            state: {
                info: info // data about selected company are passed as one string. In company component
                           // info is slicing and displaying
            }
        })
    }
    return (
        <>
            {isLoading ? (
                <LoadingAnimationWrapper>
                    {/*isBig prop is used to change style (size and color) of Loading animation spinner*/}
                    <LoadingAnimation isBig/>
                </LoadingAnimationWrapper>
            ):(
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
                                <CompaniesListFirstRowItem><p>Income</p></CompaniesListFirstRowItem>
                            </CompaniesListFirstRow>
                        </CompaniesListThead>
                        <CompaniesListTbody>
                            {/*Filtering by search input value and displaying companies*/}
                            {currentPage
                                .filter(company => company.name.toLowerCase().includes(searchInputValue.toLowerCase()))
                                .map(company => {
                                        return (
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
                    {companiesOnPage !== companiesList.length ? (
                        <PaginationButtons
                            next={toNextPage}
                            previous={toPreviousPage}
                            pageNum={currentCompaniesPage}
                            lastPage={lastPage}
                        />
                    ) : null}
                </CompaniesListWrapper>
            )}
        </>
    )
};
export default CompaniesList;
