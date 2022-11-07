import React from 'react';
import ContestPreview from './ContestPreview';
import PropTypes from 'prop-types';

const ContestList = ({ contests, onContestClick }) => {
    return (
        <div>
            {Object.keys(contests).map(contestId =>
                <ContestPreview key={contestId} onClick={onContestClick} {...contests[contestId]} />
            )}
        </div>
    );
};

ContestList.propTypes = {
    contests: PropTypes.object,
    onContestClick: PropTypes.func.isRequired
}

export default ContestList;
