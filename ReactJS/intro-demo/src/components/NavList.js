import MainNavItem from "./MainNavItem";
import NavItem from "./NavItem";

const NavList = (props) => {
    return (
        <ul className="navbar-nav mx-auto">
            <NavItem
                title="Home"
                href="#hero"
            />
            <NavItem
                title="About"
                href="#about"
            />
            <NavItem
                title="Timeline"
                href="#timeline"
            />
            <MainNavItem
                firstTitle="Medic Care"
                secondTitle="Health Specialist"
                href="index.html"
            />
            <NavItem
                title="Testimonials"
                href="#reviews"
            />
            <NavItem
                title="Booking"
                href="#booking"
            />
            <NavItem
                title="Contact"
                href="#contact"
            />
        </ul>
    );
}

export default NavList;