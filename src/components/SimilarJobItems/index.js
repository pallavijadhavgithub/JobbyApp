import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobItems = props => {
  const {jobs} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    title,
    rating,
    location,
  } = jobs

  return (
    <li className="list-item-similar">
      <div className="similar-con">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="image-similar"
        />
        <div>
          <h1 className="similar-title">{title}</h1>
          <div className="details-rating-con">
            <AiFillStar className="star" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="desc">Description</h1>
      <p className="job-desc">{jobDescription}</p>
      <div className="middle-con">
        <MdLocationOn className="icon" size="24" />
        <p className="location">{location}</p>
        <BsFillBriefcaseFill className="icon" />
        <p className="location">{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobItems
