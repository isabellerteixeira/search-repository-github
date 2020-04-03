import React from "react";
import "./App.css";
import { Card, Image, Icon } from "semantic-ui-react";

const UserCard = props => {
    return (
      <div className="card">
        <Card>
          <Image src={props.avatar} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{props.name}</Card.Header>
            <Card.Meta>
              <span className="date" >{props.userName}</span>
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              {props.publicRepos} Repos
            </a>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              {props.followers} Followers
            </a>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              {props.following} Following
            </a>
          </Card.Content>
        </Card>
      </div>
    );
};

export default UserCard;
