// Reference: https://react.dev/learn/choosing-the-state-structure
// React component - SurveyForm
// Project code modified from the CS - 465 template and my final project(2025)

// survey results format
export default function SurveyForm({ question, onResponseChange, results, globalScale }) {

    const handleChange = (event) => {
        // get the value of the selected question response
        const wordValue = event.target.value;
        let valueToStore = wordValue;

        // assign the priority scale questions to numeric values
        if (question.type == "scale" && globalScale) {
            const entry = Object.entries(globalScale).find(([key, value]) => {
                console.log('Checking key:', key);
                return value === wordValue;
                });

            // if matching entry found, store the numeric value of priorities
            if (entry) {
                valueToStore = entry[0];
                console.log(`converted "${wordValue}", to numeric value: ${valueToStore}`);        
            }
        }
        onResponseChange(question.id, valueToStore);
    };

    // handle checkbox changes for multi-select questions
    const handleCheckboxChange = (event) => {
        const optionValue = event.target.value;

        // for multi-select questions, store the selected options as an array of values
        onResponseChange(question.id, optionValue, true);
    };

    // display results for survey results if available, with bar graph and percentages
    if (results) {
        // tally the question values
        const questionTotal = Object.values(results).reduce((sum, count) => sum + count, 0);

        return (    // display survey results in graph format
            <div className="survey-results">
                <h3>{question.questionTitle}</h3>
                <div className="results-bars">

                    {/* iterate through results and calculate average for each question */}
                    {Object.entries(results).map(([option, count], i) => {
                        const percentage = Math.round(questionTotal > 0 ? 
                            (count / questionTotal) * 100 : 0);

                        return (    // display survey responses as percentage of total
                            <div key={i} className="result-item">
                                <span>{option} : {count} ({percentage}%)</span>

                                <div className="progress-bar">
                                    <div className = "progress-fill"
                                            style={{ width: `${percentage}%` }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // display options for survey questions (return options or empty if none)
    let displayOptions = [];
    let valueOptions = [];

    // log the question details and options
    console.log("Question: ", question.id, question.type);
    console.log("Display options: ", question.options);
    console.log("Global scale: ", globalScale);

    // if the question has options defined, use them for display and value options
    if (question.options && Array.isArray(question.options)) {
        displayOptions = question.options;
        valueOptions = question.options;

    // log the mapped display and value options for the question
    } else if (question.type == "scale" && globalScale) {
        const scaleEntries = Object.entries(globalScale);

        valueOptions = scaleEntries.map(([key]) => key);
        displayOptions = scaleEntries.map(([, value]) => value);

        console.log("Log mapped value options for scale questions: ", valueOptions);
        console.log("Log mapped display options for scale question: ", displayOptions);
    }

    // if no options are found, return error message
    if (!displayOptions || displayOptions.length === 0) {
        return (
            <div className="survey-question error">
                <h3>{question.questionTitle}</h3>
                <p style = {{color: 'red'}}>Error: No options available. </p>
            </div>
        )
    }

    // return the survey input format for user input
    return (
        <div className="survey-question">
            <h3>{question.questionTitle}</h3>

            {/* Handle different question types */ }
            <div className="options-container">
                {displayOptions.map((opt, i) => (
                    <label key={i} className="option-label">
                    
                        <input
                            type={question.type === "multi" ? "checkbox" : "radio"}
                            name={`question-${question.id}`}    // radio buttons for multiple choice
                            value={question.type === "scale" ? valueOptions[i] : opt}  // set scale questions
                            onChange={question.type === "multi" ?   // checkbox for multi-answer questions
                                handleCheckboxChange : handleChange} 
                                />

                        {/* display the option text and numeric value for scale questions */}
                        <span className="option-text">
                            {opt}
                            {question.type === "scale" && (
                                <span className="numeric-value">({valueOptions[i]})</span>
                                )}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
}