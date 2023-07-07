import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'

import SimilarJobItems from '../SimilarJobItems'

import Header from '../Header'
import SkillCard from '../SkillCard'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: [],
    apiStatus: apiConstants.initial,
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getSimilarJobs = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
    skills: data.skills.map(each => ({
      imageUrl: each.image_url,
      name: each.name,
    })),
  })

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      methods: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const url = `https://apis.ccbp.in/jobs/${id}`
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = this.getFormattedData(data.job_details)
      const formattedSimilarJobs = data.similar_jobs.map(eachSimilarJob =>
        this.getSimilarJobs(eachSimilarJob),
      )

      this.setState({
        jobDetails: updatedData,
        apiStatus: apiConstants.success,
        similarJobs: formattedSimilarJobs,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  getProfileDetails = () => {
    this.getJobDetails()
  }

  getSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      title,
      rating,
      location,
      packagePerAnnum,
      skills,
      lifeAtCompany,
    } = jobDetails

    console.log(skills)

    return (
      <div>
        <div className="job-success-container">
          <div className="company-con">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="logo-image"
            />
            <div>
              <h1 className="comp-heading">{title}</h1>
              <div className="details-rating-con">
                <AiFillStar className="star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="pack-con">
            <div className="middle-con">
              <MdLocationOn className="icon" size="24" />
              <p className="location">{location}</p>
              <BsFillBriefcaseFill className="icon" />
              <p className="location">{employmentType}</p>
            </div>
            <div>
              <p>{packagePerAnnum}</p>
            </div>
          </div>
          <hr />
          <div className="anchor-con">
            <h1 className="description-heading1">Description</h1>
            <a href={companyWebsiteUrl} className="visit-link">
              Visit <BiLinkExternal className="bi-link" />
            </a>
          </div>
          <p className="job-description">{jobDescription}</p>
          <h1 className="skills-con">Skills</h1>

          <ul className="unorder-skill">
            {skills.map(each => (
              <SkillCard skillsDetails={each} key={each.name} />
            ))}
          </ul>
          <div className="life-at-company-container">
            <div>
              <h1 className="life-heading">Life at Company</h1>
              <p className="life-description">{lifeAtCompany.description}</p>
            </div>
            <img src={lifeAtCompany.imageUrl} alt="life at company" />
          </div>
        </div>
        <h1 className="similar-job-heading">Similar Jobs</h1>
        <ul className="similar-unorder">
          {similarJobs.map(each => (
            <SimilarJobItems jobs={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  getLoadingView = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Ooops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        className="failure-button"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  renderJobViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.getSuccessView()
      case apiConstants.failure:
        return this.getFailureView()
      case apiConstants.inProgress:
        return this.getLoadingView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-container">{this.renderJobViews()}</div>
      </>
    )
  }
}

export default JobItemDetails
