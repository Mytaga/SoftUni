const MainNavItem = (props) => {
    return (
        <a className="navbar-brand d-none d-lg-block" href={props.href}>
            {props.firstTitle}
            <strong className="d-block">{props.secondTitle}</strong>
        </a>);
}

export default MainNavItem;