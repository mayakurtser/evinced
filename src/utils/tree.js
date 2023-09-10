function validate(json) {
    if (!json) {
        return { valid: false, message: "JSON is null or undefined." };
    }

    const requiredKeys = ["name", "date", "content"];

    return requiredKeys.reduce((acc, key) => {
        if (acc.valid === false) return acc; // If already invalid, just return the result
        if (!json.hasOwnProperty(key)) {
            return { valid: false, message: `Missing required key: ${key}` };
        }
        if (!json[key]) {
            return { valid: false, message: `Key "${key}" cannot be null or empty.` };
        }
        return acc; // Keep the result as valid for now
    }, { valid: true, message: "Valid JSON." });

}

function countComponents(node) {
    if (node === null || typeof node !== 'object') return 0;

    // If node has a "components" key
    let count = Array.isArray(node.components) ? node.components.length : 0;

    // Combine count with counts from child nodes
    return Object.values(node).reduce((acc, childNode) => {
        if (typeof childNode === 'object') {
            return acc + countComponents(childNode);
        }
        return acc;
    }, count);
}

function addKeyToAllObjects(data, itemToAdd) {
    return data?.map((item) => ({ ...item, ...itemToAdd }));
}

function addUniqueKeyToAllObjects(data, parent) {
    return data?.map((item, index) => ({ ...item, key: `${parent}- ${index}` }));
}

function getPercentage(part, total) {
    return total > 0 ? Math.round((part / total) * 100) : 0;
}

function transformToTree(paths, separator = "/") {
    let idx = 1; // Global index for 'key'
    const totalComponents = Object.values(paths).reduce((acc, item) => acc + item.length, 0);

    function assignNode(obj, keys, value, compoundKey) {
        return keys.reduce((currentLevel, key, i, arr) => {
            // Find if the child with the current key already exists
            let child = currentLevel.find(child => child.title === key);

            // If child doesn't exist, create and add it
            if (!child) {
                child = {
                    title: key,
                    key: String(idx++),
                    countComponents: value.length,
                    percent: getPercentage(value.length, totalComponents),
                    children: []
                };
                currentLevel.push(child);
            }

            // If it's the last key in the array, assign the value
            if (i === arr.length - 1) {
                const componentsWithUrl = addKeyToAllObjects(value, { "url": compoundKey });
                const components = addUniqueKeyToAllObjects(componentsWithUrl, `${i}-${idx}`);
                child.children = [{
                    disabled: true,
                    key: String(idx++),
                    selectable: false,
                    components,
                    url: compoundKey
                }]; // If you need to store the original value
            } else {
                child.countComponents = countComponents(child);
                child.percent = getPercentage(child.countComponents, totalComponents);
            }

            return child.children; // Return current level's children for next iteration
        }, obj);
    }

    const tree = [];

    for (const [compoundKey, value] of Object.entries(paths)) {
        const keys = compoundKey.replace("https://", '').split(separator);
        assignNode(tree, keys, value, compoundKey);
    }

    return [{
        title: "root",
        key: "0",
        countComponents: totalComponents,
        percent: getPercentage(totalComponents, totalComponents),
        children: tree
    }];
}

function extractValues(input) {
    return input.reduce((acc, item) => {
        if (item.components) {
            acc.push(...item.components);
        }
        if (item.children) {
            acc.push(...extractValues(item.children));
        }
        return acc;
    }, []);
}

function sortByKey(node, key) {
    if (node?.children?.length) {
        node.children = node.children.map(child => sortByKey(child, key));
        node.children.sort((a, b) => b[key] - a[key]);
    }
    return node;
}

function sortByAbc(node, key) {
    if (node?.children?.length) {
        node.children = node.children.map(child => sortByAbc(child, key));
        node.children.sort((a, b) => {
            if (typeof a[key] === "string" && typeof b[key] === "string") {
                return a[key].localeCompare(b[key]);
            }
            return 0; // or any other default sorting or no sorting for non-string types
        });
    }
    return node;
}


export { transformToTree, extractValues, sortByKey, sortByAbc, validate };

