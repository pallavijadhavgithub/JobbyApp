import './index.css'

const SkillCard = props => {
  const {skillsDetails} = props
  const {name, imageUrl} = skillsDetails

  return (
    <li className="skill-list-items">
      <div className="skill-container">
        <img src={imageUrl} alt={name} className="skill-image" />
        <p className="image-name">{name}</p>
      </div>
    </li>
  )
}

export default SkillCard
