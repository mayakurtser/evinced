import React, { useEffect, useState } from 'react';
import { Container } from "common/Container";
import { PageHeader } from "common/PageHeader";
import { Section } from "common/Section";
import { transformToTree, extractValues, validate } from "utils";
import { ReportTable } from "containers/Report/ReportTable";
import { ReportTree } from "containers/Report/ReportTree";
import { EMPTY_TITLE } from "./constants";
import classes from "./Report.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { ValidationError } from "containers/Report/ValidationError";


const Report = () => {
    const [selected, setSelected] = useState({ title: EMPTY_TITLE, isUrl: false })
    const [tableData, setTableData] = useState([]);
    const [treeData, setTreeData] = useState([]);
    const [validationResult, setValidationResult] = useState({ valid: true, message: "" })
    const [header, setHeader] = useState({ title: "", desc: "" })
    const { reportName } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`/assets/files/${reportName}.json`);
                const data = await response.json();
                const result = validate(data);
                if (result.valid) {
                    setHeader({ title: data?.name.toUpperCase(), desc: data?.date })
                    setTreeData(transformToTree(data?.content));
                } else {
                    console.error('There was a problem with the file', result.message);
                }
                setValidationResult(result);

            } catch (error) {
                console.error('There was a problem with the fetch operation:', error.message);
                navigate("/error");
            }
        }

        fetchData();
    }, [reportName, navigate]);
    
    const onSelect = (selectedKeysValue, info) => {
        const { selected, selectedNodes } = info;
        if (selected) {
            const { children, title } = selectedNodes[0];
            const result = extractValues(children);
            if (title.includes(".html") && children?.length && children[0]?.url) {
                setSelected({ title: children[0]?.url, isUrl: true });
            } else {
                setSelected({ title, isUrl: false });
            }
            setTableData(result);
        }
    };
    return (
        <>
            {validationResult.valid ? (
                <Section>
                    <Container>
                        <PageHeader title={header.title} subTitle={header.desc}/>
                    </Container>
                    <Container className={classes.cards}>
                        <ReportTree
                            className={classes.card}
                            onSelect={onSelect}
                            data={treeData}
                        />
                        <ReportTable selected={selected} className={classes.card} data={tableData}/>
                    </Container>
                </Section>) : <ValidationError message={validationResult.message}/>
            }
        </>
    );
};

export default Report;