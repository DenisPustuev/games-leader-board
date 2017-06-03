import React from 'react';
import PropTypes from 'prop-types';

export default class LeadersListItem extends React.Component {

 render() {
   const { leader, place } = this.props;
   const name = leader.name.split(' '); // split user name to first and second names
   let leaderPlace = '';

   switch (place) {
     case 1:
       leaderPlace = ' first-place';
       break;
     case 2:
       leaderPlace = ' second-place';
       break;
     case 3:
       leaderPlace = ' third-place';
       break;
   }

    return (
      <div className={'leader-card' + leaderPlace}>
        <span className="leader-card__place">{place}</span>

        <span className="leader-card__medal"> </span>

        <div className="leader-card__img">
          <img src={`images/${leader.image}.svg`} alt="user name photo" />
        </div>

        <p className="leader-card__name">{name[0]} <br/> {name[1]}</p>

        <div className="leader-card__score">{leader.score}</div>
      </div>
    );
  }
}

LeadersListItem.propTypes = {
  leader: PropTypes.object.isRequired,
  place: PropTypes.number.isRequired
};
