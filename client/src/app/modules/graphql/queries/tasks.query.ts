import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { TaskFetchResponse } from 'app/data/schema/task';

@Injectable({
  providedIn: 'root',
})
export class TaskGQL extends Query<TaskFetchResponse> {
  document = gql`
    query {
      tasks {
        id,
        description,
        state,
        completionDate
      }
    }
  `;
}
