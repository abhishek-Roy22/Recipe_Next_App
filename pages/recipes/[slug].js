import { createClient } from "contentful";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "recipe",
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: "recipe",
    "fields.slug": params.slug,
  });

  return {
    props: { recipe: items[0] },
    revalidate: 1
  };
};

const RecipeDetails = ({ recipe }) => {
  const { featuredImage, title, cookingTime, ingredients, method } =
    recipe.fields;
  return (
    <div className="recipeDetails">
      <div className="banner">
        <Image
          src={"https:" + featuredImage.fields.file.url}
          width={1200}
          height={400}
          alt={title}
        />
        <h2>{title}</h2>
      </div>

      <div className="info">
        <p>Takes about {cookingTime} mins to cook.</p>
        <h3>Ingredients:</h3>
        <span>
          {ingredients.map((ing, i) => (
            <span key={i}>{ing}</span>
          ))}
        </span>
      </div>
      <div className="method">
        <h3>Method:</h3>
        <div>{documentToReactComponents(method)}</div>
      </div>

      <style jsx>{`
        .recipeDetails {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        h2,
        h3 {
          text-transform: uppercase;
        }
        .banner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .banner h2 {
          margin: 0;
          background: #fff;
          display: inline-block;
          padding: 20px;
          position: relative;
          top: -60px;
          left: -10px;
          transform: rotateZ(-1deg);
          box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
        }
        .info {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .info p {
          margin: 0;
        }
        .info span::after {
          content: ", ";
        }
        .info span:last-child::after {
          content: ".";
        }
      `}</style>
    </div>
  );
};

export default RecipeDetails;
