interface IMemberProfileReduxAction {
    type: string;
    data: IMemberProfileReduxData;
}
interface IMemberProfileReduxData {
    details?: any;
    profile?: IRegisterDataApi | null;
}
