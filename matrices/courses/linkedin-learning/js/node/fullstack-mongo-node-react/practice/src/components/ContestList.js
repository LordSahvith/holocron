import React from 'react';
import ContestPreview from './ContestPreview';
import PropTypes from 'prop-types';

const ContestList = ({ contests }) => {
    return (
        <div>
            {contests.map(contest =>
                <ContestPreview key={contest.id} {...contest} />
            )}
        </div>
    );
};

ContestList.PropTypes = {
    contests: PropTypes.array
}

export default ContestList;
