import { ReactComponent as ABCIcon } from "assets/icons/translate-01.svg"
import { ReactComponent as PercentIcon } from "assets/icons/percent-02.svg"

const CARD_HADER = "Site Tree";
const SORT_TREE = {
    title: "title",
    percent: "percent",
}

const SORT_TREE_TO_ICON = {
    [SORT_TREE.title]: <ABCIcon/>,
    [SORT_TREE.percent]: <PercentIcon/>,
}

export { SORT_TREE, SORT_TREE_TO_ICON, CARD_HADER };