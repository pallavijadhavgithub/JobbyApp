import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineSearch} from 'react-icons/ai'

import JobItems from '../JobItems'
import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiProfileConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiJobConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profileData: [],
    apiProfileStatus: apiProfileConstant.initial,
    apiJobStatus: apiJobConstant.initial,
    searchInput: '',
    jobsList: [],
    changeSalary: 0,
    employmentType: [],
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobItems()
  }

  getJobItems = async () => {
    const {searchInput, employmentType, changeSalary} = this.state

    this.setState({apiJobStatus: apiJobConstant.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${changeSalary}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobsList: updatedData,
        apiJobStatus: apiJobConstant.success,
      })
    } else {
      this.setState({apiJobStatus: apiJobConstant.failure})
    }
  }

  getProfileDetails = async () => {
    this.setState({apiProfileStatus: apiProfileConstant.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/profile`
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, option)

    if (response.ok === true) {
      const data = await response.json()

      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      console.log(updatedData)

      this.setState({
        profileData: updatedData,
        apiProfileStatus: apiProfileConstant.success,
      })
    } else {
      this.setState({apiProfileStatus: apiProfileConstant.failure})
    }
  }

  renderSuccessProfileView = () => {
    const {profileData} = this.state

    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderFailureProfileView = () => (
    <div className="failure-profile-container">
      <button
        className="retry-button"
        type="button"
        data-testid="button"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingProfileView = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureJobView = () => (
    <div className="failure-job-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1>Ooops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="failure-button"
        onClick={this.getJobItems}
      >
        Retry
      </button>
    </div>
  )

  renderProfileContainer = () => {
    const {apiProfileStatus} = this.state
    switch (apiProfileStatus) {
      case apiProfileConstant.success:
        return this.renderSuccessProfileView()
      case apiProfileConstant.failure:
        return this.renderFailureProfileView()
      case apiProfileConstant.inProgress:
        return this.renderLoadingProfileView()
      default:
        return null
    }
  }

  renderJobCases = () => {
    const {apiJobStatus, jobsList} = this.state
    switch (apiJobStatus) {
      case apiJobConstant.success:
        return <JobItems jobsList={jobsList} />
      case apiJobConstant.failure:
        return this.renderFailureJobView()
      case apiJobConstant.inProgress:
        return this.renderLoadingProfileView()
      default:
        return null
    }
  }

  getEmploymentTypesList = each => (
    <li
      className="list-item"
      key={each.employmentTypeId}
      onChange={this.onChangeEmployeType}
    >
      <input
        type="checkbox"
        id={each.employmentTypeId}
        value={each.employmentTypeId}
      />
      <label htmlFor={each.employmentTypeId} className="label-el">
        {each.label}
      </label>
    </li>
  )

  renderEmploymentType = () => (
    <div className="employement-container">
      <h1 className="heading-type">Type of Employment</h1>
      <ul>
        {employmentTypesList.map(each => this.getEmploymentTypesList(each))}
      </ul>
    </div>
  )

  getSalaryTypesList = each => (
    <li
      className="list-item"
      key={each.salaryRangeId}
      onChange={this.onChangeSalary}
    >
      <input type="radio" id={each.salaryRangeId} />
      <label htmlFor={each.salaryRangeId} className="label-el">
        {each.label}
      </label>
    </li>
  )

  renderSalaryType = () => (
    <div className="employement-container">
      <h1 className="heading-type">Salary Range</h1>
      <ul>{salaryRangesList.map(each => this.getSalaryTypesList(each))}</ul>
    </div>
  )

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterKey = event => {
    if (event.key === 'Enter') {
      this.getJobItems()
    }
  }

  onChangeSalary = event => {
    this.setState({changeSalary: event.target.id}, this.getJobItems)
  }

  onChangeEmployeType = event => {
    this.setState(
      prev => ({employmentType: [...prev.employmentType, event.target.id]}),
      this.getJobItems,
    )
  }

  render() {
    const {searchInput} = this.state

    return (
      <>
        <Header />
        <div className="finding-job-container">
          <div className="first-container">
            <div className="input-container">
              <input
                type="search"
                className="inputs"
                placeholder="search"
                onChange={this.changeSearchInput}
                value={searchInput}
              />
              <button
                type="button"
                className="icon-button"
                data-testid="searchButton"
                onClick={this.getJobItems}
              >
                <AiOutlineSearch size="24" className="search-icon" />
              </button>
            </div>
            {this.renderProfileContainer()}
            <hr className="hr" />
            {this.renderEmploymentType()}
            <hr className="hr" />
            {this.renderSalaryType()}
          </div>
          <div className="second-container">
            <div className="hide">
              <input
                type="search"
                className="input2-container"
                onClick={this.changeSearchInput}
                onKeyDown={this.onEnterKey}
                //   value={searchInput}
              />
              <button
                type="button"
                className="icon2-button"
                data-testid="searchButton"
                onClick={this.getJobItems}
              >
                <AiOutlineSearch />
              </button>
            </div>
            {this.renderJobCases()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
