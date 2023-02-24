const NavItem = (props) => {
    return(
        <li className="nav-item active">
        <a className="nav-link" href={props.href}>{props.title}</a>
        </li>
    );
}

export default NavItem;