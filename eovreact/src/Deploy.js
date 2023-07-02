import {
    provideFluentDesignSystem,
    fluentCard,
    fluentButton,
    fluentDivider,
    fluentTreeItem,
    fluentTabs,
    fluentTab,
    fluentTabPanel,
    fluentTreeView
} from '@fluentui/web-components';
import { provideReactWrapper } from '@microsoft/fast-react-wrapper';
import React from 'react';
import ReactMarkdown from 'react-markdown'


const { wrap } = provideReactWrapper(React, provideFluentDesignSystem());

export const FluentTabs = wrap(fluentTabs())
export const FluentTab = wrap(fluentTab())
export const FluentTabPanel = wrap(fluentTabPanel())
export const FluentCard = wrap(fluentCard());
export const FluentButton = wrap(fluentButton());
export const FluentTreeView = wrap(fluentTreeView());
export const FluentTreeItem = wrap(fluentTreeItem());
export const FluentDivider = wrap(fluentDivider())


const Deploy = ({deployData}) => {
    let pages = []

    for (let page of deployData) {
        pages.push(<ReactMarkdown>{page.content}</ReactMarkdown>)
    }

    return pages
}
export default Deploy