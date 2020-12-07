/**
 * @param {string} ids
 */
function ParseIds(ids) {
    let id = [];
    if (ids !== '' && ids != null) {
        id = ids.split(",");
    }
    return id;
}

/**
 * @param {string} ids
 * @param {string} id
 */
export function AddId(ids, id) {
    if (ids === '') {
        return id;
    } else if (IncludeId(ids, id)) {
        return ids
    } else {
        return ids + ',' + id;
    }
}

/**
 * @param {string} ids
 * @param {string} id
 */
export function DeleteId(ids, id) {
    if (ids === '') {
        return ids;
    } else if (IncludeId(ids, id)) {
        let id_list = ParseIds(ids);
        let result = '';
        id_list.forEach(entry => {
            if (entry !== id) {
                if (result === '') {
                    result = result + entry;
                }
                else {
                    result = result + ',' + entry;
                }
            }
        })
        return result;
    } else {
        return ids;
    }
}

/**
 * @param {string} ids
 * @param {string} id
 */
export function IncludeId(ids, id) {
    let parsedIds = ParseIds(ids);
    return parsedIds.includes(id);
}

/**
 * @param {string} ids
 */
export function getIdCount(ids) {
    let parsedIds = ParseIds(ids);
    return parsedIds.length;
}

