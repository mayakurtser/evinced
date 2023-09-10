import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Tree } from "antd";
import { ReactComponent as DownOutlined } from "assets/icons/chevron-right.svg"
import { Text, TYPOGRAPHY_SIZES, TYPOGRAPHY_WEIGHTS } from "common/Typography";
import colors from "styles/colors.module.scss";
import { Card } from "common/Card";
import { sortByAbc, sortByKey } from "utils";
import { CARD_HADER, SORT_TREE, SORT_TREE_TO_ICON } from "./constants";


const propTypes = {

    className: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        title: PropTypes.string,
        percent: PropTypes.number,
    })),
    onSelect: PropTypes.func,
}

const ReportTree = ({ data, onSelect, className }) => {
    const [sortBy, setSortBy] = useState(SORT_TREE.title)

    const sortedTree = useMemo(() => {
        return data?.map(node => sortBy === SORT_TREE.title ? sortByAbc(node, SORT_TREE.title) : sortByKey(node, sortBy));
    }, [data, sortBy]);

    const CustomTitleRender = ({ title, key, percent }) => {
        const value = title ? `${title} ${percent}%` : "---";
        return (
            <Text key={key} value={value} size={TYPOGRAPHY_SIZES.SM} weight={TYPOGRAPHY_WEIGHTS.REGULAR}
                  color={colors.gray600}/>
        );
    }
    const onSort = () => {
        if (sortBy === SORT_TREE.title) {
            setSortBy(SORT_TREE.percent);
        } else {
            setSortBy(SORT_TREE.title);
        }
    }

    return (
        <Card className={className}>
            <Card.Header title={CARD_HADER}>
                <Button icon={SORT_TREE_TO_ICON[sortBy]} onClick={onSort}/>
            </Card.Header>
            <Tree
                onSelect={onSelect}
                titleRender={CustomTitleRender}
                switcherIcon={<DownOutlined/>}
                height={380}
                treeData={sortedTree}
            />
        </Card>

    );
};

ReportTree.propTypes = propTypes;


export default ReportTree;