import React, {Component} from 'react'
import {TiArrowBackOutline, TiHeartFullOutline, TiHeartOutline} from 'react-icons/ti'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleToggleTweet} from '../actions/tweets'
import {formatDate, formatTweet} from '../utils/helpers'

class Tweet extends Component {
  toParent = (e, id) => {
    e.preventDefault()
    // todo: redirect to parent tweet
    this.props.history.push(`/tweet/${id}`)
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
      name, avatar, timestamp, hasLiked, likes, parent, text, id
    } = tweet
    return (

      <Link to={`/tweet/${id}`} className='tweet'>
        <img src={avatar} alt={`Avatar of ${name}`} className='avatar'/>
        <div className='tweet-info'>
          <span>{name}</span>
          <div>{formatDate(timestamp)}</div>
          {parent && (
            <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
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
      </Link>
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

export default withRouter(connect(mapStateToProps)(Tweet))