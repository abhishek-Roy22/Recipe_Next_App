import Head from "next/head";
import { createClient } from "contentful";
import RecipeCard from "@/components/RecipeCard";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: "recipe" });

  return {
    props: 
    { recipes: res.items },
    revalidate: 1
  };
}

export default function Recipes({ recipes }) {
  console.log(recipes);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.sys.id} recipe={recipe} />
        ))}
      </main>

      {/* styling */}
      <style jsx>{`
        .recipe-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 20px;
        }
      `}</style>
    </>
  );
}
