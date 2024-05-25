interface IRouteConstant {
    href: string;
    as?: (...args: string[]) => string;
    withQuery?: (...args: string[]) => string;
}
