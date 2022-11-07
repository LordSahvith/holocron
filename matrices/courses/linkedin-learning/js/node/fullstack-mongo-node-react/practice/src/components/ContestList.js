import React from 'react';
import ContestPreview from './ContestPreview';
import PropTypes from 'prop-types';

const ContestList = ({ contests, onContestClick }) => {
    return (
        <div>
            {contests.map(contest =>
                <ContestPreview key={contest.id} onClick={onContestClick} {...contest} />
            )}
        </div>
    );
};

ContestList.PropTypes = {
    contests: PropTypes.array,
    onContestClick: PropTypes.func.isRequired
}

export default ContestList;
