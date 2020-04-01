import React, { useState, useEffect } from "react";
import "./App.css";
import { Form, Card, Image, Icon, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";

function App() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [repos, setRepos] = useState("");
  const [avatar, setAvatar] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [htmlUrl, setHtmlUrl] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  const [repositoriesUrl, setRepositoriesUrl] = useState("");
  const [repositories, setRepositories] = useState([]);

  const setData = ({
    name,
    login,
    public_repos,
    avatar_url,
    followers,
    following,
    html_url,
    repos_url
  }) => {
    setName(name);
    setUserName(login);
    setRepos(public_repos);
    setAvatar(avatar_url);
    setFollowers(followers);
    setFollowing(following);
    setHtmlUrl(html_url);
    setRepositoriesUrl(repos_url);
  };

  const handleSearch = e => {
    setUserInput(e.target.value);
  };

  async function halndleSubmit() {
    const url = "https://api.github.com/users/" + userInput;
    const response = await fetch(url);
    const data = await response.json();
    if (data.message) setError(data.message);
    else {
      setData(data);
      handleRepositories();
      setError(null);
    }
  }

  async function handleRepositories() {
    const response = await fetch(repositoriesUrl);
    const data = await response.json();
    setRepositories(data);
  }

  function ShowRepositories() {
    console.log(repositories);
    return repositories.map((repository, index) => (
      <Table.Row key={index}>
        <Table.Cell collapsing>
          <Icon name="code" /> {repository.name}
        </Table.Cell>
        <Table.Cell>{repository.language}</Table.Cell>
      </Table.Row>
    ));
  }

  return (
    <div className="App-header">
      <Form className="search-form" onSubmit={halndleSubmit}>
        <Form.Group>
          <Form.Input placeholder="Name" onChange={handleSearch} />
          <Form.Button content="Submit" />
        </Form.Group>
      </Form>
      {error ? (
        <h1>{error}</h1>
      ) : (
        <div>
          <div className="card">
            <Card>
              <Image src={avatar} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Meta>
                  <span className="date" as={Link} to={htmlUrl}>
                    {userName}
                  </span>
                </Card.Meta>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name="user" />
                  {repos} Repos
                </a>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name="user" />
                  {followers} Followers
                </a>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name="user" />
                  {following} Following
                </a>
              </Card.Content>
            </Card>
          </div>

          <Table celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="3">
                  Git Repositories
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <ShowRepositories />
            </Table.Body>
          </Table>
        </div>
      )}
    </div>
  );
}

export default App;
