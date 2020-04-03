import React from "react";
import "./App.css";
import { Table, Icon } from "semantic-ui-react";

const RepositoriesList = props => {
    
  function ShowRepositories() {
    if (props.items) {
      return props.items.map((repository, index) => (
        <Table.Row key={index}>
          <Table.Cell collapsing>
            <Icon name="code" />
            {repository.name}
          </Table.Cell>
          <Table.Cell collapsing>{repository.language}</Table.Cell>
        </Table.Row>
      ));
    }
  }

  return (
    <Table
      className="Bigger-margin-bottom"
      celled
      striped
      compact
      padded
      repositories-list
      size={"small"}
      unstackable
    >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="3">Git Repositories:</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <ShowRepositories />
      </Table.Body>
    </Table>
  );
};

export default RepositoriesList;
