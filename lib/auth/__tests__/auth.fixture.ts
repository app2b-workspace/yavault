import {StateBuilder} from '../../store/state.builder';

export class AuthFixture {
  constructor(private readonly stateBuilder: StateBuilder) {}
  givenAuthenticatedUser(user: {id: string}) {
    this.stateBuilder.withAuthenticatedUser({id: user.id});
  }
}
