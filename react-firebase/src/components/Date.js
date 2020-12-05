/**
 * Get the current date as a string
 * @returns {string} The current date formatted as `MM-DD-YYYY`.
 */
export let DateToString = () => {
    let today = new Date();
    return  (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
}