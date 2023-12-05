import { PostCard } from "@/components/postcard";
import { db } from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";

const HomePage = async () => {
  const user = await currentUser();

  if (!user) throw new Error("Unauthorized");

  const posts = (await db.posts.findMany()).reverse();

  return (
    <div className="p-2 flex flex-col overflow-scroll justify-center items-center w-full">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          id={post.id}
          summary={post.summary}
          createdAt={post.createdAt}
          imageUrl={post.imageUrl}
          username={post.username}
          currentUsername={user?.username!}
        />
      ))}
    </div>
  );
};

export default HomePage;
