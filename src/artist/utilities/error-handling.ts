import { HttpException, HttpStatus } from '@nestjs/common';

export const handleError = ({
  errorMessage,
  errorType = HttpStatus.INTERNAL_SERVER_ERROR,
  response = {},
}: {
  errorMessage: string;
  errorType?: HttpStatus;
  response?: unknown;
}) => {
  const errorObj = { error: errorMessage, response: response };
  console.error(errorMessage, response);

  return new HttpException(errorObj, errorType);
};
