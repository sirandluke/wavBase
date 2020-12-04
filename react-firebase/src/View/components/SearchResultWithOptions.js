import React from "react";

const SearchResultWithOptions = (option, result_list) => {
    return (
        <div>
            <h2>{option} Search Results</h2>
            {result_list}
        </div>

    );
}

export default SearchResultWithOptions;