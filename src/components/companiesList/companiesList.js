import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CompanyPreview from './companyPreview/companyPreview';
import PaginationButtons from '../paginationButtons/paginationButtons'
import * as colors from '../../assets/colors';
import LoadingAnimation from "../loadingAnimation/loadingAnimation";

//styled components variables
const CompaniesListWrapper = styled.div`
    width: 80%;
    margin: 1rem auto;
    
        @media(max-width: 1400px){
            width: 90%;
        }
        
        @media(max-width: 1300px){
            width: 95%;
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
    overflow-y: scroll;
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
        font-size: 1.6rem;
    }
    
    @media(max-width: 950px){
        p{
            font-size: 1.4rem;
        }
    }
    
    @media(max-width: 600px){
        p{
            font-size: 1.2rem;
        }
    }
    
    @media(max-width: 450px){
        p{
            font-size: 1rem;
        }
    }


`;

const ClickableRowItem = styled.th`

    padding: .5rem;
        button{
          height: 100%;
          padding: 1rem;
          background-color: ${colors.primaryBlue};
          border: none;
          color: ${colors.white};
          font-size: 1.6rem;
          
        }
    
        @media(max-width: 950px){
             button{
                font-size: 1.4rem;
            }
        }
    
        @media(max-width: 600px){
             button{
                font-size: 1.2rem;
            }
        }
    
        @media(max-width: 450px){
            button{
                font-size: 1rem;
            }
        }
    
        &:hover button{
            cursor: pointer;
            color: ${colors.yellow}
        }


`

const CompaniesFilterInput = styled.input`
    border: 1px solid ${colors.inputColor};
    padding: .5rem;
    width: 30%;
    
    @media(max-width: 600px){
        width: 50%;
        font-size: 1.4rem;
    }
    
    @media(max-width: 450px){
        width: 60%;
        margin: 0 auto;
        font-size: 1.2rem;
        display: block;
    }
    

`;

const LoadingAnimationWrapper = styled.div`
    width: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`;
//End of styled components variables

