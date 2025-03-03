import { useEffect, useState } from "react";
import FloatingButton from "../components/buttons/FloatingButton";
import PostItem from "../components/PostItem";
import { PostInterface } from "../constants/PostInterface";
import { supabase } from "../libs/supabase";
import Loader from "../components/Loader";

export default function Posts() {
  const [data, setData] = useState<PostInterface[] | undefined>(undefined);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*, profiles(name)")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error.message);
      } else {
        setData(data);
      }
      setLoaded(true);
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full h-screen max-w-md mx-auto p-4 flex flex-col items-center relative">
      <h1 className="text-4xl font-semibold text-green-primary">
        Basic Supabase
      </h1>

      <div className="w-full mt-8 gap-4 flex flex-col">
        {data && loaded ? (
          data.map((item) => (
            <PostItem
              key={item.id}
              name={item?.profiles?.name || ""}
              content={item.content}
              created_at={item.created_at}
            />
          ))
        ) : (
          <Loader />
        )}
      </div>

      <FloatingButton />
    </div>
  );
}
