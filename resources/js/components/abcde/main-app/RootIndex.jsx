import React, {Suspense, useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import {camelCase} from 'lodash';

const RootIndex = () => {
    const Page = React.lazy(() => import(`./${currentPath}/${currentAction.charAt(0).toUpperCase() + camelCase(currentAction.slice(1))}.jsx`));

    return <Suspense fallback={<div>Loading...</div>}>
        <Page/>
    </Suspense>;
};

export default RootIndex;

const baseElementComponent = document.getElementById('main-app-bpmn');
if (baseElementComponent) {
    const baseElement = ReactDOM.createRoot(baseElementComponent);

    baseElement.render(
        <React.StrictMode>
            <div className="col-12">
                <RootIndex/>
            </div>
        </React.StrictMode>
    )
}
