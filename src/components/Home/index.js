import {Component} from 'react'
import Header from '../Header'
import './index.css'

class Home extends Component {
  onFindingJob = () => {
    const {history} = this.props
    return history.replace('/jobs')
  }

  render() {
    return (
      <>
        <Header />
        <div className="bg-container">
          <div className="another-container">
            <h1 className="heading">Find the Job thats Fit Your Life</h1>
            <p className="description">
              Millions of people are searching fro jobs, salary information,
              company review. Find the job that fits your abilities and
              potential.
            </p>
            <button
              className="find-button"
              type="button"
              onClick={this.onFindingJob}
            >
              Find Jobs
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default Home
