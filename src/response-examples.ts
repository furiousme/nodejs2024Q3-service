export const userResponseExample = {
  id: '8e2e5fb1-3fab-400e-a89c-010ec8e8aea3',
  login: 'John Doe',
  version: 1,
  createdAt: 1731233542574,
  updatedAt: 1731233542574,
};

export const listOfUsersResponseExample = [userResponseExample];

export const userNotFoundExample = {
  statusCode: 404,
  message: 'User with id 464b1dd2-3a1f-443b-99ac-331f827159c8 not found',
  error: 'Not Found',
};

export const userUpdatedResponseExample = {
  id: 'd50234dc-0c9a-4705-be16-16c41ee02f3a',
  login: 'John Doe',
  version: 2,
  createdAt: 1731234367922,
  updatedAt: 1731234384625,
};

export const invalidIdResponseExample = {
  statusCode: 400,
  message: 'Validation failed (uuid  is expected)',
  error: 'Bad Request',
};
