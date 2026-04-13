// Modified code from the CS - 300 VectorSorting assignment
// Reference: https://www.w3schools.com/dsa/dsa_algo_quicksort.php


// quicksort algorithm to sort survey questions based on user responses 
// and return sorted results to the frontend
/**
 * partition function for quicksort
 * average performance: O(n log(n))
 * worst case performance: O(n^2)
 */
function partition(array, key = 'question', low, high) {
    // set the last element as pivot
    const pivot = array[high];
    let i = low - 1;

    // iterate through array and compare array index with pivot
    // increase index if less than pivot, and swap if greater than pivot
    for (let j = low; j < high; j++) {
        if (array[j][key] < pivot[key]) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    // swap the pivot into correct position in the sorted array
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    return i + 1;
};


/* 
* quick sort on survey question data
*/
function quicksort(array, key = 'question', low = 0, high = null) {
    // if high is null, set it to the last index of the array
    if (high === null) {
        high = array.length - 1;
    }

    // perform partition if low index is less than high index
    // if low is less than high, perform partition
    if (low < high) {
        const pi = partition(array, key, low, high);

        // sort elements before and after partition
        quicksort(array, key, low, pi - 1);
        quicksort(array, key, pi + 1, high);
    }

    // return the sorted array
    return array;
}

// prepare the sorted survey results for graphing on the frontend
function prepareGraphData(rows) {
    console.log('Preparing graph data from rows:', rows);
    const graphData = {};

    // iterate through the sorted rows and prepare the graph data object
    for (const row of rows) {
        const { question, value, count } = row;

        if (!graphData[question]) {
            graphData[question] = {};
        }

        // use count from SQL 
        graphData[question][value] = parseInt(count, 10);
    }

    console.log('Prepared graph data:', graphData);
    return graphData;
};

// export the modules
module.exports = {
    partition,
    quicksort,
    prepareGraphData
}

