const handleApiErrors = async (response: Response): Promise<Response> => {
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Error ${response.status}: ${errorMessage}`);
  }
  return response;
};

export default handleApiErrors;
