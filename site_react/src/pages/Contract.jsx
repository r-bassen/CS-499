// React component for the Contract page of the Nevada Faculty Alliance Chapter website. 
// Project code modified from the CS - 465 template and my final project(2025)

export default function Contract() {
    return (
         <div className="home-container">
            <iframe 
                src="/NFAContract.pdf"
                width="100%"
                height="800px"
                title="Current WNC-NFA Contract" />
        </div>
    );
}