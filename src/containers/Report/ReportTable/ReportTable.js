import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Table } from "antd";
import { Input } from 'antd';
import { Card } from "common/Card";
import { columns } from "./colums";
import { CopyToClipBoard } from "components/CopyToClipBoard";
import classes from "./ReportTable.module.scss";
import { ReactComponent as Smile } from "assets/icons/smile-01.svg"
import { ReactComponent as Good } from "assets/icons/good.svg"
import { EmptyState } from "common/EmptyState";
import { EMPTY_TITLE } from "containers/Report/constants";

const { Search } = Input;

const propTypes = {
    className: PropTypes.string,
    selected: PropTypes.shape({ title: PropTypes.string, isUrl: PropTypes.bool }),
    data: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
        type: PropTypes.string,
        component: PropTypes.string,

    }))
};


const ReportTable = ({ selected, data, className }) => {
    const [searchTerm, setSearchTerm] = useState(null)
    const { title, isUrl } = selected

    const filtered = useMemo(() => {
        if (searchTerm) {
            return data?.filter(item =>
                Object.values(item).some(value =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
        return data;
    }, [data, searchTerm]);
    const onSearch = (value) => {
        setSearchTerm(value)
    };

    const renderTable = () => {
        if (title === EMPTY_TITLE) {
            return <EmptyState className={classes.smile}><Smile/></EmptyState>
        } else if (!filtered.length) {
            return <EmptyState className={classes.smile}><Good/></EmptyState>
        }

        return <Table className={classes.reportTable}
                      pagination={{ defaultPageSize: 5, hideOnSinglePage: true, position: ["bottomCenter"] }}
                      scroll={{ x: 400, y: 260 }}
                      size="middle"
                      columns={columns}
                      dataSource={filtered}
        />;
    }


    return (
        <Card className={className}>
            <Card.Header title={!isUrl && title}>
                {isUrl &&
                    <div className={classes.url}>
                        <a className={classes.clamp} href={title} target="_blank" rel="noopener noreferrer">{title}</a>
                        <CopyToClipBoard text={title}/>
                    </div>
                }
                <Search
                    placeholder="filter"
                    allowClear
                    onSearch={onSearch}
                    rootClassName={classes.search}

                />
            </Card.Header>
            {renderTable()}
        </Card>


    );
};

ReportTable.propTypes = propTypes;
export default ReportTable;