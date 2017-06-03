import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import LeadersListItem from './LeadersListItem';

const leaderCardWidth = 112;

export default class LeadersList extends React.Component {

  componentWillReceiveProps(nextProps){
    //if there is new visible list of leaders, scroll to the start of list
    if(this.props.visibleLeaders !== nextProps.visibleLeaders){
      if(window.outerWidth < 600){
        this.refs.scrollbar.scrollToTop();
      } else {
        this.refs.scrollbar.scrollToLeft();
      }
    }
  }

 render() {
   const { leadersLoadingError, leadersLoading, visibleLeaders, isGamesListVisible } = this.props;
   const wideClass = !isGamesListVisible ? ' wide' : '';
    return (
      <div className={'leaders-list' + wideClass}>
        <Scrollbars
          ref="scrollbar"
          renderTrackHorizontal={props => <div {...props} className="track-horizontal"/>}
          renderTrackVertical={props => <div {...props} className="track-vertical"/>}
        >
          <div className="leaders-list__wrap" style={{width: leaderCardWidth * visibleLeaders.length}}>
            {leadersLoading &&
            <div className="loader"></div>
            }

            {leadersLoadingError &&
            <p className="error">{leadersLoadingError}</p>
            }

            {visibleLeaders.length > 0 &&
              visibleLeaders.map((leader, i) => {
                return <LeadersListItem leader={leader} key={leader.id} place={i + 1} />
              })
            }
          </div>
        </Scrollbars>
      </div>
    );
  }
}

LeadersList.propTypes = {
  visibleLeaders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired),
  leadersLoading: PropTypes.bool.isRequired,
  isGamesListVisible: PropTypes.bool.isRequired,
  leadersLoadingError: PropTypes.string.isRequired
};
