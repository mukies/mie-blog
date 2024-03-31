/* eslint-disable react/prop-types */
export default function UserProfile({ user }) {
  return (
    <div>
      <div className="flex flex-col ">
        {/* cover and profile  */}
        <div className="relative h-[400px]  w-full">
          <img
            className="h-[70%] object-cover object-center w-full"
            src={user.coverPic}
            alt="cover-image"
          />
          <div className="absolute flex flex-col items-center  translate-x-[-50%] translate-y-[-50%] left-[50%] top-[70%]">
            <img
              className="  h-[170px] w-[170px] rounded-full border-[5px] border-white  object-cover object-center"
              alt="user-profile"
              src={user.profilePic}
            />
            <div className=" flex flex-col items-center">
              <h1 className="text-2xl text-nowrap md:text-3xl capitalize font-bold">
                {user.fullName}
              </h1>
              <span className="text-lg text-gray-600 text-nowrap font-semibold">
                {user.followers?.length} Followers &bull;{" "}
                {user.followings?.length} Followings
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
