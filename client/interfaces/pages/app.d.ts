import { Component } from 'react';
import { IBasePageProps, IBasePage } from '@interfaces/pages/base';

interface IAppPageProps extends IBasePageProps {}

interface IAppPage<P = {}> extends IBasePage<P> {}
