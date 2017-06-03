import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

export default class GamesList extends React.Component {
  constructor(props){
    super(props);
    this.onChooseGame = this.onChooseGame.bind(this);
  }

  onChooseGame(e){
    e.preventDefault();
    this.props.onChooseGame(parseInt(e.target.dataset.game))
  }

 render() {
   const { gamesLoading, gamesLoadingError } = this.props;

    return (
      <div className="games-list-container">
        {gamesLoading &&
         <div className="loader"></div>
        }

        {gamesLoadingError &&
          <p className="error">{gamesLoadingError}</p>
        }

        {!gamesLoading && !gamesLoadingError &&
          <Scrollbars
            renderTrackVertical={props => <div {...props} className="track-vertical"/>}
          >
            <ul className="games-list">
              {this.props.games.map((game) => {
                const isActiveClass = this.props.activeGame === game.id ? ' active' : '';

                return (
                  <li className='games-list__item' key={game.id}>
                    <a href="#"
                       data-game={game.id}
                       onClick={this.onChooseGame}
                       className={'games-list__link' + isActiveClass}
                    >
                      {game.title}
                    </a>
                  </li>
                )
              })}
            </ul>
          </Scrollbars>
        }
      </div>
    );
  }
}

GamesList.propTypes = {
  games: PropTypes.array,
  gamesLoading: PropTypes.bool.isRequired,
  gamesLoadingError: PropTypes.string.isRequired,
  activeGame: PropTypes.number.isRequired
};
