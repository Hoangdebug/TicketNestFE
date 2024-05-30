const Header: IHeaderComponent<IHeaderComponentProps> = (props) => {
    const { isShow } = props;
    if (isShow) {
        return <div>Header</div>;
    }
    return <></>;
};

Header.defaultProps = {
    isShow: true,
};
export default Header;
