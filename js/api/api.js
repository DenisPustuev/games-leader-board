import $ from 'jquery'

export const getLeaders = (game, period) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: `${game}-${period}.json`,
      //url: '/react-challenge-sort-and-search/data.json',
      dataType: 'json',
      success: function (data) {
        resolve(data)
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown + ': Error ' + jqXHR.status, 'jsonAPIERROR');
        reject({error: 'Can\'t load leaders'});
      }
    });
  });
};
export const getGames = () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'GET',
      url: `games.json`,
      //url: '/react-challenge-sort-and-search/data.json',
      dataType: 'json',
      success: function (data) {
        resolve(data)
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown + ': Error ' + jqXHR.status, 'jsonAPIERROR');
        reject({error: 'Can\'t load games'});
      }
    });
  });
};