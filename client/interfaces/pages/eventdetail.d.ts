import { IBasePageProps, IBasePage } from '@interfaces/pages/base';

export interface IMoreEvent {
    id: string;
    title: string;
    image: string;
    price: string;
    date: string;
}

export interface IEventDetail {
    id: string;
    title: string;
    date: string;
    image: string;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    time: number;
    organizer: string;
    price: string;
    destination: string;
    description: string;
    moreEvents: IMoreEvent[];
}

interface IEventDetailPageProps extends IBasePageProps {}

interface IEventDetailPage<P = {}> extends IBasePage<P> {}
