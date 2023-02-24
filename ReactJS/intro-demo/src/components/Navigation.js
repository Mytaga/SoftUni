import NavList from "./NavList";

function Navigation() {
    return (
        <nav className="navbar navbar-expand-lg bg-light fixed-top shadow-lg">
            <div className="container">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <NavList/>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;