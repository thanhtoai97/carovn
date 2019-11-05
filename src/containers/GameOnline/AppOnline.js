import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PubNubReact from 'pubnub-react';
import Swal from 'sweetalert2';
import shortid from 'shortid';
import GameOnline from './GameOnline';
import Board from '../../components/Board';

// import './Game.css';

class AppOnline extends Component {
  constructor(props) {
    super(props);
    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-34534fcf-4283-47c8-946e-6c47f33fe136',
      subscribeKey: 'sub-c-8917020c-fc69-11e9-8dd7-ca99873d233c'
    });

    this.state = {
      piece: '',
      isPlaying: false,
      isRoomCreator: false,
      isDisabled: false,
      myTurn: false
    };

    this.lobbyChannel = null;
    this.gameChannel = null;
    this.roomId = null;
    this.pubnub.init(this);
  }

  componentDidUpdate() {
    // Check that the player is connected to a channel
    if (this.lobbyChannel != null) {
      this.pubnub.getMessage(this.lobbyChannel, msg => {
        // Start the game once an opponent joins the channel
        if (msg.message.notRoomCreator) {
          // Create a different channel for the game
          this.gameChannel = `tictactoegame--${this.roomId}`;

          this.pubnub.subscribe({
            channels: [this.gameChannel]
          });

          this.setState({
            isPlaying: true
          });

          // Close the modals if they are opened
          Swal.close();
        }
      });
    }
  }

  componentWillUnmount() {
    this.pubnub.unsubscribe({
      channels: [this.lobbyChannel, this.gameChannel]
    });
  }

  // Create a room channel
  onPressCreate = () => {
    // Create a random name for the channel
    this.roomId = shortid.generate().substring(0, 5);
    this.lobbyChannel = `tictactoelobby--${this.roomId}`;

    this.pubnub.subscribe({
      channels: [this.lobbyChannel],
      withPresence: true
    });

    // Open the modal
    Swal.fire({
      position: 'top',
      allowOutsideClick: false,
      title: 'Your room ID:',
      text: this.roomId,
      width: 275,
      padding: '0.7em',
      // Custom CSS
      customClass: {
        heightAuto: false,
        title: 'title-class',
        popup: 'popup-class',
        confirmButton: 'button-class'
      }
    });

    this.setState({
      piece: 'X',
      isRoomCreator: true,
      isDisabled: true, // Disable the 'Create' button
      myTurn: true // Room creator makes the 1st move
    });
  };

  // The 'Join' button was pressed
  onPressJoin = () => {
    Swal.fire({
      position: 'top',
      input: 'text',
      allowOutsideClick: false,
      inputPlaceholder: 'Enter the room id',
      showCancelButton: true,
      confirmButtonColor: 'rgb(208,33,41)',
      confirmButtonText: 'OK',
      width: 275,
      padding: '0.7em',
      customClass: {
        heightAuto: false,
        popup: 'popup-class',
        confirmButton: 'join-button-class ',
        cancelButton: 'join-button-class'
      }
    }).then(result => {
      // Check if the user typed a value in the input field
      if (result.value) {
        this.joinRoom(result.value);
      }
    });
  };

  // Join a room channel
  joinRoom = value => {
    this.roomId = value;
    this.lobbyChannel = `tictactoelobby--${this.roomId}`;

    // Check the number of people in the channel
    this.pubnub
      .hereNow({
        channels: [this.lobbyChannel]
      })
      .then(response => {
        if (response.totalOccupancy < 2) {
          this.pubnub.subscribe({
            channels: [this.lobbyChannel],
            withPresence: true
          });

          this.setState({
            piece: 'O'
          });

          this.pubnub.publish({
            message: {
              notRoomCreator: true
            },
            channel: this.lobbyChannel
          });
        } else {
          // Game in progress
          Swal.fire({
            position: 'top',
            allowOutsideClick: false,
            title: 'Error',
            text: 'Game in progress. Try another room.',
            width: 275,
            padding: '0.7em',
            customClass: {
              heightAuto: false,
              title: 'title-class',
              popup: 'popup-class',
              confirmButton: 'button-class'
            }
          });
        }
      })
      .catch(error => {
        throw error;
      });
  };

  onSearchRoom = () => {
    // Create a random name for the channel
    this.roomId = '0';
    this.lobbyChannel = `tictactoelobby--${this.roomId}`;

    this.pubnub.subscribe({
      channels: [this.lobbyChannel],
      withPresence: true
    });

    // Open the modal

    Swal.fire({
      text: this.roomId,
      width: 275,
      padding: '0.7em',
      // Custom CSS
      customClass: {
        heightAuto: false,
        title: 'title-class',
        popup: 'popup-class'
      }
    });

    this.setState({
      piece: 'X',
      isRoomCreator: true,
      isDisabled: true, // Disable the 'Create' button
      myTurn: true // Room creator makes the 1st move
    });

    Swal.fire({
      position: 'top',
      allowOutsideClick: false,
      title: 'Searching...',
      showCancelButton: true,
      confirmButtonColor: 'rgb(208,33,41)',
      confirmButtonText: 'OK',
      width: 275,
      padding: '0.7em',
      customClass: {
        heightAuto: false,
        popup: 'popup-class',
        confirmButton: 'join-button-class ',
        cancelButton: 'join-button-class'
      }
    });
    // Check if the user typed a value in the input field
    this.joinRoom(this.roomId);
  };

  // Reset everything
  endGame = () => {
    this.setState({
      piece: '',
      isPlaying: false,
      isRoomCreator: false,
      isDisabled: false,
      myTurn: false
    });

    this.lobbyChannel = null;
    this.gameChannel = null;
    this.roomId = null;

    this.pubnub.unsubscribe({
      channels: [this.lobbyChannel, this.gameChannel]
    });
  };

  render() {
    const {
      isPlaying,
      // eslint-disable-next-line no-unused-vars
      isDisabled,
      piece,
      isRoomCreator,
      myTurn,
      xUsername,
      oUsername
    } = this.state;
    const { user } = this.props;
    return (
      <div>
        <div className="main_menu">
          <p>Welcome {user.name} to Tic Tac Toe Online</p>
        </div>
        <div>
          <Link to="/menu">
            <button type="button" className="exit">
              Back
            </button>
          </Link>
        </div>

        <div className="game-info1">
          <button
            type="button"
            className="create-button "
            onClick={() => this.onPressCreate()}
          >
            {' '}
            Create your Room
          </button>
          <button
            type="button"
            className="join-button"
            onClick={() => this.onPressJoin()}
          >
            {' '}
            Join Room
          </button>
          <button
            type="button"
            className="join-button"
            onClick={() => this.onSearchRoom()}
          >
            {' '}
            Search Room
          </button>
        </div>

        {!isPlaying && (
          <div className="game">
            <div className="game-board">
              <Board squares={0} onClick={() => null} />
            </div>
          </div>
        )}

        {isPlaying && (
          <GameOnline
            pubnub={this.pubnub}
            gameChannel={this.gameChannel}
            piece={piece}
            isRoomCreator={isRoomCreator}
            myTurn={myTurn}
            xUsername={xUsername}
            oUsername={oUsername}
            endGame={this.endGame}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login.user
});

export default withRouter(connect(mapStateToProps)(AppOnline));
// export default App;
