export const userResponseExample = {
  id: '8e2e5fb1-3fab-400e-a89c-010ec8e8aea3',
  login: 'John Doe',
  version: 1,
  createdAt: 1731233542574,
  updatedAt: 1731233542574,
};

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

export const artistResponseExample = {
  id: '8e2e5fb1-3fab-400e-a89c-010ec8e8aea3',
  name: 'Michael Jackson',
  grammy: true,
};

export const artistNotFoundResponseExample = {
  statusCode: 404,
  message: 'Artist with id 464b1dd2-3a1f-443b-99ac-331f827159c8 not found',
  error: 'Not Found',
};

export const albumResponseExample = {
  id: '8e2e5fb1-3fab-400e-a89c-010ec8e8aea3',
  name: 'Michael Jackson',
  year: 2023,
  artistId: '8e2e5fb1-3fab-400e-a89c-010ec8e8aea3',
};

export const albumNotFoundResponseExample = {
  statusCode: 404,
  message: 'Album with id 464b1dd2-3a1f-443b-99ac-331f827159c8 not found',
  error: 'Not Found',
};

export const trackResponseExample = {
  name: 'Michael Jackson',
  artistId: '464b1dd2-3a1f-443b-99ac-331f827159c8',
  albumId: '464b1dd2-3a1f-443b-99ac-331f827159c8',
  duration: 123,
};

export const trackBadRequestResponseExample = {
  statusCode: 400,
  message: ['name must be a string'],
  error: 'Bad Request',
};

export const trackNotFoundResponseExample = {
  statusCode: 404,
  message: 'Track with id 464b1dd2-3a1f-443b-99ac-331f827159c8 not found',
  error: 'Not Found',
};

export const favoritesResponseExample = {
  artists: [artistResponseExample],
  albums: [albumResponseExample],
  tracks: [trackResponseExample],
};

export const entityAddedResponseExample =
  '464b1dd2-3a1f-443b-99ac-331f827159c8';

export const favoritesUnprocessableResponseExample = {
  statusCode: 422,
  message: 'Entity not found',
  error: 'Unprocessable Entity',
};

export const favoritesNotFoundResponseExample = {
  statusCode: 422,
  message: 'Artist not found in favorites',
  error: 'Unprocessable Entity',
};
