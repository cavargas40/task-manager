import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { LoginResponse } from 'app/data/schema/auth';

@Injectable({
  providedIn: 'root',
})
export class LoginGQL extends Mutation<LoginResponse> {
  document = gql`
    mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        user {
          id
          email
          name
        }
        token
      }
    }
  `;
}
