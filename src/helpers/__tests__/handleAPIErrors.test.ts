import handleApiErrors, { ApiError } from '../handleAPIErrors';

describe('handleApiErrors', () => {
  it('returns response when response is ok', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn(),
    } as unknown as Response;

    const result = await handleApiErrors(mockResponse);
    expect(result).toBe(mockResponse);
  });

  it('throws ApiError when response is not ok', async () => {
    const mockText = 'Not found';
    const mockResponse = {
      ok: false,
      status: 404,
      text: jest.fn().mockResolvedValue(mockText),
    } as unknown as Response;

    await expect(handleApiErrors(mockResponse)).rejects.toThrow(ApiError);
    await expect(handleApiErrors(mockResponse)).rejects.toMatchObject({
      status: 404,
      serverMessage: mockText,
      message: mockText,
      name: 'ApiError',
    });
  });
});
