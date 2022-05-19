import { GraphQLClient, gql } from 'graphql-request';   // import graphql client and gql

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;  // import endpoint
const graphcmsToken = process.env.GRAPHCMS_TOKEN
/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */

// export a default function for API route to work
export default async function comments(req, res) {
    // const { name, email, slug, comment } = req.body
   // create a graphql client
  const graphQLClient = new GraphQLClient((graphqlAPI), {   
    headers: {
        // set up the authorizaton header
      authorization: `Bearer ${ graphcmsToken }`,
    },
  });

    //   create a query by commenting name, email and data to a specific post
    const query = gql`
        mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
        createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
        }
    `;
    try {
    // store the query in a graphql client body   
    const result = await graphQLClient.request(query, req.body);

    // return the data
    return res.status(200).send(result);

    } catch (error) {
        console.log(error)
    }

}