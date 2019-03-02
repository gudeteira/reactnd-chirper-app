import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleAddTweet} from '../actions/tweets'

class NewTweet extends Component {
  state = {
    text: '',
    toHome: false
  }
  handleChange = e => {
    const text = e.target.value
    this.setState(() => ({
      text
    }))
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state)
    const {text} = this.state
    const {dispatch, id} = this.props

    dispatch(handleAddTweet(text, id))

    this.setState(() => ({
      text: '',
      toHome: !id
    }))
  }

  render() {
    const {text, toHome} = this.state
    if (toHome === true) {
      return <Redirect to='/'/>
    }
    const tweetLeft = 280 - text.length
    return (
      <div>
        <h3 className='center'>Compose new Tweet</h3>
        <form className='new-tweet' onSubmit={this.handleSubmit}>
          <textarea
            placeholder="What's happening"
            value={text}
            onChange={this.handleChange}
            maxLength={280}
            className='textarea'/>
          {tweetLeft <= 100 && (
            <div className='tweet-length'>
              {tweetLeft}
            </div>
          )}
          <button className='btn' type='submit' disabled={text === ''}>
            Submit
          </button>
        </form>
      </div>
    )
  }

}

export default connect()(NewTweet)