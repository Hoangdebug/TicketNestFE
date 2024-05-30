interface IPaginationComponentProps extends IBaseCompProps {
    totalPage: number;
    current?: number;
    className?: string;
    onPageChange?: (page: number) => void;
}

interface IPaginationComponent<P = {}> extends IBaseComp<P> {}
