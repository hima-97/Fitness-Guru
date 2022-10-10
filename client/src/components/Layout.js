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
