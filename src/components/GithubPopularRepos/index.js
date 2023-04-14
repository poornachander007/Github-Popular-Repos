import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const failureViewUrl =
  'https://assets.ccbp.in/frontend/react-js/api-failure-view.png'

const apiStatusViews = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class GithubPopularRepos extends Component {
  state = {
    gprList: [],
    language: languageFiltersData[0].id,
    apiStatus: apiStatusViews.initial,
  }

  componentDidMount() {
    this.getGPRList()
  }

  onClickChangeLanguage = id => {
    this.setState({language: id}, this.getGPRList)
  }

  getGPRList = async () => {
    this.setState({apiStatus: apiStatusViews.loading})
    const {language} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${language}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(typeof data, '______')
    if (response.ok === true) {
      const updatedData = data.popular_repos.map(eachRepo => ({
        name: eachRepo.name,
        id: eachRepo.id,
        issuesCount: eachRepo.issues_count,
        forksCount: eachRepo.forks_count,
        starsCount: eachRepo.stars_count,
        avatarUrl: eachRepo.avatar_url,
      }))
      this.setState({gprList: updatedData, apiStatus: apiStatusViews.success})
    } else if (response.status === 401) {
      this.setState({apiStatus: apiStatusViews.failure})
    }
  }

  renderSuccessView = () => {
    console.log('render success view ------------------------')
    return this.renderRepositoryItems()
  }

  renderFailureView = () => (
    <div className="failureView_container">
      <img src={failureViewUrl} alt="failure view" width={700} />
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderHeaders = () => {
    const {language} = this.state
    return (
      <ul className="ul_languages_container">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            key={eachLanguage.id}
            details={eachLanguage}
            onClickChangeLanguage={this.onClickChangeLanguage}
            isActive={language === eachLanguage.id}
          />
        ))}
      </ul>
    )
  }

  renderRepositoryItems = () => {
    const {gprList, apiStatus} = this.state
    console.log(apiStatus, '----------------rpr')
    return (
      <ul className="ul_repositoryItems_container">
        {gprList.map(eachRepo => (
          <RepositoryItem details={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  renderSwitchCase = apiStatus => {
    switch (apiStatus) {
      case apiStatusViews.success:
        return this.renderSuccessView()

      case apiStatusViews.failure:
        return this.renderFailureView()

      case apiStatusViews.loading:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    const {apiStatus} = this.state

    return (
      <div className="page_container">
        <h1 className="main_heading">Popular</h1>
        {this.renderHeaders()}
        {this.renderSwitchCase(apiStatus)}
      </div>
    )
  }
}

export default GithubPopularRepos
