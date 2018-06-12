import { withData } from 'next-apollo';
import { HttpLink } from 'apollo-link-http';

const config = {
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql', // Server URL (must be absolute)
  }),
};

export default withData(config);
