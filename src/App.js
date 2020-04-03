import React, { useState, useEffect } from "react";
import "./App.css";
import { Form } from "semantic-ui-react";
import UserCard from "./UserCard.js";
import UserRepositoriesList from "./UserRepositoriesList";
import RepositoriesList from "./RepositoriesList";

function App() {
  const [isUserSearch, setIsUserSearch] = useState(false);
  const [isRepositoriesSearch, setisRepositoriesSearch] = useState(false);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [publicRepos, setPublicRepos] = useState("");
  const [avatar, setAvatar] = useState("");
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  const [repositoriesUrl, setRepositoriesUrl] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [totalRepositories, setTotalRepositories] = useState([]);
  const [items, setItems] = useState([]);

  const setUserData = ({
    name,
    login,
    public_repos,
    avatar_url,
    followers,
    following,
    repos_url
  }) => {
    setName(name);
    setUserName(login);
    setPublicRepos(public_repos);
    setAvatar(avatar_url);
    setFollowers(followers);
    setFollowing(following);
    setRepositoriesUrl(repos_url);
    setIsUserSearch(true);
    setisRepositoriesSearch(false);
  };

  const setRepositoryData = ({ total_count, items }) => {
    setTotalRepositories(total_count);
    setItems(items);
    setIsUserSearch(false);
    setisRepositoriesSearch(true);
  };

  const handleSearch = e => {
    setUserInput(e.target.value);
  };

  useEffect(() => {
    document.title = "Github Search";
  }, []);

  useEffect(() => {
    fetch(repositoriesUrl)
      .then(response => response.json())
      .then(data => setRepositories(data));
  }, [repositoriesUrl]);

  async function halndleUserSearch() {
    if (userInput.length !== 0) {
      const url = "https://api.github.com/users/" + userInput;
      const response = await fetch(url);
      const data = await response.json();
      if (data.message) setError(data.message);
      else {
        setUserData(data);
        setError(null);
      }
    }
  }

  async function halndleRepositoriesSearch() {
    if (userInput.length !== 0) {
      const url =
        "https://api.github.com/search/repositories?q=" +
        userInput +
        ":name&type=Repositories";
      const response = await fetch(url);
      const data = await response.json();
      if (data.message) setError(data.message);
      else {
        setRepositoryData(data);
        setError(null);
      }
    }
  }

  function ShowLists() {
    if (isUserSearch) {
      return (
        <div>
          <UserCard
            avatar={avatar}
            name={name}
            userName={userName}
            publicRepos={publicRepos}
            followers={followers}
            following={following}
          />
          <UserRepositoriesList repositories={repositories} />
        </div>
      );
    } else if (
      isRepositoriesSearch &&
      items.length !== 0
    ) {
      return (
        <RepositoriesList totalRepositories={totalRepositories} items={items} />
      );
    }
    return Error;
  }

  return (
    <div className="Homepage">
      <p className="Bigger-font"> GitHub Search </p>
      <Form className="search-form">
        <Form.Group>
          <Form.Input placeholder="Name" onChange={handleSearch} />
          <Form.Button content="Search User" onClick={halndleUserSearch} />
          <Form.Button
            content="Search Repositories"
            onClick={halndleRepositoriesSearch}
          />
        </Form.Group>
      </Form>
      {error ? <h1>{error}</h1> : <ShowLists />}
    </div>
  );
}

export default App;
