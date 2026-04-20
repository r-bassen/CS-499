// React component for the Home page of the Nevada Faculty Alliance Chapter website. 
// Project code modified from the CS - 465 template and my final project(2025)

export default function Home() {
    return (
        <div className="home-container">
            <main>
                <h1>WNC-NFA Chapter Website</h1>
                <p className="intro">
                    The Nevada Faculty Alliance (NFA) at Western Nevada College serves full-time academic faculty as their union representative.
                    We strive to advocate and protect our rights to bargain for better terms and conditions of employment.
                    Our union was established in 2014.
                </p>

                <section className="news-highlight">

                    <h2>About the WNC-NFA Chapter</h2>
                    <p>
                        Our mission is to represent faculty through collaborative outreach and advocacy. We strive to uphold and improve our terms and 
                        conditions of employment to promote a positive working environment for our students. 
                    </p>
                    <p>
                        By joining our union, you are supporting our efforts with your vote into Chapter policies. 
                        Please consider joining today!
                    </p>
                    <p>
                        <em>"Faculty Benefits are Student Benefits".</em>
                    </p>
                </section>
                <section className="content-review">
                    <h2>Welcome to Rachelle Bassen's CS-499 Capstone Project</h2>
                    <p>The project is being showcased through Github Pages using Render.</p>
                    <p>A code review of the two artifacts used in this project is available on YouTube:</p>
                    <h3><a href="https://youtu.be/PVG7TXfMUlU">Click here for the Code Review video</a></h3>
                </section>
            </main>
        </div>
    );
}







