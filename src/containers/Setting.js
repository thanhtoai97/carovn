import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';

import { setGrid } from '../acctions/gameAction';
import {
  setMode,
  setPace,
  setVs,
  setDiff,
  setStarter
} from '../acctions/settingActions';
import SettingsTable from '../components/SettingTable';

const Settings = props => {
  return (
    <div className="settings_page">
      <div className="left_col_settings">
        <Link to="/">
          <button type="button" className="exit_settings">
            Back
          </button>
        </Link>
      </div>
      <div className="mid_col_settings">
        <SettingsTable settings={props} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  grid: state.game.grid,
  mode: state.settings.mode,
  pace: state.settings.pace,
  versus: state.settings.versus,
  difficulty: state.settings.difficulty,
  playerStarts: state.settings.playerStarts
});
const matchDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setGrid,
      setMode,
      setPace,
      setVs,
      setDiff,
      setStarter
    },
    dispatch
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    matchDispatchToProps
  )(Settings)
);
