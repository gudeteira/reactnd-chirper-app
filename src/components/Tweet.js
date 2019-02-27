import React, {Component} from 'react'
import {TiArrowBackOutline, TiHeartFullOutline, TiHeartOutline} from 'react-icons/ti'

import {connect} from 'react-redux'
import {handleToggleTweet} from '../actions/tweets'
import {formatDate, formatTweet} from '../utils/helpers'

class Tweet extends Component {
  toParent = (e, id) => {
    e.preventDefault()
    // todo: redirect to parent tweet
  }

  handleLike = (e) => {
    e.preventDefault()
    const {dispatch, tweet, authedUser} = this.props
    dispatch(handleToggleTweet({
      id: tweet.id,
      hasLiked: tweet.hasLiked,
      authedUser
    }))
  }

  render() {
    const {tweet} = this.props
    if (tweet === null) {
      return <p>This tweet doesn't exists</p>
    }
    const {
      name, avatar, timestamp, hasLiked, replies, likes, parent, text
    } = tweet
    return (

      <div className='tweet'>
        <img src={avatar} alt={`Avatar of ${name}`} className='avatar'/>
        <div className='tweet-info'>
          <span>{name}</span>
          <div>{formatDate(timestamp)}</div>
          {parent && (
            <button className='replying-to' onClick={e => this.toParent(e, parent.id)}>
              Replying to @{parent.author}
            </button>
          )}
          <p>{text}</p>
          <div className='tweet-icons'>
            <TiArrowBackOutline className='tweet-icon'/>
            <button className='heart-button' onClick={this.handleLike}>
              {hasLiked === true
                ? <TiHeartFullOutline color='#e0245e' className='tweet-icon'/>
                : <TiHeartOutline className='tweet-icon'/>
              }
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({authedUser, users, tweets}, {id}) {
  const tweet = tweets[id]
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null
  return {
    authedUser,
    tweet: tweet ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet) : null
  }
}

export default connect(mapStateToProps)(Tweet)