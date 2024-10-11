interface ISidebarReduxData {
    isSidebarShow: boolean;
}

interface ISidebarReduxAction {
    type: string;
    data: ISidebarReduxData;
}
