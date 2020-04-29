import { Injectable } from '@angular/core';
import { Mutation, Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { crudTaskResponse } from 'app/data/schema/task';

@Injectable({
  providedIn: 'root',
})
export class CreateTaskGQL extends Mutation<crudTaskResponse> {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  document = gql`
    mutation createTask(
      $description: String!
      $completionDate: String!
      $state: String!
    ) {
      createTask(
        description: $description
        completionDate: $completionDate
        state: $state
      ) {
        id
        description
        state
      }
    }
  `;
}

@Injectable({
  providedIn: 'root',
})
export class UpdateTaskStateGQL extends Mutation<crudTaskResponse> {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  document = gql`
    mutation updateTaskState($id: ID!, $state: String!) {
      updateTaskState(id: $id, state: $state) {
        id
        description
        state
      }
    }
  `;
}

@Injectable({
  providedIn: 'root',
})
export class DeleteTaskGQL extends Mutation<crudTaskResponse> {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  document = gql`
    mutation deleteTask($id: ID!) {
      deleteTask(id: $id) {
        isDeleted
      }
    }
  `;
}
