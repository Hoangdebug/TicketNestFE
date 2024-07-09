interface ICountdownComponent<P = {}> extends IBaseComp<P> {}

interface ICountdownComponentProps extends IBaseCompProps {
    dayEnd: string;
}
