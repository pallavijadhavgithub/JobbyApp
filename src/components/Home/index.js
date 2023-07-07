import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  //   onFindingJob = () => {
  //     const {history} = this.props
  //     return history.replace('/jobs')
  //   }

  render() {
    return (
      <>
        <Header />
        <div className="bg-container">
          <div className="another-container">
            <h1 className="heading">Find The Job That Fits Your Life</h1>
            <p className="description">
              Millions of people are searching for jobs, salary information,
              company review. Find the job that fits your abilities and
              potential.
            </p>
            <Link to="/jobs">
              <button className="find-button" type="button">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}

export default Home
