import axios from 'axios';

const cmsClient = axios.create({
  baseURL: 'https://your-cms-api-url.com', // Replace with your CMS API URL
  headers: {
    Authorization: `Bearer YOUR_API_TOKEN`, // Replace with your API token
  },
});

export default cmsClient;
