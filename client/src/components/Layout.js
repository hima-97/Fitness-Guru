// The "Layout.js" file is used for creating a layout template for the website that includes a navigation bar and a footer
// The layout component receives the "props" object as an argument, which can contain any data that is passed to the component when it is used
// The layout component imports the "NavBar" and "Footer" components and uses them to create the navigation bar and footer of the website
// The "user" object is passed as a prop to the "NavBar" component, which can be used to display different links or options in the navigation bar depending if the user is logged in or not
// The "children" property of the "props" object is used to display the content of the page
// This allows the layout component to be used as a wrapper for other components, making it easy to apply a consistent layout to all pages of the website
// The "Footer" component is imported and rendered at the end of the layout component. It creates a simple container for displaying a message in the page footer (i.e. bottom of web page)
// The message is a link to the source code of the project that says "Fitness Guru - Check out the source code here."


import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout(props) {
    const user = props.user;

    return (
        <div>
            <NavBar user={user} />
            <div style={{minHeight: '150px', marginBottom: '100px', clear: 'both'}}>
            {props.children}
            </div>
            <Footer />
        </div>
    );
}
