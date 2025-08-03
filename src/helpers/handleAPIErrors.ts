export class ApiError extends Error {
  constructor(
    public status: number,
    public serverMessage: string
  ) {
    super(serverMessage);
    this.name = 'ApiError';
  }
}

const handleApiErrors = async (response: Response): Promise<Response> => {
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new ApiError(response.status, errorMessage);
  }
  return response;
};

export default handleApiErrors;
