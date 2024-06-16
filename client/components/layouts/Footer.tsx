const Footer: IFooterComponent<IFooterComponentProps> = (props) => {
    const { isShow } = props;

    if (isShow) {
        return (
            <div className="components__footer p-5">
                <div className="row">
                    <div className="col-md-4 col-sm-12">
                        <div className="d-flex flex-column py-3">
                            <h4>Company</h4>
                            <div className="d-flex flex-column">
                                <p>About</p>
                                <p>Careers</p>
                                <p>Press</p>
                                <p>Blog</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <div className="d-flex flex-row py-3">
                            <h4>Contact</h4>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <div className="d-flex flex-row py-3">
                            <h4>Resources</h4>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return <></>;
};

Footer.defaultProps = {
    isShow: false,
};
export default Footer;
