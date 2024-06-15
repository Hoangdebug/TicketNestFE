const Footer: IFooterComponent<IFooterComponentProps> = (props) => {
    const { isShow } = props;

    if (isShow) {
        return <div>dsfakfadhakhfafhfhdsfasfdkafhsjkfadkfasdfklfhkldfhk</div>;
    }
    return <></>;
};

Footer.defaultProps = {
    isShow: false,
};
export default Footer;
