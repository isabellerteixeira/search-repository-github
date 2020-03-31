import React, { useState } from "react";
import "./App.css";
import { Form, Card, Image, Icon } from "semantic-ui-react";
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

  const setData = ({
    name,
    login,
    public_repos,
    avatar_url,
    followers,
    following,
    html_url
  }) => {
    setName(name);
    setUserName(login);
    setRepos(public_repos);
    setAvatar(avatar_url);
    setFollowers(followers);
    setFollowing(following);
    setHtmlUrl(html_url);
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
      setError(null);
    }
    console.log(data);
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
      )}
    </div>
  );
}

export default App;
