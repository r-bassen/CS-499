// This file defines the main layout of the site, including the header, footer, and main content area.
// Reference: https://react.dev/reference/react-dom/components/title
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

// create template layout that includes header and footer on every page
// all pages inherit the MainLayout function
export default function MainLayout({ children }) {
    return (
        <div id="background">
            <div id="page">
                <Header />
                <div id="contents">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
}