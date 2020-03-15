import React from 'react';
import styled from 'styled-components';
import * as colors from '../../../assets/colors';

const CompanyPreviewWrapper = styled.tr`
&:hover{
cursor: pointer;
background-color: ${colors.tableBorderGray2};
}
`;
const Row = styled.td`
padding: 1rem;
`
const CompanyPreviewName = styled.p`
text-align: center;
`;

const CompanyPreviewCity = styled.p`
text-align: center;
`;

const CompanyPreview = ({name, city,id, click}) => (
    <CompanyPreviewWrapper onClick={()=>click(id,name,city)}>
        <Row>
            <CompanyPreviewName >{id}</CompanyPreviewName>
        </Row>
        <Row>
            <CompanyPreviewName>{name}</CompanyPreviewName>
        </Row>
        <Row>
            <CompanyPreviewCity>{city}</CompanyPreviewCity>
        </Row>
    </CompanyPreviewWrapper>
);

export default CompanyPreview;
