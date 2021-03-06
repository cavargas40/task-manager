import { Injectable } from '@angular/core';
import { Mutation, Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { LoginSignUpResponse } from 'app/data/schema/auth';

@Injectable({
  providedIn: 'root',
})
export class LoginGQL extends Mutation<LoginSignUpResponse> {
  constructor(apollo: Apollo) {
    super(apollo);
  }

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

@Injectable({
  providedIn: 'root',
})
export class SignUpGQL extends Mutation<LoginSignUpResponse> {
  constructor(apollo: Apollo) {
    super(apollo);
  }

  document = gql`
    mutation signup($name: String!, $email: String!, $password: String!) {
      signup(name: $name, email: $email, password: $password) {
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
