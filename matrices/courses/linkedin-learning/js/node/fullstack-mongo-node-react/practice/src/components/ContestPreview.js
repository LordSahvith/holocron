import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContestPreview extends Component {
    handleClick = () => {
        this.props.onClick(this.props.id);
    }

    render() {
        return (
            <div className='ContestPreview link' onClick={this.handleClick}>
                <div className='category-name'>
                    {this.props.categoryName}
                </div>
                <div className='contest-name'>
                    {this.props.contestName}
                </div>
            </div>
        )
    }
}

ContestPreview.prototypes = {
    id: PropTypes.number.isRequired,
    categoryName: PropTypes.string.isRequired,
    contestName: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}

export default ContestPreview;
