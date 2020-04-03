import React from "react";
import "./App.css";
import { Table, Icon } from "semantic-ui-react";

const UserRepositoriesList = props => {

  function ShowRepositories() {
    if (props.repositories)
      return props.repositories.map((repository, index) => (
        <Table.Row key={index}>
          <Table.Cell collapsing>
            <Icon name="code" /> {repository.name}
          </Table.Cell>
          <Table.Cell>{repository.language}</Table.Cell>
        </Table.Row>
      ));
  }

  return (
    <Table celled striped repositories-list>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="3">
            Git Repositories:
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <ShowRepositories />
      </Table.Body>
    </Table>
  );
};

export default UserRepositoriesList;
