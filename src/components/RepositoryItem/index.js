// Write your code here
import './index.css'

const starsUrl = 'https://assets.ccbp.in/frontend/react-js/stars-count-img.png'
const forksUrl = 'https://assets.ccbp.in/frontend/react-js/forks-count-img.png'
const issuesUrl =
  'https://assets.ccbp.in/frontend/react-js/issues-count-img.png'

const RepositoryItem = props => {
  const {details} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = details
  return (
    <li className="li_repo_card_container">
      <img src={avatarUrl} alt={name} className="avatar_img" />
      <h1 className="repo_name">{name}</h1>
      <div className="repo_iconAndPara_container">
        <img src={starsUrl} alt="stars" className="repo_icons" />
        <p className="repo_paras"> {starsCount}</p>
      </div>
      <div className="repo_iconAndPara_container">
        <img src={forksUrl} alt="forks" className="repo_icons" />
        <p className="repo_paras"> {forksCount}</p>
      </div>
      <div className="repo_iconAndPara_container">
        <img src={issuesUrl} alt="open issues" className="repo_icons" />
        <p className="repo_paras"> {issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
