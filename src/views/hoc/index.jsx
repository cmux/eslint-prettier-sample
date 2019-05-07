import React from 'react';
import { extend } from 'koot';
import classNames from 'classnames';

import Center from '@components/center';

const PageHOC = extend({
    pageinfo: () => ({
        title: `HOC - ${__('title')}`,
        metas: [{ description: 'HOC Sample' }]
    }),
    styles: require('./styles.component.less')
})(({ className }) => (
    <Center className={className}>
        <h2 className="title">HOC</h2>
        <ExampleA className="example" />
        <ExampleB className="example" />
    </Center>
));

export default PageHOC;

//

const addCapability = (capabilities = []) => WrappedComponent => {
    class HOC extends React.Component {
        render() {
            const props = {
                ...this.props,
                capabilities: capabilities.map(capability => {
                    let theCapability = capability;
                    let suffix = '';
                    if (Array.isArray(capability)) {
                        theCapability = capability[0];
                        suffix = ` (${capability[1]})`;
                    }
                    return (
                        (() => {
                            switch (theCapability) {
                                case 'run': {
                                    return 'running';
                                }
                                default:
                                    return `${theCapability}ing`;
                            }
                        })() + suffix
                    );
                })
            };
            return <WrappedComponent {...props} />;
        }
    }

    return HOC;
};

@addCapability(['fly', 'run'])
class ExampleA extends React.Component {
    render() {
        console.log(this.props);
        return (
            <div className={classNames([this.props.className, 'example-a'])}>
                I can be{' '}
                {this.props.capabilities.map((capability, index) => (
                    <React.Fragment key={index}>
                        <em>{capability}</em>
                        {index < this.props.capabilities.length - 1 ? `, ` : ''}
                    </React.Fragment>
                ))}
                .
            </div>
        );
    }
}

@addCapability(['fly', ['run', '@10km/h']])
class ExampleB extends React.Component {
    render() {
        console.log(this.props);
        return (
            <div className={classNames([this.props.className, 'example-a'])}>
                I can be{' '}
                {this.props.capabilities.map((capability, index) => (
                    <React.Fragment key={index}>
                        <em>{capability}</em>
                        {index < this.props.capabilities.length - 1 ? `, ` : ''}
                    </React.Fragment>
                ))}
                .
            </div>
        );
    }
}
