type CommonAPIResponse<T> = {
  status: 'success' | 'error';
  message: string;
  data?: T;
};

export default CommonAPIResponse;