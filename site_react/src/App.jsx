// Template provided by Vite + React, modified by me. Reference: https://react.dev/learn
// Reference for page navigation: https://reactrouter.com/start/framework/navigating
// import the router
// import the main layout template component and four different pages
import { HashRouter, Routes, Route } from 'react-router-dom'; 
import MainLayout from './layout/mainLayout.jsx';
import Home from './pages/Home.jsx';
import Updates from './pages/Updates.jsx';
import Contract from './pages/Contract.jsx';
import Survey from './pages/Survey.jsx';
import Login from './pages/Login.jsx';
import SurveyResults from './components/surveyResults.jsx';


// main function
function App() {
 // set router links to the four pages
 // hashrouter used by Github Pages
    return (
        <HashRouter>
        <div className="appContainer">
            <MainLayout>
                <Routes>   
                    <Route path="/" element={<Home />} />
                    <Route path="/chapter-updates" element={<Updates />} />
                    <Route path="/contract" element={<Contract />} />
                    <Route path="/survey" element={<Survey />} />
                    <Route path="/login" element={<Login />} />
                    {/* protected routes */}
                    <Route path = "/surveyresults" element={<SurveyResults />} />
                    {/* redirect to home page */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </MainLayout>
            </div>
        </HashRouter>
  
    );
}

export default App;
