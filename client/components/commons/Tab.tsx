import { Tabs as TabsBootstrap, Tab as TabBootstrap } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const Tabs: ITabsComponent<ITabsComponentProps> = (props) => {
    const { tabs, type = 'boostrap', defaultActiveKey, onChangeEventKey } = props;
    const [state, setState] = useState<ITabsComponentState>({
        eventKey: '',
    });
    const { eventKey } = state;

    useEffect(() => {
        if (defaultActiveKey) {
            setState((prevState) => ({
                ...prevState,
                eventKey: defaultActiveKey ?? '',
            }));
        }
    }, [defaultActiveKey]);

    useEffect(() => {
        if (eventKey) {
            if (onChangeEventKey) {
                onChangeEventKey(eventKey);
            }
        }
    }, [eventKey]);

    return (
        <div className={`components__tabs ${type === 'material' && 'components__tabs--material'}`}>
            <TabsBootstrap
                className="w-100 bases__text--bold"
                onSelect={(event) =>
                    setState((prevState) => ({
                        ...prevState,
                        eventKey: event ?? '',
                    }))
                }
                activeKey={eventKey}
            >
                {tabs?.map((tab, index: number) => {
                    return (
                        <TabBootstrap
                            key={index}
                            eventKey={tab.event}
                            tabClassName="components__tabs-heading bases__text--bold bases__text--dark-gray w-100 bases__font-14"
                            title={tab.title}
                        >
                            {tab.content}
                        </TabBootstrap>
                    );
                })}
            </TabsBootstrap>
        </div>
    );
};

export default Tabs;
