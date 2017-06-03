import React from 'react';
import PropTypes from 'prop-types';
import { timePeriods } from '../configs'

export default class Header extends React.Component {

  constructor(props){
    super(props);
    this.onChoosePeriod = this.onChoosePeriod.bind(this);
  }

  onChoosePeriod(e){
    this.props.onChoosePeriod(e.target.dataset.period)
  }

 render() {

   return (
     <header className="leaderboard-header">
       <h2 className="leaderboard-header__title">Leaderboard</h2>

       <div className="leaderboard-header__tabs">
         <ul className="time-tabs">
           {timePeriods.map((period, i) => {
             const periodKey = period.replace(/\s/g,'');
             const isActiveClass = periodKey === this.props.activePeriod ? ' active' : '';

             return(
               <li className={'time-tabs__item' + isActiveClass}
                   key={i}
                   data-period={periodKey}
                   onClick={this.onChoosePeriod}
               >
                 {period}
               </li>
             )
           })}
         </ul>
       </div>

       <div className="leaderboard-header__btn">
         <a href="#" className="menu-btn" onClick={this.props.onToggleGamesList}> </a>
       </div>
     </header>
   );
 }
}

Header.propTypes = {
  activePeriod: PropTypes.string.isRequired,
  onChoosePeriod: PropTypes.func.isRequired,
  onToggleGamesList: PropTypes.func.isRequired
};
