import { GatsbyNode, PageProps, graphql } from 'gatsby';
import path from 'path';
import slugify from 'slugify';

interface QueryResult {
  allDirectory: {
    edges: {
      node: {
        id: string;
        name: string;
      };
    }[];
  };
}

export const createPages: GatsbyNode['createPages'] = async ({actions, graphql }) => {
  const { createPage } = actions;

  const photoDirectory = await graphql<QueryResult>(`
        query{
          allDirectory(filter: {relativeDirectory: { eq: "" } }) {
            edges{
              node {
                id
                name
              }
            }
          }
        }
    `);

  if (photoDirectory.errors) {
  console.error(photoDirectory.errors);
  throw new Error('Error while running GraphQL query');
  };

  const categories = photoDirectory.data?.allDirectory.edges.map((edge) => edge.node);
  
  categories?.forEach((category) => {
    createPage({
      path: `/${slugify(category.name, { lower: true, trim:true, strict: true, replacement:"-" }  )}`,
      component: path.resolve('./src/templates/SlideGalleryTemplate.tsx'),
      context: {
        category: category.name,
        queryPath: "/photos/" + category.name + "/",
      },
    });
  });
};