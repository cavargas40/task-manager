import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class GraphQLCustom {
  handleError(error: any, isLoading: boolean, errorMessage: string) {
    isLoading = false;
    const [errorDetailed] = error.graphQLErrors;
    errorMessage = errorDetailed.message;
  }
}
