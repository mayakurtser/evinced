import { Text, TYPOGRAPHY_SIZES, TYPOGRAPHY_WEIGHTS } from "common/Typography";

import colors from "styles/colors.module.scss";
import classes from "./ReportTable.module.scss";
import { CopyToClipBoard } from "components/CopyToClipBoard";


const textCell = (text) => (
    <Text
        value={text}
        weight={TYPOGRAPHY_WEIGHTS.REGULAR}
        size={TYPOGRAPHY_SIZES.SM}
        className={classes.cell} color={colors.gray600}
    />
);
const urlCell = (text) => (
    <div className={classes.urlCell}>
        <a className={classes.cell} href={text} target="_blank" rel="noopener noreferrer">{text}</a>
        <CopyToClipBoard text={text}/>
    </div>
);

const columns = [
    {
        title: 'URL',
        dataIndex: 'url',
        key: 'url',
        width: 500,
        render: urlCell,
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        render: textCell
    },
    {
        title: 'Component',
        dataIndex: 'component',
        key: 'component',
        render: textCell
    },
];

export { columns };