import React, { Component } from 'react';
import Header from './components/Header';
import LeadersList from './components/LeadersList';
import GamesList from './components/GamesList';

import { getLeaders, getGames } from './api/api'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePeriod: 'today',
      visibleLeaders: [],
      leadersLoading: true,
      leadersLoadingError: '',
      activeGame: 0,
      games: [],
      gamesLoading: true,
      gamesLoadingError: '',
      isGamesListVisible: false
    };

    this.onGetLeaders = this.onGetLeaders.bind(this);
    this.onChooseGame = this.onChooseGame.bind(this);
    this.onChoosePeriod = this.onChoosePeriod.bind(this);
    this.onToggleGamesList = this.onToggleGamesList.bind(this);
  }

  componentWillMount() {
    //get leaders from json on app init
    this.onGetLeaders(this.state.activeGame, this.state.activePeriod);

    //get games from json on app init
    getGames().then((data) => {
      this.setState({
        games: data,
        gamesLoading: false,
        gamesLoadingError: ''
      })
    }, (error) => {
      this.setState({
        gamesLoadingError: error,
        gamesLoading: false
      })
    })
  }

  onGetLeaders(activeGame, activePeriod){
    if(this.state[`${activeGame}-${activePeriod}`]){ //check cached leaders list
      this.setState((prevState) => {
        return {
          visibleLeaders: prevState[`${activeGame}-${activePeriod}`], //set visible leaders from cache
        }
      })
    }else{
      getLeaders(activeGame, activePeriod).then((data) => {
        this.setState({
          [`${activeGame}-${activePeriod}`]: data, //adding loaded leaders list to cache
          visibleLeaders: data,
          leadersLoading: false,
          leadersLoadingError: ''
        })
      }, (error) => {
        this.setState({
          usersLoadingError: error,
          usersLoading: false
        })
      })
    }
  }

  onChooseGame(game) {
    this.setState({
      activeGame: game
    });

    if(window.outerWidth < 600){ //if screen is mobile close games list on choosing game
      this.onToggleGamesList();
    }

    this.onGetLeaders(game, this.state.activePeriod);
  }

  onChoosePeriod(period) {
    this.setState({
      activePeriod: period
    });
    this.onGetLeaders(this.state.activeGame, period);
  }

  onToggleGamesList() {
    this.setState((prevState) => {
      return {
        isGamesListVisible: !prevState.isGamesListVisible
      }
    })
  }

  render() {
    return (
      <div className="leaderboard-widget">
        <Header
          activePeriod={this.state.activePeriod}
          onChoosePeriod={this.onChoosePeriod}
          onToggleGamesList={this.onToggleGamesList}
        />

        <div className="leaderboard-content">
          <LeadersList
            leadersLoading={this.state.leadersLoading}
            visibleLeaders={this.state.visibleLeaders}
            leadersLoadingError={this.state.leadersLoadingError}
            isGamesListVisible={this.state.isGamesListVisible}
          />

          {this.state.isGamesListVisible &&
            <GamesList
              gamesLoading={this.state.gamesLoading}
              games={this.state.games}
              gamesLoadingError={this.state.gamesLoadingError}
              activeGame={this.state.activeGame}
              onChooseGame={this.onChooseGame}
            />
          }

        </div>
      </div>
    );
  }
}
