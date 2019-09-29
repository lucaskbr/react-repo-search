import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner, FaTrash } from 'react-icons/fa';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, FormError, List } from './styles';

class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    invalidRepo: {
      error: false,
      message: '',
    },
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({
      newRepo: e.target.value,
      invalidRepo: {
        error: false,
        message: '',
      },
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { newRepo, repositories } = this.state;

    this.setState({
      loading: true,
    });

    try {
      const response = await api.get(`/repos/${newRepo}`);
      const data = {
        name: response.data.full_name,
      };

      const isDuplicated = repositories.find(
        repository => repository.name === data.name
      );

      if (isDuplicated) {
        throw new Error('Repositório duplicado');
      }
      this.setState({
        newRepo: '',
        repositories: [...repositories, data],
      });
    } catch (err) {
      this.setState({
        invalidRepo: {
          error: true,
          message: 'O repositorio é invalido ou já foi adicionado',
        },
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  deleteRepo = repoName => {
    const { repositories } = this.state;

    const repoFiltered = repositories.filter(repo => repo.name !== repoName);

    this.setState({
      repositories: repoFiltered,
    });
  };

  render() {
    const { newRepo, loading, repositories, invalidRepo } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt size={40} />
          Repositorios
        </h1>

        <Form onSubmit={this.handleSubmit} invalidRepo={invalidRepo.error}>
          <input
            type="text"
            placeholder="Adicionar repositorio"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
        <FormError>
          <small>{invalidRepo.message}</small>
        </FormError>
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <Link to={`repository/${encodeURIComponent(repository.name)}`}>
                {repository.name}
              </Link>
              <FaTrash
                color="#e2e2e2"
                size={16}
                onClick={() => this.deleteRepo(repository.name)}
              />
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

export default Main;
