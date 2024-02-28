import CreatePost from "./CreatePost";
import Post from "./Post";

export default function Feed() {
  return (
    <div className=" ">
      <div>
        <CreatePost />
        <div className="divider m-0 p-0"></div>
        <div className="flex flex-col gap-5">
          <Post />
          <Post />
        </div>
      </div>
    </div>
  );
}
