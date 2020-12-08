/**
 * @param {string} tags
 */
export function ParseTags(tags) {
    let tag = [];
    if (tags != null) {
        tag = tags.split(",");
    }
    return tag;
}