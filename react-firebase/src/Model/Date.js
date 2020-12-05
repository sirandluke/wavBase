/**
 * Get the current date as a string
 * @returns {string} The current date formatted as `MM-DD-YYYY`.
 */
export let DateToString = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate() <= 10 ? '0' + today.getDate() : today.getDate();
    const year = today.getFullYear();
    return month + '-' + day + '-' + year;
}

export let RankByDate = (readArr) => {
    let ranked = [];
    readArr.forEach(i => {
    });
}