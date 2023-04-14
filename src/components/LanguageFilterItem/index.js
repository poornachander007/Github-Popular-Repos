// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {details, onClickChangeLanguage, isActive} = props
  const {id, language} = details
  const onClickLanguage = () => {
    onClickChangeLanguage(id)
  }
  const className = isActive ? 'activeButton' : ''
  return (
    <li className="li_language_item">
      <button
        type="button"
        className={`language_button ${className}`}
        onClick={onClickLanguage}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
