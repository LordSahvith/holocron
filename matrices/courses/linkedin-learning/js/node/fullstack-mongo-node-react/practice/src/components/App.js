import React from 'react';

import Header from './Header';
import ContestPreview from './ContestPreview';

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
                    {this.props.contests.map(contest =>
                        <ContestPreview {...contest} />
                    )}
                </div>
            </div>
        );
    };
};

export default App;