const CompaniesList = () => {

    //hooks used to manage state in this component
    const [searchInputValue, setSearchInputValue] = useState('');
    const [companiesList, setCompaniesList] = useState([]); //list of displaying companies

    const [sortedTotalAndAverageDescending, setSortedTotalAndAverageDescending] = useState([]);
    const [sortedTotalAndAverageAscending, setSortedTotalAndAverageAscending] = useState([]);
    const [sortedLastMonthIncomeDescending, setSortedLastMonthIncomeDescending] = useState([]);
    const [sortedLastMonthIncomeAscending, setSortedLastMonthIncomeAscending] = useState([]);

    const [currentCompaniesPage, setCurrentCompaniesPage] = useState(1); //which page of table is being displayed
    const [companiesOnPage, setCompaniesOnPage] = useState(20); //how many companies on one page
    const [isLoading, setIsLoading] = useState(false);
    const [isTotalAndAverageIncomeSortedAscending, setIsTotalAndAverageIncomeSortedAscending] = useState(false);
    // const [isAverageIncomeSortedAscending, setIsAverageIncomeSortedAscending] = useState(false);
    const [isLastMonthIncomeSortedAscending, setIsLastMonthIncomeSortedAscending] = useState(false);

    //Api Url
    const companiesListUrl = `https://recruitment.hal.skygate.io/companies`;
    const companyIncomeUrl = `https://recruitment.hal.skygate.io/incomes/`;

    // Variables used to calculate how many companies will be displayed on one page in the table
    const lastCompany = currentCompaniesPage * companiesOnPage;
    const firstCompany = lastCompany - companiesOnPage;
    const currentPage = companiesList.slice(firstCompany, lastCompany);
    const lastPage = companiesList.length / companiesOnPage;

//todo fix loader on small devices

    //hook used to fetch data
    useEffect(() => {
        setIsLoading(true);
        const fetchAllCompanies = async () => {
            const {data} = await axios.get(companiesListUrl);

            const companiesWithIncomes = data.map(async company => {
                const {data} = await axios.get(`${companyIncomeUrl}${company.id}`);
                const sortedIncomes = data.incomes.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
                let totalIncome = 0;
                let lastMonthIncome = 0;
                const lastMonth = sortedIncomes[sortedIncomes.length - 1].date.slice(0, 7);
                sortedIncomes
                    .map(income => {
                        totalIncome += parseFloat(income.value);
                    })
                const lastMonthIncomes = [...sortedIncomes]
                    .filter(income => (
                        income.date.slice(0, 7) === lastMonth
                    ))
                    .map(filtered => {
                        lastMonthIncome += parseFloat(filtered.value);
                    })


                const averageIncome = totalIncome / sortedIncomes.length;

                return {
                    ...company,
                    incomes: sortedIncomes,
                    totalIncome: totalIncome,
                    averageIncome: averageIncome,
                    lastMonthIncome: lastMonthIncome
                }
            })
            Promise.all(companiesWithIncomes)
                .then(fullCompanyData => {
                    const totalAndAverageDescending = [...fullCompanyData].sort((a, b) => {
                        return parseFloat(b.totalIncome) - parseFloat(a.totalIncome);
                    });
                    const totaAndAveragelAscending = [...fullCompanyData].sort((a, b) => {
                        return parseFloat(a.totalIncome) - parseFloat(b.totalIncome);
                    });
                    const lastDescending = [...fullCompanyData].sort((a, b) => {
                        return parseFloat(b.lastMonthIncome) - parseFloat(a.lastMonthIncome);
                    });
                    const lastAscending = [...fullCompanyData].sort((a, b) => {
                        return parseFloat(a.lastMonthIncome) - parseFloat(b.lastMonthIncome);
                    });
                    setCompaniesList(fullCompanyData);
                    setSortedTotalAndAverageDescending(totalAndAverageDescending);
                    setSortedTotalAndAverageAscending(totaAndAveragelAscending);
                    setSortedLastMonthIncomeDescending(lastDescending);
                    setSortedLastMonthIncomeAscending(lastAscending);
                    setIsLoading(false);
                })

        }
        fetchAllCompanies();

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



    // Method which is used to sort by total income and average income. I am using one method to both columns,
    // because when we sort total income the average income is also sorted
    const sortTotalAndAverage = () => {

        if(isTotalAndAverageIncomeSortedAscending){
            setCompaniesList(sortedTotalAndAverageDescending);
        }else{
            setCompaniesList(sortedTotalAndAverageAscending);
        }
        setIsTotalAndAverageIncomeSortedAscending(!isTotalAndAverageIncomeSortedAscending);
    }



    // Method which is used to sort by last month income
    const sortLastMonth = () =>{
        if(isLastMonthIncomeSortedAscending){
            setCompaniesList(sortedLastMonthIncomeDescending)
        }else{
            setCompaniesList(sortedLastMonthIncomeAscending);
        }
        setIsLastMonthIncomeSortedAscending(!isLastMonthIncomeSortedAscending);
    }


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


    return (
        <>
            {isLoading ? (
                <LoadingAnimationWrapper>
                    {/*isBig prop is used to change style (size and color) of Loading animation spinner*/}
                    <LoadingAnimation/>
                </LoadingAnimationWrapper>
            ) : (
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
                                <ClickableRowItem>
                                    <button onClick={() => sortTotalAndAverage()}>Total income</button>
                                </ClickableRowItem>
                                <ClickableRowItem>
                                    <button onClick={() => sortTotalAndAverage()}>Average income</button>
                                </ClickableRowItem>
                                <ClickableRowItem>
                                    <button onClick={() => sortLastMonth()}>Last month Income</button>
                                </ClickableRowItem>
                            </CompaniesListFirstRow>
                        </CompaniesListThead>
                        <CompaniesListTbody>
                            {/*Filtering by search input value and displaying companies*/}
                            {currentPage
                                .filter(company => company.name.toLowerCase().includes(searchInputValue.toLowerCase()))
                                .map(company => {
                                        return (
                                            <CompanyPreview
                                                totalIncome={company.totalIncome}
                                                averageIncome={company.averageIncome}
                                                lastMonthIncome={company.lastMonthIncome}
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
