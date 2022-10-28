import axios from 'axios';
const imageApi = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '30085761-1d63a83edc62b581f045216a3',
  },
});
export const getPhoto = async (query, page) => {
  const { data } = await imageApi.get('/', {
    params: {
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      page,
    },
  });

  return data;
};
