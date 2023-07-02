
import './App.css';
import clouds from './clouds.png'
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
import Deploy from "./Deploy"

const { wrap } = provideReactWrapper(React, provideFluentDesignSystem());

export const FluentTabs = wrap(fluentTabs())
export const FluentTab = wrap(fluentTab())
export const FluentTabPanel = wrap(fluentTabPanel())
export const FluentCard = wrap(fluentCard());
export const FluentButton = wrap(fluentButton());
export const FluentTreeView = wrap(fluentTreeView());
export const FluentTreeItem = wrap(fluentTreeItem());
export const FluentDivider = wrap(fluentDivider())

function handleTreeClick(object) {
  document.getElementById("data-card").innerHTML=object.target.innerText
}

const deployData = [
    {"page":"1", "content": "# How to Deploy React Website\n## Objectives\n* List\n* Visit"}
]


const tabData = [
    {"text": "Current Projects", "id":"cp", "panel":<FluentCard id="data-card" style={{backgroundColor: "rgba(255,255,255,0.2)", marginTop: '1vh',textAlign: 'left', height: '80vh'}}>Current Projects</FluentCard>},
    {"text": "Guides/Tutorials", "id":"gt", "panel":<FluentCard id="data-card" style={{backgroundColor: "rgba(255,255,255,0.2)", marginTop: '1vh', textAlign: 'left', height: '80vh'}}><Deploy deployData={deployData} /></FluentCard>}
]


const treeSeed = [
    {"text": "Current Projects", "data": [
            {"text": "Terraform Automator"},
            {"text": "Kubernetes Gameday Build"},
            {"text": "Simple Logging Stack"}
        ]},
    {"text": "Guides/Tutorials", "data": [
            {"text": "Kubernetes From Scratch (and an Ubuntu machine :) )"},
            {"text": "Github Projects"},
            {"text": "Grafana Visualizations"}
        ]}
]


const MakeTabs = (tabData) => {
    if (Array.isArray(tabData) === false) {
        tabData = tabData.data
    }

    let tabs = []
    let tabPanel = []
    for (let tabItem of tabData) {
        tabs.push(<FluentTab id={tabItem.id}>{tabItem.text}</FluentTab>)
        tabPanel.push(<FluentTabPanel id={tabItem.id+'Panel'}>{tabItem.panel}</FluentTabPanel>)
    }

    return tabs.concat(tabPanel)
}

const MakeTree = (treeData) => {
    if (Array.isArray(treeData) === false) {
        treeData = treeData.data
    }

    let content = []
    for (let treeItem of treeData) {
        content.push(<FluentTreeItem>{treeItem.text}{treeItem.data && <MakeTree data={treeItem.data} />}</FluentTreeItem>)
    }

    return content
}

function App() {
  return (
    <div className="App" style={{background: 'url('+clouds+')', height: '100vh'}}>
        <header>EOV 3</header>
        <FluentDivider/>
        <FluentTabs orientation={"vertical"} style={{}} onClick={handleTreeClick}>{MakeTabs(tabData)}</FluentTabs>
    </div>
  );
}

export default App;
