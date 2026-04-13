// React component - Footer
// Project code modified from the CS - 465 template and my final project(2025)
// Reference for images: https://create-react-app.dev/docs/adding-images-fonts-and-files/
// Reference for page navigation: https://reactrouter.com/start/framework/navigating
import Navbar from './navbar';

// header component 
// designed with union logo and navigation bar
export default function Header() {
    return (
        <header id="header">
            <div id="logo">     
                <img 
                    src="/logo.png" 
                    alt="WNC NFA Logo" 
                    style={{ height: "100px" }}
                />
                </div>

            <Navbar />
        </header>
    );
}
