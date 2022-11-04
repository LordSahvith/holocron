import React from 'react';

import Header from './Header';

class App extends React.Component {
    state = {
        pageHeader: 'Name Contests'
    };

    componentDidMount() {
        // AJAX: ie, timers, listeners
    }

    componentWillUnmount() {
        // clean timers, listeners
    }

    render() {
        return (
            <div className='App'>
                <Header message={this.state.pageHeader} />
                <div>
                    ...
                </div>
            </div>
        );
    };
};

export default App;
