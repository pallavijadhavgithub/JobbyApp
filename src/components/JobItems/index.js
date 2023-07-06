import {Component} from 'react'
// import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

class JobItems extends Component {
  renderSuccessView = () => {
    const {jobsList} = this.props
    const jobDisplay = jobsList.length > 0

    return jobDisplay ? (
      <ul>
        {jobsList.map(each => (
          <Link to={`/jobs/${each.id}`} className="link-jobs">
            <li className="company-list-item" key={each.id}>
              <div className="company-detail">
                <img
                  src={each.companyLogoUrl}
                  alt="logo"
                  className="logo-image"
                />
                <div>
                  <h1 className="title">{each.title}</h1>
                  <div className="star-con">
                    <AiFillStar className="star" />
                    <p className="rating">{each.rating}</p>
                  </div>
                </div>
              </div>
              <div className="pack-con">
                <div className="middle-con">
                  <MdLocationOn className="icon" size="24" />
                  <p className="location">{each.location}</p>
                  <BsFillBriefcaseFill className="icon" />
                  <p className="location">{each.employmentType}</p>
                </div>
                <div>
                  <p>{each.packagePerAnnum}</p>
                </div>
              </div>

              <hr className="hr-line" />
              <div>
                <h1 className="description-heading">Description</h1>
                <p className="description">{each.jobDescription}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    ) : (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-image"
        />
        <h1>No Jobs Found</h1>
        <p>We could not found any jobs, Try other filters.</p>
      </div>
    )
  }

  render() {
    return <div>{this.renderSuccessView()}</div>
  }
}

export default JobItems
