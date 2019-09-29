import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaSpinner, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import {
  GoOctoface,
  GoFile,
  GoNote,
  GoStar,
  GoRepoForked,
  GoIssueClosed,
  GoIssueOpened,
} from 'react-icons/go';

import api from '../../services/api';

import Container from '../../components/Container';
import LoadingPage from '../../components/LoadingPage';

import {
  NavigationHeader,
  RepoInfo,
  Owner,
  RepoDescription,
  FilterTab,
  FilterButton,
  IssueList,
  Pagination,
  PaginationButton,
} from './styles';

class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    filters: [{ name: 'all' }, { name: 'open' }, { name: 'closed' }],
    filterActiveIndex: 0,
    page: 1,
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'all',
          per_page: 5,
          page: 1,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  handleFilter = async index => {
    await this.setState({
      filterActiveIndex: index,
    });

    this.applyFilter();
  };

  applyFilter = async () => {
    const { filters, filterActiveIndex, page } = this.state;

    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filters[filterActiveIndex].name,
        per_page: 5,
        page,
      },
    });

    await this.setState({
      issues: issues.data,
    });
  };

  changePage = async type => {
    const { page } = this.state;

    await this.setState({
      page: type === 'prev' ? page - 1 : page + 1,
    });

    this.applyFilter();
  };

  defineIconInButton = name => {
    switch (name) {
      case 'all':
        return <GoNote color="#000" size={20} />;
      case 'open':
        return <GoIssueOpened color="#000" size={20} />;
      case 'closed':
        return <GoIssueClosed color="#000" size={20} />;
      default:
        return null;
    }
  };

  render() {
    const {
      repository,
      issues,
      loading,
      filters,
      filterActiveIndex,
      page,
    } = this.state;

    if (loading) {
      return (
        <LoadingPage>
          <FaSpinner color="#FFF" size={60} />
        </LoadingPage>
      );
    }

    return (
      <>
        <Container>
          <NavigationHeader>
            <div>
              <FaChevronLeft color="#7159C1" size={15} />
              <Link to="/">Voltar aos repositorios</Link>
            </div>
            <small>
              <GoOctoface color="#7159C1" size={50} />
            </small>
          </NavigationHeader>
          <RepoInfo>
            <Owner>
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
              />
            </Owner>
            <RepoDescription>
              <h1>{repository.name}</h1>
              <div>
                <small>
                  <GoFile color="#000" size={20} />
                  {repository.license.name}
                </small>
                <small>
                  <GoStar color="#000" size={20} />
                  {repository.forks_count}
                </small>
                <small>
                  <GoRepoForked color="#000" size={20} />
                  {repository.stargazers_count}
                </small>
              </div>
              <p>{repository.description}</p>
            </RepoDescription>
          </RepoInfo>
          <FilterTab>
            {filters.map((filter, index) => (
              <FilterButton
                key={filter.name}
                filterActive={index === filterActiveIndex}
                onClick={() => this.handleFilter(index)}
              >
                {this.defineIconInButton(filter.name)}
                {filter.name}
              </FilterButton>
            ))}
          </FilterTab>
          <IssueList>
            {issues.map(issue => (
              <li key={String(issue.id)}>
                <a href={issue.html_url}>
                  <img src={issue.user.avatar_url} alt={issue.user.login} />
                  <div>
                    <strong>
                      {issue.title}
                      {issue.labels.map(label => (
                        <span key={String(label.id)}>{label.name}</span>
                      ))}
                    </strong>
                    <p>{issue.user.login}</p>
                  </div>
                </a>
              </li>
            ))}
          </IssueList>
        </Container>
        <Pagination>
          <PaginationButton
            type="button"
            disabled={page === 1 ? 1 : 0}
            allowed={page === 1 ? 1 : 0}
            onClick={() => this.changePage('prev')}
          >
            <FaChevronLeft color="#000" size={20} />
          </PaginationButton>
          {page}
          <PaginationButton
            type="button"
            onClick={() => this.changePage('next')}
          >
            <FaChevronRight color="#000" size={20} />
          </PaginationButton>
        </Pagination>
      </>
    );
  }
}

export default Repository;
